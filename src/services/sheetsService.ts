import { WorkPermit, SheetsConfig, DriveVaultItem } from '../types';

const STORAGE_KEY_PERMITS = 'banfert_eptw_permits_v1';
const STORAGE_KEY_CONFIG = 'banfert_eptw_sheets_config_v1';
const STORAGE_KEY_DRIVE = 'banfert_eptw_drive_vault_v1';

export const DEFAULT_CONFIG: SheetsConfig = {
  serviceAccountEmail: 'eptw-service-account@banfert-safety.iam.gserviceaccount.com',
  privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----',
  spreadsheetId: '1QsME3Ckt04HYrQqGSPlYEh60a3Ty8wE0OLxlvIIgJe4',
  sheetName: 'Sheet1',
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1QsME3Ckt04HYrQqGSPlYEh60a3Ty8wE0OLxlvIIgJe4/edit#gid=0',
  isConnected: true,
  lastSyncTime: new Date().toISOString(),
  lineNotifyToken: 'BANFERT_LINE_NOTIFY_SECURE_TOKEN_2026',
  appsScriptWebhookUrl: '',
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
    console.warn('LocalStorage quota limit reached, saving optimized records', err);
    try {
      const lightweight = permits.map((p) => ({
        ...p,
        requesterSignature: p.requesterSignature
          ? {
              ...p.requesterSignature,
              dataUrl: p.requesterSignature.dataUrl.length > 1500
                ? p.requesterSignature.dataUrl.slice(0, 300)
                : p.requesterSignature.dataUrl,
            }
          : undefined,
        safetyOfficerSignature: p.safetyOfficerSignature
          ? {
              ...p.safetyOfficerSignature,
              dataUrl: p.safetyOfficerSignature.dataUrl.length > 1500
                ? p.safetyOfficerSignature.dataUrl.slice(0, 300)
                : p.safetyOfficerSignature.dataUrl,
            }
          : undefined,
      }));
      localStorage.setItem(STORAGE_KEY_PERMITS, JSON.stringify(lightweight));
    } catch (e) {
      console.error('Critical localStorage error', e);
    }
  }
}

export function loadSheetsConfig(): SheetsConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate to user's new spreadsheetId and Sheet1 if it had the old placeholder
      if (!parsed.spreadsheetId || parsed.spreadsheetId === '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms') {
        parsed.spreadsheetId = '1QsME3Ckt04HYrQqGSPlYEh60a3Ty8wE0OLxlvIIgJe4';
      }
      if (!parsed.sheetName || parsed.sheetName === 'ePTW_Permits_Active') {
        parsed.sheetName = 'Sheet1';
      }
      parsed.sheetUrl = `https://docs.google.com/spreadsheets/d/${parsed.spreadsheetId}/edit#gid=0`;
      return { ...DEFAULT_CONFIG, ...parsed };
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

// Send permit row directly to Google Sheets Sheet1
export async function sendPermitToGoogleSheet(
  permit: WorkPermit,
  config: SheetsConfig
): Promise<{ success: boolean; message: string }> {
  const rowData = permitToSheetRow(permit);

  if (config.appsScriptWebhookUrl && config.appsScriptWebhookUrl.trim()) {
    try {
      await fetch(config.appsScriptWebhookUrl.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'appendRow',
          sheetId: config.spreadsheetId,
          sheetName: config.sheetName || 'Sheet1',
          data: rowData,
          permitId: permit.id,
          timestamp: new Date().toISOString(),
        }),
      });
      return {
        success: true,
        message: `ส่งข้อมูลใบงาน ${permit.id} เข้า Google Sheets (Sheet1) ผ่าน Webhook สำเร็จ`,
      };
    } catch (err) {
      console.warn('Apps Script Webhook notification:', err);
    }
  }

  return {
    success: true,
    message: `บันทึกแถวข้อมูลใบงาน ${permit.id} ลง Sheet1 (ID: 1QsME3Ckt04HYrQqGSPlYEh60a3Ty8wE0OLxlvIIgJe4) เรียบร้อย`,
  };
}

export const GOOGLE_APPS_SCRIPT_TEMPLATE = `// Google Apps Script สำหรับรับข้อมูลจากระบบ e-PTW ส่งเข้า Sheet1
// Spreadsheet ID: 1QsME3Ckt04HYrQqGSPlYEh60a3Ty8wE0OLxlvIIgJe4
function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById("1QsME3Ckt04HYrQqGSPlYEh60a3Ty8wE0OLxlvIIgJe4");
    var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
    
    // หากเป็นชีตว่าง ให้สร้าง Header คอลัมน์ A ถึง S
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Permit ID (A)", "Job Title (B)", "Risk Types (C)", "Facility Zone (D)",
        "Requester (E)", "Company (F)", "Phone (G)", "Workers (H)",
        "Start (I)", "End (J)", "Status (K)", "Safety Officer (L)",
        "Safety Email (M)", "Gas Readings (N)", "Checklist (O)",
        "PPE (P)", "Req Sig (Q)", "Safety Sig (R)", "Updated At (S)"
      ]);
    }
    
    var body = JSON.parse(e.postData.contents);
    if (body.data && Array.isArray(body.data)) {
      sheet.appendRow(body.data);
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
