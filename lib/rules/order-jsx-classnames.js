/**
 * @fileoverview Enforces the order of tachyons classes in jsx
 * @author Brandon Ebersohl
 */
'use strict';

const tachyonsClasses = require('../categories/index');
const _ = require('lodash');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforces the order of tachyons classes in jsx',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        patternProperties: {
          '.*': {
            enum: [0, 1, 2, 3]
          }
        }
      }
    ]
  },

  create: function(context) {
    const customClasses = context.options[0] || {};
    const tachyonsClassesMap = Object.assign(tachyonsClasses, customClasses);

    return {
      JSXAttribute: function(node) {
        const attributeName = _.get(node, 'name.name');

        if (attributeName !== 'className') return;

        const classNameValue = _.get(node, 'value.value', '').trim();
        console.log('hmm', classNameValue);
        const classes = _.uniq(classNameValue.split(' '));

        let orderedClasses = [[], [], [], []];

        classes.forEach(key => {
          let categoryIndex = tachyonsClassesMap[key];

          if (categoryIndex === undefined) categoryIndex = 3;

          orderedClasses[categoryIndex].push(key);
        });

        orderedClasses = orderedClasses.map(classes => classes.sort());

        orderedClasses = _.flatten(orderedClasses);

        orderedClasses = orderedClasses.join(' ');

        if (orderedClasses === classNameValue) return;

        context.report({
          node: node,
          message:
            'Expected "{{ classNameValue }}" to be "{{ orderedClasses }}"',
          data: {
            classNameValue,
            orderedClasses
          },
          fix: function(fixer) {
            const start = node.value.start + 1;
            const end = node.value.end - 1;
            return fixer.replaceTextRange([start, end], orderedClasses);
          }
        });
      }
    };
  }
};
