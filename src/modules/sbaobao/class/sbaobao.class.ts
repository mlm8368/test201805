import { $, getAge } from '../../../common/js/global.js'
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
    classes.totaltime = this.getInClassesDay(classes.starttime, classes.endtime)

    let baobaoInfo = baobao.baobao
    baobaoInfo['birthdayStr'] = getAge(baobaoInfo.birthday + ' 1:1:1', this.getNowFormatDate() + ' 1:1:1')
    this.byId('baobao').innerHTML = dot.baobao(baobaoInfo)
    this.byId('parent').innerHTML = dot.parent(baobao.parent)
    this.byId('school').innerHTML = dot.school({ school: baobao.school[classes.schoolid], classes: classes })
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

  private getNowFormatDate () {
    const date = new Date()
    const seperator1 = '-'
    const month = date.getMonth() + 1
    let month2 = ''
    const strDate = date.getDate()
    let strDate2 = ''
    if (month >= 1 && month <= 9) month2 = '0' + month
    else month2 = '' + month
    if (strDate >= 0 && strDate <= 9) strDate2 = '0' + strDate
    else strDate2 = '' + strDate
    return date.getFullYear() + seperator1 + month2 + seperator1 + strDate2
  }
}
