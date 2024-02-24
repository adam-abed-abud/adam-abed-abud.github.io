---
layout: post
title: Data Structures part 5 - Dijkstra's Algorithm 
bigimg: /img/datastructure.jpg
tags: [Data Structures]
---

In the previous blog post about data structures I gave a quick introduction about graphs and a couple of algorithms for traversing them. Today's objective is to dive into one of the most popular algorithms related to graphs: Dijkstra's Algorithm

Note that unlike in the previous blog entry about graphs, today we will be using `weighted graphs` instead of `unweighted graphs`. 

## Weighted Graphs

Weighted graph data structures extend the concept of graphs by assigning numerical values, known as weights, to the edges. Unlike unweighted graphs, where all edges have equal significance, weighted graphs capture additional information about the relationships between nodes. These weights often represent distances, costs, or some other measure of significance associated with traversing the edges.

The key components of a weighted graph data structure are:

* Nodes (Vertices): just like in unweighted graphs, nodes represent entities or points of interest. Each node may have associated data or attributes.

* Edges: connect nodes together

* Weights: numerical values assigned to edges, indicating the "cost" or "distance" associated with traversing from one node to another. The weight could represent various properties depending on the application 

* Adjacency List or Matrix: weighted graphs are typically represented using an adjacency list or matrix. In an adjacency list, each node has a list of its neighbors along with corresponding edge weights. In an adjacency matrix, the weights are stored in a matrix where the entry at row i and column j represents the weight of the edge between nodes i and j.


In the context of weighted graphs, finding the shortest or most cost-effective paths becomes a central problem. Hence, the need for investigating efficient path-finding algorithms like the Dijkstra's Algorithm. 


## Weighted Graph Implementation in C++

Let's start by implementing a weighted graph data structure in C++. This achieved with the following piece of code

```
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Weighted graph represented as an adjacency list
    vector<vector<pair<int, int>>> weightedGraph = {
        {{1, 4}, {2, 2}},
        {{0, 4}, {2, 5}, {3, 10}},
        {{0, 2}, {1, 5}, {3, 3}},
        {{1, 10}, {2, 3}}
    };

    // Each pair {v, w} represents an edge from the current node to node v with weight w

    return 0;
}
```


In this example, the weighted graph is represented using a vector of vectors, where each inner vector contains pairs representing neighboring nodes and their corresponding edge weights.



## Dijkstra's Algorithm

Dijkstra's Algorithm is a versatile algorithm for finding the shortest path between nodes in a weighted graph. Unlike unweighted graphs, where the shortest path is the one with the fewest edges, weighted graphs assign a numerical value (weight) to each edge, representing the cost or distance between nodes.

The implementation of the Dijkstra's Algorithm in C++ can be found in the following: 

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <limits>

using namespace std;

class Dijkstra {
public:
    vector<int> dijkstra(const vector<vector<pair<int, int>>>& graph, int startNode) {
        int numNodes = graph.size();
        vector<int> distance(numNodes, numeric_limits<int>::max());

        // Priority queue to store {distance, node}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

        // Initialize distance for the start node
        distance[startNode] = 0;
        pq.push({0, startNode});

        while (!pq.empty()) {
            int current = pq.top().second;
            int currentDistance = pq.top().first;
            pq.pop();

            // Update distances for neighbors
            for (const auto& neighbor : graph[current]) {
                int neighborNode = neighbor.first;
                int edgeWeight = neighbor.second;

                int newDistance = currentDistance + edgeWeight;
                if (newDistance < distance[neighborNode]) {
                    distance[neighborNode] = newDistance;
                    pq.push({newDistance, neighborNode});
                }
            }
        }

        return distance;
    }
};

```

In this implementation, the dijkstra function returns a vector of distances from the start node to every other node in the graph. The most crucial part of the algorithm is the use of the for-loop to evaluate the distance between one node with the neighboring ones: 
```cpp
            for (const auto& neighbor : graph[current]) {
                int neighborNode = neighbor.first;
                int edgeWeight = neighbor.second;

```

This is then following by the calculation of the distance between the nodes, taking into account the weight factors of the edges:

```cpp
                int newDistance = currentDistance + edgeWeight;
                if (newDistance < distance[neighborNode]) {
                    distance[neighborNode] = newDistance;
                    pq.push({newDistance, neighborNode});
                }
```
At the end oft he algorithm the new distance is updated and pushed back to the priority queue. 


An example of application of the Dijkstra's algorithm is to find the shortest path between cities. The following is an example showcasing the use of the algorithm in a real-life problem: 

```cpp
int main() {
    // Example graph with weighted edges
    vector<vector<pair<int, int>>> cityGraph = {
        {{1, 4}, {2, 2}},
        {{0, 4}, {2, 5}, {3, 10}},
        {{0, 2}, {1, 5}, {3, 3}},
        {{1, 10}, {2, 3}}
    };

    // Starting from city 0
    int startCity = 0;

    // Applying Dijkstra's Algorithm
    Dijkstra dijkstra;
    vector<int> shortestDistances = dijkstra.dijkstra(cityGraph, startCity);

    // Displaying results
    for (int i = 0; i < shortestDistances.size(); ++i) {
        cout << "Shortest distance from city " << startCity << " to city " << i << ": " << shortestDistances[i] << endl;
    }

    return 0;
}
```


## Applications
Where are weighted graphs used? And what are the applications of Dijkstra's Algorithm  in real world-like problems? Here are a few examples: 

* Network Routing: Dijkstra's Algorithm is used to find the shortest paths between routers or nodes, optimizing the flow of data and reducing latency

* GPS Navigation Systems: navigation systems in vehicles or mobile devices use Dijkstra's Algorithm to find the shortest path between the current location and the destination, considering road distances or travel times

* Airline Route Planning: airlines use Dijkstra's Algorithm to determine the most efficient routes between airports, considering factors such as flight distances and fuel costs

* Resource Allocation in Project Management: Dijkstra's Algorithm can be applied in project management to optimize resource allocation and scheduling by finding the critical path with the shortest duration

* Telecommunication Networks: in telecommunication networks, Dijkstra's Algorithm is used to optimize data transmission paths, minimizing delays and ensuring efficient communication


## Conclusion
Dijkstra's Algorithm is a crucial algorithm in graph theory, providing an efficient solution to a wide range of problems.  real-world challenges in network optimization, logistics, and beyond. This blog entry aimed at showcasing the crucial parts related to the implementation of the algorithm and how to use it in a toy prototype code. 


## PS 
I use [Compiler Explorer](https://godbolt.org/) to test and prototype code in C++. 

