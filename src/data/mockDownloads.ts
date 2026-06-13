import { Download } from '@/types/download';

export const mockDownloads: Download[] = [
  {
    id: '1',
    romId: '1',
    romName: 'MIUI 14 欧版',
    deviceName: '小米13 Pro',
    version: '14.0.25.1.7',
    fileSize: '2.8GB',
    status: 'completed',
    progress: 100,
    md5: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    md5Verified: true,
    packages: [
      { id: 'p1', name: 'ROM主包', size: '2.6GB', status: 'completed', progress: 100, url: '' },
      { id: 'p2', name: 'GApps', size: '200MB', status: 'completed', progress: 100, url: '' }
    ],
    retryCount: 0,
    createdAt: '2024-01-15 10:00',
    completedAt: '2024-01-15 10:25'
  },
  {
    id: '2',
    romId: '2',
    romName: 'HarmonyOS 4.0 移植版',
    deviceName: '华为Mate 60 Pro',
    version: '4.0.0.128',
    fileSize: '3.2GB',
    status: 'downloading',
    progress: 68,
    md5: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7',
    md5Verified: false,
    packages: [
      { id: 'p3', name: '系统包', size: '2.8GB', status: 'downloading', progress: 68, url: '' }
    ],
    retryCount: 0,
    createdAt: '2024-01-15 11:30'
  },
  {
    id: '3',
    romId: '3',
    romName: 'ColorOS 14 国际版',
    deviceName: 'OPPO Find X7 Ultra',
    version: '14.0.0.230',
    fileSize: '2.6GB',
    status: 'failed',
    progress: 45,
    md5: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8',
    md5Verified: false,
    packages: [
      { id: 'p4', name: 'ROM包', size: '2.6GB', status: 'failed', progress: 45, url: '' }
    ],
    errorMessage: '网络连接中断',
    retryCount: 2,
    createdAt: '2024-01-15 09:15'
  },
  {
    id: '4',
    romId: '4',
    romName: 'OriginOS 4 纯净版',
    deviceName: 'vivo X100 Pro',
    version: 'PD2232B_A_4.0.0.10',
    fileSize: '2.9GB',
    status: 'paused',
    progress: 35,
    md5: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9',
    md5Verified: false,
    packages: [
      { id: 'p5', name: '主包', size: '2.5GB', status: 'paused', progress: 35, url: '' },
      { id: 'p6', name: '补丁包', size: '400MB', status: 'pending', progress: 0, url: '' }
    ],
    retryCount: 0,
    createdAt: '2024-01-15 08:00'
  },
  {
    id: '5',
    romId: '5',
    romName: 'OxygenOS 14',
    deviceName: '一加12',
    version: '14.0.2.LE25BA',
    fileSize: '3.0GB',
    status: 'verifying',
    progress: 100,
    md5: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    md5Verified: false,
    packages: [
      { id: 'p7', name: '完整包', size: '3.0GB', status: 'completed', progress: 100, url: '' }
    ],
    retryCount: 0,
    createdAt: '2024-01-15 07:45',
    completedAt: '2024-01-15 08:10'
  }
];
