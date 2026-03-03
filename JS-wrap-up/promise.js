/*
====================================================
Goal: Understand Promises deeply, not memorize them.
====================================================
*/


/*
====================================================
1️⃣ WHAT IS A PROMISE?
====================================================

A Promise is an object representing the eventual
completion (or failure) of an asynchronous operation.

States:
- pending
- fulfilled
- rejected

Important:
The executor runs synchronously.
.then() runs asynchronously (microtask queue).
*/


// Example:
let examplePromise = new Promise((resolve, reject) => {
  console.log("Executor runs immediately");
  resolve("Done");
});

examplePromise.then(result => {
  console.log("Runs later:", result);
});

console.log("Synchronous code runs first");


/*
Expected output:
Executor runs immediately
Synchronous code runs first
Runs later: Done
*/


/*
====================================================
2️⃣ MICROTASK vs MACROTASK
====================================================

Execution order:

1. Synchronous code
2. Microtasks (Promise.then)
3. Macrotasks (setTimeout)

Promise.then() -> Microtask queue
setTimeout() -> Macrotask queue
*/


console.log("Start");

setTimeout(() => console.log("Timeout (Macrotask)"), 0);

Promise.resolve().then(() => {
  console.log("Promise (Microtask)");
});

console.log("End");

/*
Expected:
Start
End
Promise (Microtask)
Timeout (Macrotask)
*/


/*
====================================================
3️⃣ BASIC PROMISE CREATION
====================================================
*/


function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Finished after " + ms + "ms");
    }, ms);
  });
}

// Usage:
// delay(2000).then(console.log);



/*
====================================================
4️⃣ PROMISE CHAINING
====================================================

Golden Rule:
Always return inside .then() when chaining.
*/


function doubleAfter1Second(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * 2);
    }, 1000);
  });
}


doubleAfter1Second(5)
  .then(result => {
    return doubleAfter1Second(result);
  })
  .then(result => {
    console.log("Final Result:", result);
  });

/*
Expected:
Final Result: 20
*/


/*
====================================================
5️⃣ ERROR HANDLING
====================================================

Throwing inside .then() automatically rejects.
Errors travel down the chain until caught.
*/


Promise.resolve(10)
  .then(value => {
    throw new Error("Something broke");
  })
  .catch(error => {
    console.log("Caught error:", error.message);
  });


/*
====================================================
6️⃣ Promise.all()
====================================================

- Resolves when ALL promises resolve
- Rejects immediately if ANY promise rejects
*/


let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(values => {
    console.log("All resolved:", values);
  });


/*
====================================================
7️⃣ BUILD YOUR OWN Promise.all (Basic Version)
====================================================
*/


function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      promise
        .then(value => {
          results[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}


/*
====================================================
8️⃣ IMPORTANT RULES TO REMEMBER
====================================================

✔ The Promise executor runs immediately.
✔ .then() callbacks run in the microtask queue.
✔ Always return inside .then() when chaining.
✔ Throwing inside .then() = automatic rejection.
✔ Promise chains flatten automatically.
✔ Promise.all fails fast.
✔ async/await is just syntactic sugar over promises.

====================================================
END OF DAY 1
====================================================
*/


/*
Tomorrow:
- async/await deep dive
- Event loop internals
- Build a mini Promise implementation (advanced)
*/