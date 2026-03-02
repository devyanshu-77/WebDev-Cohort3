/**********************************************************************
 JS PROTOTYPES – FINAL REVISION NOTES
**********************************************************************/

/*
==============================================================
1) EVERY OBJECT HAS A HIDDEN [[Prototype]]
==============================================================

When you access a property:

1. JS checks the object itself.
2. If not found → it checks the object's prototype.
3. Then prototype’s prototype.
4. Continues until null.

This is called the PROTOTYPE CHAIN.
*/

const animal = { eats: true };
const dog = Object.create(animal);

dog.barks = true;

dog.eats;   // true (from prototype)
dog.barks;  // true (own property)


/*
Prototype Chain Example:

dog → animal → Object.prototype → null
*/


/*
==============================================================
2) SHADOWING
==============================================================

If an object has its own property,
it overrides (shadows) the prototype property.
*/

const rabbit = Object.create(animal);

rabbit.eats = false;   // shadows animal.eats

rabbit.eats;  // false (own property)

delete rabbit.eats;

rabbit.eats;  // true (falls back to prototype)


/*
==============================================================
3) CONSTRUCTOR FUNCTIONS + new
==============================================================

When using "new":

1. Creates empty object {}
2. Sets its [[Prototype]] to Constructor.prototype
3. Calls constructor with "this" = new object
4. Returns that object
*/

function User(name) {
    this.name = name;
}

User.prototype.sayHi = function () {
    console.log("Hi " + this.name);
};

const u1 = new User("John");
const u2 = new User("Alice");

u1.sayHi === u2.sayHi; // true
// Because method is shared on prototype


/*
==============================================================
4) INSTANCE METHOD VS PROTOTYPE METHOD
==============================================================

BAD (method recreated for every instance):
*/

function BadUser(name) {
    this.name = name;
    this.sayHi = function () {
        console.log("Hi " + this.name);
    };
}

const b1 = new BadUser("A");
const b2 = new BadUser("B");

b1.sayHi === b2.sayHi; // false (different functions in memory)

/*
Why bad?
- Wastes memory
- Defeats purpose of prototypes
*/


/*
==============================================================
5) .prototype vs [[Prototype]]
==============================================================

- .prototype → property of constructor functions
- [[Prototype]] → internal link of objects

When you do:

new User()

The object's [[Prototype]] becomes:
User.prototype
*/


/*
==============================================================
6) hasOwnProperty
==============================================================

Checks ONLY own properties.
*/

rabbit.hasOwnProperty("eats");  // false
rabbit.hasOwnProperty("barks"); // depends if defined directly


/*
==============================================================
7) REPLACING .prototype DANGER
==============================================================

If you replace the entire prototype object:

function Rabbit() {}

Rabbit.prototype = {
    eats: true
};

You REMOVE the default constructor property.

Default prototype normally looks like:
{
    constructor: Rabbit
}

If you overwrite it,
you must manually restore:

Rabbit.prototype.constructor = Rabbit;
*/


/*
==============================================================
8) CORRECT INHERITANCE BETWEEN CONSTRUCTORS
==============================================================

WRONG:
Dog.prototype = Animal.prototype; // both share same object

CORRECT:
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

This creates:

dogInstance
   → Dog.prototype
      → Animal.prototype
         → Object.prototype
            → null
*/


/*
==============================================================
9) ES6 CLASS (JUST SYNTACTIC SUGAR)
==============================================================

class Car {
    constructor(brand, speed) {
        this.brand = brand;
        this.speed = speed;
    }

    accelerate(amount) {
        this.speed += amount;
    }
}

Internally:

Car.prototype.accelerate = function() {...}

Class methods are stored on:
Car.prototype
*/


/*
==============================================================
MENTAL MODEL SUMMARY
==============================================================

✔ Every object has a prototype link.
✔ Property lookup climbs upward.
✔ Methods should live on prototypes.
✔ new connects instance to Constructor.prototype.
✔ Replacing .prototype removes constructor.
✔ Inheritance must use Object.create.
✔ class is just cleaner syntax for prototypes.

If you understand this file deeply,
you understand 80% of JS object system.
*/