"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countNodes = exports.arrayToTree = void 0;
var defaultConfig = {
    id: "id",
    parentId: "parentId",
    dataField: "data",
    childrenField: "children",
    throwIfOrphans: false,
    rootParentIds: { "": true },
    nestedIds: true,
    assign: false,
};
/**
 * Unflattens an array to a tree with runtime O(n)
 */
function arrayToTree(items, config) {
    var _a, _b, _c, _d;
    if (config === void 0) { config = {}; }
    var conf = __assign(__assign({}, defaultConfig), config);
    // the resulting unflattened tree
    var rootItems = [];
    // stores all already processed items with their ids as key so we can easily look them up
    var lookup = {};
    // stores all item ids that have not been added to the resulting unflattened tree yet
    // this is an opt-in property, since it has a slight runtime overhead
    var orphanIds = conf.throwIfOrphans
        ? new Set()
        : null;
    // idea of this loop:
    // whenever an item has a parent, but the parent is not yet in the lookup object, we store a preliminary parent
    // in the lookup object and fill it with the data of the parent later
    // if an item has no parentId, add it as a root element to rootItems
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var itemId = conf.nestedIds
            ? getNestedProperty(item, conf.id)
            : item[conf.id];
        var parentId = conf.nestedIds
            ? getNestedProperty(item, conf.parentId)
            : item[conf.parentId];
        if (conf.rootParentIds[itemId]) {
            throw new Error("The item array contains a node whose parentId both exists in another node and is in " +
                "`rootParentIds` (`itemId`: \"".concat(itemId, "\", `rootParentIds`: ").concat(Object.keys(conf.rootParentIds)
                    .map(function (r) { return "\"".concat(r, "\""); })
                    .join(", "), ")."));
        }
        // look whether item already exists in the lookup table
        if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
            // item is not yet there, so add a preliminary item (its data will be added later)
            lookup[itemId] = (_a = {}, _a[conf.childrenField] = [], _a);
        }
        // if we track orphans, delete this item from the orphan set if it is in it
        if (orphanIds) {
            orphanIds.delete(itemId);
        }
        // add the current item's data to the item in the lookup table
        if (conf.dataField) {
            lookup[itemId][conf.dataField] = item;
        }
        else if (conf.assign) {
            lookup[itemId] = Object.assign(item, (_b = {},
                _b[conf.childrenField] = lookup[itemId][conf.childrenField],
                _b));
        }
        else {
            lookup[itemId] = __assign(__assign({}, item), (_c = {}, _c[conf.childrenField] = lookup[itemId][conf.childrenField], _c));
        }
        var treeItem = lookup[itemId];
        if (parentId === null ||
            parentId === undefined ||
            conf.rootParentIds[parentId]) {
            // is a root item
            rootItems.push(treeItem);
        }
        else {
            // has a parent
            // look whether the parent already exists in the lookup table
            if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
                // parent is not yet there, so add a preliminary parent (its data will be added later)
                lookup[parentId] = (_d = {}, _d[conf.childrenField] = [], _d);
                // if we track orphans, add the generated parent to the orphan list
                if (orphanIds) {
                    orphanIds.add(parentId);
                }
            }
            // add the current item to the parent
            lookup[parentId][conf.childrenField].push(treeItem);
        }
    }
    if (orphanIds === null || orphanIds === void 0 ? void 0 : orphanIds.size) {
        throw new Error("The items array contains orphans that point to the following parentIds: " +
            "[".concat(Array.from(orphanIds), "]. These parentIds do not exist in the items array. Hint: prevent orphans to result ") +
            "in an error by passing the following option: { throwIfOrphans: false }");
    }
    if (conf.throwIfOrphans &&
        countNodes(rootItems, conf.childrenField) < Object.keys(lookup).length) {
        throw new Error("The items array contains nodes with a circular parent/child relationship.");
    }
    return rootItems;
}
exports.arrayToTree = arrayToTree;
/**
 * Returns the number of nodes in a tree in a recursive way
 * @param tree An array of nodes (tree items), each having a field `childrenField` that contains an array of nodes
 * @param childrenField Name of the property that contains the array of child nodes
 * @returns Number of nodes in the tree
 */
function countNodes(tree, childrenField) {
    return tree.reduce(function (sum, n) {
        return sum +
            1 +
            (n[childrenField] && countNodes(n[childrenField], childrenField));
    }, 0);
}
exports.countNodes = countNodes;
/**
 * Returns the value of a nested property inside an item
 * Example: user can access 'id', or 'parentId' inside item = { nestedObject: { id: 'myId', parentId: 'myParentId' } }
 * using getNestedItemProperty(item, 'nestedObject.id') or getNestedItemProperty(item, 'nestedObject.parentId')
 * @param item
 * @param nestedProperty the chained properties to access the nested property. Eg: 'your.nested.property'
 */
function getNestedProperty(item, nestedProperty) {
    return nestedProperty.split(".").reduce(function (o, i) { return o && o[i]; }, item);
}
//# sourceMappingURL=arrayToTree.js.map