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
var defaultConfig = {
    id: 'id',
    parentId: 'parentId',
    dataField: 'data',
    childrenField: 'children',
    throwIfOrphans: false,
};
/**
 * Unflattens an array to a tree with runtime O(n)
 */
function arrayToTree(items, config) {
    var _a, _b, _c;
    if (config === void 0) { config = {}; }
    var _d;
    var conf = __assign(__assign({}, defaultConfig), config);
    // the resulting unflattened tree
    var rootItems = [];
    // stores all already processed items with their ids as key so we can easily look them up
    var lookup = {};
    // stores all item ids that have not been added to the resulting unflattened tree yet
    // this is an opt-in property, since it has a slight runtime overhead
    var orphanIds = config.throwIfOrphans ? new Set() : null;
    // idea of this loop:
    // whenever an item has a parent, but the parent is not yet in the lookup object, we store a preliminary parent
    // in the lookup object and fill it with the data of the parent later
    // if an item has no parentId, add it as a root element to rootItems
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var itemId = item[conf.id];
        var parentId = item[conf.parentId];
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
        else {
            lookup[itemId] = __assign(__assign({}, item), (_b = {}, _b[conf.childrenField] = lookup[itemId][conf.childrenField], _b));
        }
        var TreeItem = lookup[itemId];
        if (parentId === null || parentId === undefined || parentId === '') {
            // is a root item
            rootItems.push(TreeItem);
        }
        else {
            // has a parent
            // look whether the parent already exists in the lookup table
            if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
                // parent is not yet there, so add a preliminary parent (its data will be added later)
                lookup[parentId] = (_c = {}, _c[conf.childrenField] = [], _c);
                // if we track orphans, add the generated parent to the orphan list
                if (orphanIds) {
                    orphanIds.add(parentId);
                }
            }
            // add the current item to the parent
            lookup[parentId][conf.childrenField].push(TreeItem);
        }
    }
    if ((_d = orphanIds) === null || _d === void 0 ? void 0 : _d.size) {
        throw new Error("The items array contains orphans that point to the following parentIds: " +
            ("[" + Array.from(orphanIds) + "]. These parentIds do not exist in the items array. Hint: prevent orphans to result ") +
            "in an error by passing the following option: { throwIfOrphans: false }");
    }
    return rootItems;
}
exports.arrayToTree = arrayToTree;
//# sourceMappingURL=arrayToTree.js.map