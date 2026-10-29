import React from 'react';
import {
  X,
  FolderArchive,
  Download,
  FileSpreadsheet,
  CheckCircle,
  HardDrive,
  Calendar,
  Layers,
} from 'lucide-react';
import { Language, WorkPermit, DriveVaultItem } from '../types';
import { translations } from '../i18n/translations';
import { generateCsvExport, triggerDownload } from '../services/sheetsService';

interface GoogleDriveVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  permits: WorkPermit[];
  vaultItems: DriveVaultItem[];
  onAddVaultSnapshot: () => void;
  language: Language;
}

export const GoogleDriveVaultModal: React.FC<GoogleDriveVaultModalProps> = ({
  isOpen,
  onClose,
  permits,
  vaultItems,
  onAddVaultSnapshot,
  language,
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  const handleDownloadCsv = () => {
    const csvContent = generateCsvExport(permits);
    const dateStr = new Date().toISOString().slice(0, 10);
    triggerDownload(csvContent, `WorkPermit_Database_${dateStr}.csv`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <FolderArchive className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold tracking-tight">Google Drive Vault Archive</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Secure Cloud Repository · Folder: <span className="font-mono text-amber-400">/BANFERT/Safety_Reports_Archive/</span>
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
          {/* Main Primary Action: Download WorkPermit_Database.csv with UTF-8 BOM */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-900 font-mono">
                  WorkPermit_Database.csv
                </div>
                <p className="text-slate-500">
                  เข้ารหัสด้วย UTF-8 BOM รองรับภาษาไทย (TH), ภาษาจีน (ZH), และภาษาพม่า (MY) ใน Microsoft Excel และ Google Sheets
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>Columns A through S</span>
                  <span>·</span>
                  <span className="font-mono">{permits.length} Records</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDownloadCsv}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{t.downloadCsv.split('(')[0]}</span>
              </button>
              <button
                onClick={onAddVaultSnapshot}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Layers className="w-4 h-4" />
                <span>สำรองข้อมูลลง Vault</span>
              </button>
            </div>
          </div>

          {/* Drive Vault Status */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <HardDrive className="w-4 h-4 text-blue-600" />
                <span>Safety_Reports_Archive/ Snapshot History</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                {vaultItems.length} Archived Snapshot(s)
              </span>
            </div>

            {vaultItems.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 space-y-2">
                <FolderArchive className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="font-medium text-slate-700">คลังเอกสาร Drive Vault สะอาด (Clean Vault)</div>
                <p className="text-slate-400 text-[11px]">
                  เริ่มต้นด้วย 0 ไฟล์ กดปุ่ม "สำรองข้อมูลลง Vault" หรือดาวน์โหลดเพื่อสร้าง Snapshot สำรอง
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                {vaultItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white hover:bg-slate-50 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="font-mono font-bold text-slate-900">{item.fileName}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {item.modifiedAt}
                          </span>
                          <span>·</span>
                          <span>{item.size}</span>
                          <span>·</span>
                          <span>{item.recordCount} permits</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleDownloadCsv}
                      className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cloud Integration Specs */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-500 space-y-1">
            <div className="font-semibold text-slate-700 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Drive Vault Retention & Security Policy</span>
            </div>
            <p>
              ไฟล์ใน Safety_Reports_Archive ได้รับการปกป้องตามมาตรฐาน IATF 16949 โดยจัดเก็บประวัติการตรวจสอบย้อนกลับ (Traceability) เป็นเวลาอย่างน้อย 7 ปี
            </p>
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
