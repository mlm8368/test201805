import { $, viewEXT, setAuiSearchbar } from '../../../common/js/global.js'
import * as config from '../index/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../teacher/root.vue.html')
})
export default class Teacher extends Vue {
  public keywords: string = ''
  public op: string = 'view'
  private school: School

  constructor () {
    super()
    this.school = new School()
  }

  public mounted (): void {
    this.$nextTick(() => {
      this.school.closeWaitingAll()
      setAuiSearchbar()

      // back
      $.back = () => {
        $.currentWebview.hide('auto', 300)
      }

      // doShow
      window.addEventListener('doShow', (event: any) => {
        const tid = event.detail.tid

        $.currentWebview.show('slide-in-right', 300)
        this.school.closeWaitingAll()
      })
    })
  }
}
