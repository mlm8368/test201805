import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../classes/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
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
  public currentId: number
  public lists = []
  public editId = 0
  // public formdata = { id: 0, classesname: '', listorder: 0, startdate: '', enddate: '' }
  private school: School

  constructor () {
    super()
    this.school = new School()
    this.currentId = this.school.getStorage(appStorageKey.current_jiaowu_classesid)
    if (!this.currentId) this.currentId = 0
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
          data = $.extend(data, list)
          break
        }
      }
    }
    return data
  }

  public mounted (): void {
    this.$nextTick(() => {
      this.setOntapEvents()
      this.getClasses()
    })
  }

  /**
   * setOntapEvents
   */
  public setOntapEvents (): void {
    $('header').on('tap', '.add', (e: any) => {
      this.editId = 0
    })
    $('#list').on('tap', 'li', (e: any) => {
      let id = this.school.closest(e.target, 'li').dataset.id
      this.currentId = parseInt(id, 10)
      this.school.setStorage(appStorageKey.current_jiaowu_classesid, this.currentId)
    })
    $('#list').on('tap', '.edit', (e: any) => {
      let id = this.school.closest(e.target, 'li').dataset.id
      this.editId = parseInt(id, 10)
      return false
    })
    $('#op').on('tap', '.edit', (e: any) => {
      if (!this.formdata.classesname) {
        this.school.alert('请填写班级名称')
        return false
      }
      if (!this.formdata.startdate) {
        this.school.alert('请填写开始日期')
        return false
      }
      if (!this.formdata.enddate) {
        this.school.alert('请填写结束日期')
        return false
      }
      $.post(config.siteHost.siteurl + 'index.php?moduleid=52&action=edit', this.formdata, (ret) => {
        if (ret.status === 1) {
          this.lists = ret.lists
          this.cacheClasses('set', this.lists)
        } else {
          this.school.alert(ret.msg)
        }
      }, 'json')
    })
    $('#op').on('tap', '.del', (e: any) => {
      $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=del', { id: this.formdata.id }, (ret) => {
        if (ret.status === 1) {
          this.lists = ret.lists
          this.cacheClasses('set', this.lists)
        } else {
          this.school.alert(ret.msg)
        }
      }, 'json')
    })
  }

  /**
   * getClasses
   */
  private getClasses () {
    const lists = this.cacheClasses('get')
    if (lists !== null) {
      this.lists = lists
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=list', null, (ret) => {
      if (ret.status === 1) {
        this.lists = ret.lists
        this.cacheClasses('set', this.lists)
      }
    }, 'json')
  }

  private cacheClasses (op: string, lists = null) {
    const schoolid = this.school.getStorage(appStorageKey.userid)
    // const schoolid = 2
    const cacheParam = schoolid
    let classes = null

    if (op === 'get') {
      classes = this.school._cache().get(appCacheKey.sbaobao_baobao_parentes_schools)
      if (classes !== null) return classes.value
      else return null
    } else if (op === 'set') {
      classes = { param: cacheParam, value: lists }
      this.school._cache().set(appCacheKey.sbaobao_baobao_parentes_schools, classes)
    }
  }
}
