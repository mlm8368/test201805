export default class Abstract {
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
}
