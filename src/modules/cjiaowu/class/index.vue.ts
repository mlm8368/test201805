import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../index/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../index/root.vue.html'),
  watch: {
    classesId: function (this: Vue, classesId, oldClassesId) {
      classesId = parseInt(classesId, 10)
      $.log(classesId)
    }
  }
})
export default class Index extends Vue {
  public classesId: number
  public classesName = ''
  public teacherLists = []
  public studentLists = []
  private school: School

  constructor () {
    super()
    this.school = new School()
    this.classesId = this.school.getStorage(appStorageKey.current_jiaowu_classesid)
    if (!this.classesId) this.classesId = 0
  }

  public get totalTeacher () {
    return this.teacherLists.length
  }

  public get totalStudent () {
    return this.studentLists.length
  }

  public mounted (): void {
    this.$nextTick(() => {
      this.getClasses((lists) => {
        if (lists.length === 0) {
          this.classesName = '您还未添加班级'
          return
        }

        if (this.classesId === 0) {
          this.classesId = lists[0].id
          this.classesName = lists[0].classesname
          this.school.setStorage(appStorageKey.current_jiaowu_classesid, this.classesId)
        } else {
          for (const one of lists) {
            if (one.id === this.classesId) {
              this.classesName = one.classesname
              break
            }
          }
        }
      })
    })
  }

  private getClasses (callback: (lists: any[]) => void) {
    const lists = this.school.cacheClasses('get')
    if (lists !== null) {
      callback(lists)
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=list', null, (ret) => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.school.cacheClasses('set', ret.lists)
      }
    }, 'json')
  }
}
