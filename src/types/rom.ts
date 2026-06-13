// ROM类型定义
export interface Rom {
  id: string;
  name: string;
  version: string;
  deviceId: string;
  deviceName: string;
  basePackage: string;
  screenshots: string[];
  changelog: string;
  knownIssues: string[];
  rating: number;
  feedbackCount: number;
  downloadCount: number;
  fileSize: string;
  md5: string;
  author: string;
  releaseDate: string;
  downloadUrl: string;
}

export interface RomFeedback {
  id: string;
  romId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
  replies: RomFeedbackReply[];
}

export interface RomFeedbackReply {
  id: string;
  feedbackId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}
