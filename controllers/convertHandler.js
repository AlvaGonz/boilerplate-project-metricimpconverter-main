function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const firstAlphaIndex = input.search(/[a-zA-Z]/);
    const numPart = firstAlphaIndex === -1 ? input : input.slice(0, firstAlphaIndex);

    // Default to 1 if no numeric part provided
    if (numPart === '' || numPart === null) {
      return 1;
    }

    // Reject double fraction
    const slashMatches = numPart.match(/\//g);
    if (slashMatches && slashMatches.length > 1) {
      return 'invalid number';
    }

    if (numPart.includes('/')) {
      const [numeratorStr, denominatorStr] = numPart.split('/');
      const numerator = parseFloat(numeratorStr);
      const denominator = parseFloat(denominatorStr);
      if (Number.isNaN(numerator) || Number.isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }
      result = numerator / denominator;
      return result;
    }

    const parsed = parseFloat(numPart);
    if (Number.isNaN(parsed)) {
      return 'invalid number';
    }
    return parsed;
  };
  
  this.getUnit = function(input) {
    let result;
    const firstAlphaIndex = input.search(/[a-zA-Z]/);
    const unitPart = firstAlphaIndex === -1 ? '' : input.slice(firstAlphaIndex);
    if (!unitPart) {
      return 'invalid unit';
    }

    const lower = unitPart.toLowerCase();
    const valid = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!valid.includes(lower)) {
      return 'invalid unit';
    }

    // Normalize: 'l' is uppercase 'L', others lower-case
    if (lower === 'l') {
      result = 'L';
    } else {
      result = lower;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const map = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    result = map[initUnit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const map = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    result = map[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return null;
    }
    // Round to 5 decimals as number
    return Number(parseFloat(result.toFixed(5)));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    const initUnitSpelled = this.spellOutUnit(initUnit);
    const returnUnitSpelled = this.spellOutUnit(returnUnit);
    result = `${initNum} ${initUnitSpelled} converts to ${returnNum} ${returnUnitSpelled}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
