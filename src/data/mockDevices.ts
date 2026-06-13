import { Device, DeviceBrand } from '@/types/device';

export const mockDevices: Device[] = [
  {
    id: '1',
    name: '小米13 Pro',
    brand: '小米',
    model: '2210132C',
    processor: '骁龙8 Gen2',
    image: 'https://picsum.photos/id/1/200/200',
    romCount: 24,
    isFollowed: false,
    lastUpdate: '2024-01-15'
  },
  {
    id: '2',
    name: '华为Mate 60 Pro',
    brand: '华为',
    model: 'ALN-AL80',
    processor: '麒麟9000S',
    image: 'https://picsum.photos/id/2/200/200',
    romCount: 18,
    isFollowed: true,
    lastUpdate: '2024-01-14'
  },
  {
    id: '3',
    name: 'OPPO Find X7 Ultra',
    brand: 'OPPO',
    model: 'PHZ110',
    processor: '骁龙8 Gen3',
    image: 'https://picsum.photos/id/3/200/200',
    romCount: 12,
    isFollowed: false,
    lastUpdate: '2024-01-13'
  },
  {
    id: '4',
    name: 'vivo X100 Pro',
    brand: 'vivo',
    model: 'V2324HA',
    processor: '天玑9300',
    image: 'https://picsum.photos/id/6/200/200',
    romCount: 15,
    isFollowed: true,
    lastUpdate: '2024-01-12'
  },
  {
    id: '5',
    name: '一加12',
    brand: '一加',
    model: 'PHB110',
    processor: '骁龙8 Gen3',
    image: 'https://picsum.photos/id/8/200/200',
    romCount: 20,
    isFollowed: false,
    lastUpdate: '2024-01-11'
  },
  {
    id: '6',
    name: '三星Galaxy S24 Ultra',
    brand: '三星',
    model: 'SM-S9280',
    processor: '骁龙8 Gen3',
    image: 'https://picsum.photos/id/9/200/200',
    romCount: 28,
    isFollowed: false,
    lastUpdate: '2024-01-10'
  },
  {
    id: '7',
    name: '红米K70 Pro',
    brand: '红米',
    model: '23113RKC6G',
    processor: '骁龙8 Gen3',
    image: 'https://picsum.photos/id/119/200/200',
    romCount: 16,
    isFollowed: true,
    lastUpdate: '2024-01-09'
  },
  {
    id: '8',
    name: 'realme GT5 Pro',
    brand: '真我',
    model: 'RMX3888',
    processor: '骁龙8 Gen3',
    image: 'https://picsum.photos/id/160/200/200',
    romCount: 14,
    isFollowed: false,
    lastUpdate: '2024-01-08'
  },
  {
    id: '9',
    name: 'iPhone 15 Pro Max',
    brand: '苹果',
    model: 'A3094',
    processor: 'A17 Pro',
    image: 'https://picsum.photos/id/201/200/200',
    romCount: 35,
    isFollowed: true,
    lastUpdate: '2024-01-07'
  },
  {
    id: '10',
    name: '荣耀Magic6 Pro',
    brand: '荣耀',
    model: 'BVL-AN20',
    processor: '骁龙8 Gen3',
    image: 'https://picsum.photos/id/1/200/200',
    romCount: 11,
    isFollowed: false,
    lastUpdate: '2024-01-06'
  }
];

export const mockBrands: DeviceBrand[] = [
  { id: '1', name: '小米', logo: 'https://picsum.photos/id/1/100/100', deviceCount: 42 },
  { id: '2', name: '华为', logo: 'https://picsum.photos/id/2/100/100', deviceCount: 38 },
  { id: '3', name: 'OPPO', logo: 'https://picsum.photos/id/3/100/100', deviceCount: 25 },
  { id: '4', name: 'vivo', logo: 'https://picsum.photos/id/6/100/100', deviceCount: 22 },
  { id: '5', name: '一加', logo: 'https://picsum.photos/id/8/100/100', deviceCount: 18 },
  { id: '6', name: '三星', logo: 'https://picsum.photos/id/9/100/100', deviceCount: 45 },
  { id: '7', name: '红米', logo: 'https://picsum.photos/id/119/100/100', deviceCount: 30 },
  { id: '8', name: '真我', logo: 'https://picsum.photos/id/160/100/100', deviceCount: 15 },
  { id: '9', name: '苹果', logo: 'https://picsum.photos/id/201/100/100', deviceCount: 28 },
  { id: '10', name: '荣耀', logo: 'https://picsum.photos/id/1/100/100', deviceCount: 20 }
];
