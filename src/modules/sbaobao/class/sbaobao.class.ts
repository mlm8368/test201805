import { $ } from '../../../common/js/global.js'
import * as config from '../school/config'
import Student from '../../../class/student.class'
import { appCacheKey } from '../../../class/enum'
import Cache from '../../../class/cache.class'
import * as dot from '../baobao/dot.js'

export default class SBaobao extends Student {
  /**
   * getBaobao
   */
  public getBaobao (studentid: number, callback: () => void) {
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
    baobaos = cache.get(appCacheKey.sbaobao_baobao_parentes_schools)
    if (baobaos !== null && baobaos.param === studentids + parentuserids + classesids) {
      this.renderBaobao(baobaos.values[studentid])
      callback()
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=2&action=getbaobao', { studentids: studentids }, (ret) => {
      if (ret.status === 1) {
        // $.log(ret)
        baobaos = { param: studentids + parentuserids + classesids, values: ret.baobaos }
        this.renderBaobao(baobaos.values[studentid])
        callback()
        cache.set(appCacheKey.sbaobao_baobao_parentes_schools, baobaos)
      }
    }, 'json')
  }

  /**
   * renderBaobao
   */
  public renderBaobao (baobao) {
    let classesid: number = this.getStorage('currentClassesid')
    if (!classesid) classesid = baobao.baobao.classesid
    let classes = baobao.classes[classesid]
    if (!classes.enddate) {
      classes.enddate = '现在'
      classes.endtime = $.nowtime
    }
    classes.totaltime = this.getDateDiff(classes.starttime, classes.endtime)

    this.byId('baobao').innerHTML = dot.baobao(baobao.baobao)
    this.byId('parent').innerHTML = dot.parent(baobao.parent)
    this.byId('school').innerHTML = dot.school({ school: baobao.school[classes.schoolid], classes: classes })
  }
}
