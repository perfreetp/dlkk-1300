import React from 'react';
import { View, Text } from '@tarojs/components';
import { Download } from '@/types/download';
import styles from './index.module.scss';

interface DownloadItemProps {
  download: Download;
  onRetry?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onDelete?: () => void;
}

const DownloadItem: React.FC<DownloadItemProps> = ({
  download,
  onRetry,
  onPause,
  onResume,
  onDelete
}) => {
  const getStatusText = () => {
    switch (download.status) {
      case 'pending': return '等待中';
      case 'downloading': return '下载中';
      case 'paused': return '已暂停';
      case 'completed': return '已完成';
      case 'failed': return '下载失败';
      case 'verifying': return '校验中';
      default: return '未知';
    }
  };

  const getStatusColor = () => {
    switch (download.status) {
      case 'completed': return '#48bb78';
      case 'failed': return '#fc8181';
      case 'downloading': return '#1890ff';
      case 'verifying': return '#ed8936';
      default: return '#718096';
    }
  };

  return (
    <View className={styles.item}>
      <View className={styles.header}>
        <View className={styles.info}>
          <Text className={styles.name}>{download.romName}</Text>
          <Text className={styles.version}>{download.deviceName} · v{download.version}</Text>
        </View>
        <View className={styles.status} style={{ color: getStatusColor() }}>
          <Text className={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>

      {download.status === 'downloading' || download.status === 'verifying' ? (
        <View className={styles.progressContainer}>
          <View className={styles.progressBar}>
            <View
              className={styles.progressFill}
              style={{
                width: `${download.status === 'verifying' ? 100 : download.progress}%`,
                background: getStatusColor()
              }}
            />
          </View>
          <Text className={styles.progressText}>
            {download.status === 'verifying' ? '正在校验...' : `${download.progress}%`}
          </Text>
        </View>
      ) : null}

      <View className={styles.meta}>
        <Text className={styles.size}>{download.fileSize}</Text>
        {download.packages.length > 1 && (
          <Text className={styles.packages}>共{download.packages.length}个分包</Text>
        )}
        {download.status === 'completed' && download.md5Verified && (
          <Text className={styles.verified}>&#10004; MD5校验通过</Text>
        )}
      </View>

      {download.status === 'failed' && (
        <View className={styles.error}>
          <Text className={styles.errorText}>{download.errorMessage}</Text>
          {download.retryCount > 0 && (
            <Text className={styles.retryText}>已重试{download.retryCount}次</Text>
          )}
        </View>
      )}

      <View className={styles.actions}>
        {download.status === 'failed' && (
          <View className={styles.actionButton} onClick={onRetry}>
            <Text className={styles.actionText}>重试</Text>
          </View>
        )}
        {download.status === 'downloading' && (
          <View className={styles.actionButton} onClick={onPause}>
            <Text className={styles.actionText}>暂停</Text>
          </View>
        )}
        {download.status === 'paused' && (
          <View className={styles.actionButton} onClick={onResume}>
            <Text className={styles.actionText}>继续</Text>
          </View>
        )}
        <View className={styles.actionButton} onClick={onDelete}>
          <Text className={styles.deleteText}>删除</Text>
        </View>
      </View>
    </View>
  );
};

export default DownloadItem;
