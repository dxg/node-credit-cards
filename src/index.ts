const luhn = require('luhn');

import { types } from './types';

import type {
  CreditCardCode,
  CreditCardName,
  CreditCardType,
  CreditCardInfo,
  IsAcceptedOptions,
} from './types';

const allCodes = types.map((type) => type.code);

const testNumbers = [
  '378282246310005',  '371449635398431',  '378734493671000','30569309025904', '38520000023237',
  '4111111111111111', '4012888888881881', '4222222222222',
  '5555555555554444', '5105105105105100 ',
  '6011111111111117', '6011000990139424',
];

const clean = (number) => number.replace(/\s+/g, '');

const isTestNumber = (number) => testNumbers.includes(clean(number));

const isValid = (number: string) => {
  number = clean(number);

  if (luhn.validate(number)) {
    return !isTestNumber(number);
  } else {
    return false;
  }
}

const getType = (number: string) => {
  let card;

  for (let i = 0; i < types.length; i++) {
    card = types[i];

    if (card.pattern.test(clean(number))) {
      return card;
    }
  }
}

const getTypeCode = (number: string) => {
  var type = getType(clean(number));

  if (type) {
    return type.code;
  }
}

const getTypeName = (number: string) => {
  var type = getType(clean(number));

  if (type) {
    return type.name;
  }
}

const isAccepted = (number: string, opts: IsAcceptedOptions) => {
  number = clean(number);
  return isValid(number) && opts.accepted.includes(getTypeCode(number));
};

const getInfo = (number: string, opts?: IsAcceptedOptions): CreditCardInfo => {
  number = clean(number);

  const info: CreditCardInfo = { valid: isValid(number) };
  const card = getType(number);

  if (card) {
    info.code = card.code;
    info.name = card.name;
    info.test = isTestNumber(number);

    if (opts?.accepted) {
      info.accepted = isAccepted(number, opts);
    }
  }

  return info;
}

const functions = {
  isTestNumber,
  isValid,
  getTypeName,
  getTypeCode,
  getInfo,
  allCodes,
};

type AdvancedHelper = typeof functions & {
  isAccepted(number: string): boolean;
  getInfo(number: string): CreditCardInfo;
};

function advancedHelper (opts: IsAcceptedOptions): AdvancedHelper {
  function F () {
    this.isAccepted = (number: string) => isAccepted(number, opts);
    this.getInfo    = (number: string) => getInfo(number, opts);
  };

  F.prototype = functions;

  return new F;
}

export = Object.assign(
  advancedHelper,
  functions,
);
