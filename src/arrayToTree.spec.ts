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
        data: { id: '4', parentId: null, custom: 'abc' },
        children: [ { data: { id: '31', parentId: '4', custom: '12' }, children: [] } ],
      },
      {
        data: { id: '418', parentId: null, custom: 'ü' },
        children: [
					{ data: { id: '1941', parentId: '418', custom: 'de' }, children: [] },
					{ data: { id: '1', parentId: '418', custom: 'ZZZz' }, children: [] },
        ],
      },
    ])
  })
})
