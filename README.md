# Shopify workflow

1. Clone this repository in the root of the shopify theme ```git clone git@github.com:bemeir/shopify-workflow.git```
2. run ```cd shopify-workflow && npm run copy```
3. Check package.json file for the commands. Commands are run yarn install or npm run install.
4. Check gulpfile.js for what the commands are doing.

We are using the latest SASS preprocessor here. We know that Shopify is extremely faulty here on this point.
Sass files are located in the root of the project/custom folder. Main file is custom-theme.scss which accepts
tailwind imports and normal sass imports. Sass files like _header.scss accept all liquid & shopify variables.
