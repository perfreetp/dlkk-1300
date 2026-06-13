import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Device } from '@/types/device';
import { useDeviceStore } from '@/store/device';
import styles from './index.module.scss';

interface DeviceCardProps {
  device: Device;
  onClick?: () => void;
  onFollow?: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onClick, onFollow }) => {
  const { isFollowing } = useDeviceStore();
  const isFollowed = isFollowing(device.id);

  const handleClick = () => {
    if (onClick) onClick();
    else {
      Taro.navigateTo({
        url: `/pages/device-detail/index?id=${device.id}`
      });
    }
  };

  const handleFollow = (e: any) => {
    e.stopPropagation();
    if (onFollow) onFollow();
  };

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={device.image}
          mode='aspectFill'
          onError={() => console.error('[DeviceCard] Image load failed:', device.image)}
        />
      </View>
      <View className={styles.content}>
        <Text className={styles.name}>{device.name}</Text>
        <Text className={styles.info}>{device.brand} · {device.processor}</Text>
        <View className={styles.footer}>
          <Text className={styles.romCount}>{device.romCount} 个ROM</Text>
          <View
            className={styles.followButton}
            onClick={handleFollow}
          >
            <Text className={isFollowed ? styles.followedText : styles.followText}>
              {isFollowed ? '已关注' : '+ 关注'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeviceCard;
