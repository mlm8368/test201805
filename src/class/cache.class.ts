import { $, nodeEnv } from '../common/js/global.js'
import { appCacheKey } from './enum'

export default class Cache {
  private preKey = 'appCacheKey'
  /**
   * getItem
   */
  public get (key: appCacheKey, key2 = ''): {param: string, values: any} {
    // if (nodeEnv === 'development') return null // test
    if (key) return null // test
    let value = $.plus.storage.getItem(this.preKey + key + key2)
    if (value === null) return null
    else if (value.expires > 0 && value.expires < new Date().getTime()) return null
    else return JSON.parse(value)
  }

  /**
   * setItem
   */
  public set (key: appCacheKey, value: {param: string, values: any}, expires = 0, key2 = '') {
    if (nodeEnv === 'development') return null // test
    if (expires > 0) expires = new Date().getTime() + expires * 1000
    value['expires'] = expires

    let valueJson = JSON.stringify(value)
    $.plus.storage.setItem(this.preKey + key + key2, valueJson)
  }

  /**
   * removeItem
   */
  public remove (key: appCacheKey) {
    $.plus.storage.removeItem(this.preKey + key)
  }

  /**
   * clear
   */
  public clearAll () {
    $.plus.storage.clear()
  }

  private setCacheKeys (key: appCacheKey, expires: number) {
    const cacheKey = 'collectAllCacheKeys'
    if (expires > 0) expires = new Date().getTime() + expires * 1000

    let allKeys = $.plus.storage.getItem(cacheKey)
    if (allKeys === null) allKeys = {}
    else allKeys = JSON.parse(allKeys)

    allKeys[this.preKey + key] = expires
    $.plus.storage.setItem(cacheKey, JSON.stringify(allKeys))
  }
}
