import { $, viewEXT } from '../../../common/js/global.js'
import { ImageSliderImageStyles } from '../../../class/interface'
import Student from '../../../class/student.class'

export default class SIndex extends Student {
  constructor () {
    super()
  }
  /**
   * setAuiSlide
   */
  public setSlideImages (images: ImageSliderImageStyles[]) {
    const slideNView = $.plus.nativeObj.View.getViewById('schoolSlider')
    slideNView.setImages(images)
  }
}
