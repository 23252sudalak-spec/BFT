/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Language,
  WorkPermit,
  UserPersona,
  HighRiskType,
  GasTestReadings,
  NotificationLog,
  DriveVaultItem,
  SheetsConfig,
} from './types';
import { translations } from './i18n/translations';
import { USER_PERSONAS, SAMPLE_ISO_PERMITS } from './data/constants';
import {
  loadStoredPermits,
  saveStoredPermits,
  loadSheetsConfig,
  saveSheetsConfig,
  loadDriveVault,
  saveDriveVault,
} from './services/sheetsService';
import { Header } from './components/Header';
import { SafetyMetricsBanner } from './components/SafetyMetricsBanner';
import { PermitList } from './components/PermitList';
import { PermitWizardModal } from './components/PermitWizardModal';
import { ApprovalModal } from './components/ApprovalModal';
import { MonthlyAnalyticsModal } from './components/MonthlyAnalyticsModal';
import { GoogleDriveVaultModal } from './components/GoogleDriveVaultModal';
import { WebhooksModal } from './components/WebhooksModal';
import { SheetsConfigModal } from './components/SheetsConfigModal';
import { PrintPermitView } from './components/PrintPermitView';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // 1. Language State (TH, ZH, EN, MY)
  const [currentLang, setCurrentLang] = useState<Language>('TH');
  const t = translations[currentLang];

  // 2. Active User Persona
  const [activePersona, setActivePersona] = useState<UserPersona>(USER_PERSONAS[0]);

  // 3. Clean Initial State for Permits (Offline-first localStorage)
  const [permits, setPermits] = useState<WorkPermit[]>(() => loadStoredPermits());

  // 4. Clean Initial State for Notifications & Google Drive Vault
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [vaultItems, setVaultItems] = useState<DriveVaultItem[]>(() => loadDriveVault());

  // 5. Sheets Configuration
  const [sheetsConfig, setSheetsConfig] = useState<SheetsConfig>(() => loadSheetsConfig());
  const [isSyncing, setIsSyncing] = useState(false);

  // 6. Navigation & Filters
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<HighRiskType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // 7. Modals
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedPermitForApproval, setSelectedPermitForApproval] = useState<WorkPermit | null>(null);
  const [selectedPermitForPrint, setSelectedPermitForPrint] = useState<WorkPermit | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isDriveVaultOpen, setIsDriveVaultOpen] = useState(false);
  const [isWebhooksOpen, setIsWebhooksOpen] = useState(false);
  const [isSheetsConfigOpen, setIsSheetsConfigOpen] = useState(false);

  // 8. Toast Feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage whenever permits change
  useEffect(() => {
    saveStoredPermits(permits);
  }, [permits]);

  // Handle Tab clicks that trigger modals
  const handleTabChange = (tab: string) => {
    if (tab === 'analytics') {
      setIsAnalyticsOpen(true);
    } else if (tab === 'drive') {
      setIsDriveVaultOpen(true);
    } else if (tab === 'webhooks') {
      setIsWebhooksOpen(true);
    } else if (tab === 'sheets') {
      setIsSheetsConfigOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  // 1-Click Sync Simulation with Google Sheets
  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const nowIso = new Date().toISOString();
      const updatedConfig = { ...sheetsConfig, lastSyncTime: nowIso };
      setSheetsConfig(updatedConfig);
      saveSheetsConfig(updatedConfig);
      setIsSyncing(false);
      showToast(
        `Google Sheets ซิงค์สำเร็จ: บันทึกข้อมูลใบงานลงแถว A-S เรียบร้อย (${permits.length} รายการ)`,
        'success'
      );
    }, 900);
  };

  // Load ISO 45001 Sample Data on demand
  const handleLoadSampleData = () => {
    setPermits(SAMPLE_ISO_PERMITS);
    showToast('โหลดข้อมูลตัวอย่างใบอนุญาต ISO 45001 เข้าสู่ระบบเรียบร้อยแล้ว', 'success');
  };

  // Submit New Permit from 3-Step Wizard
  const handleCreatePermit = (
    data: Omit<WorkPermit, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const todayStr = '2026-1029';
    const nextSeq = String(permits.length + 1).padStart(3, '0');
    const newId = `PTW-${todayStr}-${nextSeq}`;
    const nowIso = new Date().toISOString();

    const newPermit: WorkPermit = {
      ...data,
      id: newId,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    setPermits((prev) => [newPermit, ...prev]);

    // Send simulated webhook notification to LINE Notify & WeChat
    const newNotification: NotificationLog = {
      id: `NOTIF-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      channel: 'LINE',
      title: `[e-PTW ขอเปิดงานใหม่] ${newId}`,
      message: `${data.requesterName} (${data.requesterCompany}) ได้ยื่นขอเปิดงาน '${data.title}' ณ ${data.facilityZone}. รอ จป.วิชาชีพ นางสาวสุดาลักษ์ พิมพ์พันธ์ ตรวจสอบ`,
      status: 'SENT',
      permitId: newId,
    };
    setNotifications((prev) => [newNotification, ...prev]);

    showToast(`ขอใบอนุญาต ${newId} สำเร็จ! ส่งแจ้งเตือนไปยัง จป.วิชาชีพ แล้ว`, 'success');
  };

  // Step 2 Approval: Safety Officer Sudalak P. signs and approves -> Immediately ACTIVE
  const handleApprovePermit = (
    permitId: string,
    gasReadings: GasTestReadings,
    signatureUrl: string,
    sigType: any
  ) => {
    const nowIso = new Date().toISOString();

    setPermits((prev) =>
      prev.map((p) => {
        if (p.id === permitId) {
          return {
            ...p,
            status: 'ACTIVE', // Status Logic: change to Approved / Active immediately
            gasReadings: gasReadings,
            safetyOfficerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
            safetyOfficerEmail: '23252sudalak@gmail.com',
            safetyOfficerSignature: {
              dataUrl: signatureUrl,
              signerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
              signerRole: 'Safety Officer (จป.วิชาชีพ)',
              signedAt: nowIso,
              type: sigType || 'SIMULATED',
            },
            updatedAt: nowIso,
            patrolAuditPassed: true,
            safeManHours: 16,
          };
        }
        return p;
      })
    );

    // Notify via WeChat and LINE
    const approvalNotif: NotificationLog = {
      id: `NOTIF-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      channel: 'WECHAT',
      title: `[e-PTW อนุมัติเริ่มงาน] ${permitId}`,
      message: `จป.วิชาชีพ นางสาวสุดาลักษ์ พิมพ์พันธ์ ได้ลงนามอนุมัติและตรวจวัดแก๊สปลอดภัย (LEL: ${gasReadings.lelPercent}%, O2: ${gasReadings.oxygenPercent}%) เริ่มงานได้`,
      status: 'SENT',
      permitId: permitId,
    };
    setNotifications((prev) => [approvalNotif, ...prev]);

    showToast(`ใบงาน ${permitId} ได้รับการอนุมัติและเปลี่ยนสถานะเป็น ACTIVE เรียบร้อย!`, 'success');
  };

  // Reject Permit
  const handleRejectPermit = (permitId: string, reason: string) => {
    const nowIso = new Date().toISOString();
    setPermits((prev) =>
      prev.map((p) => {
        if (p.id === permitId) {
          return {
            ...p,
            status: 'REJECTED',
            rejectionReason: reason,
            updatedAt: nowIso,
          };
        }
        return p;
      })
    );

    const rejectNotif: NotificationLog = {
      id: `NOTIF-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      channel: 'LINE',
      title: `[e-PTW ปฏิเสธ/สั่งหยุดงาน] ${permitId}`,
      message: `จป.วิชาชีพ สั่งไม่อนุมัติใบงาน ${permitId}. เหตุผล: ${reason}`,
      status: 'DELIVERED',
      permitId: permitId,
    };
    setNotifications((prev) => [rejectNotif, ...prev]);

    showToast(`ใบงาน ${permitId} ถูกปฏิเสธ/สั่งแก้ไขแล้ว`, 'error');
  };

  // Close Permit safely
  const handleClosePermit = (permitId: string) => {
    const nowIso = new Date().toISOString();
    setPermits((prev) =>
      prev.map((p) => {
        if (p.id === permitId) {
          return {
            ...p,
            status: 'CLOSED',
            updatedAt: nowIso,
          };
        }
        return p;
      })
    );

    showToast(`ปิดใบงาน ${permitId} อย่างปลอดภัยเรียบร้อย บันทึกเข้าคลังถาวร`, 'success');
  };

  // Create Snapshot in Drive Vault
  const handleAddVaultSnapshot = () => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newVaultItem: DriveVaultItem = {
      id: `DRIVE-${Date.now()}`,
      fileName: `WorkPermit_Database_${dateStr}_${Date.now().toString().slice(-4)}.csv`,
      size: `${(permits.length * 1.4 + 2.1).toFixed(1)} KB`,
      modifiedAt: `${dateStr} ${timeStr}`,
      fileType: 'CSV',
      recordCount: permits.length,
    };

    const updated = [newVaultItem, ...vaultItems];
    setVaultItems(updated);
    saveDriveVault(updated);
    showToast('สร้าง Snapshot สำรองข้อมูลลง Google Drive Vault เรียบร้อยแล้ว', 'success');
  };

  // Trigger simulated notification test
  const handleSendTestNotification = (
    channel: 'LINE' | 'WECHAT' | 'QQ',
    customToken?: string
  ) => {
    const newLog: NotificationLog = {
      id: `NOTIF-TEST-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      channel: channel,
      title: `[Webhook Test] ${channel} Notify Alert`,
      message: `การทดสอบระบบแจ้งเตือนสำเร็จ Token: ${customToken?.slice(0, 8)}... | มาตรฐานความปลอดภัย ISO 45001 โรงงาน BANFERT พร้อมทำงาน 100%`,
      status: 'SENT',
    };
    setNotifications((prev) => [newLog, ...prev]);
    showToast(`ทดสอบส่งแจ้งเตือนผ่านช่องทาง ${channel} เรียบร้อย`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold text-white animate-slideUp bg-slate-900 border border-slate-800">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navigation & Branding Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activePersona={activePersona}
        onPersonaChange={setActivePersona}
        sheetsConfig={sheetsConfig}
        onTriggerSync={handleTriggerSync}
        isSyncing={isSyncing}
        totalPermitsCount={permits.length}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenNewPermit={() => setIsWizardOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Safety Metrics, Dynamic Safety Days Counter & 8 High-Risk Standards Filter */}
        <SafetyMetricsBanner
          permits={permits}
          currentLang={currentLang}
          selectedRiskFilter={selectedRiskFilter}
          onSelectRiskFilter={setSelectedRiskFilter}
          statusFilter={statusFilter}
          onSelectStatusFilter={setStatusFilter}
        />

        {/* Work Permit Data Grid & List */}
        <PermitList
          permits={permits}
          language={currentLang}
          activePersona={activePersona}
          selectedRiskFilter={selectedRiskFilter}
          statusFilter={statusFilter}
          onOpenNewPermit={() => setIsWizardOpen(true)}
          onSelectPermit={(p) => setSelectedPermitForApproval(p)}
          onOpenPrint={(p) => setSelectedPermitForPrint(p)}
          onLoadSampleData={handleLoadSampleData}
        />
      </main>

      {/* Footer (Adhering to anti-slop guidelines: quiet copyright and real ISO standards links) */}
      <footer className="no-print bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900">Banfert New Material (Thailand) Co.,Ltd.</span>
            <span>·</span>
            <span>ระบบใบอนุญาตทำงานปลอดภัยดิจิทัล (e-PTW)</span>
            <span>·</span>
            <span>ISO 45001 : 2018 Certified</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Audit Officer: นางสาวสุดาลักษ์ พิมพ์พันธ์</span>
            <span>·</span>
            <span className="font-mono">Apex Industrial Safety Dept.</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}

      {/* 1. Dynamic 3-Step Work Permit Form Wizard */}
      <PermitWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleCreatePermit}
        language={currentLang}
        activePersona={activePersona}
      />

      {/* 2. Chain of Approval Modal (2-Box Approval Architecture) */}
      {selectedPermitForApproval && (
        <ApprovalModal
          permit={selectedPermitForApproval}
          isOpen={!!selectedPermitForApproval}
          onClose={() => setSelectedPermitForApproval(null)}
          onApprove={handleApprovePermit}
          onReject={handleRejectPermit}
          onClosePermit={handleClosePermit}
          onOpenPrint={(p) => {
            setSelectedPermitForApproval(null);
            setSelectedPermitForPrint(p);
          }}
          language={currentLang}
          activePersona={activePersona}
        />
      )}

      {/* 3. Monthly Safety Analytics Modal */}
      <MonthlyAnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        permits={permits}
        language={currentLang}
      />

      {/* 4. Google Drive Vault Modal */}
      <GoogleDriveVaultModal
        isOpen={isDriveVaultOpen}
        onClose={() => setIsDriveVaultOpen(false)}
        permits={permits}
        vaultItems={vaultItems}
        onAddVaultSnapshot={handleAddVaultSnapshot}
        language={currentLang}
      />

      {/* 5. Webhooks & Push Notification Simulator Modal */}
      <WebhooksModal
        isOpen={isWebhooksOpen}
        onClose={() => setIsWebhooksOpen(false)}
        notifications={notifications}
        onSendTestNotification={handleSendTestNotification}
      />

      {/* 6. Google Sheets API v4 & Cloudflare Configuration Modal */}
      <SheetsConfigModal
        isOpen={isSheetsConfigOpen}
        onClose={() => setIsSheetsConfigOpen(false)}
        config={sheetsConfig}
        onSaveConfig={(newCfg) => {
          setSheetsConfig(newCfg);
          saveSheetsConfig(newCfg);
          showToast('บันทึกการตั้งค่า Google Sheets API v4 เรียบร้อย', 'success');
        }}
        onForceSync={handleTriggerSync}
        isSyncing={isSyncing}
      />

      {/* 7. Printable ISO 45001 Form View */}
      {selectedPermitForPrint && (
        <PrintPermitView
          permit={selectedPermitForPrint}
          isOpen={!!selectedPermitForPrint}
          onClose={() => setSelectedPermitForPrint(null)}
          language={currentLang}
        />
      )}
    </div>
  );
}
