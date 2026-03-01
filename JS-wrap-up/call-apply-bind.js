"use strict";

/*
====================================================
                JAVASCRIPT NOTES
        this | call | apply | bind
====================================================
*/

/*
====================================================
1️⃣ WHAT IS `this`?
====================================================

Rule:
this is a runtime binding that represents the execution context of a function.
`this` is determined by HOW a function is called,
not where it is written.
*/


/*
====================================================
2️⃣ DIFFERENT `this` BEHAVIOR
====================================================
*/


/*
-----------------------------
2.1 Global Scope
-----------------------------
*/

console.log("Global this:", this);
// In browser → window
// In Node (module) → {}


/*
-----------------------------
2.2 Normal Function Call
-----------------------------
*/

function normalFunction() {
  console.log("Normal function this:", this);
}

normalFunction();
// In strict mode → undefined


/*
-----------------------------
2.3 Object Method Call
-----------------------------
*/

const user = {
  name: "Zara",
  greet() {
    console.log("Method call:", this.name);
  }
};

user.greet(); // Zara

/*
Rule:
object.method() → this = object
*/


/*
-----------------------------
2.4 Extracted Method (Trap)
-----------------------------
*/

const extracted = user.greet;
extracted(); // undefined

/*
Because now it’s a plain function call.
this is lost.
*/


/*
====================================================
3️⃣ call()
====================================================

Definition:
Immediately invokes function
with a specific `this`.
*/

function introduce(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: "Alice" };

introduce.call(person, "Hello"); 
// Hello, Alice

/*
Syntax:
func.call(thisArg, arg1, arg2)
*/


/*
====================================================
4️⃣ apply()
====================================================

Same as call, but arguments are passed as an array.
*/

introduce.apply(person, ["Hi"]);
// Hi, Alice

/*
Syntax:
func.apply(thisArg, [arg1, arg2])
*/


/*
Real-world example:
Using Math.max with an array
*/

const numbers = [5, 34, 12];

console.log(
  "Max using apply:",
  Math.max.apply(null, numbers)
);

/*
Modern alternative (recommended):
*/

console.log(
  "Max using spread:",
  Math.max(...numbers)
);


/*
====================================================
5️⃣ bind()
====================================================

Definition:
Returns a NEW function
with permanently bound `this`.
Does NOT execute immediately.
*/

function show() {
  console.log(this.name);
}

const user1 = { name: "Zara" };
const user2 = { name: "Alex" };

const bound = show.bind(user1);

bound(); // Zara

// Even if we try to override:
bound.call(user2); // Zara

/*
bind locks `this`.
*/


/*
----------------------------------------------------
5.1 Partial Application with bind
----------------------------------------------------
*/

function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

console.log("Double 5:", double(5)); // 10


/*
====================================================
6️⃣ Arrow Functions and `this`
====================================================

Arrow functions:
- DO NOT have their own `this`
- Capture `this` from lexical scope
- Cannot be changed using call/apply/bind
*/


/*
-----------------------------
6.1 Arrow inside Method
-----------------------------
*/

const userArrow = {
  name: "Zara",
  greet() {
    const inner = () => {
      console.log("Arrow inside method:", this.name);
    };
    inner();
  }
};

userArrow.greet(); // Zara


/*
-----------------------------
6.2 Arrow as Method (Avoid)
-----------------------------
*/

const wrong = {
  name: "Zara",
  greet: () => {
    console.log("Arrow as method:", this.name);
  }
};

wrong.greet(); 
// undefined (because arrow got global this)


/*
====================================================
7️⃣ bind + Arrow Interaction
====================================================
*/

const userBindTest = {
  name: "Zara",
  greet() {
    const inner = () => {
      console.log("Bind test:", this.name);
    };
    return inner;
  }
};

const fn = userBindTest.greet.bind({ name: "Alex" })();
fn(); 
// Alex

/*
Explanation:
bind changes `this` of greet.
Arrow captures that value at creation.
*/


/*
====================================================
8️⃣ new vs bind
====================================================

Important:
`new` overrides bind.
*/

function Person(name) {
  this.name = name;
}

const BoundPerson = Person.bind({ name: "Fake" });

const p = new BoundPerson("Real");

console.log("new beats bind:", p.name);
// Real


/*
====================================================
FINAL SUMMARY
====================================================

Normal Function:
- `this` determined at call time

call():
- Executes immediately
- Sets `this`
- Arguments passed normally

apply():
- Executes immediately
- Sets `this`
- Arguments passed as array

bind():
- Returns new function
- Permanently sets `this`
- Supports partial application

Arrow Functions:
- No own `this`
- Capture lexical `this`
- Cannot be changed by call/apply/bind
- Great for callbacks
- Avoid as object methods
*/