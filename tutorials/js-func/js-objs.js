'use strict';

function Animal(name) {
  this.name = name;
}
Animal.prototype.sayHi = function() {
  console.log(this.name + " says hi!");
}

function logFunction(func) {
  console.group("Start");
  func("here");
  console.groupEnd();
}

function innerTestLog() {
  var name = "test";
  return function(x) {
    console.log(name);
  };
}

function testLogFunction() {
  var f = innerTestLog();
  logFunction(f);
}


function sayHiFred() {
  var dog = new Animal('fred');
  dog.sayHi();
}

function testException() {
  try {
    console.log('Start Exception');
    throw Error('msg');
  } catch (ex) {
    console.log('In catch');
    console.log(ex);
  } finally {
    console.log('In Finally');
  }
}
