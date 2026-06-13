import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import DeviceCard from '@/components/DeviceCard';
import RomCard from '@/components/RomCard';
import { mockDevices, mockBrands } from '@/data/mockDevices';
import { mockRoms } from '@/data/mockRoms';
import { useDeviceStore } from '@/store/device';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const { devices, followDevice, unfollowDevice } = useDeviceStore();

  const mergedDevices = useMemo(() => {
    return mockDevices.map(device => {
      const storeDevice = devices.find(d => d.id === device.id);
      return storeDevice ? { ...device, ...storeDevice } : device;
    });
  }, [devices]);

  const filteredDevices = useMemo(() => {
    let result = mergedDevices;
    
    if (selectedBrand) {
      result = result.filter(d => d.brand === selectedBrand);
    }
    
    if (searchValue.trim()) {
      const keyword = searchValue.toLowerCase();
      result = result.filter(d => 
        d.brand.toLowerCase().includes(keyword) ||
        d.name.toLowerCase().includes(keyword) ||
        d.model.toLowerCase().includes(keyword) ||
        d.processor.toLowerCase().includes(keyword)
      );
    }
    
    return result;
  }, [mergedDevices, selectedBrand, searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleBrandClick = (brandName: string) => {
    if (selectedBrand === brandName) {
      setSelectedBrand('');
    } else {
      setSelectedBrand(brandName);
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

  const handleFollowDevice = (deviceId: string, isFollowed: boolean) => {
    if (isFollowed) {
      unfollowDevice(deviceId);
    } else {
      followDevice(deviceId);
    }
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
          className={styles.searchInput}
          placeholder='搜索品牌、型号、处理器...'
          value={searchValue}
          onInput={(e) => handleSearch(e.detail.value)}
          confirmType='search'
        />
        {searchValue && (
          <View 
            className={styles.clearBtn}
            onClick={() => handleSearch('')}
          >
            <Text className={styles.clearIcon}>&#10005;</Text>
          </View>
        )}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>热门品牌</Text>
          {selectedBrand && (
            <View 
              className={styles.filterTag}
              onClick={() => setSelectedBrand('')}
            >
              <Text className={styles.filterTagText}>筛选: {selectedBrand}</Text>
              <Text className={styles.filterTagClose}>&#10005;</Text>
            </View>
          )}
        </View>
        <ScrollView scrollX className={styles.brandScroll}>
          <View className={styles.brandList}>
            {mockBrands.map((brand) => (
              <View
                key={brand.id}
                className={`${styles.brandItem} ${selectedBrand === brand.name ? styles.brandActive : ''}`}
                onClick={() => handleBrandClick(brand.name)}
              >
                <Image
                  className={styles.brandLogo}
                  src={brand.logo}
                  mode='aspectFill'
                  onError={() => console.error('[Home] Brand logo load failed:', brand.logo)}
                />
                <Text className={styles.brandName}>{brand.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            热门机型 {filteredDevices.length > 0 && `(${filteredDevices.length})`}
          </Text>
        </View>
        {filteredDevices.length > 0 ? (
          <View className={styles.deviceList}>
            {filteredDevices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onClick={() => handleDeviceClick(device.id)}
                onFollow={() => handleFollowDevice(device.id, device.isFollowed)}
              />
            ))}
          </View>
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyText}>没有找到匹配的机型</Text>
          </View>
        )}
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
