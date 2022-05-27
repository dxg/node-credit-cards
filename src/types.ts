export const types = [
  { code: 'VI', name: 'Visa',                pattern: /^4[0-9]{12}(?:[0-9]{3})?$/        },
  { code: 'CA', name: 'Master Card',         pattern: /^5[1-5][0-9]{14}$/                },
  { code: 'DC', name: 'Diners Club',         pattern: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/ },
  { code: 'AX', name: 'American Express',    pattern: /^3[47][0-9]{13}$/                 },
  { code: 'DS', name: 'Discover',            pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/    },
  { code: 'TP', name: 'UAPT',                pattern: /^1[0-9]{14,15}$/                  },
  { code: 'JC', name: 'Japan Credit Bureau', pattern: /^(?:2131|1800|35\d{3})\d{11}$/    },
] as const;

export type CreditCardCode = typeof types[number]['code'];
export type CreditCardName = typeof types[number]['name'];
export type CreditCardType = typeof types[number];

export type CreditCardInfo = {
  valid    : boolean;
  code?    : CreditCardCode;
  name?    : CreditCardName;
  test?    : boolean;
  accepted?: boolean;
};

export type IsAcceptedOptions = {
  accepted: CreditCardCode[];
};
