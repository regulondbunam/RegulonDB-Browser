export const ACTION = {
    SEARCH: 0,
    UPDATE_RESULTS: 1
}

export function countResults(count = {}) {
    let _count = 0
    Object.keys(count).forEach(result => {
      _count += count[result]
    });
    return _count
  }