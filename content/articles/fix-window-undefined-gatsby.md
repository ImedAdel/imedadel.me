---
slug: fix-window-not-defined-gatsby
title: How to Fix Window Is Not Defined in Gatsby
description: A quick fix for window is not defined in GatsbyJS
tags:
  - Gatsby
  - React
  - JAMstack
  - Bugs
date: "2019-07-06"
---

The error `window is not defined` when running `gatsby build` results from trying to access `window` on the server, where it is not defined. To solve this, you can check for whether it defined or not before using it or importing a module that does.

```js
const isBrowser = typeof window !== `undefined`
```

Now, you can use `isBrowser` when using `window`. For example,

```js
if (isBrowser) {
	console.log(window.location.pathname)
}
```

Or, if you want to import a module (`wow.js` for example),

```js
if (isBrowser) {
	const WOW = require("wow.js")
}
```

Finally, you can also configure Webpack to ignore the module during server rendering by adding the following code in `gatsby-node.js` file.

```js
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
	if (stage === "build-html") {
		actions.setWebpackConfig({
			module: {
				rules: [
					{
						test: /moduleName/,
						use: loaders.null(),
					},
				],
			},
		})
	}
}
```

## Further Reading

- [Debugging HTML Builds, Gatsbyjs.org](https://www.gatsbyjs.org/docs/debugging-html-builds/#how-to-check-if-code-classlanguage-textwindowcode-is-defined)
- [Window is not defiend #309, Github.com](https://github.com/gatsbyjs/gatsby/issues/309)
