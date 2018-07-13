import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class TimeLine extends Vue {
  helloTimes: number = 0
  sayHello () {
    this.helloTimes++
  }
}
