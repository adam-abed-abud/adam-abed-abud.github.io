---
layout: post
title: Data Structures part 4 - Introduction to undirected Graphs 
bigimg: /img/datastructure.jpg
tags: [Data Structures]
---

In the previous blog post I discussed binary trees and traversal search algorithms. In this blog, my attempt is very similar. First I want to introduce `graphs`, (yet) another data structure, and then explore its traversal search algorithms. 

## Graph Data Structure

Graph data structures allows to model and analyze relationships between entities. A graph is a collection of nodes (vertices) connected by edges. These edges define relationships or connections between the nodes. Graphs can be categorized into various types, such as directed and undirected, weighted and unweighted, cyclic and acyclic, etc. They find applications in diverse domains, including social networks, network routing, recommendation systems, and more.


## Simple Graph Data Structure Implementation in C++:

Let's start by exploring a simple representation of an undirected graph using an adjacency list. In C++, this can be achieved through the use of vectors.


```cpp
#include <iostream>
#include <vector>

using namespace std;

class Graph {
public:
    vector<vector<int>> adjList;

    // Constructor
    Graph(int vertices) {
        adjList.resize(vertices);
    }

    // Function to add an edge to the graph
    void addEdge(int u, int v) {
        adjList[u].push_back(v);
        adjList[v].push_back(u);
    }
    
    void getGraph() {
        int node_count = 0 ;
        for (auto edge : adjList) {
          std::cout << "Node " << node_count  << 
              " of the graph has " << edge.size() 
               << " elements. " << std::endl;
          for (int neighbor : edge) {
              cout << neighbor << " ";
          }
          cout << endl;
          node_count++;
    
        }
    }    
    
};

```

Here, we define a `Graph class` with an adjacency list to store the connections between nodes. The `addEdge` function allows us to add edges between nodes. All the magi c is done in the method `addEdge`. Also note that this is a very crude implementation of graphs because it will double count edges if you add them like this (0,1) and then like this (1,0). Nonetheless it serves the purpose and it correctly describes a graph data structure. 


## Problem statement and traversal algorithms

What if now we want to traverse the graph and search for a specific value? In order to do that we need to implement a traversal function for the graph data structure. A common traversal algorithm is the Depth-First Search algorithm

```cpp
class GraphTraversal {
public:
    vector<bool> visited;

    // Constructor
    GraphTraversal(int vertices) {
        visited.resize(vertices, false);
    }

    // Depth-First Search
    void DFS(const Graph& graph, int startNode) {
        visited[startNode] = true;
        cout << startNode << " ";

        for (int neighbor : graph.adjList[startNode]) {
            if (!visited[neighbor]) {
                DFS(graph, neighbor);
            }
        }
    }
};
```

This GraphTraversal class contains a visited array to keep track of visited nodes during traversal. The DFS function recursively explores the graph from a given starting node.

Another widely-used graph traversal algorithm is Breadth-First Search (BFS). BFS explores a graph level by level, visiting all neighbors of a node before moving on to the next level. It's implementation in C++ is given by the following:

```cpp
#include <queue>

class BreadthFirstSearch {
public:
    vector<bool> visited;

    // Constructor
    BreadthFirstSearch(int vertices) {
        visited.resize(vertices, false);
    }

    // Breadth-First Search
    void BFS(const Graph& graph, int startNode) {
        queue<int> bfsQueue;
        visited[startNode] = true;
        bfsQueue.push(startNode);

        while (!bfsQueue.empty()) {
            int current = bfsQueue.front();
            cout << current << " ";
            bfsQueue.pop();

            for (int neighbor : graph.adjList[current]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    bfsQueue.push(neighbor);
                }
            }
        }
    }
};
```

In this implementation, the BreadthFirstSearch class utilizes a visited array to mark visited nodes during the traversal. The BFS function uses a queue to systematically visit nodes level by level, ensuring that all neighbors at the current level are visited before moving on to the next level.

```cpp
int main() {
    // Create a graph with 6 vertices
    Graph exampleGraph(6);

    // Add edges to the graph
    exampleGraph.addEdge(0, 1);
    exampleGraph.addEdge(0, 2);
    exampleGraph.addEdge(1, 3);
    exampleGraph.addEdge(1, 4);
    exampleGraph.addEdge(2, 4);
    exampleGraph.addEdge(3, 5);
    
    // Perform DFS starting from node 0
    cout << "DFS traversal starting from node 0: ";
    GraphTraversal dfsTraversal(exampleGraph.adjList.size());
    dfsTraversal.DFS(exampleGraph, 0);
    cout << endl;

    // Reset visited array for BFS
    fill(dfsTraversal.visited.begin(), dfsTraversal.visited.end(), false);

    // Perform BFS starting from node 0
    cout << "BFS traversal starting from node 0: ";
    BreadthFirstSearch bfsTraversal(exampleGraph.adjList.size());
    bfsTraversal.BFS(exampleGraph, 0);
    cout << endl;

    return 0;
}
```


## Applications

Where are graphs used in real-life problems? Here is a non-exhaustive list of some applications of graphs: 

* Social Networks: undirected graphs are commonly used to model relationships between individuals in social networks. Nodes represent individuals, and edges denote connections or friendships between them. Algorithms on undirected graphs help analyze network structures, identify influential nodes, and recommend connections

* Recommendation Systems: undirected graphs can be employed to model user-item relationships in recommendation systems. Users and items are represented as nodes, and edges indicate user preferences or interactions with items. Algorithms can then identify similar users or items to make personalized recommendations

* Network Routing: in computer networks, undirected graphs are utilized to model connections between routers or network nodes. Efficient routing algorithms on these graphs help optimize the flow of data and ensure effective communication between network components

* Spatial Networks: in geographic information systems (GIS), undirected graphs can model spatial relationships between locations or points of interest. Edges represent proximity or accessibility between locations, facilitating pathfinding and route optimization algorithms.


## Conclusion

In this blog I attempted to shed some lights on undirected graphs, their basic implementation and some algorithms to traverse them. As for many data structures, undirected graphs provide a versatile framework for representing and solving problems in diverse fields, making them a fundamental concept in graph theory and computer science. 


## PS 
I use [Compiler Explorer](https://godbolt.org/) to test and prototype code in C++. 

