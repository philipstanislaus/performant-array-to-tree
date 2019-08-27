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
        id: '4', parentId: null, custom: 'abc', children: [
          {  id: '31', parentId: '4', custom: '12', children: [] },
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

  it('should work with nested objects and custom keys', () => {
    expect(arrayToTree(
      ([
        { num: '4', ref: null, custom: 'abc' },
        { num: '31', ref: '4', custom: '12' },
        { num: '1941', ref: '418', custom: 'de' },
        { num: '1', ref: '418', custom: 'ZZZz' },
        { num: '418', ref: null, custom: 'ü' },
      ] as any),
      { id: 'num', parentId: 'ref' },
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

  it('should work with empty inputs', () => {
    expect(arrayToTree([])).to.deep.equal([])
  })
})
