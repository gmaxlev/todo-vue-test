/**
 * Local storage driver for ClientStorage (universal data storage)
 */
export default class LocalStorageClientStorageDriver {
  /**
   * Check if localStorage exists
   * @returns {Promise<unknown>}
   */
  connect() {
    return new Promise((resolve, reject) => {
      if (localStorage) {
        resolve(localStorage);
      } else {
        reject(new Error("localStorage wasn't found"));
      }
    });
  }

  /**
   * Add data by key
   * return error is key has already existed
   * @param key Key
   * @param value Value
   * @returns {Promise<unknown>}
   */
  add(key, value) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(key) === undefined) {
        try {
          const savedValue = LocalStorageClientStorageDriver.localStorageValueFormatter(value);
          localStorage.setItem(key, savedValue);
          resolve(
            LocalStorageClientStorageDriver.localStorageValueParser(localStorage.getItem(key))
          );
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new Error(`Localstorage "${key}" has already existed`));
      }
    });
  }

  /**
   * Add or replace data by key
   * @param key
   * @param value
   * @returns {Promise<unknown>}
   */
  addOrReplace(key, value) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(
          key,
          LocalStorageClientStorageDriver.localStorageValueFormatter(value)
        );
        resolve(LocalStorageClientStorageDriver.localStorageValueParser(localStorage.getItem(key)));
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Get value by key
   * return error if key doesn't exists
   * @param key
   * @returns {Promise<unknown>}
   */
  get(key) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(key) === undefined) {
        reject(new Error(`Localstorage "${key}" doesn't exists`));
      } else {
        resolve(LocalStorageClientStorageDriver.localStorageValueParser(localStorage.getItem(key)));
      }
    });
  }

  /**
   * Delete data by key
   * return error if key doesn't exists
   * @param key
   * @returns {Promise<unknown>}
   */
  delete(key) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(key) === undefined) {
        reject(new Error(`Localstorage "${key}" doesn't exists`));
      } else {
        try {
          localStorage.removeItem(key);
          resolve(key);
        } catch (e) {
          reject(e);
        }
      }
    });
  }

  /**
   * Format data to JSON for storage
   * @param {any} value
   * @returns {string|*}
   */
  static localStorageValueFormatter(value) {
    return typeof value === "object" ? JSON.stringify(value) : value;
  }

  /**
   * Parse JSON or primitive data
   * @param {any} value
   * @returns {any}
   */
  static localStorageValueParser(value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
}
