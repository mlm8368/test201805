import { $, viewEXT } from '../common/js/global.js'
// import Dot from 'dot'

export default class Abstract {
  /**
   * dot
   */
  public parseDot (file: string) {
  //   let templateSettings = {
  //     evaluate:    /\{\%([\s\S]+?)\%\}/g,
  //     interpolate: /\{\%=([\s\S]+?)\%\}/g,
  //     encode:      /\{\%!([\s\S]+?)\%\}/g,
  //     use:         /\{\%#([\s\S]+?)\%\}/g,
  //     define:      /\{\%##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\%\}/g,
  //     conditional: /\{\%\?(\?)?\s*([\s\S]*?)\s*\%\}/g,
  //     iterate:     /\{\%~\s*(?:\%\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\%\})/g,
  //     varname: 'it',
  //     strip: true,
  //     append: true,
  //     selfcontained: true,
  //     useParams: false
  //   }
 let templateSettings = {
			evaluate:    /\{\%([\s\S]+?(\}?)+)\%\}/g,
			interpolate: /\{\%=([\s\S]+?)\%\}/g,
			encode:      /\{\%!([\s\S]+?)\%\}/g,
			use:         /\{\%#([\s\S]+?)\%\}/g,
			useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
			define:      /\{\%##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\%\}/g,
			defineParams:/^\s*([\w$]+):([\s\S]+)/,
			conditional: /\{\%\?(\?)?\s*([\s\S]*?)\s*\%\}/g,
			iterate:     /\{\%~\s*(?:\%\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\%\})/g,
			varname:	"it",
			strip:		true,
			append:		true,
			selfcontained: false,
			doNotSkipEncoded: false
		}

let defs = {};
defs.loadfile = (file: string) => {
 let data = fs.readFileSync(path.resolve(__dirname, '../modules/') + file);
 if (data) return data.toString();
 return "file not found with path: " + file
}

     return Dot.template(‘{%#def.loadfile(‘{$file}’)%}’, templateSettings, defs)
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
  public toast (message: string, options?: any) {
    $.plus.nativeUI.toast(message, options)
  }
  /**
   * isLogin
   */
  public isLogin (): boolean {
    if (this.getStorage('accessToken')) return true
    return false
  }
  /**
   * logout
   */
  public logout () {
    this.rmStorage('userid')
    this.rmStorage('username')
    this.rmStorage('accessToken')
    // this.rmStorage('student')
    // this.rmStorage('classes')
    this.rmStorage('groupid')
    this.rmStorage('area')
    this.rmStorage('areaid')
    this.rmStorage('userInfo')
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
  public getDateDiff (dateTimeStamp: number): string {
  	if (!dateTimeStamp) return '-'

    let now = new Date().getTime()
    let diffValue = now - dateTimeStamp
    if (diffValue < 0) return '刚刚'
    let minute = 60000
    let hour = 3600000
    let day = 86400000
    let week = 604800000
    let month = 2592000000
    let year = 31104000000

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
   * gender
   */
  public getGender (gender: number, typeid = 0): string {
    let genderName = []
    genderName.push({ 1 : '男', 2 : '女' })

    return genderName[typeid][gender]
  }
}
