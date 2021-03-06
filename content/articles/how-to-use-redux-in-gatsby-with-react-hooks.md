---
slug: how-to-use-redux-in-gatsby-with-react-hooks
title: How to use Redux in Gatsby with React Hooks
description: A guide to installing, configuring, and using Redux in Gatsby with React Hooks.
tags:
  - Gatsby
  - React
  - JAMstack
  - Redux
  - React Hooks
date: '2019-07-13'
---

As the state of your Gatsby app gets more complex and as you need to persist it during page changes, React's `useState` or `useContext` starts becoming less adequate. This is when Redux comes into play.

## Installing Redux

For npm, run

```sh
npm install --save redux react-redux
```

For yarn, run

```sh
yarn add redux react-redux
```

## Configuring Redux in Gatsby

In order to access Redux's store in a React app, you can wrap it with a `Provider` component from `react-redux`. To do that in Gatsby, you have to export a `wrapRootElement` from `gatsby-ssr.js` and `gatsby-browser.js`.

To avoid repeating yourself, you can create a `.js` file and assign it to `wrapRootElement` in `gatsby-ssr.js` and `gatsby-browser.js`. We'll name it `wrap-with-provider`.

```jsx
import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import * as reducers from './src/redux/reducers'

const initialState = {
	setCount: 0,
	setTotal: 0,
}

const combinedReducers = combineReducers({ ...reducers })
export default ({ element }) => {
	const store = createStore(combinedReducers, initialState)
	return <Provider store={store}>{element}</Provider>
}
```

A couple of notes here:

- `./src/redux/reducers` has an `index.js` file that exports all reducers. That's why we are using the notation `import * as`.
- `combineReducers` is used to combine all the reducer function that we are importing.
- `initialState` is not obligatory, but it depends on your needs. If you will select a certain element from the store when your app mounts, then you need to specify an initial value for the element.
- Elements of your store will have the reducer function name. To change that, you can combine your reducers using
  `const combinedReducers = combineReducers({ count: reducers.setCount, total: reducers.setTotal, })`

Then, in both your `gatsby-ssr.js` and `gatsby-browser.js` files, add the following code

```js
import wrapWithProvider from './wrap-with-provider'
export const wrapRootElement = wrapWithProvider
```

Now, you're ready to go 🎉

## How to use Redux Hooks API

Thankfully, Redux supports React's Hooks, which makes development way easier. The two most important Hooks to know are `useSelector` and `useDispatch`.

### Extract data from the Redux store state with `useSelector`

The `useSelector` hook accepts two arguments, a `selector` function and an `equalityFn` function.

For instance, for extracting `count` from the state, you can run

```js
const currentCount = useSelector(state => state.count)
```

If your data can be updated, that is, you will be using `useEffect` or `useLayoutEffect`, it seems that the recommendation is to put `useSelector` _inside_ of `useEffect` (or `useLayoutEffect`).

### Dispatch actions and update the store's data

For this, we've got `useDispatch`, it returns a reference to the `dispatch` function from the Redux store.

First, assign it to a variable, `dispatch` for example, and then use it in events.

```js
import React from 'react'
import { useDispatch } from 'react-redux'

const MyComponent = () => {
	const dispatch = useDispatch()
	return (
		<button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
	)
}

export default MyComponent
```

By the way, you can also use it inside `useEffect` through a self-invoking function:

```jsx
// ...
React.useEffect(() => {
	;(() => dispatch({ type: 'INCREMENT' }))()
})
// ...
```

### About reducers and actions

If this is your first time using Redux, there is a [good article by Flavio Copes](https://flaviocopes.com/redux/) about reducers, actions, and data flow in Redux.

But, in a nutshell, reducers get passed the current state and an action type, and they return what the new state is (without modifying the original one).

A cute little reducer can look like this,

```js
const setCount = (state = 0, action) => {
	switch (action.type) {
		case `UPDATE`:
			return action.count

		default:
			return state
	}
}
```

Actions can be organized in a folder together, but that's not necessary. They can look like this

```js
export const setCount = count => ({
	type: `UPDATE`, // type is necessary

	count,
})
```

## Further Reading

- [Using Redux, Github](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redux)
- [Learn how to use Redux, Flavio Copes](https://flaviocopes.com/redux/)
- [Hooks, React Redux](https://react-redux.js.org/next/api/hooks)
