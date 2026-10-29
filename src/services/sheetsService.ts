import { WorkPermit, SheetsConfig, DriveVaultItem } from '../types';

const STORAGE_KEY_PERMITS = 'banfert_eptw_permits_v1';
const STORAGE_KEY_CONFIG = 'banfert_eptw_sheets_config_v1';
const STORAGE_KEY_DRIVE = 'banfert_eptw_drive_vault_v1';

export const DEFAULT_CONFIG: SheetsConfig = {
  serviceAccountEmail: 'eptw-service-account@banfert-safety.iam.gserviceaccount.com',
  privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----',
  spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  sheetName: 'ePTW_Permits_Active',
  isConnected: true,
  lastSyncTime: new Date('2026-10-29T08:15:00').toISOString(),
  lineNotifyToken: 'BANFERT_LINE_NOTIFY_SECURE_TOKEN_2026',
};

// LocalStorage Offline-First Engine
export function loadStoredPermits(): WorkPermit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PERMITS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error loading stored permits from localStorage', err);
  }
  return []; // Clean State per requirement: initialPermits = []
}

export function saveStoredPermits(permits: WorkPermit[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PERMITS, JSON.stringify(permits));
  } catch (err) {
    console.error('Error saving permits to localStorage', err);
  }
}

export function loadSheetsConfig(): SheetsConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('Error loading config', err);
  }
  return DEFAULT_CONFIG;
}

export function saveSheetsConfig(config: SheetsConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Error saving config', err);
  }
}

export function loadDriveVault(): DriveVaultItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DRIVE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading drive vault', err);
  }
  return []; // Clean Google Drive Vault (starts with 0 files)
}

export function saveDriveVault(items: DriveVaultItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_DRIVE, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving drive vault', err);
  }
}

// Map a WorkPermit to Columns A through S
export function permitToSheetRow(permit: WorkPermit): string[] {
  return [
    permit.id, // Column A
    permit.title, // Column B
    permit.riskTypes.join(', '), // Column C
    permit.facilityZone, // Column D
    permit.requesterName, // Column E
    permit.requesterCompany, // Column F
    permit.requesterPhone, // Column G
    permit.workerCount.toString(), // Column H
    permit.startDate, // Column I
    permit.endDate, // Column J
    permit.status, // Column K
    permit.safetyOfficerName || 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)', // Column L
    permit.safetyOfficerEmail || '23252sudalak@gmail.com', // Column M
    JSON.stringify(permit.gasReadings || {}), // Column N
    (permit.checklistSummary || []).join('; '), // Column O
    (permit.ppeSelected || []).join(', '), // Column P
    permit.requesterSignature?.dataUrl ? permit.requesterSignature.dataUrl.slice(0, 500) + '...' : '', // Column Q
    permit.safetyOfficerSignature?.dataUrl ? permit.safetyOfficerSignature.dataUrl.slice(0, 500) + '...' : '', // Column R
    permit.updatedAt || new Date().toISOString(), // Column S
  ];
}

// Parse Google Sheet raw rows back into WorkPermit array with deduplication
export function parseSheetRowsToPermits(rows: string[][]): WorkPermit[] {
  if (!rows || rows.length <= 1) return [];

  // Skip header row
  const dataRows = rows.slice(1);
  const permitMap = new Map<string, WorkPermit>();

  for (const row of dataRows) {
    const [
      id,
      title,
      riskTypesStr,
      facilityZone,
      requesterName,
      requesterCompany,
      requesterPhone,
      workerCountStr,
      startDate,
      endDate,
      status,
      safetyOfficerName,
      safetyOfficerEmail,
      gasReadingsStr,
      checklistStr,
      ppeStr,
      reqSigUrl,
      safetySigUrl,
      updatedAt,
    ] = row;

    if (!id) continue;

    let parsedGas = undefined;
    try {
      if (gasReadingsStr) parsedGas = JSON.parse(gasReadingsStr);
    } catch {
      parsedGas = undefined;
    }

    const permit: WorkPermit = {
      id,
      title: title || 'Work Permit',
      riskTypes: (riskTypesStr ? riskTypesStr.split(',').map((s) => s.trim()) : []) as any,
      facilityZone: facilityZone || 'General Production',
      requesterName: requesterName || 'Contractor',
      requesterCompany: requesterCompany || 'Contractor Co.',
      requesterPhone: requesterPhone || '-',
      workerCount: parseInt(workerCountStr, 10) || 1,
      startDate: startDate || new Date().toISOString(),
      endDate: endDate || new Date().toISOString(),
      status: (status as any) || 'PENDING',
      safetyOfficerName: safetyOfficerName || 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
      safetyOfficerEmail: safetyOfficerEmail || '23252sudalak@gmail.com',
      gasReadings: parsedGas,
      checklistSummary: checklistStr ? checklistStr.split(';').map((s) => s.trim()) : [],
      ppeSelected: ppeStr ? ppeStr.split(',').map((s) => s.trim()) : [],
      requesterSignature: reqSigUrl
        ? {
            dataUrl: reqSigUrl,
            signerName: requesterName,
            signerRole: 'Requester / Contractor',
            signedAt: startDate,
            type: 'DRAWN',
          }
        : undefined,
      safetyOfficerSignature: safetySigUrl
        ? {
            dataUrl: safetySigUrl,
            signerName: safetyOfficerName,
            signerRole: 'Safety Officer (จป.วิชาชีพ)',
            signedAt: updatedAt || startDate,
            type: 'DRAWN',
          }
        : undefined,
      createdAt: startDate,
      updatedAt: updatedAt || new Date().toISOString(),
    };

    // Deduplication: always keep the latest update
    const existing = permitMap.get(id);
    if (!existing || new Date(permit.updatedAt).getTime() >= new Date(existing.updatedAt).getTime()) {
      permitMap.set(id, permit);
    }
  }

  // Sort newest first
  return Array.from(permitMap.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

// Generate CSV with UTF-8 BOM (\uFEFF) for Excel & Google Drive compatibility in Thai, Chinese, Burmese
export function generateCsvExport(permits: WorkPermit[]): string {
  const BOM = '\uFEFF';
  const headers = [
    'Permit ID (A)',
    'Job Title (B)',
    'Risk Types (C)',
    'Facility Zone (D)',
    'Requester Name (E)',
    'Contractor Company (F)',
    'Phone (G)',
    'Worker Count (H)',
    'Start Date (I)',
    'End Date (J)',
    'Status (K)',
    'Safety Officer (L)',
    'Safety Email (M)',
    'Gas Readings JSON (N)',
    'Checklist Controls (O)',
    'PPE Selected (P)',
    'Requester Signature Hash (Q)',
    'Safety Officer Signature Hash (R)',
    'Last Updated At (S)',
  ];

  const escapeCell = (val: string | number | undefined) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = permits.map((p) => {
    return [
      escapeCell(p.id),
      escapeCell(p.title),
      escapeCell(p.riskTypes.join('; ')),
      escapeCell(p.facilityZone),
      escapeCell(p.requesterName),
      escapeCell(p.requesterCompany),
      escapeCell(p.requesterPhone),
      escapeCell(p.workerCount),
      escapeCell(p.startDate),
      escapeCell(p.endDate),
      escapeCell(p.status),
      escapeCell(p.safetyOfficerName),
      escapeCell(p.safetyOfficerEmail),
      escapeCell(JSON.stringify(p.gasReadings || {})),
      escapeCell((p.checklistSummary || []).join(' | ')),
      escapeCell((p.ppeSelected || []).join('; ')),
      escapeCell(p.requesterSignature ? `SIGNED:${p.requesterSignature.signedAt}` : 'NOT_SIGNED'),
      escapeCell(p.safetyOfficerSignature ? `SIGNED:${p.safetyOfficerSignature.signedAt}` : 'PENDING'),
      escapeCell(p.updatedAt),
    ].join(',');
  });

  return BOM + [headers.join(','), ...rows].join('\r\n');
}

export function triggerDownload(content: string, filename: string, mimeType = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
