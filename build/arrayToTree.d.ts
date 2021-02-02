export interface Item {
    id?: string | number;
    parentId?: string | number | null;
    [key: string]: any;
}
export interface TreeItem {
    id?: string | number;
    parentId?: string | number | null;
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
}
/**
 * Unflattens an array to a tree with runtime O(n)
 */
export declare function arrayToTree(items: Item[], config?: Partial<Config>): TreeItem[];
