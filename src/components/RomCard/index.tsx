import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Rom } from '@/types/rom';
import { formatNumber } from '@/utils/format';
import styles from './index.module.scss';

interface RomCardProps {
  rom: Rom;
  onClick?: () => void;
}

const RomCard: React.FC<RomCardProps> = ({ rom, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick();
    else {
      Taro.navigateTo({
        url: `/pages/rom-detail/index?id=${rom.id}`
      });
    }
  };

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.header}>
        <View className={styles.info}>
          <Text className={styles.name}>{rom.name}</Text>
          <Text className={styles.version}>v{rom.version}</Text>
        </View>
        <View className={styles.rating}>
          <Text className={styles.ratingScore}>{rom.rating}</Text>
          <Text className={styles.ratingLabel}>分</Text>
        </View>
      </View>

      <View className={styles.screenshots}>
        {rom.screenshots.slice(0, 3).map((src, index) => (
          <Image
            key={index}
            className={styles.screenshot}
            src={src}
            mode='aspectFill'
            onError={() => console.error('[RomCard] Screenshot load failed:', src)}
          />
        ))}
      </View>

      <View className={styles.meta}>
        <Text className={styles.device}>{rom.deviceName}</Text>
        <Text className={styles.stats}>
          {formatNumber(rom.downloadCount)}下载 · {rom.feedbackCount}反馈
        </Text>
      </View>

      <View className={styles.footer}>
        <Text className={styles.size}>{rom.fileSize}</Text>
        <Text className={styles.author}>by {rom.author}</Text>
      </View>
    </View>
  );
};

export default RomCard;
