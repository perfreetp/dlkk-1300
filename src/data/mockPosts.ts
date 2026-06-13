import { Post } from '@/types/post';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: '【教程】小米13 Pro 刷入欧版MIUI 14详细步骤',
    content: '本教程详细讲解如何为小米13 Pro刷入欧版MIUI 14，包含完整步骤和注意事项...',
    authorId: 'user1',
    authorName: '刷机达人张三',
    authorAvatar: 'https://picsum.photos/id/64/100/100',
    deviceId: '1',
    deviceName: '小米13 Pro',
    category: 'tutorial',
    tags: ['小米', 'MIUI', '刷机教程'],
    images: [
      'https://picsum.photos/id/1/750/500',
      'https://picsum.photos/id/2/750/500',
      'https://picsum.photos/id/3/750/500'
    ],
    attachments: [
      { id: '1', name: '欧版MIUI 14.zip', size: '2.8GB', url: 'https://example.com/file1.zip' }
    ],
    viewCount: 2568,
    likeCount: 456,
    commentCount: 89,
    isLiked: false,
    isCollected: true,
    createdAt: '2024-01-15 10:30',
    updatedAt: '2024-01-15 14:20',
    steps: [
      { id: 's1', title: '准备工作', content: '下载ROM、解锁BL、准备电脑', images: [], isCollapsed: false },
      { id: 's2', title: '进入Recovery', content: '关机后同时按住电源键和音量下键', images: [], isCollapsed: true },
      { id: 's3', title: '刷入ROM', content: '选择ROM文件并确认刷入', images: [], isCollapsed: true },
      { id: 's4', title: '首次启动', content: '等待系统初始化，约5-10分钟', images: [], isCollapsed: true }
    ]
  },
  {
    id: '2',
    title: '华为Mate 60 Pro 鸿蒙4.0 移植版体验报告',
    content: '经过一周的深度使用，来聊聊这个移植版的实际体验如何...',
    authorId: 'user2',
    authorName: '科技评测师李四',
    authorAvatar: 'https://picsum.photos/id/91/100/100',
    deviceId: '2',
    deviceName: '华为Mate 60 Pro',
    category: 'feedback',
    tags: ['华为', '鸿蒙', '体验报告'],
    images: [
      'https://picsum.photos/id/6/750/500',
      'https://picsum.photos/id/8/750/500'
    ],
    attachments: [],
    viewCount: 4567,
    likeCount: 789,
    commentCount: 156,
    isLiked: true,
    isCollected: false,
    createdAt: '2024-01-14 15:45',
    updatedAt: '2024-01-14 15:45'
  },
  {
    id: '3',
    title: '【讨论】骁龙8 Gen3机型刷机兼容性分析',
    content: '汇总目前主流骁龙8 Gen3机型的刷机现状和兼容性情况，欢迎大家一起讨论...',
    authorId: 'user3',
    authorName: 'ROM开发者王五',
    authorAvatar: 'https://picsum.photos/id/177/100/100',
    category: 'discussion',
    tags: ['骁龙8 Gen3', '兼容性', '讨论'],
    images: [],
    attachments: [],
    viewCount: 1234,
    likeCount: 234,
    commentCount: 67,
    isLiked: false,
    isCollected: false,
    createdAt: '2024-01-13 09:20',
    updatedAt: '2024-01-13 11:30'
  },
  {
    id: '4',
    title: '【资源】ColorOS 14 国际版 ROM 合集',
    content: '整理了ColorOS 14国际版各机型的ROM资源，持续更新中...',
    authorId: 'user4',
    authorName: '资源搬运工赵六',
    authorAvatar: 'https://picsum.photos/id/338/100/100',
    deviceId: '3',
    deviceName: 'OPPO Find X7 Ultra',
    category: 'resource',
    tags: ['ColorOS', '资源', 'OPPO'],
    images: [
      'https://picsum.photos/id/119/750/500',
      'https://picsum.photos/id/160/750/500'
    ],
    attachments: [
      { id: '1', name: 'ColorOS14合集.zip', size: '15.6GB', url: 'https://example.com/file2.zip' }
    ],
    viewCount: 8923,
    likeCount: 1567,
    commentCount: 234,
    isLiked: true,
    isCollected: true,
    createdAt: '2024-01-12 18:00',
    updatedAt: '2024-01-12 20:15'
  },
  {
    id: '5',
    title: '【求助】一加12刷入OOS14后无法开机怎么办',
    content: '按照教程刷入后一直卡在开机logo，求各位大神帮忙看看...',
    authorId: 'user5',
    authorName: '新手刷机者',
    authorAvatar: 'https://picsum.photos/id/1027/100/100',
    deviceId: '5',
    deviceName: '一加12',
    category: 'discussion',
    tags: ['一加', '求助', '无法开机'],
    images: [
      'https://picsum.photos/id/201/750/500'
    ],
    attachments: [],
    viewCount: 345,
    likeCount: 23,
    commentCount: 45,
    isLiked: false,
    isCollected: false,
    createdAt: '2024-01-11 22:30',
    updatedAt: '2024-01-11 23:45'
  }
];
