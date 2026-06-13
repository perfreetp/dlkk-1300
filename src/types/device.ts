// 机型类型定义
export interface Device {
  id: string;
  name: string;
  brand: string;
  model: string;
  processor: string;
  image: string;
  romCount: number;
  isFollowed: boolean;
  lastUpdate: string;
}

export interface DeviceBrand {
  id: string;
  name: string;
  logo: string;
  deviceCount: number;
}
