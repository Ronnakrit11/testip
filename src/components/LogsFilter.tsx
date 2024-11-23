import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

interface LogsFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export const LogsFilter: React.FC<LogsFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
}) => {
  return (
    <div className="p-6 bg-gray-50 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาบันทึก..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">ทั้งหมด</option>
              <option value="success">สำเร็จ</option>
              <option value="error">ข้อผิดพลาด</option>
              <option value="warning">คำเตือน</option>
              <option value="info">ข้อมูล</option>
            </select>
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-gray-500 mr-2" />
            <span>ดาวน์โหลด</span>
          </button>
        </div>
      </div>
    </div>
  );
};