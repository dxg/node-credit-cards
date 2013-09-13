node-credit-cards
=================

Validate & extract metadata from credit cards.

=== Basic usage

```js
var creditCards = require('credit-cards')

creditCards.isValid("4024 0071 2016 8322")
=> true
creditCards.isValid("4034 0071 2016 8322")
=> false

creditCards.getTypeCode("4034 0071 2016 8322")
=> 'VI'
creditCards.getTypeName("4034 0071 2016 8322")
=> 'Visa'

creditCards.getInfo('3478 7964 2068 802')
=> { valid: true, code: 'AX', name: 'American Express' }
```

=== Advanced usage
var creditCards = require('credit-cards')

var scoped = creditCards({ accepted: ['VI', 'AX'] })

scoped.isValid("4024 0071 2016 8322")
=> true
scoped.getTypeCode("4034 0071 2016 8322")
=> 'VI'
scoped.isAccepted('5290 6473 7075 0487')
=> false
scoped.getInfo('5290 6473 7075 0487')
=> { valid: true, code: 'CA', name: 'Master Card', accepted: false }
