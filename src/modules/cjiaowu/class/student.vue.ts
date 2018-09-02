import { $, viewEXT, setAuiSearchbar } from '../../../common/js/global.js'
import * as config from '../index/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../student/root.vue.html')
})
export default class Student extends Vue {
  public op: string = 'view'
  public studentInfo: any = null
  private school: School
  private cjiaowuIndex: any = null

  constructor () {
    super()
    this.school = new School()

    this.cjiaowuIndex = $.plus.webview.getWebviewById('cjiaowu_index')

    // do First open
    this.op = $.currentWebview.op
    this.studentInfo = $.currentWebview.studentInfo

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
        setTimeout(() => {
          setAuiSearchbar()
        }, 100)
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
        if (event.detail.studentInfo) {
          event.detail.studentInfo.avatar = this.school.getAvatar(event.detail.studentInfo.avatar)
          event.detail.studentInfo.gender = this.school.getGender(event.detail.studentInfo.gender)
        }
        this.studentInfo = event.detail.studentInfo

        $.currentWebview.show('slide-in-right', 300)
        this.school.closeWaitingAll()
      })
    })
  }

  public searchkeywords (e): void {
    // $.log(e.target.value)
    const keywords = e.target.value

    const w = this.school.showWaiting()
    this.getStudentByKeywords(keywords, (ret: any) => {
      // $.log(ret)
      if (w) w.close()
      this.studentInfo = null
      if (ret.status === 1) {
        ret.studentInfo.avatar = this.school.getAvatar(ret.studentInfo.avatar)
        ret.studentInfo.gender = this.school.getGender(ret.studentInfo.gender)
        this.studentInfo = ret.studentInfo
      } else {
        this.school.alert(ret.msg)
      }
    })
  }

  public doSubmit (): void {
    const postData = { id: this.studentInfo.id, classesid: this.school.getStorage(appStorageKey.current_jiaowu_classesid), studentid: this.studentInfo.studentid, startdate:  this.studentInfo.startdate, enddate:  this.studentInfo.enddate }
    const w = this.school.showWaiting()
    $.post(config.siteHost.siteurl + 'index.php?moduleid=52&action=student&op=' + this.op, postData, (ret) => {
      if (w) w.close()
      if (ret.status === 1) {
        if (this.op === 'add') {
          this.studentInfo.id = ret.id
          this.op = 'edit'
        }
        $.fire(this.cjiaowuIndex, 'updateStudentLists')
      } else {
        this.school.alert(ret.msg)
      }
    }, 'json')
  }

  private getStudentByKeywords (keywords: string, callback: (lists: any[]) => void) {
    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=student&op=search', { keywords: keywords }, (ret) => {
      callback(ret)
    }, 'json')
  }
}
