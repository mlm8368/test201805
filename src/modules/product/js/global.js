let $ = window.mui;

export function updateProductListParams(param) {
  let params = $.getStorage('productListParams');
  $.extend(params, param);
  $.setStorage('productListParams', params);
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