import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  template: require('../index/timeline.vue.html')
})
export default class TimeLine extends Vue {
  helloTimes: number = 0
  sayHello () {
    this.helloTimes++
  }
}
