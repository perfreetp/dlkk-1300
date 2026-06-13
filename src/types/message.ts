// 消息类型定义
export interface Message {
  id: string;
  type: MessageType;
  title: string;
  content: string;
  avatar?: string;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, any>;
}

export type MessageType = 'reply' | 'dm' | 'update' | 'announcement';

export interface MessageReply {
  id: string;
  postId: string;
  postTitle: string;
  commentId: string;
  replierName: string;
  replierAvatar: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageDM {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageUpdate {
  id: string;
  romId: string;
  romName: string;
  deviceName: string;
  version: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageAnnouncement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  isRead: boolean;
  createdAt: string;
}
