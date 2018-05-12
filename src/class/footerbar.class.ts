import { $, viewEXT } from '../common/js/global.js'

interface IdUrl {
  id: string,
  url: string
}
interface FooterbarConfig {
  tabBarId: string,
  firstWebviewId: string,
  activeColor: string,
  normalColor: string,
  subpages: IdUrl[]
}

export class Footerbar {
  props: FooterbarConfig = {
    tabBarId: 'tabBar',
    firstWebviewId: 'launchWebview',
    activeColor: '#007aff',
    normalColor: '#000',
    subpages: []
  }
  constructor (props: FooterbarConfig) {
    Object.assign(this.props, props)
    if ($.plus === null) $.log('ERR! mui plus is null')
  }
  initSubpage () {
    let subpageStyle = { top: 0, bottom: 50, bounce: 'none', bounceBackground: '#1E90FF' }
  }
}
