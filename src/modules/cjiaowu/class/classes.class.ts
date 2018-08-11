import { $, viewEXT } from '../../../common/js/global.js'
import Teacher from '../../../class/teacher.class'
import Vue from 'vue'

interface VueData {
  total: number,
  currentId: number,
  lists: any[],
  editId: number
}

export default class Classes extends Teacher {
  private vm: Vue
  private vueData: VueData

  constructor () {
    super()

    this.setVueData(null, 'init')
    this.vm = new Vue({
      el: '#vue-app',
      data: this.vueData,
      computed: {
        formtitle: () => {
          let title = '添加一个新班级'
          if (this.vueData.editId > -1) title = '编辑班级信息'
          return title
        },
        formdata: (): { id: number, classesname: string, listorder: number, startdate: string, enddate: string } => {
          let data = { id: 0, classesname: '', listorder: this.vueData.lists.length + 1, startdate: '', enddate: '' }
          if (this.vueData.editId > -1) data = Object.assign(data, this.vueData.lists[this.vueData.editId])
          return data
        }
      },
      methods: {
        setTapEvents: () => {
          $.log('2')
        }
      }
    })
  }

  public setVueData (data: VueData, op: string) {
    if (op === 'init') {
      this.vueData = {
        total: 5,
        currentId: 2,
        lists: [{ id: 1, classesname: '启蒙一班' },{ id: 2, classesname: '启蒙二班' }],
        editId: -1
      }
    }
  }

}
