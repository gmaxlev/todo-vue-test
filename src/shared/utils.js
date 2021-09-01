/**
 * Create unique id for some data
 * @param {Function} checkFn - Callback function that accepts generated id for checking unique
 * @returns {number} generated id
 */
export function createUniqueId(checkFn) {
  let newId = null;
  do {
    const tryCreateId = Math.random();
    if (checkFn(tryCreateId)) {
      newId = tryCreateId;
    }
  } while (newId === null);
  return newId;
}

/**
 * Create deep clone from object
 * @param {Object} data
 * @returns {{}|*} Clone
 */
export function cloneDeep(data) {
  let obj;
  if (Array.isArray(data)) {
    obj = [];
  } else if (typeof data === "object" && data !== null) {
    obj = {};
  } else {
    return data;
  }
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      obj.push(cloneDeep(data[i]));
    }
  } else if (typeof data === "object" && data !== null) {
    for (let key in data) {
      obj[key] = cloneDeep(data[key]);
    }
  }
  return obj;
}
