import React, { useState } from 'react';
import {
  X,
  Bell,
  Send,
  CheckCircle2,
  Key,
} from 'lucide-react';
import { NotificationLog } from '../types';

interface WebhooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationLog[];
  onSendTestNotification: (channel: 'LINE' | 'WECHAT' | 'QQ', customToken?: string) => void;
}

export const WebhooksModal: React.FC<WebhooksModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onSendTestNotification,
}) => {
  const [lineToken, setLineToken] = useState('BANFERT_LINE_NOTIFY_SECURE_TOKEN_2026');
  const [selectedChannel, setSelectedChannel] = useState<'LINE' | 'WECHAT' | 'QQ'>('LINE');
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleTriggerTest = () => {
    onSendTestNotification(selectedChannel, lineToken);
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const getChannelBadge = (ch: string) => {
    switch (ch) {
      case 'LINE':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">LINE Notify</span>;
      case 'WECHAT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">WeChat Work</span>;
      case 'QQ':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">QQ Enterprise</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">Email</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold tracking-tight">Notification & Webhook Simulation Hub</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              LINE Notify · WeChat Work Webhook · QQ Enterprise Push Dispatcher
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs">
          {/* Token & Trigger Simulator Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Key className="w-4 h-4 text-amber-500" />
              <span>Webhook Channel Token Setup & Real-time Test</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Channel Protocol
                </label>
                <div className="flex rounded-md shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setSelectedChannel('LINE')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-l-md border transition-colors ${
                      selectedChannel === 'LINE'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    LINE
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedChannel('WECHAT')}
                    className={`flex-1 py-1.5 text-xs font-semibold border-t border-b transition-colors ${
                      selectedChannel === 'WECHAT'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    WeChat
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedChannel('QQ')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-r-md border transition-colors ${
                      selectedChannel === 'QQ'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    QQ
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Webhook / Notify Secret Bearer Token
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={lineToken}
                    onChange={(e) => setLineToken(e.target.value)}
                    className="flex-1 px-3 py-1.5 font-mono text-xs border border-slate-300 rounded-lg bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleTriggerTest}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ทดสอบส่งแจ้งเตือน (Test Trigger)</span>
                  </button>
                </div>
              </div>
            </div>

            {testSent && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-2 text-xs font-medium animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>จำลองส่งข้อความสำเร็จ (Status 200 OK): ข้อความถูกส่งเข้าบันทึก Notification Logs แล้ว</span>
              </div>
            )}
          </div>

          {/* Notification History Log */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">
                ประวัติการแจ้งเตือน (Notification Audit Log)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {notifications.length} Event(s) Recorded
              </span>
            </div>

            {notifications.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 text-slate-400 space-y-1">
                <Bell className="w-6 h-6 mx-auto opacity-50" />
                <div className="text-slate-600 font-medium">ยังไม่มีประวัติการส่งแจ้งเตือน (Clean State)</div>
                <p className="text-[11px]">
                  เมื่อมีการขอใบงานใหม่ อนุมัติ หรือกดปุ่ม "ทดสอบส่งแจ้งเตือน" รายการจะปรากฏที่นี่
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto border border-slate-200 rounded-lg">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 bg-white hover:bg-slate-50 transition-colors space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getChannelBadge(n.channel)}
                        <span className="font-bold text-slate-900">{n.title}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-slate-600 font-mono text-[11px] leading-relaxed pl-1">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
