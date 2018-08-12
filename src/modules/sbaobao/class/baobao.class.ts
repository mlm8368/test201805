import { $, getAge } from '../../../common/js/global.js'
import * as config from '../school/config'
import Student from '../../../class/student.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import * as dot from '../index/dot.js'

export default class Baobao extends Student {
  private baobaos = null

  constructor () {
    super()
  }
  /**
   * getBaobao
   */
  public getBaobao (callback: () => void) {
    let studentids = ''
    let parentuserids = ''
    let classesids = ''
    let teacherids = ''

    const userInfo = this.getStorage(appStorageKey.userInfo)
    if (userInfo.student) {
      if (userInfo.student.studentids) studentids = userInfo.student.studentids
      if (userInfo.student.parentuserids) parentuserids = userInfo.student.parentuserids
      if (userInfo.student.classesids) classesids = userInfo.student.classesids
      if (userInfo.student.teacherids) teacherids = userInfo.student.teacherids
    } else {
      return
    }

    const cacheParam = studentids + parentuserids + classesids + teacherids
    let baobaos = this.cache.get(appCacheKey.sbaobao_baobao_parentes_schools)
    if (baobaos !== null && baobaos.param === cacheParam) {
      callback()
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=2&action=getbaobao', { studentids: studentids }, (ret) => {
      if (ret.status === 1) {
        // $.log(ret)
        baobaos = { param: cacheParam, values: ret.baobaos }
        this.cache.set(appCacheKey.sbaobao_baobao_parentes_schools, baobaos)
        callback()
      }
    }, 'json')
  }

  /**
   * renderBaobao
   */
  public renderBaobao (studentid: number, index: number) {
    if (this.baobaos === null) this.baobaos = this.cache.get(appCacheKey.sbaobao_baobao_parentes_schools)
    if (!this.baobaos) return false

    const baobao = this.baobaos.values[studentid]
    const currentSbaobaoClassesid = this.getStorage(appStorageKey.current_sbaobao_classesid)
    let classesid: number
    if (currentSbaobaoClassesid && currentSbaobaoClassesid[studentid]) classesid = currentSbaobaoClassesid[studentid]
    else classesid = baobao.baobao.classesid
    let classes = baobao.classes[classesid]
    if (!classes.enddate) {
      classes.enddate = '现在'
      classes.endtime = $.nowtime
    }
    classes.totaltime = this.getInClassesDay(classes.starttime, classes.endtime)

    let baobaoInfo = baobao.baobao
    baobaoInfo['birthdayStr'] = getAge(baobaoInfo.birthday + ' 1:1:1', this.getFormatDate() + ' 1:1:1')
    const baobaoDivs = $.qsa('.baobao_' + index, this.byId('slideBody'))
    baobaoDivs.forEach(element => {
      element.innerHTML = dot.baobao(baobaoInfo)
    })
    const parentDivs = $.qsa('.parent_' + index)
    parentDivs.forEach(element => {
      element.innerHTML = dot.parent(baobao.parent)
    })
    const schoolDivs = $.qsa('.school_' + index)
    schoolDivs.forEach(element => {
      element.innerHTML = dot.school({ school: baobao.school[classes.schoolid], classes: classes })
    })
  }

  public rmBaobaoCache () {
    this.cache.remove(appCacheKey.sbaobao_baobao_parentes_schools)
  }

  private getInClassesDay (starttime: number, endtime: number) {
    const diffValue = endtime - starttime
    const day = 86400000
    const week = 604800000
    const month = 2592000000
    let r = ''

    let monthC = diffValue / month
    if (monthC >= 1) {
      r = Math.floor(monthC) + '个月'
      let monthDay = (diffValue % month) / day
      if (monthDay) r += Math.floor(monthDay) + '天'
      return r
    } else {
      let weekC = diffValue / week
      if (weekC >= 1) {
        r = Math.floor(weekC) + '周'
        let weekDay = (diffValue % week) / day
        if (weekDay) r += Math.floor(weekDay) + '天'
        return r
      } else {
        let dayC = diffValue / day
        r = Math.floor(dayC) + '天'
        return r
      }
    }
  }
}
