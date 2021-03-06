---
slug: import-images-gatsby-guide
title: A Complete Guide to Importing Images in GatsbyJS
description: A guide for importing images in your Gatsby project.
date: '2019-07-03'
tags:
  - Gatsby
  - React
  - JAMstack
  - Guide
---

## Using Gatsby Image

### Installing plugins

For this method, you will have to import every image one-by-one. Your images will be processed and optimized for the best performance. In most cases, this is the method that you'd want to use.

First, install `gatsby-image`, `gatsby-transformer-sharp` and `gatsby-plugin-sharp` using the command:

```sh
yarn add gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp
```

And add them to the `plugins` array in `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    ... // your others plugins
  ]
}
```

Also, don't forget to add your images to your source plugin. For instance, if you are using `gatsby-source-filesystem`, you can configure it in `gatsby-config.js` like so:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    ... // your others plugins
  ]
}
```

### Querying images in pages and components

To query images using GraphQL in your pages and your components, you will have to import `gatsby-image` at the top of the file. In this example, I am going to assume that you are using a [`StaticQuery`](https://www.gatsbyjs.org/docs/static-query/) for your component or your page. If that's the case, I highlighy recommend using the [`StaticQuery` snippet for VS Code](/gatsby-staticquery-vs-code-snippet).

```js
import React from 'react'
import Img from 'gatsby-image' // highlight-line
```

Then query your image using GraphQL.

```js
const myQuery = graphql`
	query {
		nameOfImage: file(relativePath: { eq: "relativePathToYourImage.png" }) {
			childImageSharp {
				fixed(height: 200) {
					...GatsbyImageSharpFixed
				}
			}
		}
	}
`
```

A couple of notes here:

1. `nameOfImage` could be anything. You will use it later in your JSX
2. `relativePathToYourImage.png` is the relative path to your with the `images` file defined above---in `gatsby-config.js`---as a base. You can change `relativePath` to your liking
3. `fixed` is for images with a fixed width and height. It generates images for different screen _resolutions_. You can use the `height` and `width` to determine the dimensions of your image. To make your image fluid or responsive, that is, with multiple sizes based on the screen _size_, you would have to use `fluid` instead of `fixed`. And instead of a `height` and `width`, you have to define either a `maxWidth` or `maxHeight` (or both)

```js
const myQuery = graphql`
	query {
		nameOfImage: file(relativePath: { eq: "relativePathToYourImage.png" }) {
			childImageSharp {
				fluid(maxHeight: 200) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`
```

You can use your image in your component by using `Img` and passing it the image as a property. For fluid images you would use `<Img fluid={data.nameOfImage.childImageSharp.fluid} />`. And for fixed images, you would use `<Img fixed={data.nameOfImage.childImageSharp.fixed} />`.

A component with images imported using GraphQL would look like this:

```jsx
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const OurComponent = ({ data }) => (
	<main>
		<p>A fluid image: </p>
		<Img fluid={data.nameOfFluidImage.childImageSharp.fluid} />

		<p>A fixed image: </p>
		<Img fixed={data.nameOfFixedImage.childImageSharp.fixed} />
	</main>
)

const ourQuery = graphql`
	query {
		nameOfFluidImage: file(
			relativePath: { eq: "relativePathToYourImage.png" }
		) {
			childImageSharp {
				fluid(maxHeight: 200) {
					...GatsbyImageSharpFluid
				}
			}
		}
		nameOfFixedImage: file(
			relativePath: { eq: "relativePathToYourImage.png" }
		) {
			childImageSharp {
				fixed(height: 200) {
					...GatsbyImageSharpFixed
				}
			}
		}
	}
`

export default () => (
	<StaticQuery query={ourQuery} render={data => <OurComponent data={data} />} />
)
```

## Using Webpack Import

With Webpack, you can import a file directly in your component or page without configuring `gatsby-image`. This is useful with a large number of images, for quick prototyping, or if your images are already optimized and minified.

Note that importing images that are less than 10000 bytes returns a data URI instead of a path. This applies to the following file extensions: svg, jpg, jpeg, png, gif, mp4, webm, wav, mp3, m4a, aac, and oga.

### Using Import

First, you need to import your image as you usually would for JavaScript files.

```js
import React from 'react'
import myImage from './pathToTheImage.png' // highlight-line
```

Afterwards, you can treat it as a normal path:

```jsx
const MyComponent = () => <img src={myImage} alt='A bunch of 0s and 1s' />
```

Note that you can achieve the same thing in your CSS files, without having to import it:

```css
.decorativeImage {
	background-image: url(./pathToTheImage.png);
}
```

This way, you can add your background images to your Gatsby project---although using background images is not recommended from an accessibility point of view.

### Inline Require

As the number of images grows, importing every single image can become tedious. Hopefully, an easier solution is using an inline `require` like so:

```jsx
const AnotherComponent = () => <img src={require('./pathToTheImage.png')} />
```

### Require all images

Like the import method above, you can require all images using this function:

```js
const images = require.context('../images', true)
const imagePath = name => images(name, true)
```

Specify where the images are stored and then use it like so:

```jsx
const AndAnotherComponent = () => (
	<img src={imagePath('./pathToTheImage.png')} />
)
```

## Using The Static Folder

If you don't have time for all of this and you don't really worry about optimization 🙄, you can add a `static` folder to the root of your project, add any images you want there, and then easily reference images like so:

```jsx
const Yup = () => <img src='pathToTheImage.png' />
```

Note that the `static` folder is considered the base for your image's path.

## Conclusion

- Optimize images: `gatsby-image` FTW;
- Import in CSS: relative image path, Webpack will handle it;
- Import many images quickly: inline require, Webpack will handle it;
- 🙄: use the static folder.

## Further Reading

- [Using the Static folder, Gatsbyjs.org](https://www.gatsbyjs.org/docs/static-folder/)
- [gatsby-image, Gatsbyjs.org](https://www.gatsbyjs.org/packages/gatsby-image/)
- [Importing Assets Directly Into Files, Gatsbyjs.org](https://www.gatsbyjs.org/docs/importing-assets-into-files/)
