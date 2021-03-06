import { $, viewEXT, nodeEnv } from '../common/js/global.js'
import { appStorageKey } from './enum'
import Cache from './cache.class'

export default class Abstract {
  protected cache: Cache

  constructor () {
    $.plusReady(() => {
      if (!this.cache) this.cache = new Cache()
    })
  }

  /**
   * _cache
   */
  public _cache (): Cache {
    if (!this.cache) this.cache = new Cache()
    return this.cache
  }
  /**
   * byId
   */
  public byId (id: string) {
    return document.getElementById(id)
  }
  /**
   * closestElement
   */
  public closest (el, selector: string) {
    let doms
    let targetDom
    const isSame = (doms, el) => {
      let i = 0
      const len = doms.length
      for (i; i < len; i++) {
        if (doms[i].isEqualNode(el)) {
          return doms[i]
        }
      }
      return false
    }
    const traversal = (el, selector) => {
      doms = el.parentNode.querySelectorAll(selector)
      targetDom = isSame(doms, el)
      if (!targetDom) {
        el = el.parentNode
        if (el != null && el.nodeType === el.DOCUMENT_NODE) {
          return false
        }
        traversal(el, selector)
      }
      return targetDom
    }
    return traversal(el, selector)
  }
  /**
   * jsonToStr
   */
  public jsonToStr (json: object): string {
    return JSON && JSON.stringify(json)
  }
  /**
   * strToJson
   */
  public strToJson (str: string): object {
    return JSON && JSON.parse(str)
  }
  /**
   * objToArray
   */
  public objToArray (object = {}): any[] {
    let array = []
    for (const key in object) {
      array.push(object[key])
    }
    return array
  }
  /**
   * setStorage
   */
  public setStorage (key: string, value: any): void {
    if (typeof value === 'object') {
      if (value === null) {
        value = 'objnull-null'
      } else {
        value = JSON.stringify(value)
        value = 'obj-' + value
      }
    } else if (typeof value === 'number') {
      value = 'num-' + value
    } else if (typeof value === 'boolean') {
      if (value === false) value = 0
      else value = 1
      value = 'bool-' + value
    } else {
      value = 'str-' + value
    }
    localStorage[key] = value
  }
  /**
   * getStorage
   */
  public getStorage (key: string) {
    let v = localStorage[key]
    if (!v) return null
    if (v.indexOf('obj-') === 0) {
      v = v.slice(4)
      return JSON.parse(v)
    } else if (v.indexOf('str-') === 0) {
      return v.slice(4)
    } else if (v.indexOf('num-') === 0) {
      return Number(v.slice(4))
    } else if (v.indexOf('bool-') === 0) {
      return Boolean(v.slice(5))
    } else if (v.indexOf('objnull-') === 0) {
      return null
    }
  }
  /**
   * rmStorage
   */
  public rmStorage (key: string) {
    delete localStorage[key]
  }
  /**
   * alert
   */
  public alert (message: string, alertCB?: (event: Event) => void, title = '提示', buttonCapture = '知道了') {
    $.plus.nativeUI.alert(message, alertCB, title, buttonCapture)
  }
  /**
   * toast
   */
  public toast (message: string, options: any = null) {
    $.plus.nativeUI.toast(message, options)
  }
  /**
   * showWaiting
   */
  public showWaiting (title = '加载中...', options: any = null): { setTitle: (title: string) => void, close: () => void, onclose: any } {
    if (nodeEnv === 'production') return $.plus.nativeUI.showWaiting(title, options)
  }
  /**
   * closeWaitingAll
   */
  public closeWaitingAll (): void {
    if (nodeEnv === 'production') $.plus.nativeUI.closeWaiting()
  }
  /**
   * isLogin
   */
  public isLogin (): boolean {
    if (this.getStorage(appStorageKey.accessToken)) return true
    return false
  }
  /**
   * logout
   */
  public logout () {
    this.rmStorage(appStorageKey.userid)
    this.rmStorage(appStorageKey.username)
    this.rmStorage(appStorageKey.accessToken)
    this.rmStorage(appStorageKey.groupid)
    this.rmStorage(appStorageKey.area)
    this.rmStorage(appStorageKey.areaid)
    this.rmStorage(appStorageKey.userInfo)
  }
  /**
   * trim
   */
  public trim (str: string) {
    if (String.prototype.trim) {
      return str === null ? '' : String.prototype.trim.call(str)
    } else {
      return str.replace(/(^\s*)|(\s*$)/g, '')
    }
  }
  /**
   * getDateDiff
   * @param {number} dateTimeStamp
   * @returns {string}
   * @memberof Abstract
   */
  public getDateDiff (dateTimeStamp: number, now = 0): string {
  	if (!dateTimeStamp) return '-'

    if (now === 0) now = new Date().getTime()
    const diffValue = now - dateTimeStamp
    if (diffValue < 0) return '刚刚'
    const minute = 60000
    const hour = 3600000
    const day = 86400000
    const week = 604800000
    const month = 2592000000
    const year = 31104000000

    let yearC = diffValue / year
    if (yearC >= 1) {
      return '' + yearC + '年前'
    }
    let monthC = diffValue / month
    if (monthC >= 1) {
      return '' + monthC + '月前'
    }
    let weekC = diffValue / week
    if (weekC >= 1) {
      return '' + weekC + '周前'
    }
    let dayC = diffValue / day
    if (dayC >= 1) {
      return '' + dayC + '天前'
    }
    let hourC = diffValue / hour
    if (hourC >= 1) {
      return '' + hourC + '小时前'
    }
    let minC = diffValue / minute
    if (minC >= 1) {
      return '' + minC + '分钟前'
    }
    return '刚刚'
  }
  /**
   * 获取日期,格式2018-07-07
   *
   * @protected
   * @returns
   * @memberof Student
   */
  public getFormatDate (): string {
    const date = new Date()
    const seperator1 = '-'
    const month = date.getMonth() + 1
    let month2 = ''
    const strDate = date.getDate()
    let strDate2 = ''
    if (month >= 1 && month <= 9) month2 = '0' + month
    else month2 = '' + month
    if (strDate >= 0 && strDate <= 9) strDate2 = '0' + strDate
    else strDate2 = '' + strDate
    return date.getFullYear() + seperator1 + month2 + seperator1 + strDate2
  }
  /**
   * gender
   */
  public getGender (gender: number, typeid = 0): string {
    let genderName = []
    genderName.push({ 1 : '男', 2 : '女' })

    return genderName[typeid][gender]
  }
  public getAvatar (url: string): string {
    if (!url) url = '../../static/images/defaultAvatar.png'
    return url
  }
  public checkMobile (mobile: string): boolean {
    const mobileReg = /^1[0-9]{10}$/
    return mobileReg.test(mobile)
  }
}
