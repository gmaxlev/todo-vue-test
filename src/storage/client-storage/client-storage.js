/**
 * A universal data storage
 */
export default class ClientStorage {
  driver;

  static TEST_DELAY_MS = 300;

  constructor(driver) {
    this.driver = driver;
    // Try connect to the driver
    this.driver.connect();
  }

  /**
   * Add data by key
   * @param key Key
   * @param value Value
   * @returns {Promise<unknown>}
   */
  add(key, value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.driver.add(key, value));
      }, ClientStorage.TEST_DELAY_MS);
    });
  }

  /**
   * Add or replace data by key
   * @param key
   * @param value
   * @returns {Promise<unknown>}
   */
  addOrReplace(key, value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.driver.addOrReplace(key, value));
      }, ClientStorage.TEST_DELAY_MS);
    });
  }

  /**
   * Get value by key
   * @param key
   * @returns {Promise<unknown>}
   */
  get(key) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.driver.get(key));
      }, ClientStorage.TEST_DELAY_MS);
    });
  }

  /**
   * Delete data by key
   * @param key
   * @returns {Promise<unknown>}
   */
  delete(key) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.driver.delete(key));
      }, ClientStorage.TEST_DELAY_MS);
    });
  }
}
