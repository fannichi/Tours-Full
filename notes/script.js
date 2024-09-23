'use strict';
// const Person = function (firstName, birthYear) {
//   // instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // never do this, never create a method inside of a constructor function
//   //   this.calcAge = function () {
//   //     console.log(2023 - this.birth);
//   //   };
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   // instance properties
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName}, and I study ${this.course}`);
// };

// const mike = new Student('mike', 2020, 'computer Science');
// console.log(mike);

// mike.introduce();
// mike.calcAge();

// Student.prototype.constructor = Student;
// console.log(mike);
// console.log(mike.__proto__.__proto__.__proto__);
/*
// 1 - New {} is created
// 2 - function is called
// 3 - {} linked to prototype
// 4 - function automatically return {}
const youssef = new Person('Youssef', 1991);
console.log(youssef);
const matilda = new Person('Matilda', 2000);
console.log(youssef);
const garboz = new Person('Youssef', 2005);
console.log(garboz);
console.log(youssef instanceof Person);
// Prototypes
youssef.calcAge();
matilda.calcAge();
garboz.calcAge();
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();
*/

// Inheritance

// PersonCl.hey();

// const jessica = new PersonCl('Jessica Corazon', 1991);
// console.log(jessica.fullName);
// // jessica.calcAge();
// // jessica.greet();
// console.log(jessica.age);

// const account = {
//   owner: 'youssef',
//   movements: [100, 250, 6333, 9999999],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latest);
// account.latest = 50;
// console.log(account.movements);

// Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// console.log(steven);

// steven.name = 'Steven';
// steven.birthYear = 2005;

// steven.calcAge();

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 2002);

// console.log(sarah);
// sarah.calcAge();

// class CarCL {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     console.log((this.speed += 10));
//   }

//   brake() {
//     console.log((this.speed -= 5));
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new CarCL('ford', 120);

// console.log(ford);
// console.log(ford.speedUS);

// ford.accelerate();
// ford.accelerate();
// ford.brake();
// ford.accelerate();

// ford.speedUS = 50;
// console.log(ford.speedUS);

// # function constructor with inheritance example and polymorphism

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.brake = function () {
  this.speed -= 5;
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of 22%`
  );
};

const tesla = new EV('tesla', 120, 23);
tesla.chargeBattery(50);

tesla.accelerate();

console.log(tesla);

// # ES6 classes which are just synthetic sugar because behind the scenes, they are still function constructor based

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to the person prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hello my dear ${this.firstName}`);
  }

  // Set a property that already exists
  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there Zamel');
    console.log(this);
  }
}

class StudentCL extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always need to happen first
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName}, and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I am ${2037 - this.birthYear} years old, but I feel like i am ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

// // const martha = new StudentCL('Martha Jones', 2012);
// const martha = new StudentCL('Martha Jones', 2012, 'computer Science');
// martha.introduce();
// martha.calcAge();

// # OOP using the Object.create method

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName}, and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('JAY', 2020, 'computer Science');

jay.introduce();
jay.calcAge();

// # another OOP ES6 classes example
// Public field, Private fields, Public methods, and Private methods

// class Account {
//   // Public field on the instances not on the prototype (referenced by the this keyword0)
//   lacale = navigator.language;

//   // Private fields
//   // #movements = [];

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     // protected property
//     this._pin = pin;
//     this._movements = [];
//     // this.lacale = navigator.language;

//     console.log('Thank you for opening an account', this.owner);
//   }

//   // Public methods
//   getMovements() {
//     return this._movements;
//   }

//   deposit(val) {
//     this._movements.push(val);
//     return this;
//   }
//   withdraw(val) {
//     this.deposit(-val);
//     return this;
//   }

//   requestLoan(val) {
//     //   if (this.#approveLoan()) {
//     if (this._approveLoan()) {
//       this.deposit(val);
//       console.log(`Loan of ${val} was approved`);
//       return this;
//     }
//   }

//   // static function, see example above

//   // Private methods
//   //   #approveLoan(val) {
//   _approveLoan(val) {
//     return true;
//   }
// }

// const acc1 = new Account('Youssef', 'EUR', 1111);

// acc1.deposit(50);
// acc1.deposit(7000);
// acc1.deposit(1000);
// acc1.deposit(500000);
// acc1.withdraw(10);
// acc1.requestLoan(100000000);

// console.log(acc1.getMovements());

// // Chaining, happens when we return object from the methods that we want to chain
// acc1.deposit(500).deposit(1000).withdraw(400).requestLoan(200).withdraw(6000);
// console.log(acc1);

// # ES6 classes Practice

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     return this;
//   }
//   brake() {
//     this.speed -= 5;
//     return this;
//   }
// }

// class EVCl extends CarCl {
//   // #charge private property
//   constructor(make, speed, charge) {
//     super(make, speed);
//     this._charge = charge;
//   }

//   chargeBattery(charge) {
//     this._charge = charge;
//     return this;
//   }
//   accelerate() {
//     this.speed += 20;
//     this._charge--;
//     console.log(
//       `${this.make} goes at ${this.speed}, with a charge of ${this._charge}`
//     );
//     return this;
//   }
// }

// const rivian = new EVCl('Rivian', 120, 23);

// console.log(rivian);
// rivian.accelerate();
// rivian.accelerate().brake().chargeBattery(100);

// console.log(rivian);

// Redoing course to consolidate knowledge

//$/////////////////////////////////////
//$/////////////////////////////////////
//$/////////////////////////////////////
//////// constructor functions:\\\\\\\\\
//$/////////////////////////////////////
//$/////////////////////////////////////
//$/////////////////////////////////////
/*
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function (birthYear) {
  console.log(2037 - this.birthYear);
};

// when the constructor function is called "using the NEW keyword", the next happens
//. 1 - A new empty object is created - empty
//. 2 - function is called, the "this" key word is set to the new object - empty
//. 3 - the object is linked to its prototype (Person.prototype) - empty
//. 4 - the object is automatically returned - filled
const youssef = new Person('Youssef', 1991);
console.log(youssef);

const matilda = new Person('Matilda', 2006);
const jack = new Person('Jack', 2002);

console.log(matilda);
console.log(jack);

console.log(youssef instanceof Person);
youssef.calcAge();
matilda.calcAge();
jack.calcAge();

// Prototypes

console.log(youssef.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(youssef));
console.log(Person.prototype.__proto__);
console.log(Object.prototype);

// We can set not only methods on prototype, but also properties

// Prototypal inheritance and the prototypal chain

console.log(Person.prototype);

//~ /. Coding challenge 1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

mercedes.accelerate();
mercedes.accelerate();
mercedes.brake();
mercedes.accelerate();

//@/////////////////////////////////////
//@/////////////////////////////////////
//@/////////////////////////////////////
////////////// ES6 Classes:\\\\\\\\\\\\\
//@/////////////////////////////////////
//@/////////////////////////////////////
//@/////////////////////////////////////

// Classes are not hoisted even with class declaration.
// Classes body always use strict mode.
// Classes are first class citizens

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to . prototype property of PersonCl also called //$ INSTANCE METHODS

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists, setters are used as data validations
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert('Invalid full name');
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there, thank you for creating an account');
    console.log(this);
  }
}

const garboz = new PersonCl('garboz garboz', 1996);
console.log(garboz);
garboz.calcAge();

garboz.greet();

const walter = new PersonCl('walter sriwliw', 1995);

const account = {
  owner: 'youssef',
  movements: [200, 11, 450, 25],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    return this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 5000000;
console.log(account.latest);

console.log(garboz.age);

console.log(parseFloat('3.12x'));
PersonCl.hey();

//^/////////////////////////////////////
//^/////////////////////////////////////
//^/////////////////////////////////////
//////////// Object.create:\\\\\\\\\\\\\
//^/////////////////////////////////////
//^/////////////////////////////////////
//^/////////////////////////////////////

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

steven.name = 'Steven';
steven.birthYear = 1992;

steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2005);
sarah.calcAge();

//~ /. Coding challenge 2

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going ${this.speed} km/h`);
  }

  brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is going ${this.speed} km/h`);
  };

  get speedUS() {
    return this.speed / 1.61;
  }

  set speedUS(speedUS) {
    this.speed = speedUS * 1.61;
  }
}

const ford = new CarCl('ford', 120);

ford.accelerate();
ford.accelerate();
ford.brake();
ford.accelerate();

ford.accelerate();
ford.accelerate();
ford.brake();
ford.accelerate();

console.log('Always Initial Speed ======>', ford.speed);
console.log('Speed US ======> ', ford.speedUS);
console.log('Always Initial Speed ======>', ford.speed);
ford.speedUS = 200;
console.log('New Speed US ======> ', ford.speed);
console.log('New Speed US ======> ', ford.speedUS);

// Practice with Object.create()

const CarProto = {
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going ${this.speed} km/h`);
  },
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going ${this.speed} km/h`);
  },

  init(make, speed) {
    this.make = make;
    this.speed = speed;
  },

  get speedUS() {
    return this.speed / 1.6;
  },

  set speedUS(speed) {
    this.speed = this.speed * 1.6;
  },
};

const chevy = Object.create(CarProto);
chevy.init('chevrolet SS', 310);
console.log(chevy);

chevy.accelerate();
chevy.accelerate();
chevy.brake();
chevy.accelerate();

chevy.accelerate();
chevy.accelerate();
chevy.brake();
chevy.accelerate();

console.log('Always Initial Speed ======>', chevy.speed);
console.log('Speed US ======> ', chevy.speedUS);
console.log('Always Initial Speed ======>', chevy.speed);
chevy.speedUS = 200;
console.log('New Speed US ======> ', chevy.speed);
console.log('New Speed US ======> ', chevy.speed);
*/

//$ Inheritance using the constructor function

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };
// // Linking prototype
// Student.prototype = Object.create(Person.prototype);
// Student.prototype.constructor = Student;

// Student.prototype.introduce = function () {
//   console.log(`Hi my name is ${this.firstName} and I study ${this.course} `);
// };
// const mike = new Student('Mike', 2002, 'CS');
// mike.introduce();

// console.log(mike.__proto__);
// mike.calcAge();

// Practice with Car class and inheritance

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV;

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} is going at ${this.speed} KM/H with a charge of ${this.charge}`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);

// tesla.accelerate();
// tesla.chargeBattery(90);
// tesla.accelerate();

//$ Inheritance using ES6 Classes

// class PersonCL {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.firstName}`);
//   }
//   introduce() {
//     console.log(
//       `Hey, my name is ${this.firstName}, I am ${
//         new Date().getFullYear() - this.birthYear
//       } old, I study ${this.course}`
//     );
//   }
// }

// class StudentCl extends PersonCL {
//   constructor(firstName, birthYear, course) {
//     super(firstName, birthYear);
//     this.course = course;
//   }
// }

// const marica = new StudentCl('Marica', 1991, 'CS');
// marica.introduce();
// marica.calcAge();

//$ Inheritance using Object.create()
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName}, and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'CS');
jay.calcAge();
jay.introduce();
*/

// ANOTHER ES6 CLASSES EXAMPLE

// class Account {
//   // ^ 1 - public fields
//   // Public field OR Public instance field because they will be on all instances created
//   // from this class
//   locale = navigator.language;

//   // ^ 2 - Private fields

//   #movements = [];
//   #pin;
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     // protected property
//     this.#pin = pin;
//     // this.#movements = [];
//     // this.locale = navigator.language;

//     console.log(`Thank you for opening an account ${this.owner}`);
//   }

//   // Public interface / created using // ^ Public methods
//   getMovements() {
//     return this.#movements;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//     return this;
//   }

//   withdraw(val) {
//     this.deposit(-val);
//     return this;
//   }
//   _approveLoan(val) {
//     return true;
//   }
//   requestLoan(val) {
//     if (this._approveLoan(val)) {
//       this.deposit(val);
//       console.log(`Your loan for ${val} was approved`);
//     }
//     return this;
//   }

//   // ^ private methods
//   // protected method, Private method
//   // #approveLoan(val) {
//   //   return true;
//   // }

//   //^ static methods

//   static helper() {
//     console.log('I am a static method');
//   }
// }

// const acc1 = new Account('Mohammed za3rati', 'EUR', 1111);

// acc1.deposit(230000000);
// acc1.withdraw(50);

// console.log(acc1);

// acc1.requestLoan(12500000);
// console.log(acc1.getMovements());

// // console.log(acc1.#movements);
// // console.log(acc1.#pin);
// // console.log(acc1.#approveLoan(5000));

// Account.helper();

// acc1.deposit(500).deposit(400).requestLoan(230000).withdraw(900000);

//~ Coding challenge 4
/*
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going ${this.speed} km/h`);
    return this;
  }
}

class EV extends Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `The ${this.make} is going at ${this.speed}, with a ${
        this.#charge
      }% battery!`
    );
    return this;
  }
}

const rivian = new EV('Rivian', 100, 23);
rivian.accelerate().brake().chargeBattery(90).accelerate();
*/
