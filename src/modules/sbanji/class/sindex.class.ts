import { $, viewEXT } from '../../../common/js/global.js'
import Student from '../../../class/student.class'
import * as config from '../index/config'

export default class SIndex extends Student {
  private main: any

  constructor () {
    super()
    $.plusReady(() => {
      this.main = $.currentWebview
    })
  }

}
