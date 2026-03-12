---
title: TEST
date: 2077-01-01
category: TECH

---

## Introduction

JavaScript is a single-threaded language — yet it handles asynchronous operations, responds to user events, and fires off network requests all at once. Behind all of this lies one core mechanism: **the Event Loop**.

Understanding the Event Loop not only helps you write more efficient code, but also saves you from tearing your hair out when execution order doesn't behave the way you expect.

---

## 1. The Call Stack

The JavaScript engine uses a **call stack** to track function execution. Every time a function is called, it gets pushed onto the top of the stack. When it finishes, it's popped off.

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

function main() {
  greet('World');
  console.log('Done');
}

main();
```

Execution order:

1. `main()` is pushed onto the stack
2. `greet('World')` is pushed → executes → popped
3. `console.log('Done')` is pushed → executes → popped
4. `main()` is popped

---

## 2. Macrotasks vs. Microtasks

Asynchronous tasks are divided into two categories, each with different priority levels.

### Macrotasks

Common macrotasks include:

- `setTimeout`
- `setInterval`
- `setImmediate` (Node.js)
- I/O operations
- UI rendering

### Microtasks

Common microtasks include:

- `Promise.then / catch / finally`
- `queueMicrotask`
- `MutationObserver`

### The Golden Rule

> **After every macrotask completes, the engine drains the entire microtask queue before moving on to the next macrotask.**

---

## 3. Classic Interview Question Walkthrough

Here's a snippet that trips up even experienced developers:

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => console.log('5'), 0);
});

console.log('6');
```

**What do you think the output order is?**

<details>
<summary>Click to reveal the answer</summary>

```
1
6
4
2
3
5
```

**Step-by-step breakdown:**

1. `console.log('1')` → synchronous, executes immediately
2. `setTimeout(...)` → registers macrotask T1
3. `Promise.resolve().then(...)` → registers microtask M1
4. `console.log('6')` → synchronous, executes immediately
5. Synchronous code is done — drain the microtask queue:
   - Execute M1 → logs `4`, registers macrotask T2
6. Microtask queue is empty — execute next macrotask T1:
   - Logs `2`, registers microtask M2
7. Drain microtask queue: execute M2 → logs `3`
8. Execute macrotask T2 → logs `5`

</details>

---

## 4. The Event Loop in Node.js

Node.js has a more complex event loop than the browser, broken into distinct phases:

```
   ┌───────────────────────────┐
┌─>│           timers          │  ← setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │  ← I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  ← setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

One important caveat: `process.nextTick` has **higher priority** than all microtasks in Node.js — it runs immediately after the current operation completes, before any Promise callbacks.

---

## 5. Practical Tips for Real-World Development

### ✅ Avoid Blocking the Main Thread

```javascript
// ❌ Bad: synchronously crunching a huge dataset
function heavyCompute() {
  let result = 0;
  for (let i = 0; i < 1e9; i++) result += i;
  return result;
}

// ✅ Better: chunk the work using setTimeout, or offload to a Web Worker
function chunkedCompute(total, chunkSize, callback) {
  let result = 0, i = 0;
  function step() {
    const end = Math.min(i + chunkSize, total);
    for (; i < end; i++) result += i;
    if (i < total) setTimeout(step, 0);
    else callback(result);
  }
  step();
}
```

### ✅ Keep Promise Chains Clean with async/await

```javascript
// Avoid deeply nested callbacks — use async/await for clarity
async function fetchUserData(userId) {
  try {
    const user = await fetch(`/api/users/${userId}`).then(r => r.json());
    const posts = await fetch(`/api/posts?userId=${userId}`).then(r => r.json());
    return { user, posts };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
```

### ✅ Understand the Difference Between setTimeout(fn, 0) and queueMicrotask

```javascript
// setTimeout(fn, 0) schedules a macrotask — other microtasks run first
setTimeout(() => console.log('macrotask'), 0);

// queueMicrotask schedules a microtask — runs before the next macrotask
queueMicrotask(() => console.log('microtask'));

// Output:
// microtask
// macrotask
```

---

## 6. Summary

| Concept | When It Runs | Common APIs |
|---------|-------------|-------------|
| Synchronous code | Immediately | Regular function calls |
| Microtasks | Right after the current macrotask | `Promise.then`, `queueMicrotask` |
| Macrotasks | After the microtask queue is empty | `setTimeout`, `setInterval` |
| nextTick | Before microtasks (Node.js only) | `process.nextTick` |

The Event Loop is the backbone of asynchronous JavaScript. Once you understand how it works, you can accurately predict execution order and write programs that are both more robust and more performant.

---

## Further Reading

- [MDN – The Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [Node.js Docs – The Node.js Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
- [Jake Archibald – Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

---

*Have questions or feedback? Feel free to leave a comment below.*