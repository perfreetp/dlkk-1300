import React, { useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import DeviceCard from '@/components/DeviceCard';
import { mockDevices } from '@/data/mockDevices';
import { useDeviceStore } from '@/store/device';
import styles from './index.module.scss';

const MyFollowsPage: React.FC = () => {
  const { devices, unfollowDevice } = useDeviceStore();

  const followedDevices = useMemo(() => {
    return mockDevices
      .filter(device => devices.some(d => d.id === device.id && d.isFollowed))
      .map(device => ({ ...device, isFollowed: true }));
  }, [devices]);

  const handleUnfollow = (deviceId: string) => {
    unfollowDevice(deviceId);
  };

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <Text className={styles.count}>已关注 {followedDevices.length} 个机型</Text>
      </View>

      <View className={styles.list}>
        {followedDevices.length > 0 ? (
          followedDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onFollow={() => handleUnfollow(device.id)}
            />
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>&#9734;</Text>
            <Text className={styles.emptyText}>还没有关注任何机型</Text>
            <Text className={styles.emptyHint}>去首页浏览并关注感兴趣的机型吧</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MyFollowsPage;
