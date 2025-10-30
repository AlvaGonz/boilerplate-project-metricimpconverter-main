const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('Read a whole number input', function() {
    assert.strictEqual(convertHandler.getNum('32L'), 32);
  });

  test('Read a decimal number input', function() {
    assert.strictEqual(convertHandler.getNum('3.2mi'), 3.2);
  });

  test('Read a fractional input', function() {
    assert.strictEqual(convertHandler.getNum('1/2km'), 0.5);
  });

  test('Read a fractional input with a decimal', function() {
    assert.approximately(convertHandler.getNum('2.5/5kg'), 0.5, 0.00001);
  });

  test('Error on a double-fraction (3/2/3)', function() {
    assert.strictEqual(convertHandler.getNum('3/2/3lbs'), 'invalid number');
  });

  test('Default numerical input of 1 when no number provided', function() {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  test('Read each valid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('32L'), 'L');
    assert.strictEqual(convertHandler.getUnit('32l'), 'L');
    assert.strictEqual(convertHandler.getUnit('32gal'), 'gal');
    assert.strictEqual(convertHandler.getUnit('32mi'), 'mi');
    assert.strictEqual(convertHandler.getUnit('32km'), 'km');
    assert.strictEqual(convertHandler.getUnit('32lbs'), 'lbs');
    assert.strictEqual(convertHandler.getUnit('32kg'), 'kg');
  });

  test('Error for an invalid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('Return the correct return unit for each valid input unit', function() {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('Spelled-out string unit for each valid input unit', function() {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('Convert gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  test('Convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
  });

  test('Convert mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  test('Convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
  });

  test('Convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001);
  });

  test('Convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
  });
});