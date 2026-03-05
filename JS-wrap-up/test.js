/**********************************************************************
 JAVASCRIPT RUNTIME NOTES
 Topics:
 - Call Stack
 - Web APIs / libuv
 - Task Queues
 - Event Loop
 - Microtasks vs Macrotasks
**********************************************************************/

/**********************************************************************
 1. CALL STACK
**********************************************************************/

/*
The Call Stack is where JavaScript executes code.

JavaScript is single-threaded, meaning it can execute only one
operation at a time.

Functions are pushed onto the stack when called and popped off
when they finish executing.

Example:
*/

function first() {
    second();
}

function second() {
    console.log("Hello");
}

first();

/*
Call stack flow:

Push first()
Push second()
Execute console.log
Pop second()
Pop first()
*/

/**********************************************************************
 2. WEB APIs (Browser) / libuv (Node.js)
**********************************************************************/

/*
JavaScript itself does NOT handle timers, HTTP requests, or DOM events.

These are handled by the runtime environment.

Browser → Web APIs
Node.js → libuv

Examples handled outside JS engine:

setTimeout
setInterval
fetch
DOM events
file system operations (Node)
*/

setTimeout(() => {
    console.log("Timer finished");
}, 1000);

/*
What happens internally:

1. setTimeout registered in Web API / libuv
2. Timer counts down outside JS engine
3. When finished → callback sent to Task Queue
*/

/**********************************************************************
 3. TASK QUEUES
**********************************************************************/

/*
There are TWO important queues.

1️⃣ Microtask Queue (HIGH priority)
2️⃣ Macrotask Queue (NORMAL priority)
*/

/*
MICROTASK QUEUE contains:

Promise.then()
Promise.catch()
Promise.finally()
queueMicrotask()
MutationObserver
async/await continuation
*/

/*
MACROTASK QUEUE contains:

setTimeout
setInterval
setImmediate (Node)
I/O callbacks
UI events
*/

/**********************************************************************
 4. EVENT LOOP
**********************************************************************/

/*
The Event Loop continuously checks:

1. Is Call Stack empty?
2. If yes → run Microtasks
3. If Microtasks empty → run one Macrotask
4. Repeat
*/

/*
Event loop cycle:

1. Run synchronous code
2. Empty microtask queue
3. Run one macrotask
4. Empty microtasks again
5. Repeat forever
*/

/**********************************************************************
 5. MICROTASK vs MACROTASK EXAMPLE
**********************************************************************/

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");

/*
Execution:

Sync code runs first:
Start
End

Microtasks run next:
Promise

Macrotasks run last:
Timeout

Final Output:

Start
End
Promise
Timeout
*/

/**********************************************************************
 6. PROMISE EXECUTOR BEHAVIOR
**********************************************************************/

/*
The Promise constructor runs synchronously.
Only .then() callbacks are asynchronous.
*/

new Promise((resolve) => {
    console.log("Executor running");
    resolve();
}).then(() => {
    console.log("Then callback");
});

console.log("After Promise");

/*
Output:

Executor running
After Promise
Then callback
*/

/**********************************************************************
 7. ASYNC / AWAIT BEHAVIOR
**********************************************************************/

/*
Async functions run synchronously until they hit 'await'.
After await, execution resumes in a microtask.
*/

async function test() {
    console.log("A");
    await Promise.resolve();
    console.log("B");
}

console.log("C");

test();

console.log("D");

/*
Output:

C
A
D
B
*/

/**********************************************************************
 8. GOLDEN EVENT LOOP RULE
**********************************************************************/

/*
Always remember:

1. Run synchronous code
2. Run ALL microtasks
3. Run ONE macrotask
4. Repeat
*/

/**********************************************************************
 END OF NOTES
**********************************************************************/
