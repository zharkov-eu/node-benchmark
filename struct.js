"use strict";

const benchmark = require("benchmark");

function intialization() {
  const COUNT = 1000000;
  const suite = new benchmark.Suite;
  console.log("STRUCTURE INITIALIZTATION WITH " + COUNT + " ELEMENTS");

  suite
  .add("Array", () => {
    const array = [];
    for (let i = 0; i < COUNT; i++) array.push(i);
  })
  .add("HashMap", () => {
    const hashMap = {};
    for (let i = 0; i < COUNT; i++) hashMap[i] = true;
  })
  .add("Map", () => {
    const map = new Map();
    for (let i = 0; i < COUNT; i++) map.set(i, true);
  })
  .add("Set", () => {
    const set = new Set();
    for (let i = 0; i < COUNT; i++) set.add(i);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();    
};

function find() {
  const COUNT = 1000000;
  const suite = new benchmark.Suite;
  console.log("STRUCTURE ELEMENT FINDING WITH " + COUNT + " ELEMENTS");

  const array = [];
  const hashMap = {};
  const map = new Map();
  const set = new Set();
  for (let i = 0; i < COUNT; i++) {
    array.push(i);
    hashMap[i] = true;
    map.set(i, true);
    set.add(i);
  }

  suite
  .add("array.indexOf(1)", () => array.indexOf(1) !== -1)
  .add("array.indexOf(COUNT - 1)", () => array.indexOf(COUNT - 1) !== -1)
  .add("hashMap[]", () => typeof hashMap[COUNT - 1] !== "undefined")
  .add("map.has()", () => map.has(COUNT - 1) === true)
  .add("set.has()", () => set.has(COUNT - 1) === true)
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();
}

function iterate() {
  const COUNT = 1000000;
  const suite = new benchmark.Suite;
  console.log("STRUCTURE ELEMENT ITERATION WITH " + COUNT + " ELEMENTS");

  const array = [];
  const hashMap = {};
  const map = new Map();
  const set = new Set();
  for (let i = 0; i < COUNT; i++) {
    array.push(i);
    hashMap[i] = true;
    map.set(i, true);
    set.add(i);
  }

  suite
  .add("Array for-of", () => {
    let value;
    for (const i of array) value += i;
  })
  .add("HashMap for-of", () => {
    let value;
    for (const key of Object.keys(hashMap)) value += hashMap[key];
  })
  .add("Map for-of", () => {
    let value;
    for (const i of map.values()) value += i;
  })
  .add("Set for-of", () => {
    let value;
    for (const i of set.values()) value += i;
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();
}

switch (process.argv[2]) {
  case "init":
    return intialization();
  case "find":
    return find();
  case "iterate":
    return iterate();
  default:
    console.log("Argument not recognized");
}