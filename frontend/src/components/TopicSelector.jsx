import React from "react";
import { useState, useEffect } from "react";

import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
import Select from 'react-select'

const TopicSelector = ({ handleTags, valueTags }) => {

    const options = [
        { value: 'Array', label: 'Array' },
        { value: 'String', label: 'String' },
        { value: 'Hash Table', label: 'Hash Table' },
        { value: 'Dynamic Programming', label: 'Dynamic Programming' },
        { value: 'Math', label: 'Math' },
        { value: 'Sorting', label: 'Sorting' },
        { value: 'Greedy', label: 'Greedy' },
        { value: 'Depth-First Search', label: 'Depth-First Search' },
        { value: 'Binary Search', label: 'Binary Search' },
        { value: 'Database', label: 'Database' },
        { value: 'Matrix', label: 'Matrix' },
        { value: 'Tree', label: 'Tree' },
        { value: 'Breadth-First Search', label: 'Breadth-First Search' },
        { value: 'Bit Manipulation', label: 'Bit Manipulation' },
        { value: 'Two Pointers', label: 'Two Pointers' },
        { value: 'Prefix Sum', label: 'Prefix Sum' },
        { value: 'Heap (Priority Queue)', label: 'Heap (Priority Queue)' },
        { value: 'Simulation', label: 'Simulation' },
        { value: 'Binary Tree', label: 'Binary Tree' },
        { value: 'Stack', label: 'Stack' },
        { value: 'Graph', label: 'Graph' },
        { value: 'Counting', label: 'Counting' },
        { value: 'Sliding Window', label: 'Sliding Window' },
        { value: 'Design', label: 'Design' },
        { value: 'Enumeration', label: 'Enumeration' },
        { value: 'Backtracking', label: 'Backtracking' },
        { value: 'Union Find', label: 'Union Find' },
        { value: 'Linked List', label: 'Linked List' },
        { value: 'Number Theory', label: 'Number Theory' },
        { value: 'Ordered Set', label: 'Ordered Set' },
        { value: 'Monotonic Stack', label: 'Monotonic Stack' },
        { value: 'Segment Tree', label: 'Segment Tree' },
        { value: 'Trie', label: 'Trie' },
        { value: 'Combinatorics', label: 'Combinatorics' },
        { value: 'Bitmask', label: 'Bitmask' },
        { value: 'Queue', label: 'Queue' },
        { value: 'Recursion', label: 'Recursion' },
        { value: 'Divide and Conquer', label: 'Divide and Conquer' },
        { value: 'Binary Indexed Tree', label: 'Binary Indexed Tree' },
        { value: 'Memoization', label: 'Memoization' },
        { value: 'Geometry', label: 'Geometry' },
        { value: 'Hash Function', label: 'Hash Function' },
        { value: 'Binary Search Tree', label: 'Binary Search Tree' },
        { value: 'String Matching', label: 'String Matching' },
        { value: 'Topological Sort', label: 'Topological Sort' },
        { value: 'Shortest Path', label: 'Shortest Path' },
        { value: 'Rolling Hash', label: 'Rolling Hash' },
        { value: 'Game Theory', label: 'Game Theory' },
        { value: 'Interactive', label: 'Interactive' },
        { value: 'Data Stream', label: 'Data Stream' },
        { value: 'Monotonic Queue', label: 'Monotonic Queue' },
        { value: 'Brainteaser', label: 'Brainteaser' },
        { value: 'Doubly-Linked List', label: 'Doubly-Linked List' },
        { value: 'Randomized', label: 'Randomized' },
        { value: 'Merge Sort', label: 'Merge Sort' },
        { value: 'Counting Sort', label: 'Counting Sort' },
        { value: 'Iterator', label: 'Iterator' },
        { value: 'Concurrency', label: 'Concurrency' },
        { value: 'Probability and Statistics', label: 'Probability and Statistics' },
        { value: 'Quickselect', label: 'Quickselect' },
        { value: 'Suffix Array', label: 'Suffix Array' },
        { value: 'Line Sweep', label: 'Line Sweep' },
        { value: 'Bucket Sort', label: 'Bucket Sort' },
        { value: 'Minimum Spanning Tree', label: 'Minimum Spanning Tree' },
        { value: 'Shell', label: 'Shell' },
        { value: 'Reservoir Sampling', label: 'Reservoir Sampling' },
        { value: 'Strongly Connected Component', label: 'Strongly Connected Component' },
        { value: 'Eulerian Circuit', label: 'Eulerian Circuit' },
        { value: 'Radix Sort', label: 'Radix Sort' },
        { value: 'Rejection Sampling', label: 'Rejection Sampling' },
        { value: 'Biconnected Component', label: 'Biconnected Component' }
      ];
      
    return (
        <div className = 'w-full'>

            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti = {true}
                onChange={handleTags}
                value = { valueTags }
                options = {options} className = 'text-zinc-800 min-w-65 w-[100%]'/>
       
        </div>
    )
}

export default TopicSelector;