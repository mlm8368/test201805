import { $, viewEXT } from '../../../common/js/global.js'
import Teacher from '../../../class/teacher.class'
import Vue from 'vue'

interface VueData {
  total: number,
  currentId: number,
  list: any[]
}

export default class Classes extends Teacher {
  private vm: Vue
  private vueData: VueData

  constructor () {
    super()

    this.setVueData(null, 'init')
    this.vm = new Vue({
      el: '#vue-app',
      data: this.vueData
    })
  }

  public setVueData (data: VueData, op: string) {
    if (op === 'init') {
      this.vueData = {
        total: 5,
        currentId: 2,
        list: [{ id: 1, classesname: '启蒙一班' },{ id: 2, classesname: '启蒙二班' }]
      }
    }
  }

}
