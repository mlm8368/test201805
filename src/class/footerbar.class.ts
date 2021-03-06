import { $, viewEXT } from '../common/js/global.js'
import { FooterbarConfig } from './interface'
import * as config from './config'

export default class Footerbar {
  protected props: FooterbarConfig = {
    tabBarId: 'tabBar',
    firstWebviewId: 'launchWebview',
    activeColor: '#007aff',
    normalColor: '#000',
    subpages: []
  }
  protected activePage: string
  protected firstWebviewPage: string
  protected firstTitleNView: any
  protected isFirst = true
  protected status = 'done'
  private aniShow: { [index: string]: boolean } = {}
  constructor (props: FooterbarConfig) {
    // Object.assign(this.props, props)
    $.extend(true, this.props, props)

    if ($.plus) {
      let firstWebview = null
      if (this.props.firstWebviewId === 'launchWebview') firstWebview = $.plus.webview.getLaunchWebview()
      else firstWebview = $.plus.webview.getWebviewById(this.props.firstWebviewId)

      if (firstWebview) {
        this.firstWebviewPage = firstWebview.id
        this.firstTitleNView = firstWebview.getTitleNView()
      }

      this.aniShow[firstWebview.id] = true

    } else $.log('ERR! mui plus is null')
  }
  /**
   * 获取activePage
   * @returns activePage
   * @memberof Footerbar
   */
  public getActivePage (): string {
    return this.activePage
  }
  public getStatus (): string {
    return this.status
  }
  /**
   * 初始化首个tab窗口 和 创建子webview窗口
   * @memberof Footerbar
   */
  public initSubpage (): void {
    let self = $.plus.webview.currentWebview()

    this.activePage = self.id

    // 初始化绘制首个tab按钮
    this.toggleNview(0)

    for (const subpage of this.props.subpages) {
      if (!$.plus.webview.getWebviewById(subpage.id)) {
        let subpageStyle = { top: '0px', bottom: config.common.footerbarHeight + 'px', bounce: 'none', bounceBackground: '#1E90FF' }
        if (subpage.subpageStyle) $.extend(true, subpageStyle, subpage.subpageStyle)
        let sub = $.plus.webview.create(subpage.url, subpage.id, subpageStyle)
        // 初始化隐藏
        sub.hide()
        // append到当前父webview
        self.append(sub)
      }
    }
    this.isFirst = false
  }
  /**
   * 点击切换tab窗口
   * @param {string} targetPage
   * @memberof Footerbar
   */
  public changeSubpage (targetPage: string): void {
    if (targetPage === this.firstWebviewPage) this.firstTitleNView.show()
    else this.firstTitleNView.hide()

    // 若为iOS平台或非首次显示，则直接显示
    if ($.os.ios || this.aniShow[targetPage]) {
      $.plus.webview.show(targetPage)
    } else {
      // 否则，使用fade-in动画，且保存变量
      this.aniShow[targetPage] = true
      $.plus.webview.show(targetPage, 'fade-in', 300)
    }
    // 隐藏当前 除了第一个父窗口
    if (this.activePage !== this.firstWebviewPage) $.plus.webview.hide(this.activePage)

    this.activePage = targetPage
    this.status = 'done'
    $.plus.nativeUI.closeWaiting()
  }
  /**
   * 点击重绘底部tab （view控件）
   * @param {number} currIndex
   * @memberof Footerbar
   */
  public toggleNview (currIndex: number): void {
    if (!this.isFirst) {
      this.status = 'doing'
      $.plus.nativeUI.showWaiting()
    }
    currIndex = currIndex * 2
    // 重绘当前tag 包括icon和text，所以执行两个重绘操作
    this.updateSubNView(currIndex, this.props.activeColor)
    // 重绘兄弟tag 反之排除当前点击的icon和text
    for (let i = 0; i < this.props.subpages.length * 2 + 2; i += 2) {
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
}
