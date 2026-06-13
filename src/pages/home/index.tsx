import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import DeviceCard from '@/components/DeviceCard';
import RomCard from '@/components/RomCard';
import { mockDevices, mockBrands } from '@/data/mockDevices';
import { mockRoms } from '@/data/mockRoms';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim()) {
      Taro.showToast({
        title: `搜索: ${searchValue}`,
        icon: 'none'
      });
    }
  };

  const handleDeviceClick = (deviceId: string) => {
    Taro.navigateTo({
      url: `/pages/device-detail/index?id=${deviceId}`
    });
  };

  const handleRomClick = (romId: string) => {
    Taro.navigateTo({
      url: `/pages/rom-detail/index?id=${romId}`
    });
  };

  const handleFollowDevice = (deviceId: string) => {
    Taro.showToast({
      title: deviceId ? '关注成功' : '取消关注',
      icon: 'success'
    });
  };

  return (
    <ScrollView
      className={styles.page}
      scrollY
      enableBackToTop
      onRefresherRefresh={() => {
        Taro.showToast({ title: '刷新中...', icon: 'loading' });
        setTimeout(() => Taro.stopPullDownRefresh(), 1000);
      }}
    >
      <View className={styles.searchBar}>
        <Text className={styles.searchIcon}>&#128269;</Text>
        <Input
          className={styles.searchPlaceholder}
          placeholder='搜索机型、ROM...'
          value={searchValue}
          onInput={(e) => setSearchValue(e.detail.value)}
          onConfirm={handleSearch}
          confirmType='search'
        />
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>热门品牌</Text>
        </View>
        <ScrollView scrollX className={styles.brandGrid} style={{ width: '100%' }}>
          {mockBrands.map((brand) => (
            <View key={brand.id} className={styles.brandItem}>
              <Image
                className={styles.brandLogo}
                src={brand.logo}
                mode='aspectFill'
                onError={() => console.error('[Home] Brand logo load failed:', brand.logo)}
              />
              <Text className={styles.brandName}>{brand.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>热门机型</Text>
          <View className={styles.moreLink}>
            <Text>查看更多</Text>
            <Text style={{ marginLeft: 4 }}>&#8250;</Text>
          </View>
        </View>
        <View className={styles.deviceList}>
          {mockDevices.slice(0, 5).map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onClick={() => handleDeviceClick(device.id)}
              onFollow={() => handleFollowDevice(device.id)}
            />
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>推荐ROM</Text>
          <View className={styles.moreLink}>
            <Text>查看更多</Text>
            <Text style={{ marginLeft: 4 }}>&#8250;</Text>
          </View>
        </View>
        <View className={styles.deviceList}>
          {mockRoms.slice(0, 3).map((rom) => (
            <RomCard
              key={rom.id}
              rom={rom}
              onClick={() => handleRomClick(rom.id)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
