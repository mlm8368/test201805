import { $, viewEXT } from '../common/js/global.js'
import Abstract from './abstract.class'
import { appCacheKey } from './enum'

export default class Student extends Abstract {
  constructor () {
    super()
  }

  /**
   * getSchoolInfo
   */
  public getSchoolInfo (studentid: number, classesid: number): any {
    let info = {}
    const baobaos = this.cache.get(appCacheKey.student_sbaobao_baobaosParentesSchools)
    const classes = baobaos.values[studentid].classes[classesid]
    info['classesName'] = classes.classesname
    info['classesFirstchar'] = classes.firstchar
    const school = baobaos.values[studentid].school[classes.schoolid]
    info['schoolName'] = school.school
    info['schoolFirstchar'] = school.firstchar

    return info
  }
}
