---
slug: connect-gatsbyjs-to-mysql-database
title: How to connect your GatsbyJS site to a MySQL database?
seo_title: ''
description: While migrating your PHP website to a JAMStack site, you can find yourself struggling with the huge MySQL database that you have been maintaining for years. Fortunately, GatsbyJS offers a plugin to easily fetch all the data you need from your MySQL database.
seo_description: ''
tags:
  - Gatsby
  - React
  - MySQL
  - JAMstack
date: '2019-07-02'
---

## Install `gatsby-source-mysql`

In your project, add `gatsby-source-mysql` by running:

```sh
yarn add gatsby-source-mysql
```

Then, you will need to add the plugin to `gatsby-config.js` with the appropriate settings:

```js
module.exports = {
	plugins: [
		{
			resolve: `gatsby-source-mysql`,
			options: {
				connectionDetails: {
					host: `localhost`,
					user: `db-username`,
					password: `db-password`,
					database: `world`,
				},
				queries: [
					{
						statement: `SELECT * FROM country`,
						idFieldName: `Code`,
						name: `country`,
					},
				],
			},
		},
		// ... other plugins
	],
}
```

The `statement` field is where you will put your query. It can be as simple as `SELECT * FROM country` or it can be as long and complicated as you wish.

If the query's length make it illegible, you can assign it to a constant before `module.exports`.

```js
const myQuery = `SELECT * FROM country`

module.exports = {
	plugins: [
		{
			resolve: `gatsby-source-mysql`,
			options: {
				connectionDetails: {
					host: `localhost`,
					user: `db-username`,
					password: `db-password`,
					database: `world`,
				},
				queries: [
					{
						statement: myQuery,
						idFieldName: `Code`,
						name: `country`,
					},
				],
			},
		},
		// ... other plugins
	],
}
```

`idFieldName` must be returned by the query defined in `statement`.

The `name` field will be used for naming your node in GraphQL.
