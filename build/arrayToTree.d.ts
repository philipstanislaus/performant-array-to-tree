export interface Item {
    [key: string]: any;
}
export interface TreeItem {
    [key: string]: Item | TreeItem[] | any;
}
export interface Config {
    id: string;
    parentId: string;
    dataField: string | null;
    childrenField: string;
    throwIfOrphans: boolean;
    rootParentIds: {
        [rootParentId: string]: true;
    };
    nestedIds: boolean;
    assign: boolean;
}
/**
 * Unflattens an array to a tree with runtime O(n)
 */
export declare function arrayToTree(items: Item[], config?: Partial<Config>): TreeItem[];
/**
 * Returns the number of nodes in a tree in a recursive way
 * @param tree An array of nodes (tree items), each having a field `childrenField` that contains an array of nodes
 * @param childrenField Name of the property that contains the array of child nodes
 * @returns Number of nodes in the tree
 */
export declare function countNodes(tree: TreeItem[], childrenField: string): number;
