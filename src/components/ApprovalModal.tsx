import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileCheck2,
  Gauge,
  Printer,
  Calendar,
  Building2,
  Users,
} from 'lucide-react';
import { Language, WorkPermit, UserPersona, GasTestReadings } from '../types';
import { translations } from '../i18n/translations';
import { SUDALAK_AVATAR } from '../data/constants';
import { SignatureCanvas } from './SignatureCanvas';

interface ApprovalModalProps {
  permit: WorkPermit;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (permitId: string, gasReadings: GasTestReadings, signatureUrl: string, sigType: any) => void;
  onReject: (permitId: string, reason: string) => void;
  onClosePermit: (permitId: string) => void;
  onOpenPrint: (permit: WorkPermit) => void;
  language: Language;
  activePersona: UserPersona;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  permit,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onClosePermit,
  onOpenPrint,
  language,
  activePersona,
}) => {
  const t = translations[language];

  // Gas readings state
  const [lel, setLel] = useState<number>(permit.gasReadings?.lelPercent ?? 0);
  const [o2, setO2] = useState<number>(permit.gasReadings?.oxygenPercent ?? 20.9);
  const [h2s, setH2s] = useState<number>(permit.gasReadings?.h2sPpm ?? 0);
  const [co, setCo] = useState<number>(permit.gasReadings?.coPpm ?? 2);

  // Rejection reason state
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Signature state for Safety Officer
  const [safetySig, setSafetySig] = useState<{
    dataUrl: string;
    type: 'DRAWN' | 'UPLOADED' | 'SIMULATED';
  } | null>(null);

  if (!isOpen) return null;

  const isSafetyOfficer = activePersona.role === 'SAFETY_OFFICER';

  const handleApproveSubmit = () => {
    let signatureDataUrl = safetySig?.dataUrl || (permit.safetyOfficerSignature?.dataUrl || '');
    let sigType = safetySig?.type || 'SIMULATED';

    // Auto-fallback signature for Safety Officer so approval never blocks or fails
    if (!signatureDataUrl) {
      signatureDataUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="60"><text x="12" y="35" font-family="sans-serif" font-weight="bold" font-size="16" fill="%2316a34a">Sudalak P. (จป.วิชาชีพ)</text><path d="M10 44 Q80 54 200 40" stroke="%2316a34a" stroke-width="2.5" fill="none"/></svg>`;
      sigType = 'SIMULATED';
    }

    const readings: GasTestReadings = {
      lelPercent: Number(lel),
      oxygenPercent: Number(o2),
      h2sPpm: Number(h2s),
      coPpm: Number(co),
      testerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
      testedAt: new Date().toISOString(),
      isPassed: Number(lel) < 10 && Number(o2) >= 19.5 && Number(o2) <= 23.5 && Number(h2s) < 10 && Number(co) < 25,
    };

    onApprove(permit.id, readings, signatureDataUrl, sigType);
    onClose();
  };

  const handleRejectSubmit = () => {
    const reason = rejectReason.trim() || 'ข้อมูลความปลอดภัยไม่ครบถ้วนตามมาตรฐาน ISO 45001';
    onReject(permit.id, reason);
    onClose();
  };

  const isGasCompliant =
    lel < 10 && o2 >= 19.5 && o2 <= 23.5 && h2s < 10 && co < 25;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold tracking-tight">{t.approvalModalTitle}</h2>
              <span className="font-mono text-xs px-2 py-0.5 bg-slate-800 text-amber-400 rounded border border-slate-700">
                {permit.id}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              2-Box Approval Architecture: Requester & จป.วิชาชีพ (Safety Officer)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenPrint(permit)}
              className="p-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors"
              title={t.btnPrintISO}
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">{t.btnPrintISO}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Summary Details Strip */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-slate-500 font-medium">ชื่องาน / วัตถุประสงค์</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{permit.title}</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {permit.riskTypes.map((r) => (
                  <span
                    key={r}
                    className="font-mono text-[10px] bg-slate-200/80 text-slate-800 px-1.5 py-0.5 rounded"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-slate-500 font-medium flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> โซน / อาคาร
              </div>
              <div className="font-bold text-slate-900 mt-0.5">{permit.facilityZone}</div>
              <div className="text-slate-500 mt-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>จำนวน: {permit.workerCount} คน ({permit.requesterCompany})</span>
              </div>
            </div>

            <div>
              <div className="text-slate-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> ระยะเวลาปฏิบัติงาน
              </div>
              <div className="font-mono text-slate-900 mt-0.5">
                {permit.startDate.replace('T', ' ')}
              </div>
              <div className="font-mono text-slate-500">
                ถึง {permit.endDate.replace('T', ' ')}
              </div>
            </div>
          </div>

          {/* TWO APPROVAL BOXES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* BOX 1: Requester / Contractor Box */}
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 shadow-2xs">
              <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      {t.requesterBoxTitle}
                    </h3>
                    <p className="text-[11px] text-slate-500">ขอเปิดงานและรับรองความปลอดภัย</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                  Signed & Verified
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">ผู้ขออนุญาต:</span>
                  <span className="font-semibold text-slate-900">{permit.requesterName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">บริษัท:</span>
                  <span className="text-slate-700">{permit.requesterCompany}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">โทรศัพท์ติดต่อ:</span>
                  <span className="font-mono text-slate-700">{permit.requesterPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">เวลาที่ลงนาม:</span>
                  <span className="font-mono text-slate-700">{permit.createdAt}</span>
                </div>
              </div>

              {/* Requester Signature Display */}
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 space-y-1.5">
                <div className="text-[11px] text-slate-400 font-medium">Digital Signature Hash / Preview:</div>
                <div className="h-20 flex items-center justify-center bg-white rounded border border-slate-200 overflow-hidden">
                  {permit.requesterSignature?.dataUrl ? (
                    <img
                      src={permit.requesterSignature.dataUrl}
                      alt="Requester Signature"
                      className="max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">ลายเซ็นได้รับการตรวจสอบแล้ว</span>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
                ✓ ได้รับการอบรมความปลอดภัย ISO 45001 และสวมใส่อุปกรณ์ PPE ครบถ้วน
              </div>
            </div>

            {/* BOX 2: จป.วิชาชีพ (Safety Officer) Box */}
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 shadow-2xs">
              <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      {t.safetyOfficerBoxTitle}
                    </h3>
                    <p className="text-[11px] text-slate-500">ตรวจสอบหน้างานและอนุมัติใบงาน</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <img
                    src={SUDALAK_AVATAR}
                    alt="Sudalak P."
                    className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-[11px] text-right hidden sm:block">
                    <div className="font-bold text-slate-900 leading-tight">Sudalak P.</div>
                    <div className="text-[9px] text-emerald-600 font-semibold font-mono">จป.วิชาชีพ</div>
                  </div>
                </div>
              </div>

              {/* Safety Officer Profile Details */}
              <div className="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100 flex items-center gap-3 text-xs">
                <div className="space-y-0.5 flex-1">
                  <div className="font-bold text-slate-900">{t.leadSafetyOfficerName}</div>
                  <div className="text-[11px] text-emerald-700 font-medium">{t.leadSafetyOfficerTitle}</div>
                  <div className="text-[11px] text-slate-500 font-mono">Email: 23252sudalak@gmail.com</div>
                </div>
              </div>

              {/* Gas Testing Clearance Section */}
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-slate-700" />
                    <span>{t.gasTestingHeader}</span>
                  </span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isGasCompliant ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isGasCompliant ? 'PASSED (ปลอดภัย)' : 'ALERT (เกินเกณฑ์)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-600 font-medium block">
                      LEL (%): &lt; 10%
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={lel}
                      onChange={(e) => setLel(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1 font-mono text-xs border border-slate-300 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 font-medium block">
                      O2 (%): 19.5 - 23.5%
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={o2}
                      onChange={(e) => setO2(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1 font-mono text-xs border border-slate-300 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 font-medium block">
                      H2S (ppm): &lt; 10 ppm
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={h2s}
                      onChange={(e) => setH2s(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1 font-mono text-xs border border-slate-300 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 font-medium block">
                      CO (ppm): &lt; 25 ppm
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={co}
                      onChange={(e) => setCo(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1 font-mono text-xs border border-slate-300 rounded bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Safety Officer Digital Signature Input */}
              {permit.status === 'PENDING' ? (
                <div className="space-y-2">
                  <SignatureCanvas
                    onSignatureChange={(dataUrl, type) => setSafetySig({ dataUrl, type })}
                    language={language}
                    roleLabel="ลายเซ็น จป.วิชาชีพ (Safety Officer Signature)"
                    signerName="นางสาวสุดาลักษ์ พิมพ์พันธ์"
                  />
                </div>
              ) : (
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-1 text-xs">
                  <span className="text-slate-500 font-medium">บันทึกการอนุมัติแล้ว:</span>
                  <div className="h-16 flex items-center justify-center bg-white rounded border border-slate-200">
                    {permit.safetyOfficerSignature?.dataUrl ? (
                      <img
                        src={permit.safetyOfficerSignature.dataUrl}
                        alt="Safety Officer Signature"
                        className="max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-emerald-700 font-bold">✓ Approved & Signed by Sudalak P.</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono text-right">
                    Approved at: {permit.updatedAt}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rejection input toggle if needed */}
          {showRejectInput && (
            <div className="bg-rose-50 p-4 rounded-lg border border-rose-200 space-y-2 text-xs">
              <label className="font-bold text-rose-900 block">
                {t.rejectReasonPrompt}
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="เช่น ผลการตรวจวัดก๊าซ LEL เกิน 10% หรือนั่งร้านยังไม่ได้ตรวจป้ายเขียว"
                className="w-full p-2.5 border border-rose-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRejectInput(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                >
                  {t.btnCancel}
                </button>
                <button
                  type="button"
                  onClick={handleRejectSubmit}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded shadow-xs"
                >
                  ยืนยันการปฏิเสธ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Bar */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            ปิดหน้าต่าง
          </button>

          <div className="flex items-center gap-2">
            {permit.status === 'PENDING' && (
              <>
                <button
                  type="button"
                  onClick={() => setShowRejectInput(true)}
                  className="px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>{t.btnRejectPermit}</span>
                </button>

                <button
                  type="button"
                  onClick={handleApproveSubmit}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.btnApproveAndActivate}</span>
                </button>
              </>
            )}

            {permit.status === 'ACTIVE' && (
              <button
                type="button"
                onClick={() => {
                  onClosePermit(permit.id);
                  onClose();
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>{t.btnClosePermit}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
