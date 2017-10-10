# Performant array to tree

[![npm version](https://img.shields.io/npm/v/performant-array-to-tree.svg)](https://www.npmjs.com/package/performant-array-to-tree)
[![minified size](https://img.shields.io/badge/minified_size-0.448_kb-brightgreen.svg)](https://github.com/philipstanislaus/performant-array-to-tree/blob/master/build/arrayToTree.min.js)
[![CircleCI](https://circleci.com/gh/philipstanislaus/performant-array-to-tree.svg?style=shield&circle-token=01828caf71908b915230609847a12272cc80c54d)](https://circleci.com/gh/philipstanislaus/performant-array-to-tree)
[![Coverage Status](https://coveralls.io/repos/github/philipstanislaus/performant-array-to-tree/badge.svg?branch=master)](https://coveralls.io/github/philipstanislaus/performant-array-to-tree?branch=master)
[![Dependency Status](https://david-dm.org/philipstanislaus/performant-array-to-tree.svg)](https://david-dm.org/philipstanislaus/performant-array-to-tree)
[![devDependency Status](https://david-dm.org/philipstanislaus/performant-array-to-tree/dev-status.svg)](https://david-dm.org/philipstanislaus/performant-array-to-tree#info=devDependencies)
[![typings included](https://img.shields.io/badge/typings-included-brightgreen.svg)](#typescript)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm license](https://img.shields.io/npm/l/performant-array-to-tree.svg)](https://www.npmjs.com/package/performant-array-to-tree)

Converts an array of items with ids and parent ids to a nested tree in a performant way (time complexity `O(n)`). Runs in browsers and node.

## Why another package

Other packages have stricter assumptions or are not as performant, as they often use nested loops or recursion. For example:

[o-unflatten](https://www.npmjs.com/package/o-unflatten) requires the input to be ordered such that parent nodes always come before their children.
[un-flatten-tree](https://www.npmjs.com/package/un-flatten-tree) uses 2 nested loops (time complexity `O(n^2)`).

This implementation does not require any order of items in the input array and focuses on runtime performance. It uses an index and a single loop (time complexity `O(n)`). It was inspired by [this discussion](http://stackoverflow.com/questions/444296/how-to-efficiently-build-a-tree-from-a-flat-structure) on StackOverflow.

## Installation

`yarn add performant-array-to-tree`

or if using npm

`npm install --save performant-array-to-tree`

## Usage

```js
const tree = arrayToTree([
    { id: '4', parentId: null, custom: 'abc' },
    { id: '31', parentId: '4', custom: '12' },
    { id: '1941', parentId: '418', custom: 'de' },
    { id: '1', parentId: '418', custom: 'ZZZz' },
    { id: '418', parentId: null, custom: 'ü'},
])
```

Which results in the following array:

```js
[
    { data: { id: '4', parentId: null, custom: 'abc' }, children: [
        { data: { id: '31', parentId: '4', custom: '12' }, children: [] },
    ] },
    { data: { id: '418', parentId: null, custom: 'ü'}, children: [
        { data: { id: '1941', parentId: '418', custom: 'de' }, children: [] },
        { data: { id: '1', parentId: '418', custom: 'ZZZz' }, children: [] },
    ] },
]
```

## Configuration

You can provide a second argument to arrayToTree with configuration options. Right now, you can set the following:

- `id`: key of the id field of the item
- `parentId`: key of the parent's id field of the item

Example:

```js
const tree = arrayToTree([
    { num: '4', ref: null, custom: 'abc' },
    { num: '31', ref: '4', custom: '12' },
    { num: '1941', ref: '418', custom: 'de' },
    { num: '1', ref: '418', custom: 'ZZZz' },
    { num: '418', ref: null, custom: 'ü'},
], { id: 'num', parentId: 'ref' })
```

Which produces:

```js
[
    { data: { num: '4', ref: null, custom: 'abc' }, children: [
        { data: { num: '31', ref: '4', custom: '12' }, children: [] },
    ] },
    { data: { num: '418', ref: null, custom: 'ü'}, children: [
        { data: { num: '1941', ref: '418', custom: 'de' }, children: [] },
        { data: { num: '1', ref: '418', custom: 'ZZZz' }, children: [] },
    ] },
]
```

## TypeScript

This project includes types, just import the module as usual:

```ts
import { arrayToTree } from 'performant-array-to-tree'

const tree = arrayToTree(array)
```
