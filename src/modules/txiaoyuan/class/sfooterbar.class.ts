import { $, viewEXT } from '../../../common/js/global.js'
import { FooterbarConfig } from '../../../class/interface'
import Footerbar from '../../../class/footerbar.class'

export default class SFooterbar extends Footerbar {
  constructor (props: FooterbarConfig) {
    super(props)
  }
  /**
   * 获取当前点击tab
   * @param {number} pageW
   * @param {number} clientX
   * @returns {number}
   * @memberof StuFooterbar
   */
  public getCurrIndex (pageW: number, clientX: number): number {
    let currIndex = 0
    if (clientX > 0 && clientX <= pageW * 0.20) {
      currIndex = 0
    } else if (clientX > pageW * 0.20 && clientX <= pageW * 0.40) {
      currIndex = 1
    } else if (clientX > pageW * 0.40 && clientX <= pageW * 0.60) {
      currIndex = 2
    } else if (clientX > pageW * 0.60 && clientX <= pageW * 0.80) {
      currIndex = 3
    } else {
      currIndex = 4
    }
    return currIndex
  }
}
