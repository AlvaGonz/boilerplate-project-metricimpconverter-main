'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = (req.query.input || '').toString();
    const num = convertHandler.getNum(input);
    const unit = convertHandler.getUnit(input);

    const numInvalid = num === 'invalid number';
    const unitInvalid = unit === 'invalid unit';

    if (numInvalid && unitInvalid) {
      return res.send('invalid number and unit');
    }
    if (numInvalid) {
      return res.send('invalid number');
    }
    if (unitInvalid) {
      return res.send('invalid unit');
    }

    const returnUnit = convertHandler.getReturnUnit(unit);
    const returnNum = convertHandler.convert(num, unit);
    const string = convertHandler.getString(num, unit, returnNum, returnUnit);

    return res.json({
      initNum: num,
      initUnit: unit,
      returnNum,
      returnUnit,
      string
    });
  });
};
