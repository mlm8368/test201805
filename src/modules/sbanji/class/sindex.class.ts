import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../index/config'
import Student from '../../../class/student.class'
import { appCacheKey } from '../../../class/enum'
import Cache from '../../../class/cache.class'
import Vue from 'vue'
import TimeLine from './timeline.vue'

export default class SIndex extends Student {
  private main: any
  private vm: Vue
  private vueData = null

  constructor () {
    super()
    $.plusReady(() => {
      this.main = $.currentWebview
    })

    this.setVueData()
    this.vm = new Vue({
      el: '#vue-app',
      data: this.vueData,
      components: {
        'time-line': TimeLine
      }
    })
  }

  /**
   * setVueData
   */
  public setVueData (op = 'init') {
    if (this.vueData === null) {
      this.vueData = {
        baobaoAvatar: '../../static/images/defaultAvatar.png',
        baobaoName: '宝宝',
        teachers: [],
        timelines: []
      }
    }

    // if (data) this.vueData = Object.assign({}, this.vueData, data)
    if (op === 'refresh') {
      const studentid: number = this.getStorage('current_sbaobao_studentid')
      const currentSbaobaoClassesid = this.getStorage('current_sbaobao_classesid')
      const classesid: number = currentSbaobaoClassesid[studentid]
      const cache = new Cache()
      const baobaos = cache.get(appCacheKey.sbaobao_baobao_parentes_schools)
      const baobao = baobaos.values[studentid]

      this.vueData.baobaoAvatar = baobao.baobao.avatar
      this.vueData.baobaoName = baobao.baobao.babyname

      this.vueData.teachers = []
      if (baobao.classes[classesid].teachers) {
        const teachers = baobao.classes[classesid].teachers
        let tmp = []
        for (const teacher of teachers) {
          tmp.push(teacher)
        }
        this.vueData.teachers = tmp
      }
    }
  }

  /**
   * getTimeLine
   */
  public getTimeLine () {
    $.noop()
  }
}
