import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  template: require('../index/laoshi.vue.html')
})
export default class LaoShi extends Vue {
  helloTimes: number = 0
  sayHello () {
    this.helloTimes++
  }
}
