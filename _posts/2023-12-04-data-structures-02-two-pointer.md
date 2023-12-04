---
layout: post
title: Data Structures part 2 - Two Pointers Technique!
bigimg: /img/datastructure.jpg
tags: [Data Structures]
---

This blog post is the second of a series of entries about Data Structures in Computer Science. Today's topic is about `Two Pointers Technique`


## Problem statement 

Two pointers is an effective technique that is typically used for searching pairs in a sorted array. Let A be a sorted array (sorted in ascending order) and having N integers. The objective is to identify if there is any pair of elements (A[i], A[j]) such that their sum is equal to a value X.

## Applications

The two pointers technique can be applied to a large variaty of problems that involve arrays. linked lists, strings, vectors, etc. 

## Solution

Let us assume our initial vector and the sum of the pair we are interested in are the following:
```
    std::vector<int> arr = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    // value to search
    int val = 15;
```


This problem can be solved in two ways. A naive approach consists in executing two "for loops" on the two indices in order to identify the values of the pair. The following code shows how this can be done: 

```
#include <bits/stdc++.h>
 
void find_pair_naive(std::vector<int>& A, int N, int X)
{
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            // as equal i and j means same element
            if (i == j)
                continue;
 
            // pair exists
            if (A[i] + A[j] == X)
                std::cout << "Found a pair in the array. Indices are: " << i << " and " << j << std::endl;
 
            // as the array is sorted
            if (A[i] + A[j] > X) {
                break;
            }    
        }
    }
}

// Driver code
int main()
{
    // array declaration
    std::vector<int> arr = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    // value to search
    int val = 15;
    // size of the array
    int arrSize = arr.size();
 
    // array should be sorted before using two-pointer
    // technique
    std::sort(arr.begin(), arr.end());   

    // Function call
    find_pair_naive(arr, arrSize, val);
 
    return 0;
}
```

The problme with this approach is that the time complexity for identifying the solution is O(n^2). 

The two-pointers technique attempts at finding a solution without relying on the use of two loops. This is illustrated in the following piece of code: 

```
#include <bits/stdc++.h>

void find_pair(std::vector<int>& A, int N, int X)
{
    // represents first pointer
    int i = 0;
 
    // represents second pointer
    int j = N - 1;
 
    while (i < j) {
 
        // If we find a pair
        if (A[i] + A[j] == X) {
            std::cout << "Found a pair in the array. Indices are: " << i << " and " << j << std::endl;
            i++;            
        }
 
        // If sum of elements at current
        // pointers is less, we move towards
        // higher values by doing i++
        else if (A[i] + A[j] < X)
            i++;
 
        // If sum of elements at current
        // pointers is more, we move towards
        // lower values by doing j--
        else
            j--;
    }
}

// Driver code
int main()
{
    // array declaration
    std::vector<int> arr = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    // value to search
    int val = 15;
    // size of the array
    int arrSize = arr.size();
 
    // array should be sorted before using two-pointer
    // technique
    std::sort(arr.begin(), arr.end());   

    // Function call
    find_pair(arr, arrSize, val);
 
    return 0;
}

```

Effectively the two pointers technique takes advntage of a single "for loop" and it updates one index at a time. This is the magic that happens with this line: 
```
        else if (A[i] + A[j] < X)
            i++;
```

Using the two pointers technique the time complexity becomes O(n log n) which is comparably better than the previously obtained O(n^2). Note that this is the 




### Disclaimer

This problem and its solution has been heavily inspired by the corresponding article on `geeksforgeeks` 



