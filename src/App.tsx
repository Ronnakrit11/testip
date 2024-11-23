import React, { useState, useEffect } from 'react';
import { LogsHeader } from './components/LogsHeader';
import { LogsFilter } from './components/LogsFilter';
import { LogsTable } from './components/LogsTable';
import { UserModal } from './components/UserModal';
import type { Log } from './types';

const INITIAL_LOGS: Log[] = [
  {
    id: '1',
    timestamp: '2024-03-15 09:30:25',
    type: 'success',
    message: 'สร้างผู้ใช้งานใหม่สำเร็จ',
    system: 'ระบบจัดการผู้ใช้',
    details: {
      user: 'admin@example.com',
      action: 'สร้างผู้ใช้งาน',
      target: 'user1@example.com'
    }
  },
  {
    id: '2',
    timestamp: '2024-03-15 09:28:15',
    type: 'error',
    message: 'ไม่สามารถสร้างผู้ใช้งานได้ - อีเมลซ้ำ',
    system: 'ระบบจัดการผู้ใช้',
    details: {
      user: 'admin@example.com',
      action: 'สร้างผู้ใช้งาน',
      target: 'existing@example.com'
    }
  },
  {
    id: '3',
    timestamp: '2024-03-15 09:25:00',
    type: 'warning',
    message: 'พื้นที่จัดเก็บข้อมูลเหลือน้อย',
    system: 'ระบบจัดเก็บข้อมูล'
  },
  {
    id: '4',
    timestamp: '2024-03-15 09:20:30',
    type: 'info',
    message: 'มีการเข้าสู่ระบบใหม่',
    system: 'ระบบความปลอดภัย',
    details: {
      user: 'admin@example.com',
      action: 'เข้าสู่ระบบ'
    }
  },
  {
    id: '5',
    timestamp: '2024-03-15 09:15:00',
    type: 'success',
    message: 'อัปเดตข้อมูลผู้ใช้สำเร็จ',
    system: 'ระบบจัดการผู้ใช้',
    details: {
      user: 'admin@example.com',
      action: 'แก้ไขข้อมูล',
      target: 'user2@example.com'
    }
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [logs, setLogs] = useState<Log[]>(() => {
    const savedLogs = localStorage.getItem('systemLogs');
    return savedLogs ? JSON.parse(savedLogs) : INITIAL_LOGS;
  });

  // Save logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('systemLogs', JSON.stringify(logs));
  }, [logs]);

  const handleAddUser = (userData: { email: string; name: string; role: 'admin' | 'user' }) => {
    const timestamp = new Date().toLocaleString('th-TH');
    
    // Simulate checking for duplicate email
    const isDuplicateEmail = logs.some(log => 
      log.details?.target === userData.email && 
      log.type === 'success' && 
      log.system === 'ระบบจัดการผู้ใช้'
    );

    const newLog: Log = {
      id: Date.now().toString(),
      timestamp,
      type: isDuplicateEmail ? 'error' : 'success',
      message: isDuplicateEmail 
        ? 'ไม่สามารถสร้างผู้ใช้งานได้ - อีเมลซ้ำ'
        : 'สร้างผู้ใช้งานใหม่สำเร็จ',
      system: 'ระบบจัดการผู้ใช้',
      details: {
        user: 'admin@example.com',
        action: 'สร้างผู้ใช้งาน',
        target: userData.email
      }
    };

    setLogs(prevLogs => [newLog, ...prevLogs]);
    setIsUserModalOpen(false);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.system.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details?.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details?.target?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || log.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <LogsHeader onAddUser={() => setIsUserModalOpen(true)} />
          <LogsFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <LogsTable logs={filteredLogs} />
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              แสดง {filteredLogs.length} รายการ จากทั้งหมด {logs.length} รายการ
            </div>
          </div>
        </div>
      </div>
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
}

export default App;