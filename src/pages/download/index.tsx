import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { mockDownloads } from '@/data/mockDownloads';
import { Download } from '@/types/download';
import { useMemo } from 'react';
import styles from './index.module.scss';

const DownloadPage: React.FC = () => {
  const [downloads, setDownloads] = useState<Download[]>(() => 
    mockDownloads.map(d => ({
      ...d,
      packages: d.packages.map(pkg => ({ ...pkg }))
    }))
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const intervalRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const stats = useMemo(() => ({
    active: downloads.filter(d => ['downloading', 'paused', 'verifying'].includes(d.status)).length,
    completed: downloads.filter(d => d.status === 'completed').length,
    failed: downloads.filter(d => d.status === 'failed').length
  }), [downloads]);

  const clearIntervalForDownload = (id: string) => {
    const interval = intervalRefs.current.get(id);
    if (interval) {
      clearInterval(interval);
      intervalRefs.current.delete(id);
    }
  };

  const startProgressSimulation = (id: string) => {
    clearIntervalForDownload(id);
    
    const interval = setInterval(() => {
      setDownloads(prev => {
        const download = prev.find(d => d.id === id);
        if (!download || download.status !== 'downloading') {
          clearIntervalForDownload(id);
          return prev;
        }

        const newProgress = Math.min(download.progress + Math.random() * 5, 100);
        const allPackagesCompleted = download.packages.every(pkg => {
          if (pkg.id === download.packages[download.packages.length - 1].id) {
            return newProgress >= 100;
          }
          return pkg.status === 'completed';
        });

        if (newProgress >= 100) {
          clearIntervalForDownload(id);
          return prev.map(d => {
            if (d.id === id) {
              return {
                ...d,
                progress: 100,
                status: 'completed' as const,
                md5Verified: true,
                completedAt: new Date().toISOString(),
                packages: d.packages.map((pkg, idx) => ({
                  ...pkg,
                  status: 'completed' as const,
                  progress: 100
                }))
              };
            }
            return d;
          });
        }

        return prev.map(d => {
          if (d.id === id) {
            return {
              ...d,
              progress: newProgress,
              packages: d.packages.map((pkg, idx) => {
                const pkgProgress = (newProgress / d.packages.length) * (idx + 1);
                return {
                  ...pkg,
                  progress: Math.min(pkgProgress, 100),
                  status: pkgProgress >= 100 ? 'completed' as const : 'downloading' as const
                };
              })
            };
          }
          return d;
        });
      });
    }, 500);

    intervalRefs.current.set(id, interval);
  };

  useEffect(() => {
    downloads.forEach(d => {
      if (d.status === 'downloading') {
        startProgressSimulation(d.id);
      }
    });

    return () => {
      intervalRefs.current.forEach(interval => clearInterval(interval));
    };
  }, []);

  const handleRetry = (id: string) => {
    setDownloads(prev => prev.map(d => {
      if (d.id === id) {
        const newRetryCount = (d.retryCount || 0) + 1;
        const updated = {
          ...d,
          status: 'downloading' as const,
          progress: 0,
          errorMessage: undefined,
          retryCount: newRetryCount,
          packages: d.packages.map(pkg => ({
            ...pkg,
            status: 'downloading' as const,
            progress: 0
          }))
        };
        
        setTimeout(() => startProgressSimulation(id), 100);
        return updated;
      }
      return d;
    }));
    wx.showToast({
      title: '开始重试下载',
      icon: 'success',
      duration: 1500
    });
  };

  const handlePause = (id: string) => {
    clearIntervalForDownload(id);
    setDownloads(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: 'paused' as const,
          packages: d.packages.map(pkg => ({
            ...pkg,
            status: 'paused' as const
          }))
        };
      }
      return d;
    }));
    wx.showToast({
      title: '已暂停',
      icon: 'success',
      duration: 1500
    });
  };

  const handleResume = (id: string) => {
    setDownloads(prev => prev.map(d => {
      if (d.id === id) {
        const updated = {
          ...d,
          status: 'downloading' as const,
          packages: d.packages.map(pkg => ({
            ...pkg,
            status: 'downloading' as const
          }))
        };
        setTimeout(() => startProgressSimulation(id), 100);
        return updated;
      }
      return d;
    }));
    wx.showToast({
      title: '继续下载',
      icon: 'success',
      duration: 1500
    });
  };

  const handleDelete = (id: string) => {
    clearIntervalForDownload(id);
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个下载任务吗？',
      success: (res) => {
        if (res.confirm) {
          setDownloads(prev => prev.filter(d => d.id !== id));
          wx.showToast({
            title: '已删除',
            icon: 'success',
            duration: 1500
          });
        }
      }
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusInfo = (status: Download['status']) => {
    const info = {
      pending: { text: '等待中', color: '#718096' },
      downloading: { text: '下载中', color: '#1890ff' },
      paused: { text: '已暂停', color: '#ed8936' },
      completed: { text: '已完成', color: '#48bb78' },
      failed: { text: '下载失败', color: '#fc8181' },
      verifying: { text: '校验中', color: '#ed8936' }
    };
    return info[status];
  };

  const activeDownloads = downloads.filter(d => ['downloading', 'paused', 'verifying'].includes(d.status));
  const completedDownloads = downloads.filter(d => d.status === 'completed');
  const failedDownloads = downloads.filter(d => d.status === 'failed');

  const renderDownloadItem = (download: Download) => {
    const statusInfo = getStatusInfo(download.status);
    const isExpanded = expandedId === download.id;
    
    return (
      <View key={download.id} className={styles.item}>
        <View className={styles.header} onClick={() => toggleExpand(download.id)}>
          <View className={styles.info}>
            <Text className={styles.name}>{download.romName}</Text>
            <Text className={styles.version}>{download.deviceName} · v{download.version}</Text>
            {download.retryCount > 0 && (
              <Text className={styles.retryCount}>重试 {download.retryCount} 次</Text>
            )}
          </View>
          <View className={styles.status} style={{ color: statusInfo.color }}>
            <Text className={styles.statusText}>{statusInfo.text}</Text>
            {download.md5Verified && download.status === 'completed' && (
              <Text className={styles.verifiedBadge}>✓</Text>
            )}
            <Text className={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
          </View>
        </View>

        {(download.status === 'downloading' || download.status === 'verifying') && (
          <View className={styles.progressContainer}>
            <View className={styles.progressBar}>
              <View
                className={styles.progressFill}
                style={{
                  width: `${download.status === 'verifying' ? 100 : download.progress}%`,
                  background: statusInfo.color
                }}
              />
            </View>
            <Text className={styles.progressText}>
              {download.status === 'verifying' ? '正在校验...' : `${Math.round(download.progress)}%`}
            </Text>
          </View>
        )}

        <View className={styles.meta}>
          <Text className={styles.size}>{download.fileSize}</Text>
          {download.packages.length > 1 && (
            <Text className={styles.packages}>共{download.packages.length}个分包</Text>
          )}
        </View>

        {isExpanded && (
          <View className={styles.expandedContent}>
            <View className={styles.md5Section}>
              <Text className={styles.md5Label}>MD5校验值</Text>
              <Text className={styles.md5Value} selectable>{download.md5}</Text>
              {download.status === 'completed' && (
                <View className={styles.verified}>
                  <Text className={styles.verifiedText}>
                    {download.md5Verified ? '✓ MD5校验通过' : '未校验'}
                  </Text>
                </View>
              )}
            </View>

            {download.packages.length > 1 && (
              <View className={styles.packageList}>
                <Text className={styles.packageListTitle}>分包详情</Text>
                {download.packages.map((pkg) => {
                  const pkgStatus = getStatusInfo(pkg.status);
                  return (
                    <View key={pkg.id} className={styles.packageItem}>
                      <View className={styles.packageInfo}>
                        <Text className={styles.packageName}>{pkg.name}</Text>
                        <Text className={styles.packageSize}>{pkg.size}</Text>
                      </View>
                      <Text className={styles.packageStatus} style={{ color: pkgStatus.color }}>
                        {pkgStatus.text}
                        {pkg.status === 'downloading' && ` ${Math.round(pkg.progress)}%`}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}

            <View className={styles.actions}>
              {download.status === 'downloading' && (
                <View className={styles.actionButton} onClick={() => handlePause(download.id)}>
                  <Text className={styles.actionText}>暂停</Text>
                </View>
              )}
              {download.status === 'paused' && (
                <View className={styles.actionButton} onClick={() => handleResume(download.id)}>
                  <Text className={styles.actionText}>继续</Text>
                </View>
              )}
              {download.status === 'failed' && (
                <View className={styles.retryButton} onClick={() => handleRetry(download.id)}>
                  <Text className={styles.retryText}>重试下载</Text>
                </View>
              )}
              <View className={styles.actionButton} onClick={() => handleDelete(download.id)}>
                <Text className={styles.deleteText}>删除</Text>
              </View>
            </View>
          </View>
        )}

        {!isExpanded && download.status !== 'completed' && (
          <View className={styles.quickActions}>
            {download.status === 'downloading' && (
              <View className={styles.quickButton} onClick={() => handlePause(download.id)}>
                <Text className={styles.quickText}>暂停</Text>
              </View>
            )}
            {download.status === 'paused' && (
              <View className={styles.quickButton} onClick={() => handleResume(download.id)}>
                <Text className={styles.quickText}>继续</Text>
              </View>
            )}
            {download.status === 'failed' && (
              <View className={styles.quickButton} onClick={() => handleRetry(download.id)}>
                <Text className={styles.quickText}>重试</Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
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
          <Text className={styles.statValue}>{stats.active}</Text>
          <Text className={styles.statLabel}>进行中</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.completed}</Text>
          <Text className={styles.statLabel}>已完成</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.failed}</Text>
          <Text className={styles.statLabel}>失败</Text>
        </View>
      </View>

      {activeDownloads.length > 0 && (
        <>
          <Text className={styles.sectionTitle}>进行中</Text>
          <View className={styles.downloadList}>
            {activeDownloads.map(renderDownloadItem)}
          </View>
        </>
      )}

      {completedDownloads.length > 0 && (
        <>
          <Text className={styles.sectionTitle}>已完成</Text>
          <View className={styles.downloadList}>
            {completedDownloads.map(renderDownloadItem)}
          </View>
        </>
      )}

      {failedDownloads.length > 0 && (
        <>
          <Text className={styles.sectionTitle}>失败</Text>
          <View className={styles.downloadList}>
            {failedDownloads.map(renderDownloadItem)}
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
