import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FlashRecord {
  id: string;
  deviceId: string;
  deviceName: string;
  romName: string;
  version: string;
  backupTime: string;
  notes: string;
  createdAt: string;
}

interface FlashRecordStoreContextType {
  records: FlashRecord[];
  addRecord: (record: Omit<FlashRecord, 'id' | 'createdAt'>) => void;
  deleteRecord: (id: string) => void;
  recordCount: number;
}

const FlashRecordStoreContext = createContext<FlashRecordStoreContextType | undefined>(undefined);

export const FlashRecordStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<FlashRecord[]>([]);

  useEffect(() => {
    const stored = wx.getStorageSync('flashRecordStore');
    if (stored) {
      setRecords(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    wx.setStorageSync('flashRecordStore', JSON.stringify(records));
  }, [records]);

  const addRecord = (record: Omit<FlashRecord, 'id' | 'createdAt'>) => {
    const newRecord: FlashRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setRecords(prev => [...prev, newRecord]);
    wx.showToast({
      title: '记录已添加',
      icon: 'success',
      duration: 1500
    });
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    wx.showToast({
      title: '记录已删除',
      icon: 'success',
      duration: 1500
    });
  };

  const recordCount = records.length;

  return (
    <FlashRecordStoreContext.Provider value={{ records, addRecord, deleteRecord, recordCount }}>
      {children}
    </FlashRecordStoreContext.Provider>
  );
};

export const useFlashRecordStore = () => {
  const context = useContext(FlashRecordStoreContext);
  if (!context) {
    return {
      records: [],
      addRecord: () => {},
      deleteRecord: () => {},
      recordCount: 0
    };
  }
  return context;
};
