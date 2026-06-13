import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import DownloadItem from '@/components/DownloadItem';
import { mockDownloads } from '@/data/mockDownloads';
import { Download } from '@/types/download';
import styles from './index.module.scss';

const DownloadPage: React.FC = () => {
  const [downloads, setDownloads] = useState<Download[]>(mockDownloads);

  const activeDownloads = downloads.filter(d => d.status === 'downloading' || d.status === 'paused');
  const completedDownloads = downloads.filter(d => d.status === 'completed');
  const failedDownloads = downloads.filter(d => d.status === 'failed');

  const handleRetry = (id: string) => {
    setDownloads(prev => prev.map(d =>
      d.id === id
        ? { ...d, status: 'downloading' as const, progress: 0, retryCount: d.retryCount + 1, errorMessage: undefined }
        : d
    ));
  };

  const handlePause = (id: string) => {
    setDownloads(prev => prev.map(d =>
      d.id === id ? { ...d, status: 'paused' as const } : d
    ));
  };

  const handleResume = (id: string) => {
    setDownloads(prev => prev.map(d =>
      d.id === id ? { ...d, status: 'downloading' as const } : d
    ));
  };

  const handleDelete = (id: string) => {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个下载任务吗？',
      success: (res) => {
        if (res.confirm) {
          setDownloads(prev => prev.filter(d => d.id !== id));
        }
      }
    });
  };

  return (
    <ScrollView
      className={styles.page}
      scrollY
      enableBackToTop
      onRefresherRefresh={() => {
        wx.showToast({ title: '刷新中...', icon: 'loading' });
        setTimeout(() => wx.stopPullDownRefresh(), 1000);
      }}
    >
      <View className={styles.stats}>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{activeDownloads.length}</Text>
          <Text className={styles.statLabel}>进行中</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{completedDownloads.length}</Text>
          <Text className={styles.statLabel}>已完成</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{failedDownloads.length}</Text>
          <Text className={styles.statLabel}>失败</Text>
        </View>
      </View>

      {activeDownloads.length > 0 && (
        <>
          <Text className={styles.sectionTitle}>进行中</Text>
          <View className={styles.downloadList}>
            {activeDownloads.map((download) => (
              <DownloadItem
                key={download.id}
                download={download}
                onPause={() => handlePause(download.id)}
                onResume={() => handleResume(download.id)}
                onDelete={() => handleDelete(download.id)}
              />
            ))}
          </View>
        </>
      )}

      {completedDownloads.length > 0 && (
        <>
          <Text className={styles.sectionTitle}>已完成</Text>
          <View className={styles.downloadList}>
            {completedDownloads.map((download) => (
              <DownloadItem
                key={download.id}
                download={download}
                onDelete={() => handleDelete(download.id)}
              />
            ))}
          </View>
        </>
      )}

      {failedDownloads.length > 0 && (
        <>
          <Text className={styles.sectionTitle}>失败</Text>
          <View className={styles.downloadList}>
            {failedDownloads.map((download) => (
              <DownloadItem
                key={download.id}
                download={download}
                onRetry={() => handleRetry(download.id)}
                onDelete={() => handleDelete(download.id)}
              />
            ))}
          </View>
        </>
      )}

      {downloads.length === 0 && (
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>&#128230;</Text>
          <Text className={styles.emptyText}>暂无下载任务</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default DownloadPage;
