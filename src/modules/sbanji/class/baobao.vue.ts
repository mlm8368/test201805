import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  template: require('../index/baobao.vue.html')
})
export default class BaoBao extends Vue {
  helloTimes: number = 0
  sayHello () {
    this.helloTimes++
  }
}
