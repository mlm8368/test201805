import { $, viewEXT, setAuiSearchbar } from '../../../common/js/global.js'
import * as config from '../staff/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../staff/root.vue.html')
})
export default class Staff extends Vue {
  public editStaff: boolean = false
  public lists = []
  public staffListsLoading = false
  public searchStaff = null
  public searchMsg = ''
  private school: School

  constructor () {
    super()
    this.school = new School()
  }

  public get total (): number {
    return this.lists.length
  }

  public mounted (): void {
    this.$nextTick(() => {
      this.setOntapEvents()
      this.staffListsLoading = true
      this.getStaffLists((lists: any[]) => {
        this.staffListsLoading = false
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
    $('#searchstaff').on('tap', '.add', (e: any) => {
      const w = this.school.showWaiting()
      $.post(config.siteHost.siteurl + 'index.php?moduleid=4&action=staff&op=add', { teacherid: this.searchStaff.userid }, (ret) => {
        if (ret.status === 1) {
          this.staffListsLoading = true
          this.getStaffLists((lists: any[]) => {
            if (w) w.close()
            this.staffListsLoading = false
            this.lists = lists
          })
        } else {
          this.school.alert(ret.msg)
        }
      }, 'json')
    })
    $('#stafflist').on('tap', '.del', (e: any) => {
      const index = this.school.closest(e.target, 'li').dataset.index
      const w = this.school.showWaiting()
      $.get(config.siteHost.siteurl + 'index.php?moduleid=4&action=staff&op=del', { id: this.lists[index].id }, (ret) => {
        if (ret.status === 1) {
          this.staffListsLoading = true
          this.getStaffLists((lists: any[]) => {
            if (w) w.close()
            this.staffListsLoading = false
            this.lists = lists
          })
        } else {
          this.school.alert(ret.msg)
        }
      }, 'json')
    })
  }

  public searchkeywords (e): void {
    // $.log(e.target.value)
    const mobile = e.target.value
    if (!this.school.checkMobile(mobile)) {
      this.school.alert('手机号不正确')
      return
    }
    const w = this.school.showWaiting()
    $.get(config.siteHost.siteurl + 'index.php?moduleid=4&action=staff&op=search', { mobile: mobile }, (ret) => {
      if (w) w.close()
      if (ret.status === 1) {
        this.searchStaff = ret.userinfo
        this.searchMsg = ''
      } else {
        this.searchStaff = null
        this.searchMsg = ret.msg
      }
    }, 'json')
  }

  private getStaffLists (callback: (lists: any[]) => void): void {
    const lists = this.cacheStaffs('get')
    if (lists !== null) {
      callback(lists)
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=4&action=staff&op=list', null, (ret) => {
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
      if (staffs !== null && staffs.param === cacheParam) return staffs.value
      else return null
    } else if (op === 'set') {
      staffs = { param: cacheParam, value: lists }
      this.school._cache().set(appCacheKey.school_cjiaowu_staffs, staffs)
    }
  }
}
