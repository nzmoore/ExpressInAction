var capitalize = require("../capitalize");
var chai = require("chai");
var expect = chai.expect;

describe("capitalize", function () {

  it("capitalizes single words", function () {
    expect(capitalize("express")).to.equal("Express");
    expect(capitalize("cats")).to.equal("Cats");
  });

  it("leaves empty strings unchanged", function () {
    expect(capitalize("")).to.equal("");
  });

  it("makes the rest of the string lowercase", function () {
    expect(capitalize("javaScript")).to.equal("Javascript");
  });

  it("leaves strings with no words alone", function () {
    expect(capitalize("  ")).to.equal("  ");
    expect(capitalize("$#@*")).to.equal("$#@*");
    expect(capitalize("456")).to.equal("456");
  });

  it("capitalizes strings with multiple words", function () {
    expect(capitalize("does this work")).to.equal("Does this work");
    expect(capitalize("yes it Does")).to.equal("Yes it does");
  });

  it("leaves already capitalized words alone", function () {
    expect(capitalize("Yes")).to.equal("Yes");
    expect(capitalize("Hi")).to.equal("Hi");
  });

  it("capitalizes String objects without changing their value", function () {
    var str = new String("this is my test string");
    expect(capitalize(str)).to.equal("This is my test string");
    expect(str.valueOf()).to.equal("this is my test string");
  });

  it("throws an error if passed something other than a string", function () {
    expect(function () { capitalize(123); }).to.throw(Error);
    expect(function () { capitalize(); }).to.throw(Error);
  });

});
