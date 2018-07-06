import { $ } from '../../../common/js/global.js'
import * as config from '../school/config'
import Student from '../../../class/student.class'
import { appCacheKey } from '../../../class/enum'
import Cache from '../../../class/cache.class'
import { dotBaobao, dotParent, dotSchool } from '../baobao/dot.js'

export default class SBaobao extends Student {
  /**
   * getBaobao
   */
  public getBaobao (studentid: number) {
    let studentids = ''
    let parentuserids = ''
    let classesids = ''

    let userInfo = this.getStorage('userInfo')
    if (userInfo.student) {
      if (userInfo.student.studentids) studentids = userInfo.student.studentids
      if (userInfo.student.parentuserids) parentuserids = userInfo.student.parentuserids
      if (userInfo.student.classesids) classesids = userInfo.student.classesids
    } else {
      return
    }

    let baobaos = null
    let cache = new Cache()
    baobaos = cache.get(appCacheKey.sbaobao_baobao_parentes)
    if (baobaos !== null && baobaos.param === studentids + parentuserids + classesids) {
      this.renderBaobao(baobaos.values[studentid])
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=2&action=getbaobao', { studentids: studentids, classesid: classesid }, (ret) => {
      if (ret.status === 1) {
        // $.log(ret)
        baobaos = { param: studentids + parentuserids + classesids, values: ret.baobaos }
        this.renderBaobao(baobaos.values[studentid])
        cache.set(appCacheKey.sbaobao_baobao_parentes, baobaos)
      }
    }, 'json')
  }

  /**
   * renderBaobao
   */
  public renderBaobao (baobao) {
    if (!baobao) return

    let classesid: number = this.getStorage('currentClassesid')

    this.byId('attending').innerHTML = schoolHtmlDoing

  }
}
