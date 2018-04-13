let $ = window.mui;

export function updatePersonInfo() {
  let userId = $.getStorage('userId');
  let userInfo = $.getStorage('userInfo');
  if (userId === null) {
    $.byId('avatar').src = '../../static/images/defaultAvatar.png';
    $('#userName').text('点击登录');
    $('#tel').text('---');
  } else if (userInfo) {
    if (userInfo.avatar) $.byId('avatar').src = userInfo.avatar;
    $('#userName').text(userInfo.username);
    $('#tel').text(userInfo.mobile);
  }
}
