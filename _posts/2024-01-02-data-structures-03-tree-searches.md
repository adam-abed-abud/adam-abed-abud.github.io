---
layout: post
title: Data Structures part 2 - Two Pointers Technique!
bigimg: /img/datastructure.jpg
tags: [Data Structures]
---

This blog post is the second of a series of entries about Data Structures in Computer Science. Today's topic is about `Tree searches`. Also, Happy New Year! 

In this blog post, I want to dive into the world of trees, exploring their fundamental concepts and show a simple demonstartion in C++. I will focus on two tree search algorithms. 

## Tree Data Structure

A tree is a hierarchical data structure consisting of nodes connected by edges. The topmost node is called `root` and it serves as the starting point. Every other node in the tree is either an internal node or a leaf. Internal nodes have child nodes, while leaves have no children, making them the endpoints of the tree. A simple example of a tree is a `binary tree`, where each internal node has at most two children. Binary trees are the starting point for understanding tree data structures and serve as the building block for more complex tree structures.

## Binary Tree Implementation in C++:

Let's implement a basic binary tree in C++. We'll define a simple structure for tree nodes and create functions for insertion.


```cpp
#include <iostream>

// Define the structure for a binary tree node
struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int value) : data(value), left(nullptr), right(nullptr) {}
};

// Function to insert a new node into the binary tree
TreeNode* insert(TreeNode* root, int value) {
    if (root == nullptr) {
        return new TreeNode(value);
    }

    if (value < root->data) {
        root->left = insert(root->left, value);
    } else {
        root->right = insert(root->right, value);
    }

    return root;
}

int main() {
    // Create binary tree
    TreeNode* root = nullptr;
    root = insert(root, 1);
    insert(root, 2);
    insert(root, 3);
    insert(root, 4);
    insert(root, 5);

    return 0;
}

```


## Problem statement and traversal algorithms

What if now we want to traverse the tree and search for a specific value? In order to do that we need to implement a traversal function for the tree data structure. A basic example to perform an `in-order` traversal of the binary tree is the following: 

```cpp
void inOrderTraversal(TreeNode* root) {
    if (root != nullptr) {
        inOrderTraversal(root->left);
        std::cout << root->data << " ";
        inOrderTraversal(root->right);
    }
}
```

In this case, the search algorithm of the binary tree is called `in-order` traversal because it involves visiting the nodes in a specific order: left child, current node, right child. In more detail, for each node, the in-order traversal algorithm first recursively visits the left subtree (i.e., all nodes in the left subtree), then processes the current node, and finally recursively visits the right subtree (i.e., all nodes in the right subtree). This order ensures that the values in the tree are visited in ascending order when the tree represents a Binary Search Tree (BST). 

A more advanced tree search algorithm is the `beadth-frist-traversal` function. In this case, the search algorithm uses a queue to search and traverse all the elemenets of the binary tree level by level. The queue ensures that all the nodes at the current level are processed before moving on to the next level of the binary tree structure. 


An example of the implementation of the `beadth-frist-traversal` search algorithm is given in the following: 
```cpp
// Function to perform a breadth-first traversal of the binary tree
void breadthFirstTraversal(TreeNode* root) {
    if (root == nullptr) {
        return;
    }

    std::queue<TreeNode*> nodeQueue;
    nodeQueue.push(root);

    std::cout << "Breadth-first traversal: ";

    // Here is wehre the magic happens
    while (!nodeQueue.empty()) {
        TreeNode* current = nodeQueue.front();
        std::cout << current->data << " ";
        nodeQueue.pop();

        if (current->left != nullptr) {
            nodeQueue.push(current->left);
        }

        if (current->right != nullptr) {
            nodeQueue.push(current->right);
        }
    }

    std::cout << std::endl;
}
```

To use the above algorithms in our previous implementation of the binary tree you simply need to add the following lines: 

```cpp
    // Perform in-order traversal and print the elements
    std::cout << "In-order traversal: ";
    inOrderTraversal(root);
    std::cout << std::endl;

    // Perform breadth-first traversal and print the elements
    breadthFirstTraversal(root);
```


## Applications

I am an applied scientist and therefore I always like to see where different technologies are applied. Having said that, you can find real-life applications of binary search trees in the following (not exhaustive list):
* Databases and Indexing: used to store and index data efficiently. For example, in a relational database, a BST might be used to index the values of a specific column, enabling faster search and retrieval operations
* File Systems: maintain the hierarchical structure of directories
* Network Routing Tables: In computer networks, binary search trees are used in routing tables to determine the optimal path for data packets
* Caching: BSTs are employed in caching mechanisms to manage and organize cached data efficiently


## Conclusion

Trees, with their hierarchical structure, provide an elegant solution to many computational problems. It is therefore crucial to understand the fundamentals of trees and their implementation. 


## PS 
I use [Compiler Explorer](https://godbolt.org/) to test and prototype code in C++. 

