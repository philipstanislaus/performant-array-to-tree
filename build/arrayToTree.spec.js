"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var arrayToTree_1 = require("./arrayToTree");
describe('arrayToTree', function () {
    it('should work with nested objects', function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: '4', parentId: null, custom: 'abc' },
            { id: '31', parentId: '4', custom: '12' },
            { id: '1941', parentId: '418', custom: 'de' },
            { id: '1', parentId: '418', custom: 'ZZZz' },
            { id: '418', parentId: null, custom: 'ü' },
        ])).to.deep.equal([
            { data: { id: '4', parentId: null, custom: 'abc' }, children: [
                    { data: { id: '31', parentId: '4', custom: '12' }, children: [] },
                ] },
            { data: { id: '418', parentId: null, custom: 'ü' }, children: [
                    { data: { id: '1941', parentId: '418', custom: 'de' }, children: [] },
                    { data: { id: '1', parentId: '418', custom: 'ZZZz' }, children: [] },
                ] },
        ]);
    });
    it('should work with nested objects and custom keys', function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { num: '4', ref: null, custom: 'abc' },
            { num: '31', ref: '4', custom: '12' },
            { num: '1941', ref: '418', custom: 'de' },
            { num: '1', ref: '418', custom: 'ZZZz' },
            { num: '418', ref: null, custom: 'ü' },
        ], { id: 'num', parentId: 'ref' })).to.deep.equal([
            { data: { num: '4', ref: null, custom: 'abc' }, children: [
                    { data: { num: '31', ref: '4', custom: '12' }, children: [] },
                ] },
            { data: { num: '418', ref: null, custom: 'ü' }, children: [
                    { data: { num: '1941', ref: '418', custom: 'de' }, children: [] },
                    { data: { num: '1', ref: '418', custom: 'ZZZz' }, children: [] },
                ] },
        ]);
    });
    it('should work with empty inputs', function () {
        chai_1.expect(arrayToTree_1.arrayToTree([])).to.deep.equal([]);
    });
});
//# sourceMappingURL=arrayToTree.spec.js.map