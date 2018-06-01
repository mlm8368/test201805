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
export interface TabBarItem {
  id: string,
  url: string,
  title: string,
  activeClass: string,
  extras?: any
}
export interface ImageSliderImageStyles {
  src: string,
  width?: string,
  height?: string,
  align?: string,
  verticalAlign?: string
}
