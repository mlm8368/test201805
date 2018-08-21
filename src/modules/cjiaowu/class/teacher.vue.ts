import { $, viewEXT, setAuiSearchbar } from '../../../common/js/global.js'
import * as config from '../index/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../teacher/root.vue.html'),
  watch: {
    keywords: function (this: Vue, keywords: string, oldKeywords) {
      const school = new School()
      school.getTeacherByKeywords(keywords, this.$data.schoolId, (ret: any) => {
        if (ret.status === 1) {
          ret.teacherInfo.avatar = school.getAvatar(ret.teacherInfo.avatar)
          ret.teacherInfo.gender = school.getGender(ret.teacherInfo.gender)
          this.$data.teacherInfo = ret.teacherInfo
          this.$data.op = 'edit'
        } else {
          school.alert(ret.msg)
        }
      })
    }
  }
})
export default class Teacher extends Vue {
  public schoolId: number = 0
  public keywords: string = ''
  public op: string = 'view'
  public teacherInfo: any = null
  private school: School

  constructor () {
    super()
    this.school = new School()

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
      setAuiSearchbar()

      // back
      $.back = () => {
        $.currentWebview.hide('auto', 300)
      }

      // doShow
      window.addEventListener('doShow', (event: any) => {
        this.op = event.detail.op
        // transition
        event.detail.teacherInfo.avatar = this.school.getAvatar(event.detail.teacherInfo.avatar)
        event.detail.teacherInfo.gender = this.school.getGender(event.detail.teacherInfo.gender)
        this.teacherInfo = event.detail.teacherInfo

        $.currentWebview.show('slide-in-right', 300)
        this.school.closeWaitingAll()
      })
    })
  }
}
