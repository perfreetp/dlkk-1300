import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const DeviceDetailPage: React.FC = () => {
  return (
    <View className={styles.page}>
      <View className={styles.content}>
        <Text className={styles.icon}>&#128241;</Text>
        <Text className={styles.title}>机型详情</Text>
        <Text className={styles.desc}>功能正在开发中...</Text>
      </View>
    </View>
  );
};

export default DeviceDetailPage;
