import { $, dotSchoolone } from '../../../common/js/global.js'
import * as config from '../school/config'
import Student from '../../../class/student.class'

export default class SSchool extends Student {
  /**
   * getClasses
   */
  public getClasses (studentid: number) {
    $.get(config.siteHost.siteurl + 'index.php?moduleid=2&action=getclasses', null, (ret) => {
      if (ret.status === 1) {
        $.log(ret)
      }
    }, 'json')
  }

  /**
   * test
   */
  public test () {
    $('#attending').after(dotSchoolone())
  }
}
