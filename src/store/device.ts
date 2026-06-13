import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DeviceState {
  id: string;
  isFollowed: boolean;
}

interface DeviceStoreContextType {
  devices: DeviceState[];
  followDevice: (deviceId: string) => void;
  unfollowDevice: (deviceId: string) => void;
  isFollowing: (deviceId: string) => boolean;
  followedCount: number;
}

const DeviceStoreContext = createContext<DeviceStoreContextType | undefined>(undefined);

export const DeviceStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<DeviceState[]>([]);

  useEffect(() => {
    const stored = wx.getStorageSync('deviceStore');
    if (stored) {
      setDevices(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    wx.setStorageSync('deviceStore', JSON.stringify(devices));
  }, [devices]);

  const followDevice = (deviceId: string) => {
    setDevices(prev => {
      const exists = prev.find(d => d.id === deviceId);
      if (exists) {
        return prev.map(d => d.id === deviceId ? { ...d, isFollowed: true } : d);
      } else {
        return [...prev, { id: deviceId, isFollowed: true }];
      }
    });
    wx.showToast({
      title: '关注成功',
      icon: 'success',
      duration: 1500
    });
  };

  const unfollowDevice = (deviceId: string) => {
    setDevices(prev => prev.map(d => d.id === deviceId ? { ...d, isFollowed: false } : d));
    wx.showToast({
      title: '取消关注',
      icon: 'success',
      duration: 1500
    });
  };

  const isFollowing = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    return device?.isFollowed || false;
  };

  const followedCount = devices.filter(d => d.isFollowed).length;

  return (
    <DeviceStoreContext.Provider value={{ devices, followDevice, unfollowDevice, isFollowing, followedCount }}>
      {children}
    </DeviceStoreContext.Provider>
  );
};

export const useDeviceStore = () => {
  const context = useContext(DeviceStoreContext);
  if (!context) {
    return {
      devices: [],
      followDevice: () => {},
      unfollowDevice: () => {},
      isFollowing: () => false,
      followedCount: 0
    };
  }
  return context;
};
