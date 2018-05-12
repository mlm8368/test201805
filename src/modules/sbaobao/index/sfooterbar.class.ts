import { $, viewEXT } from '../../../common/js/global.js'
import {
  IdUrl,
  FooterbarConfig,
  Footerbar
} from '../../../class/footerbar.class'

export default class SFooterbar extends Footerbar {
  constructor (props: FooterbarConfig) {
    super(props)
  }
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
