// 下载类型定义
export interface Download {
  id: string;
  romId: string;
  romName: string;
  deviceName: string;
  version: string;
  fileSize: string;
  status: DownloadStatus;
  progress: number;
  md5: string;
  md5Verified: boolean;
  packages: DownloadPackage[];
  errorMessage?: string;
  retryCount: number;
  createdAt: string;
  completedAt?: string;
}

export type DownloadStatus = 'pending' | 'downloading' | 'paused' | 'completed' | 'failed' | 'verifying';

export interface DownloadPackage {
  id: string;
  name: string;
  size: string;
  status: DownloadStatus;
  progress: number;
  url: string;
}
