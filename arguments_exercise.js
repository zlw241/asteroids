

function sum(...operands) {
  return operands.reduce((acc,el) => acc + el );
}

// console.log(sum(0,1,2,3,4,5));

Function.prototype.myBind = function(context, ...args1) {
  return (...args2) => {
    this.apply(context, args1.concat(args2));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}



const markov = new Cat("Markov");

const breakfast = new Cat("Breakfast");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
markov.says.myBind(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

function curriedSum(numArgs) {
  const numbers = [];
  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return numbers.reduce( (acc, el) => acc + el );
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

const summm = curriedSum(4);
console.log(summm(5)(30)(20)(1));

Function.prototype.curry1 = function(numArgs) {
  const args = [];
  const func = this;
  function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return func(...args);
    } else {
      return _curry;
    }
  }
  return _curry;
};


Function.prototype.curry2 = function(numArgs) {
  const args = [];
  const func = this;
  function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return func.apply({}, args);
    } else {
      return _curry;
    }
  }
  return _curry;
};



const sum4 = sum.curry2(3);

console.log(sum4(5)(4)(3));
