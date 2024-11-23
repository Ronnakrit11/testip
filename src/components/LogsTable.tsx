import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, InfoIcon } from 'lucide-react';
import type { Log } from '../types';

interface LogsTableProps {
  logs: Log[];
}

export const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <InfoIcon className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              เวลา
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ประเภท
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ข้อความ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ระบบ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              รายละเอียด
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {log.timestamp}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getStatusIcon(log.type)}
                  <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(log.type)}`}>
                    {log.type === 'success' && 'สำเร็จ'}
                    {log.type === 'error' && 'ข้อผิดพลาด'}
                    {log.type === 'warning' && 'คำเตือน'}
                    {log.type === 'info' && 'ข้อมูล'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {log.message}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {log.system}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {log.details && (
                  <div className="space-y-1">
                    {log.details.user && <div>ผู้ดำเนินการ: {log.details.user}</div>}
                    {log.details.action && <div>การกระทำ: {log.details.action}</div>}
                    {log.details.target && <div>เป้าหมาย: {log.details.target}</div>}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};