import { expect } from 'chai'
import { arrayToTree } from './arrayToTree'

describe('arrayToTree', () => {
  it('should work with nested objects', () => {
    expect(arrayToTree([
      { id: '4', parentId: null, custom: 'abc' },
      { id: '31', parentId: '4', custom: '12' },
      { id: '1941', parentId: '418', custom: 'de' },
      { id: '1', parentId: '418', custom: 'ZZZz' },
      { id: '418', parentId: null, custom: 'ü' },
    ])).to.deep.equal([
      {
        data: { id: '4', parentId: null, custom: 'abc' }, children: [
          { data: { id: '31', parentId: '4', custom: '12' }, children: [] },
        ],
      },
      {
        data: { id: '418', parentId: null, custom: 'ü' }, children: [
          { data: { id: '1941', parentId: '418', custom: 'de' }, children: [] },
          { data: { id: '1', parentId: '418', custom: 'ZZZz' }, children: [] },
        ],
      },
    ])
  })

  it('should work with integer keys', () => {
    expect(arrayToTree([
      { id: 4, parentId: null, custom: 'abc' },
      { id: 31, parentId: 4, custom: '12' },
      { id: 1941, parentId: 418, custom: 'de' },
      { id: 1, parentId: 418, custom: 'ZZZz' },
      { id: 418, parentId: null, custom: 'ü' },
    ])).to.deep.equal([
      {
        data: { id: 4, parentId: null, custom: 'abc' }, children: [
          { data: { id: 31, parentId: 4, custom: '12' }, children: [] },
        ],
      },
      {
        data: { id: 418, parentId: null, custom: 'ü' }, children: [
          { data: { id: 1941, parentId: 418, custom: 'de' }, children: [] },
          { data: { id: 1, parentId: 418, custom: 'ZZZz' }, children: [] },
        ],
      },
    ])
  })

  it('should work with nested objects and custom keys', () => {
    expect(arrayToTree(
      ([
        { num: '4', ref: null, custom: 'abc' },
        { num: '31', ref: '4', custom: '12' },
        { num: '1941', ref: '418', custom: 'de' },
        { num: '1', ref: '418', custom: 'ZZZz' },
        { num: '418', ref: null, custom: 'ü' },
      ]),
      { id: 'num', parentId: 'ref', childrenField: 'nodes' },
    )).to.deep.equal([
      {
        data: { num: '4', ref: null, custom: 'abc' }, nodes: [
          { data: { num: '31', ref: '4', custom: '12' }, nodes: [] },
        ],
      },
      {
        data: { num: '418', ref: null, custom: 'ü' }, nodes: [
          { data: { num: '1941', ref: '418', custom: 'de' }, nodes: [] },
          { data: { num: '1', ref: '418', custom: 'ZZZz' }, nodes: [] },
        ],
      },
    ])
  })

  it('should ignore objects if parentId does not exist', () => {
    expect(arrayToTree([
      { id: '4', parentId: null, custom: 'abc' },
      { id: '31', parentId: '4', custom: '12' },
      { id: '1941', parentId: '418', custom: 'de' },
      { id: '1', parentId: '418', custom: 'ZZZz' },
      { id: '418', parentId: null, custom: 'ü' },
      { id: '1313', parentId: '13', custom: 'Not existing' },
    ])).to.deep.equal([
      {
        data: { id: '4', parentId: null, custom: 'abc' }, children: [
          { data: { id: '31', parentId: '4', custom: '12' }, children: [] },
        ],
      },
      {
        data: { id: '418', parentId: null, custom: 'ü' }, children: [
          { data: { id: '1941', parentId: '418', custom: 'de' }, children: [] },
          { data: { id: '1', parentId: '418', custom: 'ZZZz' }, children: [] },
        ],
      },
    ])
  })

  it('should work with nested objects with dataField set to null', () => {
    expect(arrayToTree(
      ([
        { id: '4', parentId: null, custom: 'abc' },
        { id: '31', parentId: '4', custom: '12' },
        { id: '1941', parentId: '418', custom: 'de' },
        { id: '1', parentId: '418', custom: 'ZZZz' },
        { id: '418', parentId: null, custom: 'ü' },
      ]),
      { dataField: null },
    )).to.deep.equal([
      {
        id: '4', parentId: null, custom: 'abc', children: [
          { id: '31', parentId: '4', custom: '12', children: [] },
        ],
      },
      {
        id: '418', parentId: null, custom: 'ü', children: [
          { id: '1941', parentId: '418', custom: 'de', children: [] },
          { id: '1', parentId: '418', custom: 'ZZZz', children: [] },
        ],
      },
    ])
  })

  it('should work with nested objects and custom keys with dataField set to null', () => {
    expect(arrayToTree(
      ([
        { num: '4', ref: null, custom: 'abc' },
        { num: '31', ref: '4', custom: '12' },
        { num: '1941', ref: '418', custom: 'de' },
        { num: '1', ref: '418', custom: 'ZZZz' },
        { num: '418', ref: null, custom: 'ü' },
      ]),
      { id: 'num', parentId: 'ref', dataField: null },
    )).to.deep.equal([
      {
        num: '4', ref: null, custom: 'abc', children: [
          { num: '31', ref: '4', custom: '12', children: [] },
        ],
      },
      {
        num: '418', ref: null, custom: 'ü', children: [
          { num: '1941', ref: '418', custom: 'de', children: [] },
          { num: '1', ref: '418', custom: 'ZZZz', children: [] },
        ],
      },
    ])
  })

  it('should ignore objects if parentId does not exist with dataField set to null', () => {
    expect(arrayToTree(
      ([
        { id: '4', parentId: null, custom: 'abc' },
        { id: '31', parentId: '4', custom: '12' },
        { id: '1941', parentId: '418', custom: 'de' },
        { id: '1', parentId: '418', custom: 'ZZZz' },
        { id: '418', parentId: null, custom: 'ü' },
        { id: '1313', parentId: '13', custom: 'Not existing' },
      ]),
      { dataField: null },
    )).to.deep.equal([
      {
        id: '4', parentId: null, custom: 'abc', children: [
          { id: '31', parentId: '4', custom: '12', children: [] },
        ],
      },
      {
        id: '418', parentId: null, custom: 'ü', children: [
          { id: '1941', parentId: '418', custom: 'de', children: [] },
          { id: '1', parentId: '418', custom: 'ZZZz', children: [] },
        ],
      },
    ])
  })

  it('should treat objects with missing parentId as root objects', () => {
    expect(arrayToTree([
      { id: '4', custom: 'abc' },
      { id: '31', parentId: '4', custom: '12' },
      { id: '1941', parentId: '418', custom: 'de' },
      { id: '1', parentId: '418', custom: 'ZZZz' },
      { id: '418', custom: 'ü' },
      { id: '1313', parentId: '13', custom: 'Not existing' },
    ])).to.deep.equal([
      {
        data: { id: '4', custom: 'abc' }, children: [
          { data: { id: '31', parentId: '4', custom: '12' }, children: [] },
        ],
      },
      {
        data: { id: '418', custom: 'ü' }, children: [
          { data: { id: '1941', parentId: '418', custom: 'de' }, children: [] },
          { data: { id: '1', parentId: '418', custom: 'ZZZz' }, children: [] },
        ],
      },
    ])
  })

  it('should work with empty inputs', () => {
    expect(arrayToTree([])).to.deep.equal([])
  })
})
