# Default build configuration by Grafana

**This is an auto-generated directory and is not intended to be changed! ⚠️**

The `.config/` directory holds basic configuration for the different tools
that are used to develop, test and build the project. In order to make it updates easier we ask you to
not edit files in this folder to extend configuration.

## How to extend the basic configs?

Bear in mind that you are doing it at your own risk, and that extending any of the basic configuration can lead
to issues around working with the project.

### Extending the ESLint config

Edit the `.eslintrc` file in the project root in order to extend the ESLint configuration.

**Example:**

```json
{
  "extends": "./.config/.eslintrc",
  "rules": {
    "react/prop-types": "off"
  }
}
```

---

### Extending the Prettier config

Edit the `.prettierrc.js` file in the project root in order to extend the Prettier configuration.

**Example:**

```javascript
module.exports = {
  // Prettier configuration provided by Grafana scaffolding
  ...require('./.config/.prettierrc.js'),

  semi: false,
};
```

---

### Extending the Jest config

There are two configuration in the project root that belong to Jest: `jest-setup.js` and `jest.config.js`.

**`jest-setup.js`:** A file that is run before each test file in the suite is executed. We are using it to
set up the Jest DOM for the testing library and to apply some polyfills. ([link to Jest docs](https://jestjs.io/docs/configuration#setupfilesafterenv-array))

**`jest.config.js`:** The main Jest configuration file that is extending our basic Grafana-tailored setup. ([link to Jest docs](https://jestjs.io/docs/configuration))

---

### Extending the TypeScript config

Edit the `tsconfig.json` file in the project root in order to extend the TypeScript configuration.

**Example:**

```json
{
  "extends": "./.config/tsconfig.json",
  "compilerOptions": {
    "preserveConstEnums": true
  }
}
```
