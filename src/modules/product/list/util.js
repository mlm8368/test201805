let $ = window.mui;
// let viewEXT = window.viewEXT;

export function createIframe(wrapperId, options) {
  let wrapper = $.byId(wrapperId);
  let iframe = document.createElement('iframe');
  iframe.src = options.url;
  iframe.id = options.id || options.url;
  iframe.name = iframe.id;
  wrapper.appendChild(iframe);
}

export function closeFilter(notme, type) {
  let filterIds = ['categtop', 'categ', 'sort'];
  if (notme) {
    $.each(filterIds, function(i, id) {
      if (id !== notme) {
        $.byId(id + 's').style.left = '';
        document.body.style.overflowY = '';
        document.body.style.position = '';
        $.byId('shop_' + id).dataset.isshow = 'off';
      }
    });
  }
  if (type === 'all') {
    $.byId('categtops').style.left = '';
    $.byId('shop_categtop').dataset.isshow = 'off';
    $.byId('categs').style.left = '';
    $.byId('shop_categ').dataset.isshow = 'off';
    $.byId('sorts').style.left = '';
    $.byId('shop_sort').dataset.isshow = 'off';
  }
}
