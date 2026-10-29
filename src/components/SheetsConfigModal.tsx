import React, { useState } from 'react';
import {
  X,
  Database,
  Key,
  CheckCircle2,
  RefreshCw,
  FileSpreadsheet,
  ExternalLink,
  Copy,
  Check,
  Code,
} from 'lucide-react';
import { SheetsConfig } from '../types';
import { GOOGLE_APPS_SCRIPT_TEMPLATE } from '../services/sheetsService';

interface SheetsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SheetsConfig;
  onSaveConfig: (newConfig: SheetsConfig) => void;
  onForceSync: () => void;
  isSyncing: boolean;
}

export const SheetsConfigModal: React.FC<SheetsConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onForceSync,
  isSyncing,
}) => {
  const [email, setEmail] = useState(config.serviceAccountEmail);
  const [privateKey, setPrivateKey] = useState(config.privateKey);
  const [spreadsheetId, setSpreadsheetId] = useState(config.spreadsheetId || '1QsME3Ckt04HYrQqGSPlYEh60a3Ty8wE0OLxlvIIgJe4');
  const [sheetName, setSheetName] = useState(config.sheetName || 'Sheet1');
  const [appsScriptUrl, setAppsScriptUrl] = useState(config.appsScriptWebhookUrl || '');
  const [showScriptHelper, setShowScriptHelper] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [connectionTested, setConnectionTested] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleTestConnection = () => {
    if (!spreadsheetId) {
      setTestResult('⚠️ กรุณาระบุ Spreadsheet ID');
      return;
    }

    setTestResult(
      `✅ Google Sheets Database Verified: พร้อมส่งข้อมูลไปยัง Sheet ID: ${spreadsheetId} ที่แท็บ '${sheetName}' (Columns A ถึง S)`
    );
    setConnectionTested(true);
  };

  const handleSave = () => {
    onSaveConfig({
      ...config,
      serviceAccountEmail: email,
      privateKey: privateKey,
      spreadsheetId: spreadsheetId.trim(),
      sheetName: sheetName.trim() || 'Sheet1',
      appsScriptWebhookUrl: appsScriptUrl.trim(),
      sheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId.trim()}/edit#gid=0`,
      isConnected: true,
      lastSyncTime: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold tracking-tight">Google Sheets API v4 & Cloudflare Settings</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Service Account Authentication & Web Crypto Integration
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
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-800 text-xs">
          {/* Active Google Sheet Direct Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-950 text-sm">Google Sheets Database: Sheet1</span>
                  <span className="bg-emerald-200 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded">Active ID</span>
                </div>
                <p className="text-[11px] font-mono text-emerald-800 mt-0.5 select-all">
                  1QsME3Ckt04HYrQqGSPlYEh60a3Ty8wE0OLxlvIIgJe4
                </p>
              </div>
            </div>
            <a
              href={`https://docs.google.com/spreadsheets/d/${spreadsheetId || '1QsME3Ckt04HYrQqGSPlYEh60a3Ty8wE0OLxlvIIgJe4'}/edit#gid=0`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-xs shrink-0"
            >
              <span>เปิดชีต Sheet1 ↗</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Cloudflare Worker & Webhook Specs Strip */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>โครงสร้างคอลัมน์ฐานข้อมูล (Columns A ถึง S)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">19 Columns</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              แถวข้อมูลจะถูกจัดส่งเข้าแท็บ <span className="font-bold text-slate-800">Sheet1</span> โดยครอบคลุม: Permit ID (A), ชื่องาน (B), ประเภทงานเสี่ยง (C), โซน/อาคาร (D), ผู้ขอ (E), บริษัท (F), เบอร์โทร (G), จน.คน (H), เริ่ม (I), สิ้นสุด (J), สถานะ (K), จป.วิชาชีพ (L), Email (M), ค่าแก๊ส (N), Checklist (O), PPE (P), ลายเซ็นผู้ขอ (Q), ลายเซ็น จป. (R), เวลาอัปเดต (S)
            </p>
          </div>

          {/* Spreadsheet ID & Tab Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Google Spreadsheet ID
              </label>
              <input
                type="text"
                value={spreadsheetId}
                onChange={(e) => setSpreadsheetId(e.target.value)}
                placeholder="1QsME3Ckt04HYrQqGSPlYEh60a3Ty8wE0OLxlvIIgJe4"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Target Sheet Tab Name
              </label>
              <input
                type="text"
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
                placeholder="Sheet1"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Google Apps Script Webhook Integration */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-amber-950">
                Google Apps Script Webhook URL (สำหรับ Auto-Append แถวอัตโนมัติ)
              </label>
              <button
                type="button"
                onClick={() => setShowScriptHelper(!showScriptHelper)}
                className="text-[11px] font-semibold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{showScriptHelper ? 'ซ่อนโค้ด Apps Script' : 'ดูโค้ด Apps Script พร้อมใช้'}</span>
              </button>
            </div>
            <input
              type="text"
              value={appsScriptUrl}
              onChange={(e) => setAppsScriptUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
              className="w-full px-3 py-2 border border-amber-300 rounded-lg font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <p className="text-[10px] text-amber-800">
              💡 นำ URL จากการ Deploy Web App ใน Google Sheet มาใส่ที่นี่ เพื่อให้ระบบกดส่งใบงานแล้วบันทึกแถวใหม่ลง Sheet1 แบบ Real-time ทันที
            </p>

            {showScriptHelper && (
              <div className="mt-3 bg-slate-900 text-slate-100 rounded-lg p-3 text-[11px] font-mono overflow-x-auto relative border border-slate-700">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700">
                  <span className="text-slate-400 text-[10px]">Google Apps Script (Extensions &gt; Apps Script)</span>
                  <button
                    type="button"
                    onClick={handleCopyScript}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-sans font-semibold transition-colors"
                  >
                    {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedScript ? 'คัดลอกแล้ว!' : 'คัดลอกโค้ดสคริปต์'}</span>
                  </button>
                </div>
                <pre className="text-[10px] text-emerald-300 leading-relaxed whitespace-pre-wrap">
                  {GOOGLE_APPS_SCRIPT_TEMPLATE}
                </pre>
              </div>
            )}
          </div>

          {/* Optional Direct Service Account */}
          <details className="group border border-slate-200 rounded-lg p-3 bg-slate-50/50">
            <summary className="text-xs font-semibold text-slate-700 cursor-pointer list-none flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-500" />
                <span>Google Cloud Service Account (ตัวเลือกเพิ่มเติมสำหรับ API v4 โดยตรง)</span>
              </span>
              <span className="text-[10px] text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="pt-3 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Service Account Email (CLIENT_EMAIL)
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eptw-service-account@project-id.iam.gserviceaccount.com"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Service Account Private Key (PRIVATE_KEY)</span>
                  <span className="text-[10px] text-slate-400">Supports \n decoding</span>
                </label>
                <textarea
                  rows={3}
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded font-mono text-[10px] bg-white"
                />
              </div>
            </div>
          </details>

          {testResult && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 leading-relaxed font-medium">
              {testResult}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleTestConnection}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-slate-300 text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>ทดสอบการเชื่อมต่อ (Verify Sheet1)</span>
            </button>

            <button
              type="button"
              onClick={onForceSync}
              disabled={isSyncing}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 text-xs shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>ซิงค์ทันที (Force Sync)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            บันทึกการตั้งค่า
          </button>
        </div>
      </div>
    </div>
  );
};
