/**
 * @fileoverview Enforces the order of tachyons classes in jsx
 * @author Brandon Ebersohl
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/order-jsx-classnames'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

var ruleTester = new RuleTester({ parserOptions });

ruleTester.run('order-jsx-classnames', rule, {
  valid: [
    '<i />',
    '<i className="w-100"/>',
    '<i className={className}/>',
    '<i className=""/>',
    '<i className={"w-100" + classes}/>',
    '<i className={cn("foo", "bar")}/>'
  ],

  invalid: [
    {
      code: "<i className='w-100 pr3-ns order-2 w-60-ns order-1-ns'/>",
      errors: [
        {
          message:
            'Expected "w-100 pr3-ns order-2 w-60-ns order-1-ns" to be "order-1-ns order-2 pr3-ns w-100 w-60-ns"'
        }
      ]
    }
  ]
});
