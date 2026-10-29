export type Language = 'TH' | 'ZH' | 'EN' | 'MY';

export type HighRiskType =
  | 'HOT_WORK'
  | 'WORKING_AT_HEIGHT'
  | 'CONFINED_SPACE'
  | 'ELECTRICAL_WORK'
  | 'CHEMICAL_HANDLING'
  | 'EXCAVATION'
  | 'LIFTING'
  | 'COLD_WORK';

export type PermitStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'ACTIVE'
  | 'CLOSED'
  | 'REJECTED';

export interface SignatureData {
  dataUrl: string;
  signerName: string;
  signerRole: string;
  signedAt: string;
  type: 'DRAWN' | 'UPLOADED' | 'SIMULATED';
}

export interface GasTestReadings {
  lelPercent?: number;       // Lower Explosive Limit < 10%
  oxygenPercent?: number;    // Oxygen (19.5% - 23.5%)
  h2sPpm?: number;           // Hydrogen Sulfide < 10 ppm
  coPpm?: number;            // Carbon Monoxide < 25 ppm
  testerName?: string;
  testedAt?: string;
  isPassed?: boolean;
}

export interface WorkPermit {
  id: string; // Column A: e.g., PTW-2026-1029-001
  title: string; // Column B
  riskTypes: HighRiskType[]; // Column C
  facilityZone: string; // Column D: e.g., Building A - Line 1 Coating
  requesterName: string; // Column E
  requesterCompany: string; // Column F
  requesterPhone: string; // Column G
  workerCount: number; // Column H
  startDate: string; // Column I (YYYY-MM-DDTHH:mm)
  endDate: string; // Column J (YYYY-MM-DDTHH:mm)
  status: PermitStatus; // Column K
  safetyOfficerName: string; // Column L: นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)
  safetyOfficerEmail: string; // Column M: 23252sudalak@gmail.com
  gasReadings?: GasTestReadings; // Column N
  checklistSummary: string[]; // Column O
  ppeSelected: string[]; // Column P
  requesterSignature?: SignatureData; // Column Q (Base64/URL)
  safetyOfficerSignature?: SignatureData; // Column R (Base64/URL)
  updatedAt: string; // Column S (ISO timestamp)
  createdAt: string;
  rejectionReason?: string;
  patrolAuditPassed?: boolean;
  safeManHours?: number;
}

export interface UserPersona {
  id: string;
  name: string;
  nameDisplay: {
    TH: string;
    ZH: string;
    EN: string;
    MY: string;
  };
  title: string;
  role: 'SAFETY_OFFICER' | 'CONTRACTOR' | 'ENGINEER' | 'DIRECTOR' | 'FOREIGN_WORKER';
  email: string;
  department: string;
  avatarUrl: string;
  channel: 'INTERNAL' | 'LINE' | 'WECHAT' | 'QQ' | 'EMAIL';
  channelLabel: string;
}

export interface NotificationLog {
  id: string;
  timestamp: string;
  channel: 'LINE' | 'WECHAT' | 'QQ' | 'EMAIL';
  title: string;
  message: string;
  status: 'SENT' | 'DELIVERED';
  permitId?: string;
}

export interface DriveVaultItem {
  id: string;
  fileName: string;
  size: string;
  modifiedAt: string;
  fileType: 'CSV' | 'PDF' | 'JSON';
  recordCount?: number;
  url?: string;
}

export interface SheetsConfig {
  serviceAccountEmail: string;
  privateKey: string;
  spreadsheetId: string;
  sheetName: string;
  isConnected: boolean;
  lastSyncTime: string | null;
  lineNotifyToken?: string;
  appsScriptWebhookUrl?: string;
  sheetUrl?: string;
}
