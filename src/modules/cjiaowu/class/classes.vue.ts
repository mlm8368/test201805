import { $, viewEXT } from '../../../common/js/global.js'
import Teacher from '../../../class/teacher.class'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../classes/root.vue.html')
})
export default class Classes extends Vue {
  total = 5
  currentId = 2
  lists = [{ id: 1, classesname: '启蒙一班' },{ id: 2, classesname: '启蒙二班' }]
  editId = -1

  get formtitle (): string {
    let title = '添加一个新班级'
    if (this.editId > -1) title = '编辑班级信息'
    return title
  }

  get formdata (): { id: number, classesname: string, listorder: number, startdate: string, enddate: string } {
    let data = { id: 0, classesname: '', listorder: this.lists.length + 1, startdate: '', enddate: '' }
    if (this.editId > -1) data = Object.assign(data, this.lists[this.editId])
    return data
  }
}
