import { $, viewEXT } from '../common/js/global.js'
import Abstract from './abstract.class'

export default class Student extends Abstract {
  /**
   * 获取日期,格式2018-07-07
   *
   * @protected
   * @returns
   * @memberof Student
   */
  protected getFormatDate (): string {
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
}
