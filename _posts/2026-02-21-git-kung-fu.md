---
layout: post
title: Git Kung Fu
date: 2026-04-10 21:31:00
description: Cool tricks with git
featured: true
---

## Git Kung Fu

It turns out the commit history tells a story. Who touched what, where things break, and which parts everyone avoids. Inspired by The Git Commands I Run Before Reading Any Code [link](https://piechowski.io/post/git-commands-before-reading-code/) puts it, a few simple commands can reveal “where a codebase hurts before you open a single file.”

This is super cool. I like to call it Git Kung Fu. They are nice command line tools to go deeper in the code. Somehow this information is coumbersome to get on the Github/Gitlab web interface.   


### Some tricks

The following shows the files that change the most.
```
git log --format=format: --name-only --since="1 year ago" | sort | uniq -c | sort -nr | head -20
```

Who has created the most code? Here you go: `git shortlog -sn --no-merges` . This is however skewed measure because it is affected if you import a library or copy stuff here and there across the repo.

My absolute favorite is the following: see which branches someone has been active on recently
```
git branch -r | grep -v '\->' | xargs -I {} git log -1 --format="%ci %an {}" {} | grep "adam-abed-abud" | awk '$4 >= "'$(date -d '2 weeks ago' '+%Y-%m-%d')'"' | sort -r
```

This one feels like time-travel debugging. You instantly see where someone has been working across remote branches in the last couple of weeks.

To map out contributors across all remotes:
```
git log --remotes --format="%ae %an" | sort -u
```

And to zoom in on a specific person:
```
git log --remotes --format="%ae %an" | sort -u | grep -i USERNAME
```

Simple, but powerful. It answers questions like:

Who is actually active right now?
Are there ghost contributors?
