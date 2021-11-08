# Shopify workflow

1. Clone this repository in the root of the shopify theme ```git clone git@github.com:bemeir/shopify-workflow.git```
2. run ```npm --prefix shopify-workflow run copy```
3. Check package.json file for the commands. Commands are run yarn install or npm run install.
4. Check gulpfile.js for what the commands are doing.

We are using the latest SASS preprocessor here. We know that Shopify is extremely faulty here on this point.
Sass files are located in the root of the project/custom folder. Main file is custom-theme.scss which accepts
tailwind imports and normal sass imports. Sass files like _header.scss accept all liquid & shopify variables.


#Working with theme
1. This theme is connected directly to the git production branch via shopify online. Which means if we edit code or customize from the admin it will automatically
push to the git repository. Same goes when working locally. When you are done we git add our changes. Then we do git commit -m. And push to production branch. Changes should be immediately reflected on the shopofy servers after refresh same as if we did shopify theme push and pushed the data with CLI.
   
