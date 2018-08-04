import Vue from 'vue'
import Component from 'vue-class-component'

const AppProps = Vue.extend({
  props: {
    oneday: {}
  }
})

@Component({
  template: require('../index/home.vue.html')
})
export default class Home extends AppProps {
  helloTimes: number = 0
  sayHello () {
    this.helloTimes++
  }
}
