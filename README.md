# VSCode CSS vars/env autocomplete

[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/lasalefamine.vscode-css.vars.svg)](https://marketplace.visualstudio.com/items?itemName=lasalefamine.vscode-css.vars)
[![Version](https://vsmarketplacebadge.apphb.com/version/lasalefamine.vscode-css.vars.svg)](https://marketplace.visualstudio.com/items?itemName=lasalefamine.vscode-css.vars)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-star/lasalefamine.vscode-css.vars.svg)](https://marketplace.visualstudio.com/items?itemName=lasalefamine.vscode-css.vars)

<small>This is a fork of <a href="https://github.com/paradigm-sy/vscode-css-variables-autocomplete">vscode-css-variables-autocomplete</a></small>

> VSCode extension for CSS var and env var autocomplete


## How it works

It currently works with both CSS `var` and [PostCSS `env` variables](https://github.com/csstools/postcss-env-function).


### Configuration

You must add (or update) the configuration inside **`.vscode/settings.json`**:

```json
{
  "cssEnvVarsAutocomplete.varFiles": [ "variables.css" ],
  "cssEnvVarsAutocomplete.envFiles": [ "env.css", "env-vars.json" ],
}
```


### All configuration keys

- `varFiles` - Array of *paths* to the `.css` files containing a `:root` selector and the variables inside
- `envFiles` - Array of *paths* to the `.css` files containing a `:root` selector and the variables inside **OR** Array of *paths* to the `.json` files containing a json rapresentation of the variables (also nested)
- `languageModes` - Specify custom language modes if default not suits you.

### Example of CSS file

```css
:root {
  --my-nice-var: 10px;
  --another-nice-var: 20px;
}
```

### Example of JSON file
```json
{
  "my": {
    "nice": {
      "var": "10px"
    }
  }
}
```


## License

LasaleFamine MIT
