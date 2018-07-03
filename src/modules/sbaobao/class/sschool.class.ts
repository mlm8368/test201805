import { $ } from '../../../common/js/global.js'
import * as config from '../school/config'
import Student from '../../../class/student.class'
import { appCacheKey } from '../../../class/enum'
import Cache from '../../../class/cache.class'
import * as dot from '../school/dot.js'

export default class SSchool extends Student {
  /**
   * getClasses
   */
  public getClasses () {
    let studentid: number = this.getStorage('sbaobao_studentid_current')

    let studentids = ''
    let classesids = ''

    let userInfo = this.getStorage('userInfo')
    if (userInfo.student) {
      if (userInfo.student.studentids) studentids = userInfo.student.studentids
      if (userInfo.student.classesids) classesids = userInfo.student.classesids
    } else {
      return
    }

    let classes = null
    let cache = new Cache()
    classes = cache.get(appCacheKey.sbaobao_school_classes)
    if (classes !== null && classes.param === studentids + classesids) {
      this.renderSchool(classes.values[studentid])
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=2&action=getclasses', { studentids: studentids }, (ret) => {
      if (ret.status === 1) {
        // $.log(ret)
        classes = { param: studentids + classesids, values: ret.schools }
        this.renderSchool(classes.values[studentid])
        cache.set(appCacheKey.sbaobao_school_classes, classes)
      }
    }, 'json')
  }

  private renderSchool (schoolList) {
    if (!schoolList) return

    let schoolHtmlDoing = ''
    let schoolHtmlDone = ''
    for (const key in schoolList) {
      if (schoolList.hasOwnProperty(key)) {
        const school = schoolList[key]

        if (school.status === 'doing') schoolHtmlDoing += dot.schoolone(school)
        else if (school.status === 'done') schoolHtmlDone += dot.schoolone(school)
      }
    }
    this.byId('attending').innerHTML = schoolHtmlDoing
    this.byId('attended').innerHTML = schoolHtmlDone
  }
}
