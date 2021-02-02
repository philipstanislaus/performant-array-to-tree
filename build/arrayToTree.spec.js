"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var arrayToTree_1 = require("./arrayToTree");
describe("arrayToTree", function () {
    it("should work with nested objects", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "4", parentId: null, custom: "abc" },
            { id: "31", parentId: "4", custom: "12" },
            { id: "1941", parentId: "418", custom: "de" },
            { id: "1", parentId: "418", custom: "ZZZz" },
            { id: "418", parentId: null, custom: "ü" },
        ])).to.deep.equal([
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
        ]);
    });
    it("should work with integer keys", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: 4, parentId: null, custom: "abc" },
            { id: 31, parentId: 4, custom: "12" },
            { id: 1941, parentId: 418, custom: "de" },
            { id: 1, parentId: 418, custom: "ZZZz" },
            { id: 418, parentId: null, custom: "ü" },
        ])).to.deep.equal([
            {
                data: { id: 4, parentId: null, custom: "abc" },
                children: [
                    { data: { id: 31, parentId: 4, custom: "12" }, children: [] },
                ],
            },
            {
                data: { id: 418, parentId: null, custom: "ü" },
                children: [
                    { data: { id: 1941, parentId: 418, custom: "de" }, children: [] },
                    { data: { id: 1, parentId: 418, custom: "ZZZz" }, children: [] },
                ],
            },
        ]);
    });
    it("should work with nested objects and custom keys", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { num: "4", ref: null, custom: "abc" },
            { num: "31", ref: "4", custom: "12" },
            { num: "1941", ref: "418", custom: "de" },
            { num: "1", ref: "418", custom: "ZZZz" },
            { num: "418", ref: null, custom: "ü" },
        ], { id: "num", parentId: "ref", childrenField: "nodes" })).to.deep.equal([
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
        ]);
    });
    it("should ignore objects if parentId does not exist", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "4", parentId: null, custom: "abc" },
            { id: "31", parentId: "4", custom: "12" },
            { id: "1941", parentId: "418", custom: "de" },
            { id: "1", parentId: "418", custom: "ZZZz" },
            { id: "418", parentId: null, custom: "ü" },
            { id: "1313", parentId: "13", custom: "Not existing" },
        ])).to.deep.equal([
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
        ]);
    });
    it("should work with nested objects with dataField set to null", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "4", parentId: null, custom: "abc" },
            { id: "31", parentId: "4", custom: "12" },
            { id: "1941", parentId: "418", custom: "de" },
            { id: "1", parentId: "418", custom: "ZZZz" },
            { id: "418", parentId: null, custom: "ü" },
        ], { dataField: null })).to.deep.equal([
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
        ]);
    });
    it("should work with nested objects and custom keys with dataField set to null", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { num: "4", ref: null, custom: "abc" },
            { num: "31", ref: "4", custom: "12" },
            { num: "1941", ref: "418", custom: "de" },
            { num: "1", ref: "418", custom: "ZZZz" },
            { num: "418", ref: null, custom: "ü" },
        ], { id: "num", parentId: "ref", dataField: null })).to.deep.equal([
            {
                num: "4",
                ref: null,
                custom: "abc",
                children: [{ num: "31", ref: "4", custom: "12", children: [] }],
            },
            {
                num: "418",
                ref: null,
                custom: "ü",
                children: [
                    { num: "1941", ref: "418", custom: "de", children: [] },
                    { num: "1", ref: "418", custom: "ZZZz", children: [] },
                ],
            },
        ]);
    });
    it("should ignore objects if parentId does not exist with dataField set to null", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "4", parentId: null, custom: "abc" },
            { id: "31", parentId: "4", custom: "12" },
            { id: "1941", parentId: "418", custom: "de" },
            { id: "1", parentId: "418", custom: "ZZZz" },
            { id: "418", parentId: null, custom: "ü" },
            { id: "1313", parentId: "13", custom: "Not existing" },
        ], { dataField: null })).to.deep.equal([
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
        ]);
    });
    it("should treat objects with missing parentId as root objects", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "4", custom: "abc" },
            { id: "31", parentId: "4", custom: "12" },
            { id: "1941", parentId: "418", custom: "de" },
            { id: "1", parentId: "418", custom: "ZZZz" },
            { id: "418", custom: "ü" },
            { id: "1313", parentId: "13", custom: "Not existing" },
        ])).to.deep.equal([
            {
                data: { id: "4", custom: "abc" },
                children: [
                    { data: { id: "31", parentId: "4", custom: "12" }, children: [] },
                ],
            },
            {
                data: { id: "418", custom: "ü" },
                children: [
                    { data: { id: "1941", parentId: "418", custom: "de" }, children: [] },
                    { data: { id: "1", parentId: "418", custom: "ZZZz" }, children: [] },
                ],
            },
        ]);
    });
    it("should treat objects with empty string as parentId as root objects", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "4", parentId: "", custom: "abc" },
            { id: "31", parentId: "4", custom: "12" },
            { id: "1941", parentId: "418", custom: "de" },
            { id: "1", parentId: "418", custom: "ZZZz" },
            { id: "418", parentId: "", custom: "ü" },
            { id: "1313", parentId: "13", custom: "Not existing" },
        ])).to.deep.equal([
            {
                data: { id: "4", parentId: "", custom: "abc" },
                children: [
                    { data: { id: "31", parentId: "4", custom: "12" }, children: [] },
                ],
            },
            {
                data: { id: "418", parentId: "", custom: "ü" },
                children: [
                    { data: { id: "1941", parentId: "418", custom: "de" }, children: [] },
                    { data: { id: "1", parentId: "418", custom: "ZZZz" }, children: [] },
                ],
            },
        ]);
    });
    it("should treat objects with non-zero length string as parentId as root objects if these parent ids are in rootParentIds", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "4", parentId: "orphan1", custom: "abc" },
            { id: "31", parentId: "4", custom: "12" },
            { id: "1941", parentId: "418", custom: "de" },
            { id: "1", parentId: "418", custom: "ZZZz" },
            { id: "418", parentId: "orphan2", custom: "ü" },
            { id: "1313", parentId: "orphan3", custom: "will be ignored" },
        ], {
            rootParentIds: { "": true, orphan1: true, orphan2: true },
        })).to.deep.equal([
            {
                data: { id: "4", parentId: "orphan1", custom: "abc" },
                children: [
                    { data: { id: "31", parentId: "4", custom: "12" }, children: [] },
                ],
            },
            {
                data: { id: "418", parentId: "orphan2", custom: "ü" },
                children: [
                    { data: { id: "1941", parentId: "418", custom: "de" }, children: [] },
                    { data: { id: "1", parentId: "418", custom: "ZZZz" }, children: [] },
                ],
            },
        ]);
    });
    it("should not throw if orphans exist but throwIfOrphans is false", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "4", parentId: null, custom: "abc" },
            { id: "31", parentId: "4", custom: "12" },
            { id: "418", parentId: "6", custom: "ü" },
        ])).to.deep.equal([
            {
                data: { id: "4", parentId: null, custom: "abc" },
                children: [
                    { data: { id: "31", parentId: "4", custom: "12" }, children: [] },
                ],
            },
        ]);
    });
    it("should throw if orphans exist and throwIfOrphans is true", function () {
        chai_1.expect(function () {
            return arrayToTree_1.arrayToTree([
                { id: "4", parentId: null, custom: "abc" },
                { id: "31", parentId: "4", custom: "12" },
                { id: "418", parentId: "6", custom: "ü" },
                { id: "419", parentId: "418", custom: "ü" },
                { id: "420", parentId: "7", custom: "ü" },
            ], { throwIfOrphans: true });
        }).to.throw("The items array contains orphans that point to the following parentIds: [6,7]. " +
            "These parentIds do not exist in the items array. " +
            "Hint: prevent orphans to result in an error by passing the following option: { throwIfOrphans: false }");
    });
    it("should not throw if no orphans exist and throwIfOrphans is true, but the order is different (see #18)", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "2", parentId: "root", foo: "bar" },
            { id: "1-1", parentId: "1", foo: "bar" },
            { id: "1", parentId: "root", foo: "bar" },
            { id: "root", parentId: null, bar: "bar" },
        ], { dataField: null, throwIfOrphans: true })).to.deep.equal([
            {
                id: "root",
                parentId: null,
                bar: "bar",
                children: [
                    { id: "2", parentId: "root", foo: "bar", children: [] },
                    {
                        id: "1",
                        parentId: "root",
                        foo: "bar",
                        children: [{ id: "1-1", parentId: "1", foo: "bar", children: [] }],
                    },
                ],
            },
        ]);
    });
    it("should throw if orphans exist and throwIfOrphans is true and rootParentIds don't contain orphan parentId", function () {
        chai_1.expect(function () {
            return arrayToTree_1.arrayToTree([
                { id: "4", parentId: null, custom: "abc" },
                { id: "31", parentId: "4", custom: "12" },
                { id: "418", parentId: "6", custom: "ü" },
                { id: "419", parentId: "418", custom: "ü" },
                { id: "420", parentId: "7", custom: "ü" },
            ], {
                rootParentIds: { "": true, "6": true },
                throwIfOrphans: true,
            });
        }).to.throw("The items array contains orphans that point to the following parentIds: [7]. " +
            "These parentIds do not exist in the items array. " +
            "Hint: prevent orphans to result in an error by passing the following option: { throwIfOrphans: false }");
    });
    it("should throw if a node has parentId that both exists in another node and is in rootParentIds", function () {
        chai_1.expect(function () {
            return arrayToTree_1.arrayToTree([
                { id: "fakeOrphan", parentId: null },
                { id: "aaa", parentId: "fakeOrphan" },
                { id: "bbb", parentId: "aaa" },
                { id: "ccc", parentId: "bbb" },
            ], {
                rootParentIds: { "": true, fakeOrphan: true },
                throwIfOrphans: true,
            });
        }).to.throw("The item array contains a node whose parentId both exists in another node and is in `rootParentIds` " +
            '(`itemId`: "fakeOrphan", `rootParentIds`: "", "fakeOrphan").');
    });
    it("should replace default rootParentIds by the provided value", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "4", parentId: "", custom: "abc" },
            { id: "31", parentId: "4", custom: "12" },
            { id: "418", parentId: "6", custom: "ü" },
        ], {
            rootParentIds: { "6": true },
        })).to.deep.equal([
            { data: { id: "418", parentId: "6", custom: "ü" }, children: [] },
        ]);
    });
    it("should work with empty inputs", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([])).to.deep.equal([]);
    });
    it("should work with nested objects and nested id and parentId properties", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { nested: { id: "1", parentId: null, custom: "1" } },
            { nested: { id: "1.1", parentId: "1", custom: "1.1" } },
            { nested: { id: "1.1.1", parentId: "1.1", custom: "1.1.1" } },
            { nested: { id: "1.2", parentId: "1", custom: "1.2" } },
            { nested: { id: "2", parentId: null, custom: "2" } },
        ], { id: "nested.id", parentId: "nested.parentId" })).to.deep.equal([
            {
                data: { nested: { id: "1", parentId: null, custom: "1" } },
                children: [
                    {
                        data: { nested: { id: "1.1", parentId: "1", custom: "1.1" } },
                        children: [
                            {
                                data: {
                                    nested: { id: "1.1.1", parentId: "1.1", custom: "1.1.1" },
                                },
                                children: [],
                            },
                        ],
                    },
                    {
                        data: { nested: { id: "1.2", parentId: "1", custom: "1.2" } },
                        children: [],
                    },
                ],
            },
            {
                data: { nested: { id: "2", parentId: null, custom: "2" } },
                children: [],
            },
        ]);
    });
    it("should work with nested id property", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { one: { id: "1" }, parentId: null, custom: "1" },
            { one: { id: "1.1" }, parentId: "1", custom: "1.1" },
        ], { id: "one.id", parentId: "parentId" })).to.deep.equal([
            {
                data: { one: { id: "1" }, parentId: null, custom: "1" },
                children: [
                    {
                        data: { one: { id: "1.1" }, parentId: "1", custom: "1.1" },
                        children: [],
                    },
                ],
            },
        ]);
    });
    it("should work with nested parentId property", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { id: "1", two: { parentId: null }, custom: "1" },
            { id: "1.1", two: { parentId: "1" }, custom: "1.1" },
        ], { id: "id", parentId: "two.parentId" })).to.deep.equal([
            {
                data: { id: "1", two: { parentId: null }, custom: "1" },
                children: [
                    {
                        data: { id: "1.1", two: { parentId: "1" }, custom: "1.1" },
                        children: [],
                    },
                ],
            },
        ]);
    });
    it("should work with nested id and parentId properties", function () {
        chai_1.expect(arrayToTree_1.arrayToTree([
            { one: { id: "1" }, two: { parentId: null }, custom: "1" },
            { one: { id: "1.1" }, two: { parentId: "1" }, custom: "1.1" },
        ], { id: "one.id", parentId: "two.parentId" })).to.deep.equal([
            {
                data: { one: { id: "1" }, two: { parentId: null }, custom: "1" },
                children: [
                    {
                        data: { one: { id: "1.1" }, two: { parentId: "1" }, custom: "1.1" },
                        children: [],
                    },
                ],
            },
        ]);
    });
});
//# sourceMappingURL=arrayToTree.spec.js.map