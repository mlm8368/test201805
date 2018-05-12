import { $, viewEXT } from '../common/js/global.js'

export interface IdUrl {
  id: string,
  url: string
}
export interface FooterbarConfig {
  tabBarId: string,
  firstWebviewId: string,
  activeColor: string,
  normalColor: string,
  subpages: IdUrl[]
}

export class Footerbar {
  protected props: FooterbarConfig = {
    tabBarId: 'tabBar',
    firstWebviewId: 'launchWebview',
    activeColor: '#007aff',
    normalColor: '#000',
    subpages: []
  }
  protected activePage
  protected firstWebview
  private aniShow
  constructor (props: FooterbarConfig) {
    // Object.assign(this.props, props)
    $.extend(this.props, props, true)
    this.aniShow = {}

    if ($.plus) {
      if (this.props.firstWebviewId === 'launchWebview') this.firstWebview = $.plus.webview.getLaunchWebview()
      else this.firstWebview = $.plus.webview.getWebviewById(this.props.firstWebviewId)

      const targetPage = this.firstWebview
      $.extend(this.aniShow, { targetPage: true })

      this.initSubpage()
    } else $.log('ERR! mui plus is null')
  }
  /**
   * 获取activePage
   * @returns activePage
   * @memberof Footerbar
   */
  public getActivePage () {
    return this.activePage
  }
  /**
   * 点击切换tab窗口
   * @param {*} targetPage
   * @memberof Footerbar
   */
  public changeSubpage (targetPage: any): void {
    // 若为iOS平台或非首次显示，则直接显示
    if ($.os.ios || this.aniShow[targetPage]) {
      $.plus.webview.show(targetPage)
    } else {
      // 否则，使用fade-in动画，且保存变量
      $.extend(this.aniShow, { targetPage: true })
      $.plus.webview.show(targetPage, 'fade-in', 300)
    }
    // 隐藏当前 除了第一个父窗口
    if (this.activePage !== this.firstWebview) $.plus.webview.hide(this.activePage)

    this.activePage = targetPage
  }
  /**
   * 点击重绘底部tab （view控件）
   * @param {number} currIndex
   * @memberof Footerbar
   */
  public toggleNview (currIndex: number): void {
    currIndex = currIndex * 2
    // 重绘当前tag 包括icon和text，所以执行两个重绘操作
    this.updateSubNView(currIndex, this.props.activeColor)
    // 重绘兄弟tag 反之排除当前点击的icon和text
    for (let i = 0; i < this.props.subpages.length * 2; i + 2) {
      if (i !== currIndex && i !== currIndex + 1) {
        this.updateSubNView(i, this.props.normalColor)
      }
    }
  }
  /**
   * 利用 window.plus.nativeObj.View 提供的 drawText 方法更新 view 控件
   * @param {number} currIndex
   * @param {string} color
   * @memberof Footerbar
   */
  protected updateSubNView (currIndex: number, color: string): void {
    const tabBarNViewEvent = $.plus.nativeObj.View.getViewById(this.props.tabBarId)
    const nviewObj = $.plus.webview.currentWebview().getStyle().subNViews[0]
    // 获取当前需重绘的tag(icon)
    let currTag = nviewObj.tags[currIndex]
    currTag.textStyles.color = color
    tabBarNViewEvent.drawText(currTag.text, currTag.position, currTag.textStyles, currTag.id)
    // 获取当前需重绘的tag(text)
    currTag = nviewObj.tags[currIndex + 1]
    currTag.textStyles.color = color
    tabBarNViewEvent.drawText(currTag.text, currTag.position, currTag.textStyles, currTag.id)
  }
  /**
   * 初始化首个tab窗口 和 创建子webview窗口
   * @memberof Footerbar
   */
  private initSubpage (): void {
    let subpageStyle = { top: 0, bottom: 50, bounce: 'none', bounceBackground: '#1E90FF' }
    const self = $.plus.webview.currentWebview()

    this.activePage = self

    // 兼容安卓上添加titleNView 和 设置沉浸式模式会遮盖子webview内容
    if ($.os.android) {
      if ($.plus.navigator.isImmersedStatusbar()) subpageStyle.top += $.plus.navigator.getStatusbarHeight()
      if (self.getTitleNView()) subpageStyle.top += 40
    }
    // 初始化绘制首个tab按钮
    this.toggleNview(0)

    for (const subpage of this.props.subpages) {
      if (!$.plus.webview.getWebviewById(subpage.id)) {
        let sub = $.plus.webview.create(subpage.url, subpage.id, subpageStyle)
        // 初始化隐藏
        sub.hide()
        // append到当前父webview
        self.append(sub)
      }
    }
  }
}
