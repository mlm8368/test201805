import { $ } from '../common/js/global.js'
export default class Cache {
  /**
   * getItem
   */
  public getItem (key: string) {
    let value = $.plus.storage.getItem(key)
    if (value === null) return null
    else return JSON.parse(value)
  }

  /**
   * setItem
   */
  public setItem (key: string, value: any[], expires = 86400) {
    this.setCacheKeys(key, expires)

    let valueJson = JSON.stringify(value)
    $.plus.storage.setItem(key, valueJson)
  }

  /**
   * removeItem
   */
  public removeItem (key: string) {
    $.plus.storage.removeItem(key)
  }

  /**
   * clear
   */
  public clear () {
    $.plus.storage.clear()
  }

  private setCacheKeys (key: string, expires: number) {
    const cacheKey = 'collectAllCacheKeys'
    if (expires > 0) expires = new Date().getTime() + expires * 1000

    let allKeys = $.plus.storage.getItem(cacheKey)
    if (allKeys === null) allKeys = {}
    else allKeys = JSON.parse(allKeys)

    allKeys[key] = expires
    $.plus.storage.setItem(cacheKey, JSON.stringify(allKeys))
  }
}
