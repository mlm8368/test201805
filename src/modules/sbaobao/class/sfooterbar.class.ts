import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../../home/login/config'
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

  /**
   * updateSubNViews
   */
  public updateSubNViews (schoolFirstchar: string, classesFirstchar: string) {
    let tags = config.barTagsStudent
    tags[2]['text'] = schoolFirstchar
    tags[4]['text'] = classesFirstchar
    $.currentWebview.setStyle({ subNViews: [{ tags: tags }] })
    tags[0]['textStyles']['color'] = this.props.activeColor
    tags[1]['textStyles']['color'] = this.props.activeColor
    $.currentWebview.updateSubNViews([{ id: 'tabBarStudent', tags: tags }])
  }
}
