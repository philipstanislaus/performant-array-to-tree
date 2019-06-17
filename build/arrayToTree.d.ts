export interface Item {
    id: string;
    parentId: string | null;
    [key: string]: any;
}
export interface TreeItem {
    data: Item | null;
    children: TreeItem[];
}
export interface Config {
    id: string;
    parentId: string;
}
/**
 * Unflattens an array to a tree with runtime O(n)
 */
export declare function arrayToTree(items: Item[], config?: Config): TreeItem[];
