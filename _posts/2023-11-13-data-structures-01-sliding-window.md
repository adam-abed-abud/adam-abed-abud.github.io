---
layout: post
title: Data Structures: Sliding Window Algorithms
bigimg: /img/blog/data_structure.jpg
tags: [Data Structures]
---

This blog post is first one of a series of entries about Data Structures in Computer Science. Today's topic is about `sliding window algoritms`

## Introduction 

Sliding window algorithms in computer science are used to efficiently solve a wide range of problems such as sequence analysis, sub-string searching, and sub-array processing. They allow to maintain a "window" of elements within a data structure while iterating through a larger data set, eliminating redundant computation (e.g. nested loops) and improving performance. In this blog post, I'll explore the concept of sliding window with some C++ examples.

Note that if you want to run the following code examples online on your browser you can use [Compiler Explorer](https://godbolt.org/)


### Common types of sliding window problems


In computer science there are different problems that can be solved with the sliding window algorithms. These typically consist in 

 1.  **Fixed-size window**: In this type of problem, you are given a fixed-size window, and you need to perform some operation (e.g., sum, average, maximum, minimum) within that window as it slides through the data set. Applications include finding the maximum sum sub-array of size k, calculating moving averages, or searching for a sub-string of a given length with specific properties. Time complexity is typically O(n) where 'n' is the size of the input data. Without the sliding window algorithm, typically the time complexity is O(n^2) because of the need for nested loops.
    
2.  **Variable-size window**: In these problems, the size of the window can change dynamically based on certain conditions. You may need to find a sub-array with the sum of elements less than or equal to a target value, ensuring that the window's size satisfies a particular constraint. Time complexity is typically O(n^2) where 'n' is the size of the input data. 
    
3.  **Two-pointer technique**: Some sliding window problems use a two-pointer approach. You maintain two pointers, one at the start and one at the end of the window, and slide them as needed. This is common in problems related to searching for sub-strings or sub-arrays with specific properties or in tasks like finding the longest sub-string with at most k distinct characters. Time complexity is typically O(n) where 'n' is the size of the input data. 
    

### Example

Here is a classical example of the use of the sliding window. In the following piece of code the objective is to find the maximum sum of a sub-array of fixed size. So, given the vector `nums = {2, 1, 5, 1, 3, 2}` what is the maximum sum for sub-arrays of size 3? 


The answer can be found by executing the following piece of code: 

```sh
#include <iostream>
#include <vector>

int maxSumSubarray(const std::vector<int>& nums, int k) {
    int maxSum = 0;
    int windowSum = 0;
    
    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    
    maxSum = windowSum;
    
    for (int i = k; i < nums.size(); i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = std::max(maxSum, windowSum);
    }
    
    return maxSum;
}

int main() {
    std::vector<int> nums = {2, 1, 5, 1, 3, 2};
    int k = 3;
    int result = maxSumSubarray(nums, k);
    std::cout << "Maximum sum of a subarray of size " << k << " is: " << result << std::endl;
    return 0;
}
```
All the magic of the previous code lies in the following line which is really the heart of the sliding window algorithm. 
```sh
windowSum = windowSum - nums[i - k] + nums[i];
```

Since I started to have a look at the Rust programming language, here is the above code rewritten in Rust

```sh
fn max_sum_subarray(nums: &[i32], k: usize) -> i32 {
    let mut max_sum = 0;
    let mut window_sum = 0;

    for i in 0..k {
        window_sum += nums[i];
    }

    max_sum = window_sum;

    for i in k..nums.len() {
        window_sum = window_sum - nums[i - k] + nums[i];
        max_sum = max_sum.max(window_sum);
    }

    max_sum
}

fn main() {
    let nums = vec![2, 1, 5, 1, 3, 2];
    let k = 3;
    let result = max_sum_subarray(&nums, k);
    println!("Maximum sum of a subarray of size {} is: {}", k, result);
}
```

The output from the previous two codes is: 
```sh
Maximum sum of a subarray of size 3 is: 9
```



