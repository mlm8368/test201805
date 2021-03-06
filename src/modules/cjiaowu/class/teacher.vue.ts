import { $, viewEXT, nodeEnv, setAuiSearchbar } from '../../../common/js/global.js'
import * as config from '../index/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../teacher/root.vue.html'),
  watch: {
    searchTeacherIndex: function (this: Vue, index: number) {
      if (index < 0) return

      const school = new School()
      let teacherInfo = this.$data.searchTeachers[index]
      teacherInfo.avatar = school.getAvatar(teacherInfo.avatar)
      teacherInfo.gender = school.getGender(teacherInfo.gender)
      this.$data.teacherInfo = teacherInfo
    }
  }
})
export default class Teacher extends Vue {
  public op: string = 'view'
  public teacherInfo: any = null
  public searchTeachers: any[] = []
  public searchTeacherIndex: number = -1
  public searchMsg = ''
  private school: School
  private cjiaowuIndex: any = null

  constructor () {
    super()
    this.school = new School()

    this.cjiaowuIndex = $.plus.webview.getWebviewById('cjiaowu_index')

    // do First open
    this.op = $.currentWebview.op
    this.teacherInfo = $.currentWebview.teacherInfo

    this.school.closeWaitingAll()

    // this.op = 'add'
  }

  public get submitName (): string {
    let name = '修改'
    if (this.op === 'add') name = '添加'
    return name
  }

  public mounted (): void {
    this.$nextTick(() => {
      if (this.op === 'add') {
        this.searchMsg = '请查询教师后添加'

        setTimeout(() => {
          setAuiSearchbar()
        }, 100)
      }

      // back
      /*
      $.back = () => {
        $.currentWebview.hide('auto', 300)
      }
      $.options.beforeback = (): boolean => {
        this.searchTeachers = []
        this.searchTeacherIndex = -1
        return true
      }
      */

      // doShow
      window.addEventListener('doShow', (event: any) => {
        this.op = event.detail.op
        if (this.op === 'add') {
          this.searchMsg = '请查询教师后添加'
          this.searchTeachers = []
          this.searchTeacherIndex = -1
          setTimeout(() => {
            setAuiSearchbar()
          }, 100)
        } else {
          this.searchMsg = ''
        }
        // transition
        if (event.detail.teacherInfo) {
          event.detail.teacherInfo.avatar = this.school.getAvatar(event.detail.teacherInfo.avatar)
          event.detail.teacherInfo.gender = this.school.getGender(event.detail.teacherInfo.gender)
        }
        this.teacherInfo = event.detail.teacherInfo

        $.currentWebview.show('slide-in-right', 300)
        this.school.closeWaitingAll()
      })
    })
  }

  public searchkeywords (e): void {
    // $.log(e.target.value)
    const keywords = e.target.value

    const w = this.school.showWaiting()
    this.getTeacherByKeywords(keywords, (ret: any) => {
      // $.log(ret)
      if (w) w.close()
      this.searchMsg = ''
      this.searchTeachers = []
      this.searchTeacherIndex = -1
      this.teacherInfo = null
      if (ret.status === 1) {
        this.searchTeachers = ret.lists
      } else {
        // this.school.alert(ret.msg)
        this.searchMsg = ret.msg
      }
    })
  }

  public doSubmit (): void {
    const postData = { id: this.teacherInfo.id, teacheruserid: this.teacherInfo.userid, teacherpost: this.teacherInfo.teacherpost, classesid: this.school.getStorage(appStorageKey.current_jiaowu_classesid) }
    const w = this.school.showWaiting()
    $.post(config.siteHost.siteurl + 'index.php?moduleid=52&action=teacher&op=' + this.op, postData, (ret) => {
      // $.log(ret)
      if (w) w.close()
      if (ret.status === 1) {
        if (this.op === 'add') {
          this.teacherInfo.id = ret.id
          this.op = 'edit'
        }
        $.fire(this.cjiaowuIndex, 'updateTeacherLists')
      } else {
        this.school.alert(ret.msg)
      }
    }, 'json')
  }

  private getTeacherByKeywords (keywords: string, callback: (lists: any[]) => void) {
    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=teacher&op=search', { keywords: keywords }, (ret) => {
      callback(ret)
    }, 'json')
  }
}
