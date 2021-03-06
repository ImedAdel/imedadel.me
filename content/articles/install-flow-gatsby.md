---
slug: install-flow-gatsby
title: How to install Flow in Gatsby
description: A quick guide for installing Flow in GatsbyJS
tags:
  - Gatsby
  - React
  - JAMstack
  - Flow
date: "2019-07-06"
---

## 1. Install Gatsby plugin for Flow

Add `gatsby-plugin-flow` to your project by running the command:

```shell
yarn add gatsby-plugin-flow
```

And add it to `gatsby-config.js`

```js
modules.exports = {
	plugins: [
		// your other plugins
		`gatsby-config.js`, // highlight-line
		// your other plugins
	],
}
```

## 2. Install Flow Bin

Now, run the following command to install `flow-bin`

```shell
yarn add -D flow-bin
```

## 3. Initialize Flow

You can initialize Flow by running the command

```shell
npx flow init
```

## 4. Check your code

You can now run `npx flow` and it will run Flow and check your code. You can also install Flow's extension for VS Code.
