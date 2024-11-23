import React from 'react';
import { Clock, UserPlus } from 'lucide-react';

interface LogsHeaderProps {
  onAddUser: () => void;
}

export const LogsHeader: React.FC<LogsHeaderProps> = ({ onAddUser }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">บันทึกการทำงานของระบบ</h1>
          <button
            onClick={onAddUser}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            <span>เพิ่มผู้ใช้งาน</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <Clock className="w-6 h-6 text-gray-500" />
          <span className="text-gray-600">
            อัปเดตล่าสุด: {new Date().toLocaleTimeString('th-TH')}
          </span>
        </div>
      </div>
    </div>
  );
};