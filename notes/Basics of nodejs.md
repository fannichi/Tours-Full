// Node.Js course lecture notes:

# NODE.JS Libraries and Frameworks

- **Google V8 Engine**: A dependency for Node.js to understand JavaScript code that we write. Converts JavaScript code into machine code that a computer can understand. Written in C++ and JavaScript.
- **Libuv**: A multi-platform support library with a focus on asynchronous I/O. It was primarily developed for use by Node.js but is also used by other software projects. It gives Node.js access to the underlying computer file system, file system, and networking. It also provides Node.js with an event loop and thread pool. Written entirely in C++.
- **http-parser**, **c-ares**, **openSSL**, **zlib**

---

# Node.js Process

An instance of a program in execution on a computer, which operates on a single thread (sequence of instructions) that happens in a few steps:

1. Initialize program
2. Execution of top-level code
3. Requiring modules
4. Register event callbacks
5. Start event loop (thread pool with 4 threads up to 128)

The event loop offloads long-running tasks to the thread pool for tasks like cryptography, I/O, file system operations, compression, DNS lookups, etc.

## Event Loop

The heart of the Node.js architecture making asynchronous operations possible. It is where all code that is not top-level code is executed, such as code inside functions and callbacks. It orchestrates running the code.

At the start of the event loop, it will do the following in order:

1. **Timers**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
2. **Pending Callbacks**: Executes I/O callbacks deferred to the next loop iteration.
3. **Poll**: Retrieves new I/O events; executes I/O-related callbacks (excluding close callbacks, timers, and `setImmediate()`).
4. **Check**: Executes callbacks scheduled by `setImmediate()`.
5. **Close Callbacks**: Executes close event callbacks, e.g., `socket.on('close', ...)`.

There are two other queues that have priority over the six steps above: the microtask queue and the `process.nextTick` queue for resolved promises.

To change the thread pool size, set the environment variable: `process.env.UV_THREADPOOL_SIZE`.

---

# Node.js Modules

Each JavaScript file in Node.js is treated as a separate module.

Node.js uses the CommonJS module system: `require()`, `exports`, or `module.exports`.

The ES module system is used in the browser: `import/export`.

Requiring a module happens in five steps:

1. Resolving & loading
2. Wrapping
3. Execution
4. Returning exports
5. Caching

---

Express is a minimal nodejs framework that is build on top of node.js as a higher level of abstraction , it is the most popular nodejs framework. It makes it easy to organize our application into the mvc structure.
