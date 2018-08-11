import { $, viewEXT } from '../../../common/js/global.js'
import Teacher from '../../../class/teacher.class'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../classes/root.vue.html')
  // watch: {
  //   editId: function (this: Vue, val, oldVal) {
  //     val = parseInt(val, 10)
  //     let data = { id: 0, classesname: '', listorder: this.$data.lists.length + 1, startdate: '', enddate: '' }
  //     if (val > 0) {
  //       for (const list of this.$data.lists) {
  //         if (list.id === val) {
  //           data = Object.assign(data, list)
  //           break
  //         }
  //       }
  //     }
  //     this.$data.formdata = data
  //   }
  // }
})
export default class Classes extends Vue {
  public currentId = 2
  public lists = [{ id: 1, classesname: '启蒙一班', listorder: 1, startdate: '2018-02-01', enddate: '2018-05-11' },{ id: 2, classesname: '启蒙二班', listorder: 2, startdate: '2017-02-01', enddate: '2017-05-11' }]
  public editId = 0
  // public formdata = { id: 0, classesname: '', listorder: 0, startdate: '', enddate: '' }
  private teacher: Teacher

  constructor () {
    super()
    this.teacher = new Teacher()
  }

  public get total (): number {
    return this.lists.length
  }

  public get formtitle (): string {
    let title = '添加一个新班级'
    if (this.editId > 0) title = '编辑班级信息'
    return title
  }

  public get formdata (): { id: number, classesname: string, listorder: number, startdate: string, enddate: string } {
    let data = { id: 0, classesname: '', listorder: this.lists.length + 1, startdate: '', enddate: '' }
    if (this.editId > 0) {
      for (const list of this.lists) {
        if (list.id === this.editId) {
          data = Object.assign(data, list)
          break
        }
      }
    }
    return data
  }

  public mounted () {
    this.$nextTick().then(() => {
      this.setOntapEvents()
    })
  }

  /**
   * setOntapEvents
   */
  public setOntapEvents () {
    $('#list').on('tap', 'li', (e: any) => {
      let id = this.teacher.closest(e.target, 'li').dataset.id
      this.currentId = parseInt(id, 10)
    })
    $('#list').on('tap', '.edit', (e: any) => {
      let id = this.teacher.closest(e.target, 'li').dataset.id
      this.editId = parseInt(id, 10)
    })
    $('header').on('tap', '.add', (e: any) => {
      this.editId = 0
    })
  }
}
