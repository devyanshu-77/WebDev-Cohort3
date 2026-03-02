"use strict";

/*
========================================
        NEW KEYWORD – COMPLETE NOTES
========================================
*/

/*
----------------------------------------
1) What does `new` actually do?
----------------------------------------

When you write:

    const obj = new Constructor(arg1, arg2);

JavaScript internally does 4 steps:

1. Creates a new empty object.
2. Links that object to Constructor.prototype.
3. Binds `this` inside Constructor to the new object.
4. Returns the object (unless constructor returns another object).
*/


/*
----------------------------------------
2) Simple Constructor Example
----------------------------------------
*/

function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.greet = function () {
  console.log(`Hi, I am ${this.name}`);
};

const user1 = new User("John", 25);
const user2 = new User("Alice", 20);

user1.greet();
user2.greet();

// Prototype methods are shared:
console.log(user1.greet === user2.greet); 
// true (same function reference from prototype)


/*
----------------------------------------
3) What happens WITHOUT `new`?
----------------------------------------
*/

function Car(brand) {
  this.brand = brand;
}

// In strict mode:
// const c1 = Car("TATA"); 
// ❌ TypeError: Cannot set properties of undefined

// Because:
// - No object is created
// - `this` is undefined in strict mode


/*
----------------------------------------
4) Return Override Rule
----------------------------------------
*/

// Case 1: Returning object
function Test1() {
  this.name = "Real Object";
  return { name: "Fake Object" };
}

const t1 = new Test1();
console.log(t1.name); 
// "Fake Object" (returned object overrides)

// Case 2: Returning primitive
function Test2() {
  this.name = "Real Object";
  return 5;
}

const t2 = new Test2();
console.log(t2.name); 
// "Real Object" (primitive ignored)


/*
----------------------------------------
5) Prototype Chain Check
----------------------------------------
*/

function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log("Hi");
};

const p1 = new Person("Aman");

p1.sayHi(); // Works via prototype chain

console.log(p1.__proto__ === Person.prototype); 
// true


/*
----------------------------------------
6) instanceof Rule
----------------------------------------

p instanceof Person

Checks:
Is Person.prototype in p's prototype chain?
*/

console.log(p1 instanceof Person); 
// true


/*
----------------------------------------
7) Manual Implementation of `new`
----------------------------------------
*/

function myNew(constructor, ...args) {
  // Step 1 + 2: Create object linked to prototype
  const obj = Object.create(constructor.prototype);

  // Step 3: Call constructor with correct `this`
  const result = constructor.apply(obj, args);

  // Step 4: Return logic
  if (result !== null && typeof result === "object") {
    return result;
  }

  return obj;
}


/*
----------------------------------------
8) Testing custom myNew
----------------------------------------
*/

function Animal(type) {
  this.type = type;
}

Animal.prototype.sound = function () {
  console.log(`This is a ${this.type}`);
};

const a1 = myNew(Animal, "Dog");

a1.sound();
console.log(a1 instanceof Animal); 
// true


/*
----------------------------------------
9) Why Arrow Functions Cannot Be Used With `new`
----------------------------------------

Arrow functions:
- Do NOT have their own `this`
- Do NOT have `prototype`
- Do NOT have [[Construct]]

Example:

const Test = () => {};
new Test(); // ❌ TypeError

*/


/*
========================================
        End of Notes
========================================

Key Mental Model:

new =
1. Create object
2. Link prototype
3. Bind this
4. Return object properly

If you remember these 4 steps,
you understand how object construction works in JS.
*/