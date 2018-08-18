import { $, viewEXT } from '../common/js/global.js'
import * as config from './config'
import 	Abstract from './abstract.class'
import { appCacheKey, appStorageKey } from './enum'

export default class School extends Abstract {
  constructor () {
    super()
  }

  public getClasses (callback: (lists: any[]) => void) {
    const lists = this.cacheClasses('get')
    if (lists !== null) {
      callback(lists)
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=list', null, (ret) => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.cacheClasses('set', ret.lists)
      }
    }, 'json')
  }

/**
 * 班级缓存方法
 *
 * @param {string} op get/set
 * @param {*} [lists=null]
 * @returns
 * @memberof School
 */
  public cacheClasses (op: string, lists = null) {
    const schoolid = this.getStorage(appStorageKey.userid)
    // const schoolid = 2
    const cacheParam = schoolid
    let classes = null

    if (op === 'get') {
      classes = this._cache().get(appCacheKey.sbaobao_baobao_parentes_schools)
      if (classes !== null) return classes.value
      else return null
    } else if (op === 'set') {
      classes = { param: cacheParam, value: lists }
      this._cache().set(appCacheKey.sbaobao_baobao_parentes_schools, classes)
    }
  }
}
