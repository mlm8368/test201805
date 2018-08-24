import { $, viewEXT, setAuiSearchbar } from '../../../common/js/global.js'
import * as config from '../staff/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../staff/root.vue.html')
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
export default class Staff extends Vue {
  public lists = []
  public editId = 0
  // public formdata = { id: 0, classesname: '', listorder: 0, startdate: '', enddate: '' }
  private school: School

  constructor () {
    super()
    this.school = new School()
  }

  public get total (): number {
    return this.lists.length
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
      this.getStaffLists((lists: any[]) => {
        this.lists = lists
      })

      setTimeout(() => {
        setAuiSearchbar()
      }, 100)
    })
  }

  /**
   * setOntapEvents
   */
  public setOntapEvents (): void {
    $('header').on('tap', '.add', (e: any) => {
      this.editId = 0
    })
    $('#list').on('tap', '.edit', (e: any) => {
      const id = this.school.closest(e.target, 'li').dataset.id
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
          this.school.cacheClasses('set', this.lists)
        } else {
          this.school.alert(ret.msg)
        }
      }, 'json')
    })
    $('#op').on('tap', '.del', (e: any) => {
      $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=del', { id: this.formdata.id }, (ret) => {
        if (ret.status === 1) {
          this.lists = ret.lists
          this.school.cacheClasses('set', this.lists)
        } else {
          this.school.alert(ret.msg)
        }
      }, 'json')
    })
  }

  public searchkeywords (e): void {
    $.log(e.target.value)
  }

  private getStaffLists (callback: (lists: any[]) => void): void {
    const lists = this.cacheStaffs('get')
    if (lists !== null) {
      callback(lists)
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=list', null, (ret) => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.cacheStaffs('set', ret.lists)
      }
    }, 'json')
  }
  private cacheStaffs (op: string, lists = null) {
    const schoolid = this.school.getStorage(appStorageKey.userid)
    const cacheParam = schoolid
    let staffs = null

    if (op === 'get') {
      staffs = this.school._cache().get(appCacheKey.school_cjiaowu_staffs)
      if (staffs !== null) return staffs.value
      else return null
    } else if (op === 'set') {
      staffs = { param: cacheParam, value: lists }
      this.school._cache().set(appCacheKey.school_cjiaowu_staffs, staffs)
    }
  }
}
