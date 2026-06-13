export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/forum/index',
    'pages/download/index',
    'pages/message/index',
    'pages/profile/index',
    'pages/device-detail/index',
    'pages/rom-detail/index',
    'pages/post-detail/index',
    'pages/settings/index',
    'pages/flash-records/index',
    'pages/my-follows/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#0f0f23',
    navigationBarTitleText: 'ROM社区',
    navigationBarTextStyle: 'white',
    backgroundColor: '#0f0f23'
  },
  tabBar: {
    color: '#718096',
    selectedColor: '#1890ff',
    backgroundColor: '#1a1a2e',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/forum/index',
        text: '论坛'
      },
      {
        pagePath: 'pages/download/index',
        text: '下载'
      },
      {
        pagePath: 'pages/message/index',
        text: '消息'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的'
      }
    ]
  }
})
