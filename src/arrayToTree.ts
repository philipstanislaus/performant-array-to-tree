export interface Item {
  id?: string | number
  parentId?: string | number | null,
  [key: string]: any,
}

export interface TreeItem {
  id?: string | number,
  parentId?: string | number | null,
  [key: string]: Item | TreeItem[] | any,
}

export interface Config {
  id: string,
  parentId: string,
  dataField: string | null,
  childrenField: string,
  throwIfOrphans: boolean,
}

const defaultConfig: Config = {
  id: 'id',
  parentId: 'parentId',
  dataField: 'data',
  childrenField: 'children',
  throwIfOrphans: false,
}

/**
 * Unflattens an array to a tree with runtime O(n)
 */
export function arrayToTree (items: Item[], config: Partial<Config> = {}): TreeItem[] {
  const conf: Config = { ...defaultConfig, ...config }

  // the resulting unflattened tree
  const rootItems: TreeItem[] = []

  // stores all already processed items with their ids as key so we can easily look them up
  const lookup: { [id: string]: TreeItem } = {}

  // stores all item ids that have not been added to the resulting unflattened tree yet
  // this is an opt-in property, since it has a slight runtime overhead
  const orphanIds: null | Set<string | number> = config.throwIfOrphans ? new Set() : null

  // idea of this loop:
  // whenever an item has a parent, but the parent is not yet in the lookup object, we store a preliminary parent
  // in the lookup object and fill it with the data of the parent later
  // if an item has no parentId, add it as a root element to rootItems
  for (const item of items) {
    const itemId = item[conf.id]
    const parentId = item[conf.parentId]

    // look whether item already exists in the lookup table
    if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
      // item is not yet there, so add a preliminary item (its data will be added later)
      lookup[itemId] = { [conf.childrenField]: [] }
    }

    // if we track orphans, delete this item from the orphan set if it is in it
    if (orphanIds) { orphanIds.delete(parentId) }

    // add the current item's data to the item in the lookup table
    if (conf.dataField) {
      lookup[itemId][conf.dataField] = item
    } else {
      lookup[itemId] = { ...item, [conf.childrenField]: lookup[itemId][conf.childrenField] }
    }

    const TreeItem = lookup[itemId]

    if (parentId === null || parentId === undefined || parentId === '') {
      // is a root item
      rootItems.push(TreeItem)
    } else {
      // has a parent

      // look whether the parent already exists in the lookup table
      if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
        // parent is not yet there, so add a preliminary parent (its data will be added later)
        lookup[parentId] = { [conf.childrenField]: [] }

        // if we track orphans, add the generated parent to the orphan list
        if (orphanIds) { orphanIds.add(parentId) }
      }

      // add the current item to the parent
      lookup[parentId][conf.childrenField].push(TreeItem)
    }
  }

  if (orphanIds?.size) {
    throw new Error(`The items array contains orphans that point to the following parentIds: ` +
      `[${Array.from(orphanIds)}]. These parentIds do not exist in the items array. Hint: prevent orphans to result ` +
      `in an error by passing the following option: { throwIfOrphans: false }`)
  }

  return rootItems
}
