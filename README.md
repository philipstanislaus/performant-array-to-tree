# Performant array to tree

[![npm version](https://img.shields.io/npm/v/performant-array-to-tree.svg)](https://www.npmjs.com/package/performant-array-to-tree)
[![minified size](https://img.shields.io/badge/minified_size-2.1_kb-brightgreen.svg)](https://github.com/philipstanislaus/performant-array-to-tree/blob/main/build/arrayToTree.min.js)
[![CircleCI](https://circleci.com/gh/philipstanislaus/performant-array-to-tree/tree/main.svg?style=shield&circle-token=01828caf71908b915230609847a12272cc80c54d)](https://circleci.com/gh/philipstanislaus/performant-array-to-tree/tree/main)
[![codecov](https://codecov.io/gh/philipstanislaus/performant-array-to-tree/branch/main/graph/badge.svg?token=qgGKoJkCVC)](https://codecov.io/gh/philipstanislaus/performant-array-to-tree)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/performant-array-to-tree)](https://libraries.io/npm/performant-array-to-tree)
[![typings included](https://img.shields.io/badge/typings-included-brightgreen.svg)](#typescript)
[![npm license](https://img.shields.io/npm/l/performant-array-to-tree.svg)](https://www.npmjs.com/package/performant-array-to-tree)

Converts an array of items with ids and parent ids to a nested tree in a performant way (time complexity `O(n)`). Runs in browsers and node.

## Why another package

Other packages have stricter assumptions or are not as performant, as they often use nested loops or recursion. For example:

[o-unflatten](https://www.npmjs.com/package/o-unflatten) requires the input to be ordered such that parent nodes always come before their children.
[un-flatten-tree](https://www.npmjs.com/package/un-flatten-tree) uses 2 nested loops (time complexity `O(n^2)`).

This implementation does not require any order of items in the input array and focuses on runtime performance. It is the fastest amongst 4 different packages, you can find the benchmarks [here](https://github.com/philipstanislaus/array-to-tree-benchmarks). It uses an index and a single loop (time complexity `O(n)`). It was inspired by [this discussion](http://stackoverflow.com/questions/444296/how-to-efficiently-build-a-tree-from-a-flat-structure) on StackOverflow.

## Installation

`yarn add performant-array-to-tree`

or if using npm

`npm install --save performant-array-to-tree`

## Usage

```js
const tree = arrayToTree([
  { id: "4", parentId: null, custom: "abc" },
  { id: "31", parentId: "4", custom: "12" },
  { id: "1941", parentId: "418", custom: "de" },
  { id: "1", parentId: "418", custom: "ZZZz" },
  { id: "418", parentId: null, custom: "ü" },
]);
```

Which results in the following array:

```js
[
  {
    data: { id: "4", parentId: null, custom: "abc" },
    children: [
      { data: { id: "31", parentId: "4", custom: "12" }, children: [] },
    ],
  },
  {
    data: { id: "418", parentId: null, custom: "ü" },
    children: [
      { data: { id: "1941", parentId: "418", custom: "de" }, children: [] },
      { data: { id: "1", parentId: "418", custom: "ZZZz" }, children: [] },
    ],
  },
];
```

## Configuration

You can provide a second argument to arrayToTree with configuration options. Right now, you can set the following:

- `id`: Key of the id field of the item. Also works with nested properties (e. g. `"nested.parentId"`). Default: `"id"`.
- `parentId`: Key of the parent's id field of the item. Also works with nested properties (e. g. `"nested.parentId"`). Default: `"parentId"`.
- `nestedIds`: Option to enable/disable nested ids. Default: `true`.
- `childrenField`: Key which will contain all child nodes of the parent node. Default: `"children"`
- `dataField`: Key which will contain all properties/data of the original items. Set to null if you don't want a container. Default: `"data"`
- `throwIfOrphans`: Option to throw an error if the array of items contains one or more items that have no parents in the array or if the array of items contains items with a circular parent/child relationship. This option has a small runtime penalty, so it's disabled by default. When enabled, the function will throw an error containing the parentIds that were not found in the items array, or in the case of only circular item relationships a generic error. The function will throw an error if the number of nodes in the tree is smaller than the number of nodes in the original array. When disabled, the function will just ignore orphans and circular relationships and not add them to the tree. Default: `false`
- `rootParentIds`: Object with parent ids as keys and `true` as values that should be considered the top or root elements of the tree. This is useful when your tree is a subset of full tree, which means there is no item whose parent id is one of `undefined`, `null` or `''`. The array you pass in will be replace the default value. `undefined` and `null` are always considered to be rootParentIds. For more details, see [#23](https://github.com/philipstanislaus/performant-array-to-tree/issues/23). Default: `{'': true}`
- `assign`: Option that enables `Object.assign` instead of the spread operator to create an item in the tree when `dataField` is `null`. This is useful if your items have a prototype that should be maintained. If enabled and `dataField` is `null`, the original node item will be used, and the `children` property will be assigned, calling any setters on that field. If `dataField` is not `null`, this option has no effect, since the original node will be used under the `dataField` of a new object. If you are unsure whether you need to enable this, it's likely fine to leave it disabled. Default: `false`

Example:

```js
const tree = arrayToTree(
  [
    { num: "4", ref: null, custom: "abc" },
    { num: "31", ref: "4", custom: "12" },
    { num: "1941", ref: "418", custom: "de" },
    { num: "1", ref: "418", custom: "ZZZz" },
    { num: "418", ref: null, custom: "ü" },
  ],
  { id: "num", parentId: "ref", childrenField: "nodes" }
);
```

Which produces:

```js
[
  {
    data: { num: "4", ref: null, custom: "abc" },
    nodes: [{ data: { num: "31", ref: "4", custom: "12" }, nodes: [] }],
  },
  {
    data: { num: "418", ref: null, custom: "ü" },
    nodes: [
      { data: { num: "1941", ref: "418", custom: "de" }, nodes: [] },
      { data: { num: "1", ref: "418", custom: "ZZZz" }, nodes: [] },
    ],
  },
];
```

Example with no data field:

```js
const tree = arrayToTree(
  [
    { id: "4", parentId: null, custom: "abc" },
    { id: "31", parentId: "4", custom: "12" },
    { id: "1941", parentId: "418", custom: "de" },
    { id: "1", parentId: "418", custom: "ZZZz" },
    { id: "418", parentId: null, custom: "ü" },
  ],
  { dataField: null }
);
```

Which produces:

```js
[
  {
    id: "4",
    parentId: null,
    custom: "abc",
    children: [{ id: "31", parentId: "4", custom: "12", children: [] }],
  },
  {
    id: "418",
    parentId: null,
    custom: "ü",
    children: [
      { id: "1941", parentId: "418", custom: "de", children: [] },
      { id: "1", parentId: "418", custom: "ZZZz", children: [] },
    ],
  },
];
```

Example with nested id/parentId properties:

```js
const tree = arrayToTree(
  [
    { num: { id: "4" }, parent: { parentId: null }, custom: "abc" },
    { num: { id: "31" }, parent: { parentId: "4" }, custom: "12" },
  ],
  { id: "num.id", parentId: "parent.parentId" }
);
```

Which produces:

```js
[
  {
    data: { num: { id: "4" }, parent: { parentId: null }, custom: "abc" },
    children: [
      {
        data: { num: { id: "31" }, parent: { parentId: "4" }, custom: "12" },
        children: [],
      },
    ],
  },
];
```

## TypeScript

This project includes types, just import the module as usual:

```ts
import { arrayToTree } from "performant-array-to-tree";

const tree = arrayToTree(array);
```

## Development

`yarn version` to create a new version
`npm login`
`npm publish --access public` to publish it to npm
