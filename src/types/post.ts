// 帖子类型定义
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  deviceId?: string;
  deviceName?: string;
  category: PostCategory;
  tags: string[];
  images: string[];
  attachments: PostAttachment[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isCollected: boolean;
  createdAt: string;
  updatedAt: string;
  steps?: PostStep[];
}

export type PostCategory = 'tutorial' | 'discussion' | 'resource' | 'feedback';

export interface PostAttachment {
  id: string;
  name: string;
  size: string;
  url: string;
}

export interface PostStep {
  id: string;
  title: string;
  content: string;
  images: string[];
  isCollapsed: boolean;
}

export interface PostComment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images: string[];
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
  replies: PostCommentReply[];
}

export interface PostCommentReply {
  id: string;
  commentId: string;
  parentId?: string;
  userId: string;
  userName: string;
  userAvatar: string;
  replyToUserName?: string;
  content: string;
  createdAt: string;
}
