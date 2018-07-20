import { $ } from '../../../common/js/global.js'
import * as config from '../school/config'
import Student from '../../../class/student.class'
import { appCacheKey } from '../../../class/enum'
import Cache from '../../../class/cache.class'
import * as dot from '../school/dot.js'

export default class SSchool extends Student {
  private classesIds: string[]
  private studentid: number
  /**
   * getClasses
   */
  public getClasses () {
    this.studentid = this.getStorage('current_sbaobao_studentid')
    const cache = new Cache()

    setTimeout(() => {
      const baobaos = cache.get(appCacheKey.sbaobao_baobao_parentes_schools)
      if (baobaos) this.renderSchool(baobaos.values[this.studentid].school, baobaos.values[this.studentid].classes)
    }, 100)
  }

  /**
   * setCurrentClassesid
   */
  public setCurrentClassesid (currentClassesid: number, op = 'first') {
    if (!currentClassesid) return
    //  set currentClassesid
    let currentSbaobaoClassesid = this.getStorage('current_sbaobao_classesid')
    if (currentSbaobaoClassesid === null) {
      currentSbaobaoClassesid = {}
      currentSbaobaoClassesid[this.studentid] = currentClassesid
      this.setStorage('current_sbaobao_classesid', currentSbaobaoClassesid)
    } else if (typeof currentSbaobaoClassesid[this.studentid] === undefined) {
      currentSbaobaoClassesid[this.studentid] = currentClassesid
      this.setStorage('current_sbaobao_classesid', currentSbaobaoClassesid)
    } else if (op === 'first') {
      if (currentSbaobaoClassesid[this.studentid]) currentClassesid = currentSbaobaoClassesid[this.studentid]
    } else if (op === 'set') {
      currentSbaobaoClassesid[this.studentid] = currentClassesid
      this.setStorage('current_sbaobao_classesid', currentSbaobaoClassesid)
    }

    this.classesIds.forEach(classesid => {
      if (parseInt(classesid, 10) === currentClassesid) {
        this.byId('classesid' + classesid).classList.remove('aui-hide')
      } else {
        this.byId('classesid' + classesid).classList.add('aui-hide')
      }
    })
    // sbanji_index refreshVueData
    $.fire($.plus.webview.getWebviewById('sbanji_index'), 'refreshVueData')
  }

  private renderSchool (schoolList, classesList) {
    if (!schoolList) return

    let currentClassesid = 0
    this.classesIds = Object.keys(classesList)

    let schoolHtmlDoing = ''
    let schoolHtmlDone = ''
    for (const key in schoolList) {
      if (schoolList.hasOwnProperty(key)) {
        const school = schoolList[key]
        const schoolHtml = dot.schoolone({ school: school, classesList: classesList })

        if (school.status === 'doing') schoolHtmlDoing += schoolHtml
        else if (school.status === 'done') schoolHtmlDone += schoolHtml

        if ((currentClassesid === 0 && school.status === 'done') || (school.status === 'doing')) {
          currentClassesid = parseInt(this.classesIds[0], 10)
        }
      }
    }
    this.byId('attending').innerHTML = schoolHtmlDoing
    this.byId('attended').innerHTML = schoolHtmlDone

    this.setCurrentClassesid(currentClassesid)
  }
}
