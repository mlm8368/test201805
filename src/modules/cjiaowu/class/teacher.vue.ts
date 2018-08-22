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
  }

  public get submitName (): string {
    let name = '修改'
    if (this.op === 'add') name = '添加'
    return name
  }

  public mounted (): void {
    this.$nextTick(() => {
      if (this.op === 'add') {
        setTimeout(() => {
          setAuiSearchbar()
        }, 100)
      }

      // back
      $.back = () => {
        $.currentWebview.hide('auto', 300)
      }

      // doShow
      window.addEventListener('doShow', (event: any) => {
        this.op = event.detail.op
        if (this.op === 'add') {
          setTimeout(() => {
            setAuiSearchbar()
          }, 100)
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

    this.school.getTeacherByKeywords(keywords, (ret: any) => {
      $.log(ret)
      if (ret.status === 1) {
        this.searchTeachers = ret.lists
        this.searchTeacherIndex = -1
        this.teacherInfo = null
      } else {
        this.school.alert(ret.msg)
      }
    })
  }

  public doSubmit (): void {
    $.post(config.siteHost.siteurl + 'index.php?moduleid=52&action=' + this.op, this.teacherInfo, (ret) => {
      if (ret.status === 1) {
        this.op = 'edit'
        $.fire(this.cjiaowuIndex, 'updateTeacherLists')
      } else {
        this.school.alert(ret.msg)
      }
    }, 'json')
  }
}
