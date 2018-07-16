import Vue from 'vue'
import Component from 'vue-class-component'

const AppProps = Vue.extend({
  props: {
    oneday: {}
  }
})

@Component({
  template: require('../index/timeline.vue.html')
})
export default class TimeLine extends AppProps {
  helloTimes: number = 0
  sayHello () {
    this.helloTimes++
  }
}
