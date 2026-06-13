import React, { useState } from 'react';
import { View, Text, ScrollView, Input, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useFlashRecordStore } from '@/store/flashRecord';
import { mockDevices } from '@/data/mockDevices';
import { mockRoms } from '@/data/mockRoms';
import { formatDate } from '@/utils/format';
import styles from './index.module.scss';

const FlashRecordsPage: React.FC = () => {
  const { records, addRecord, deleteRecord } = useFlashRecordStore();
  const [showForm, setShowForm] = useState(false);
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [romIndex, setRomIndex] = useState(0);
  const [notes, setNotes] = useState('');

  const handleAddRecord = () => {
    const device = mockDevices[deviceIndex];
    const rom = mockRoms[romIndex];
    
    addRecord({
      deviceId: device.id,
      deviceName: device.name,
      romName: rom.name,
      version: rom.version,
      backupTime: new Date().toISOString(),
      notes: notes
    });
    
    setShowForm(false);
    setNotes('');
  };

  const handleDeleteRecord = (id: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这条刷机记录吗？',
      success: (res) => {
        if (res.confirm) {
          deleteRecord(id);
        }
      }
    });
  };

  return (
    <View className={styles.page}>
      <ScrollView scrollY className={styles.recordList}>
        {records.length > 0 ? (
          records.map((record) => (
            <View key={record.id} className={styles.recordCard}>
              <View className={styles.recordHeader}>
                <View className={styles.deviceInfo}>
                  <Text className={styles.deviceName}>{record.deviceName}</Text>
                  <Text className={styles.romInfo}>{record.romName} v{record.version}</Text>
                </View>
                <View
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteRecord(record.id)}
                >
                  <Text className={styles.deleteText}>删除</Text>
                </View>
              </View>
              
              <View className={styles.recordMeta}>
                <View className={styles.metaItem}>
                  <Text className={styles.metaLabel}>备份时间</Text>
                  <Text className={styles.metaValue}>{formatDate(record.backupTime)}</Text>
                </View>
                <View className={styles.metaItem}>
                  <Text className={styles.metaLabel}>刷入版本</Text>
                  <Text className={styles.metaValue}>{record.version}</Text>
                </View>
              </View>
              
              {record.notes && (
                <View className={styles.notes}>
                  <Text className={styles.notesLabel}>异常备注</Text>
                  <Text className={styles.notesText}>{record.notes}</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>&#128230;</Text>
            <Text className={styles.emptyText}>暂无刷机记录</Text>
            <Text className={styles.emptyHint}>点击下方按钮添加第一条记录</Text>
          </View>
        )}
      </ScrollView>

      {showForm && (
        <View className={styles.formOverlay} onClick={() => setShowForm(false)}>
          <View className={styles.form} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.formTitle}>添加刷机记录</Text>
            
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>选择机型</Text>
              <Picker
                mode='selector'
                range={mockDevices}
                rangeKey='name'
                onChange={(e) => setDeviceIndex(Number(e.detail.value))}
              >
                <View className={styles.pickerValue}>
                  <Text>{mockDevices[deviceIndex]?.name || '请选择'}</Text>
                  <Text className={styles.arrow}>&#8250;</Text>
                </View>
              </Picker>
            </View>
            
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>刷入版本</Text>
              <Picker
                mode='selector'
                range={mockRoms}
                rangeKey='name'
                onChange={(e) => setRomIndex(Number(e.detail.value))}
              >
                <View className={styles.pickerValue}>
                  <Text>{mockRoms[romIndex]?.name || '请选择'} v{mockRoms[romIndex]?.version || ''}</Text>
                  <Text className={styles.arrow}>&#8250;</Text>
                </View>
              </Picker>
            </View>
            
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>异常备注（可选）</Text>
              <Input
                className={styles.notesInput}
                placeholder='如有异常情况请备注...'
                value={notes}
                onInput={(e) => setNotes(e.detail.value)}
              />
            </View>
            
            <View className={styles.formActions}>
              <View
                className={styles.cancelBtn}
                onClick={() => setShowForm(false)}
              >
                <Text className={styles.cancelText}>取消</Text>
              </View>
              <View
                className={styles.submitBtn}
                onClick={handleAddRecord}
              >
                <Text className={styles.submitText}>保存</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {!showForm && (
        <View className={styles.bottomBar}>
          <View
            className={styles.addButton}
            onClick={() => setShowForm(true)}
          >
            <Text className={styles.addButtonText}>+ 添加记录</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default FlashRecordsPage;
