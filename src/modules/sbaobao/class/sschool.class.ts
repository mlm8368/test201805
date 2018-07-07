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
    let studentid: number = this.getStorage('current_sbaobao_studentid')

    let baobaos = null
    let cache = new Cache()
    baobaos = cache.get(appCacheKey.sbaobao_baobao_parentes_schools)
    this.renderSchool(baobaos.values[studentid].school, baobaos.values[studentid].classes)
  }

  private renderSchool (schoolList, classesList) {
    if (!schoolList) return

    let schoolHtmlDoing = ''
    let schoolHtmlDone = ''
    for (const key in schoolList) {
      if (schoolList.hasOwnProperty(key)) {
        const school = schoolList[key]
        const schoolHtml = dot.schoolone({ school: school, classesList: classesList })

        if (school.status === 'doing') schoolHtmlDoing += schoolHtml
        else if (school.status === 'done') schoolHtmlDone += schoolHtml
      }
    }
    this.byId('attending').innerHTML = schoolHtmlDoing
    this.byId('attended').innerHTML = schoolHtmlDone
  }
}
