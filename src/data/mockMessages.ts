import { Message } from '@/types/message';

export const mockMessages: Message[] = [
  {
    id: '1',
    type: 'reply',
    title: '回复提醒',
    content: '刷机达人张三回复了你的帖子「小米13 Pro刷机求助」',
    avatar: 'https://picsum.photos/id/64/100/100',
    isRead: false,
    createdAt: '2024-01-15 14:30',
    data: { postId: '5', commentId: 'c1' }
  },
  {
    id: '2',
    type: 'dm',
    title: '私信',
    content: 'ROM开发者王五：你好，请问欧版MIUI有GPay吗？',
    avatar: 'https://picsum.photos/id/177/100/100',
    isRead: false,
    createdAt: '2024-01-15 13:20',
    data: { senderId: 'user3' }
  },
  {
    id: '3',
    type: 'update',
    title: '资源更新',
    content: 'MIUI 14 欧版发布了新版本 v14.0.26.1.8，快去更新吧！',
    avatar: 'https://picsum.photos/id/1/100/100',
    isRead: true,
    createdAt: '2024-01-15 12:00',
    data: { romId: '1', version: '14.0.26.1.8' }
  },
  {
    id: '4',
    type: 'announcement',
    title: '版主公告',
    content: '【重要】近期社区规范更新，请各位用户仔细阅读最新发帖规范...',
    avatar: 'https://picsum.photos/id/91/100/100',
    isRead: true,
    createdAt: '2024-01-15 10:00',
    data: { announcementId: 'a1' }
  },
  {
    id: '5',
    type: 'reply',
    title: '回复提醒',
    content: '科技评测师李四点赞了你的评论',
    avatar: 'https://picsum.photos/id/91/100/100',
    isRead: true,
    createdAt: '2024-01-14 18:45',
    data: { postId: '2', commentId: 'c2' }
  },
  {
    id: '6',
    type: 'update',
    title: '资源更新',
    content: 'HarmonyOS 4.0 移植版已更新，修复了WiFi问题',
    avatar: 'https://picsum.photos/id/2/100/100',
    isRead: false,
    createdAt: '2024-01-14 16:30',
    data: { romId: '2', version: '4.0.0.129' }
  },
  {
    id: '7',
    type: 'dm',
    title: '私信',
    content: '资源搬运工赵六：感谢分享，已将你的资源收录到合集',
    avatar: 'https://picsum.photos/id/338/100/100',
    isRead: true,
    createdAt: '2024-01-13 20:15',
    data: { senderId: 'user4' }
  },
  {
    id: '8',
    type: 'announcement',
    title: '版主公告',
    content: '本周优质帖子评选结果公布，恭喜以下用户获得奖励...',
    avatar: 'https://picsum.photos/id/177/100/100',
    isRead: true,
    createdAt: '2024-01-13 09:00',
    data: { announcementId: 'a2' }
  }
];
