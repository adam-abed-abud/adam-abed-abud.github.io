---
layout: post
title: Writing fast to disk in Rust
date: 2026-04-18 14:11:00
description: How hard can it possibly be? (HAIPE)
featured: true
---

# How Fast Can You Write to Disk?

The goal of this task started as a challenge to myself to see how fast can I create a program in Rust that writes data to disk. How hard can it possibly be? Maybe I will start a series called HAIPE (= `How hArd can It Possible bE`). The goal is to obviously achieve the maximum write speed of the disk. A secondary goal (more personal) is to practice Rust development.

## Setup

My disk is a Crucial device. You can find your disk model and name using:
```sh
lsblk -o name,model,serial
```

Example output:
```sh
nvme0n1     CT1000P3SSD8       2321E6D9292B
|-nvme0n1p1
`-nvme0n1p2
```

I tested it on this CPU `AMD Ryzen 5 1600 Six-Core Processor`

## Naive implementation

Let's start with the fun part. A simple implementation may look fine, but it doesn’t ensure data is flushed to disk.

Result
```sh
Read 1073741824 bytes
Wrote 1073741824 bytes in 1.110s
```

<details>
<summary>Code</summary>

```rust
use std::fs;
use std::time::Instant;

fn main() {
    let data = fs::read("input").expect("Failed to read input file");
    println!("Read {} bytes", data.len());

    let start = Instant::now();
    fs::write("output/copy", &data).expect("Failed to write file");
    let elapsed = start.elapsed();

    println!("Wrote {} bytes in {:.3?}", data.len(), elapsed);
}
```
</details>

## Adding the flush to disk
The following code adds the direct flushing to disk.

<details>
<summary>Code</summary>

```rust
use std::time::Instant;
use std::io::Write;
use std::fs::File;

fn main() {
    let data = fs::read("input").expect("Failed to read input file");
    println!("Read {} bytes", data.len());

    let start = Instant::now();

    let mut file = File::create("output/copy").expect("Failed to create file");
    // Write to file and sync so that OS write immediately
    // write_all makes sure that the all the data have been written
    // sync_all is the equivalent as calling the POSIX fsync(). It is a blocking call
    file.write_all(&data).expect("Failed to write data");
    file.sync_all().expect("Failed to sync");

    let elapsed = start.elapsed();

    println!("Wrote {} bytes in {:.3?}", data.len(), elapsed);
}
```
</details>


Here is the output that I got.

```sh
❯ cargo run
   Compiling storage_writer v0.1.0 (/home/adam/Desktop/projects/HAIPE/storage_writer)
    Finished dev [unoptimized + debuginfo] target(s) in 0.47s
     Running `target/debug/storage_writer`
Read 1073741824 bytes
Wrote 1073741824 bytes in 1.443s
```

It is obviously slower because the OS needs to flush immediately before returning.

Let's add some page caching and measure the throughput values. After the first run, the OS keeps the 1 GB input file in the page cache (RAM). So fs::read isn't really reading from disk: it's copying from cached memory. And the output might also benefit from the page cache if the kernel hasn't flushed the previous run's data yet.


Run the following command to drop the page cache:
```sh
sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'
```

<details>
<summary>Here is the updated code: </summary>

```rust
use std::fs;
use std::time::Instant;
use std::io::Write;
use std::fs::File;

fn main() {
    let data = fs::read("input").expect("Failed to read input file");
    println!("Read {} bytes", data.len());

    let start = Instant::now();

    let mut file = File::create("output/copy").expect("Failed to create file");
    // Write to file and sync so that OS write immediately
    // write_all makes sure that the all the data have been written
    // sync_all is the equivalent as calling the POSIX fsync(). It is a blocking call
    file.write_all(&data).expect("Failed to write data");
    file.sync_all().expect("Failed to sync");

    let elapsed = start.elapsed();
    let bytes = data.len() as f64;
    let mb = bytes / (1024.0 * 1024.0);
    let secs = elapsed.as_secs_f64();

    println!("Wrote {:.1} MB in {:.3?} ({:.1} MB/s)", mb, elapsed, mb / secs);

}
```
</details>

## Comparison with DD? Buffered writes?

Creating a file using /dev/random is CPU bound:
```sh
dd if=/dev/random of=input bs=1G count=1
```

Instead you should be doing something like:
```sh
dd if=/dev/zero of=output/dd_test bs=1M count=1024 conv=fdatasync
```
That writes 1 GB of zeros (no CPU bottleneck) and `conv=fdatasync` forces a flush like our `sync_all()`. In my case I got the following:
```sh
❯ dd if=/dev/zero of=output/dd_test bs=1M count=1024 conv=fdatasync
1024+0 records in
1024+0 records out
1073741824 bytes (1.1 GB, 1.0 GiB) copied, 1.24273 s, 864 MB/s
```

Right now we do one giant 1 GB write_all() call. In real systems, you often write in chunks (e.g., streaming data as it arrives). Let's see how chunk size affects performance.

<details>
<summary>Here is the code</summary>

```rust
use std::fs::File;
use std::io::BufWriter;
use std::io::Write;
use std::time::Instant;
use std::{env, fs};

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 3 {
        eprintln!("Usage: {} <input> <output>", args[0]);
        std::process::exit(1);
    }
    let input_path = &args[1];
    let output_path = &args[2];

    let data = fs::read("input").expect("Failed to read input file");
    println!("Read {} bytes", data.len());

    let chunk_size = 4096;

    let start = Instant::now();

    let file = File::create(output_path).expect("Failed to create file");
    let mut writer = BufWriter::new(file);

    for chunk in data.chunks(chunk_size) {
        writer.write_all(chunk).expect("Failed to write chunk");
    }
    writer.flush().expect("Failed to flush");
    writer.get_ref().sync_all().expect("Failed to sync");

    let elapsed = start.elapsed();
    let bytes = data.len() as f64;
    let mb = bytes / (1024.0 * 1024.0);
    let secs = elapsed.as_secs_f64();

    println!(
        "Wrote {:.1} MB in {:.3?} ({:.1} MB/s) [chunk={}]",
        mb,
        elapsed,
        mb / secs,
        chunk_size
    );
}
```
</details>

Notice in the above code how expressive Rust is (I'm still a beginner on Rust): `data.chunks(chunk_size)` returns an iterator of slices or how the buffered writer takes ownership of the file (it moves in).

Here is the output that I got:
```sh
❯ target/debug/storage_writer input output/copy
Read 1073741824 bytes
Wrote 1024.0 MB in 1.560s (656.3 MB/s) [chunk=4096]
```

## Let's write chunks directly!

Let's change the code such that we write chunks directly to disk.

<details>
<summary>As usual, here is the code:</summary>

```rust
use std::fs::File;
use std::io::Write;
use std::time::Instant;
use std::{env, fs};

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 3 {
        eprintln!("Usage: {} <input> <output>", args[0]);
        std::process::exit(1);
    }
    let input_path = &args[1];
    let output_path = &args[2];

    let data = fs::read("input").expect("Failed to read input file");
    println!("Read {} bytes", data.len());

    let chunk_size = 8*1024*1024;

    let start = Instant::now();

    let mut file = File::create(output_path).expect("Failed to create file");

    for chunk in data.chunks(chunk_size) {
        file.write_all(chunk).expect("Failed to write chunk");
    }
    file.sync_all().expect("Failed to sync");

    let elapsed = start.elapsed();
    let bytes = data.len() as f64;
    let mb = bytes / (1024.0 * 1024.0);
    let secs = elapsed.as_secs_f64();

    println!(
        "Wrote {:.1} MB in {:.3?} ({:.1} MB/s) [chunk={}]",
        mb,
        elapsed,
        mb / secs,
        chunk_size
    );
}
```
</details>

Here is the output that I got:
```
❯ target/debug/storage_writer input output/copy
Read 1073741824 bytes
Wrote 1024.0 MB in 1.480s (691.7 MB/s) [chunk=8388608]
```

## Another approach

Let's try another approach. We could stream the data instead of copying everything into memory.

Note that this crashes for 10GB file writing because the OS killed your process. That's the Linux OOM (Out of Memory) killer. `fs::read()` tries to load the entire 10 GB file into RAM, and my system doesn't have enough.

Instead of `fs::read()` (load everything), we open both files and copy chunk by chunk. This uses only chunk_size bytes of RAM, no matter how big the file.

<details>
<summary>Here is the code:</summary>

```rust
use std::env;
use std::fs::File;
use std::io::Read;
use std::io::Write;
use std::time::Instant;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 3 {
        eprintln!("Usage: {} <input> <output>", args[0]);
        std::process::exit(1);
    }

    let input_path = &args[1];
    let output_path = &args[2];

    let chunk_size = 8 * 1024 * 1024;

    let mut reader = File::open(input_path).expect("Failed to open input");
    let mut writer = File::create(output_path).expect("Failed to create output");

    let mut buffer = vec![0u8; chunk_size];
    let mut total_bytes: u64 = 0;

    let start = Instant::now();

    loop {
        let bytes_read = reader.read(&mut buffer).expect("Failed to read");
        if bytes_read == 0 {
            break;
        }
        writer
            .write_all(&buffer[..bytes_read])
            .expect("Failed to write");
        total_bytes += bytes_read as u64;
    }

    writer.sync_all().expect("Failed to sync");

    let elapsed = start.elapsed();
    let mb = total_bytes as f64 / (1024.0 * 1024.0);
    let secs = elapsed.as_secs_f64();

    println!(
        "Wrote {:.1} MB in {:.3?} ({:.1} MB/s) [chunk={}]",
        mb,
        elapsed,
        mb / secs,
        chunk_size
    );
}
```
</details>


Is there a difference in `Release build`? Let's see.

We have been running debug builds this whole time. Debug mode disables optimizations and adds bounds checks on every array access. For our tight loop doing millions of slice operations, this matters. In C++ terms, this is the equivalent between `-O0` and `-O2`.


Here is the output I got (very surprising to me!)

```sh
❯ target/release/storage_writer input output/copy
Wrote 10240.0 MB in 76.337s (134.1 MB/s) [chunk=8388608]
```

## Yet another approach. Write a const block

Are input and output/copy on the same physical disk? If so, the disk head (or NVMe controller) is ping-ponging between reading and writing, which could kill throughput.

Here we write a constant quantity directly to file.

<details>
<summary>Code</summary>

```rust
  use std::env;
  use std::fs::File;
  use std::io::Write;
  use std::time::Instant;

  fn main() {
      let args: Vec<String> = env::args().collect();

      if args.len() != 3 {
          eprintln!("Usage: {} <output> <size_mb>", args[0]);
          std::process::exit(1);
      }

      let output_path = &args[1];
      let size_mb: u64 = args[2].parse().expect("Invalid size in MB");
      let total_bytes = size_mb * 1024 * 1024;

      let chunk_size = 8 * 1024 * 1024;
      let buffer = vec![0xABu8; chunk_size];

      let mut file = File::create(output_path).expect("Failed to create output");
      let mut written: u64 = 0;

      let start = Instant::now();

      while written < total_bytes {
          let remaining = (total_bytes - written) as usize;
          let to_write = remaining.min(chunk_size);
          file.write_all(&buffer[..to_write]).expect("Failed to write");
          written += to_write as u64;
      }

      file.sync_all().expect("Failed to sync");

      let elapsed = start.elapsed();
      let mb = written as f64 / (1024.0 * 1024.0);
      let secs = elapsed.as_secs_f64();

      println!(
          "Wrote {:.1} MB in {:.3?} ({:.1} MB/s) [chunk={}]",
          mb, elapsed, mb / secs, chunk_size
      );
  }
```
</details>

Run it like this:
```sh
cargo run --release -- output/copy 10240
```

And here is what I got:
```sh
❯ cargo run --release -- output/copy 10240
    Finished release [optimized] target(s) in 0.05s
     Running `target/release/storage_writer output/copy 10240`
Wrote 10240.0 MB in 89.893s (113.9 MB/s) [chunk=8388608]
```


## Wrap-up

Interesting insights:
  1. My disk is 96% full — only 41 GB free. NVMe SSDs slow down dramatically when nearly full because the controller runs out of free NAND blocks and has to do garbage collection during writes.
  2. 268 MB/s for 1 GB (down from 700 MB/s earlier): earlier runs were hot in the page cache. This is closer to your real disk speed under pressure. So ~114-268 MB/s is the actual sustained write speed given the disk state. That's expected for a nearly-full NVMe.