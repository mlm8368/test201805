export interface IdUrl {
  id: string,
  url: string,
  subpageStyle?: any
}
export interface FooterbarConfig {
  tabBarId: string,
  firstWebviewId: string,
  activeColor: string,
  normalColor: string,
  subpages: IdUrl[]
}
export interface SbbTabBarItem {
  id: string,
  url: string,
  title: string,
  activeClass: string,
  extras?: any
}
