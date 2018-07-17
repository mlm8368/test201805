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
    const studentid: number = this.getStorage('current_sbaobao_studentid')
    const cache = new Cache()

    setTimeout(() => {
      const baobaos = cache.get(appCacheKey.sbaobao_baobao_parentes_schools)
      if (baobaos) this.renderSchool(baobaos.values[studentid].school, baobaos.values[studentid].classes, studentid)
    }, 100)
  }

  private renderSchool (schoolList, classesList, studentid: number) {
    if (!schoolList) return

    let currentClassesid = 0

    let schoolHtmlDoing = ''
    let schoolHtmlDone = ''
    for (const key in schoolList) {
      if (schoolList.hasOwnProperty(key)) {
        const school = schoolList[key]
        const schoolHtml = dot.schoolone({ school: school, classesList: classesList })

        if (school.status === 'doing') schoolHtmlDoing += schoolHtml
        else if (school.status === 'done') schoolHtmlDone += schoolHtml

        if ((currentClassesid === 0 && school.status === 'done') || (school.status === 'doing')) {
          const keyArr = Object.keys(classesList)
          currentClassesid = parseInt(keyArr[0], 10)
        }
      }
    }
    this.byId('attending').innerHTML = schoolHtmlDoing
    this.byId('attended').innerHTML = schoolHtmlDone

    //  set currentClassesid
    let currentSbaobaoClassesid = this.getStorage('current_sbaobao_classesid')
    if (currentSbaobaoClassesid === null) {
      currentSbaobaoClassesid = {}
      currentSbaobaoClassesid[studentid] = currentClassesid
      this.setStorage('current_sbaobao_classesid', currentSbaobaoClassesid)
    } else if (typeof currentSbaobaoClassesid[studentid] === undefined) {
      currentSbaobaoClassesid[studentid] = currentClassesid
      this.setStorage('current_sbaobao_classesid', currentSbaobaoClassesid)
    } else {
      currentClassesid = currentSbaobaoClassesid[studentid]
    }
    $.fire($.plus.webview.getWebviewById('sbanji_index'), 'refreshVueData')
    // todo init currentClassesid
  }
}
