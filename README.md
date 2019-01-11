# eslint-plugin-tachyons-jsx

An eslint plugin that enforces the order of tachyons classes in jsx

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-tachyons-jsx`:

```
$ npm install eslint-plugin-tachyons-jsx --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-tachyons-jsx` globally.

## Usage

Add `tachyons-jsx` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["tachyons-jsx"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "tachyons-jsx/rule-name": 2
  }
}
```

In order to get eslint to work with JSX you need to add the following parser options:

```json
{
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

Complete `.eslintrc` example:

```json
{
  "plugins": ["tachyons-jsx"],
  "rules": {
    "tachyons-jsx/order-jsx-classnames": 2
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

**It's highly recommended to do the following:**

Download the [eslint extension for vscode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (or whichever editor you use)

Navigate to the eslint settings and set `eslint.autoFixOnSave` to `true`

## Ordering Methodology

Based on [concentric CSS](https://rhodesmill.org/brandon/2011/concentric-css/)

Classes are split into 4 categories in order of precedence:

```javascript
{
    /* Placement Classes - 0 */
    display: ;
    position: ;
    float: ;
    clear: ;
    visibility: ;
    opacity: ;
    z-index: ;

    /* Box Classes - 1 */
    margin: ;
    outline: ;
    border: ;
    background: ;
    padding: ;
    width: ;
    height: ;
    overflow: ;

    /* Text Classes - 2 */
    color: ;
    text: ;
    font: ;

    /* Non-tachyons Classes - 3 */
    * ;
}
```

The classes within each category are sorted alphanumerically.

If you want a detailed look at which class belongs to which category click here.

## Custom Ordering

If you have custom tachyons-like classes you may configure which category they belong to like so:

```json
{
  "rules": {
    "tachyons-jsx/rule-name": [
      2,
      {
        "center-xl": 0,
        "w-58-ns": 2
      }
    ]
  }
}
```

The number refers to which category they belong to.

- `0` - Placement Classes
- `1` - Box Classes
- `2` - Text Classes
- `3` - Non-tachyons Classes
