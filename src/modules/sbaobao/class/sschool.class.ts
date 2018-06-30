import { $ } from '../../../common/js/global.js'
import * as config from '../school/config'
import Student from '../../../class/student.class'
import { appCacheKey } from '../../../class/enum'
import Cache from '../../../class/cache.class'
import { dotSchoolone } from '../school/dot.js'

export default class SSchool extends Student {
  /**
   * getClasses
   */
  public getClasses (studentid: number) {
    let userInfo = this.getStorage('userInfo')
    let studentids = userInfo.studentids
    let classesids = userInfo.classesids

    let classes = null
    let cache = new Cache()
    classes = cache.get(appCacheKey.sbaobao_school_classes)
    if (classes !== null && classes.param === studentids + classesids) {
      this.renderSchool(classes.values[studentid])
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=2&action=getclasses', { studentids: studentids }, (ret) => {
      if (ret.status === 1) {
        $.log(ret)
        classes = { param: studentids + classesids, values: ret.schools }
        this.renderSchool(classes.values[studentid])
        // cache.set(appCacheKey.sbaobao_school_classes, classes)
      }
    }, 'json')
  }

  private renderSchool (schoolList) {
    if (!schoolList) return

    let schoolHtmlDoing = ''
    let schoolHtmlDone = ''
    schoolList.forEach(school => {
      let oneHtml = dotSchoolone(school)
      if (school.status === 'doing') schoolHtmlDoing += oneHtml
      else if (school.status === 'done') schoolHtmlDone += oneHtml
    })
    this.byId('attending').insertAdjacentHTML('afterend', schoolHtmlDoing)
    this.byId('attended').insertAdjacentHTML('afterend', schoolHtmlDone)
  }
}
