let $ = window.mui;

export function updateSellListParams(param) {
  let params = $.getStorage('sellListParams');
  $.extend(params, param);
  $.setStorage('sellListParams', params);
}

export let titleNView = {
  backgroundColor: '#f7f7f7',
  titleText: '',
  titleColor: '#000000',
  type: 'transparent',
  autoBackButton: true,
  splitLine: {
    color: '#cccccc'
  }
};