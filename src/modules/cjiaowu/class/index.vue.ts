import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../index/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../index/root.vue.html')
})
export default class Index extends Vue {
  private school: School

  constructor () {
    super()
    this.school = new School()
    $.log('123')
  }

}
