import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Device } from '@/types/device';
import styles from './index.module.scss';

interface DeviceCardProps {
  device: Device;
  onClick?: () => void;
  onFollow?: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onClick, onFollow }) => {
  const handleClick = () => {
    if (onClick) onClick();
    else {
      Taro.navigateTo({
        url: `/pages/device-detail/index?id=${device.id}`
      });
    }
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
            onClick={(e) => {
              e.stopPropagation();
              if (onFollow) onFollow();
            }}
          >
            <Text className={device.isFollowed ? styles.followedText : styles.followText}>
              {device.isFollowed ? '已关注' : '+ 关注'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeviceCard;
