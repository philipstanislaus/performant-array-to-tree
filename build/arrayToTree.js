"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Unflattens an array to a tree with runtime O(n)
 */
function arrayToTree(items, config) {
    if (config === void 0) { config = { id: 'id', parentId: 'parentId' }; }
    // the resulting unflattened tree
    var rootItems = [];
    // stores all already processed items with ther ids as key so we can easily look them up
    var lookup = {};
    // idea of this loop:
    // whenever an item has a parent, but the parent is not yet in the lookup object, we store a preliminary parent
    // in the lookup object and fill it with the data of the parent later
    // if an item has no parentId, add it as a root element to rootItems
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var itemId = item[config.id];
        var parentId = item[config.parentId];
        // look whether item already exists in the lookup table
        if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
            // item is not yet there, so add a preliminary item (its data will be added later)
            lookup[itemId] = { data: null, children: [] };
        }
        // add the current item's data to the item in the lookup table
        lookup[itemId].data = item;
        var TreeItem = lookup[itemId];
        if (parentId === null) {
            // is a root item
            rootItems.push(TreeItem);
        }
        else {
            // has a parent
            // look whether the parent already exists in the lookup table
            if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
                // parent is not yet there, so add a preliminary parent (its data will be added later)
                lookup[parentId] = { data: null, children: [] };
            }
            // add the current item to the parent
            lookup[parentId].children.push(TreeItem);
        }
    }
    return rootItems;
}
exports.arrayToTree = arrayToTree;
//# sourceMappingURL=arrayToTree.js.map