import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../index/config'
import Student from '../../../class/student.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import TimeLine from './timeline.vue'

interface VueData {
  baobaoAvatar: string,
  baobaoName: string,
  teachers: any[],
  timelines: {}
}

export default class Index extends Student {
  private main: any
  private vm: Vue
  private vueData: VueData

  constructor () {
    super()
    $.plusReady(() => {
      this.main = $.currentWebview
    })

    this.setVueData('init')
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
  public setVueData (op: string) {
    if (op === 'init') {
      this.vueData = {
        baobaoAvatar: '../../static/images/defaultAvatar.png',
        baobaoName: '宝宝',
        teachers: [],
        timelines: {}
      }
    }

    // if (data) this.vueData = Object.assign({}, this.vueData, data)
    if (op === 'refresh') {
      const studentid: number = this.getStorage(appStorageKey.current_sbaobao_studentid)
      const currentSbaobaoClassesid = this.getStorage(appStorageKey.current_sbaobao_classesid)
      const classesid: number = currentSbaobaoClassesid[studentid]
      const baobaos = this.cache.get(appCacheKey.student_sbaobao_baobaosParentesSchools)
      const baobao = baobaos.values[studentid]

      this.vueData.baobaoAvatar = baobao.baobao.avatar
      this.vueData.baobaoName = baobao.baobao.babyname

      if (baobao.classes[classesid]) {
        this.vueData.teachers = this.objToArray(baobao.classes[classesid].teachers)
      }
    }
  }

  /**
   * getTimeLine
   */
  public getTimeLine () {
    this.vueData.timelines['20180712'] = []
  }
}
