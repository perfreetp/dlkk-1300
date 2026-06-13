import { Rom } from '@/types/rom';

export const mockRoms: Rom[] = [
  {
    id: '1',
    name: 'MIUI 14 欧版',
    version: '14.0.25.1.7',
    deviceId: '1',
    deviceName: '小米13 Pro',
    basePackage: 'V14.0.5.0.TMACNXM',
    screenshots: [
      'https://picsum.photos/id/1/300/400',
      'https://picsum.photos/id/2/300/400',
      'https://picsum.photos/id/3/300/400'
    ],
    changelog: '1. 优化系统流畅度\n2. 修复已知Bug\n3. 更新安全补丁到2024年1月',
    knownIssues: ['偶尔WiFi断流', '部分银行App不兼容'],
    rating: 4.5,
    feedbackCount: 128,
    downloadCount: 3562,
    fileSize: '2.8GB',
    md5: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    author: 'xiaomiroms',
    releaseDate: '2024-01-15',
    downloadUrl: 'https://example.com/download/rom1.zip'
  },
  {
    id: '2',
    name: 'HarmonyOS 4.0 移植版',
    version: '4.0.0.128',
    deviceId: '2',
    deviceName: '华为Mate 60 Pro',
    basePackage: '4.0.0.120',
    screenshots: [
      'https://picsum.photos/id/6/300/400',
      'https://picsum.photos/id/8/300/400',
      'https://picsum.photos/id/9/300/400'
    ],
    changelog: '1. 全新鸿蒙界面\n2. 超级终端功能\n3. 万能卡片优化',
    knownIssues: ['暂未发现'],
    rating: 4.8,
    feedbackCount: 256,
    downloadCount: 8932,
    fileSize: '3.2GB',
    md5: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7',
    author: 'harmonyteam',
    releaseDate: '2024-01-14',
    downloadUrl: 'https://example.com/download/rom2.zip'
  },
  {
    id: '3',
    name: 'ColorOS 14 国际版',
    version: '14.0.0.230',
    deviceId: '3',
    deviceName: 'OPPO Find X7 Ultra',
    basePackage: 'C.66',
    screenshots: [
      'https://picsum.photos/id/119/300/400',
      'https://picsum.photos/id/160/300/400',
      'https://picsum.photos/id/201/300/400'
    ],
    changelog: '1. AI消除功能\n2. 流体云优化\n3. 性能提升15%',
    knownIssues: ['手势导航偶发卡顿'],
    rating: 4.3,
    feedbackCount: 89,
    downloadCount: 2156,
    fileSize: '2.6GB',
    md5: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8',
    author: 'colorosintl',
    releaseDate: '2024-01-13',
    downloadUrl: 'https://example.com/download/rom3.zip'
  },
  {
    id: '4',
    name: 'OriginOS 4 纯净版',
    version: 'PD2232B_A_4.0.0.10',
    deviceId: '4',
    deviceName: 'vivo X100 Pro',
    basePackage: 'PD2232B_A_3.10.12',
    screenshots: [
      'https://picsum.photos/id/1/300/400',
      'https://picsum.photos/id/3/300/400',
      'https://picsum.photos/id/6/300/400'
    ],
    changelog: '1. 原子通知升级\n2. 内存融合优化\n3. 续航提升20%',
    knownIssues: [],
    rating: 4.7,
    feedbackCount: 167,
    downloadCount: 4532,
    fileSize: '2.9GB',
    md5: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9',
    author: 'vivochina',
    releaseDate: '2024-01-12',
    downloadUrl: 'https://example.com/download/rom4.zip'
  },
  {
    id: '5',
    name: 'OxygenOS 14',
    version: '14.0.2.LE25BA',
    deviceId: '5',
    deviceName: '一加12',
    basePackage: 'LE2125_14.0.0.LE25BA',
    screenshots: [
      'https://picsum.photos/id/8/300/400',
      'https://picsum.photos/id/9/300/400',
      'https://picsum.photos/id/119/300/400'
    ],
    changelog: '1. 禅定模式升级\n2. 游戏助手优化\n3. 相机算法更新',
    knownIssues: ['部分区域不支持5G'],
    rating: 4.6,
    feedbackCount: 203,
    downloadCount: 6789,
    fileSize: '3.0GB',
    md5: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    author: 'oneplusdev',
    releaseDate: '2024-01-11',
    downloadUrl: 'https://example.com/download/rom5.zip'
  }
];
