import { $, viewEXT } from '../../../common/js/global.js'
import Student from '../../../class/student.class'
import AuiSlide from '../../../plugin/aui/slide'

export default class SIndex extends Student {
  constructor () {
    super()
  }
  /**
   * setAuiSlide
   */
  public setAuiSlide (id: string) {
    const auiSlide = new AuiSlide({
      container: document.getElementById(id),
      height: 180, speed: 500, autoPlay: 3000,
      loop: true, pageShow: true, pageStyle: 'line', dotPosition: 'center'
    })
  }
}
