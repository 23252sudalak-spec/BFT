import React from 'react';
import {
  X,
  Printer,
  ShieldCheck,
  Building2,
  Calendar,
  Users,
  Flame,
  ArrowUpCircle,
  Container,
  Zap,
  FlaskConical,
  Shovel,
  Anchor,
  Snowflake,
} from 'lucide-react';
import { WorkPermit, HighRiskType, Language } from '../types';
import { translations } from '../i18n/translations';
import { PPE_OPTIONS, BANFERT_OFFICIAL_LOGO } from '../data/constants';

interface PrintPermitViewProps {
  permit: WorkPermit;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PrintPermitView: React.FC<PrintPermitViewProps> = ({
  permit,
  isOpen,
  onClose,
  language,
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getRiskIcon = (type: HighRiskType) => {
    switch (type) {
      case 'HOT_WORK':
        return <Flame className="w-3.5 h-3.5" />;
      case 'WORKING_AT_HEIGHT':
        return <ArrowUpCircle className="w-3.5 h-3.5" />;
      case 'CONFINED_SPACE':
        return <Container className="w-3.5 h-3.5" />;
      case 'ELECTRICAL_WORK':
        return <Zap className="w-3.5 h-3.5" />;
      case 'CHEMICAL_HANDLING':
        return <FlaskConical className="w-3.5 h-3.5" />;
      case 'EXCAVATION':
        return <Shovel className="w-3.5 h-3.5" />;
      case 'LIFTING':
        return <Anchor className="w-3.5 h-3.5" />;
      case 'COLD_WORK':
        return <Snowflake className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-4xl my-4 overflow-hidden flex flex-col max-h-[96vh]">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="no-print bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              ISO 45001 Printable e-PTW Document Preview
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์เอกสารนี้ (Print / Save as PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable ISO 45001 Document Sheet */}
        <div className="p-8 sm:p-10 overflow-y-auto space-y-6 flex-1 text-black bg-white print-page font-sans">
          
          {/* Header Block: Logo & ISO Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 px-3 py-1.5 bg-white border border-slate-300 rounded-lg flex items-center justify-center">
                <img
                  src={BANFERT_OFFICIAL_LOGO}
                  alt="Banfert New Material"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                  Banfert New Material (Thailand) Co.,Ltd.
                </h1>
                <p className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wide">
                  ใบอนุญาตทำงานที่มีความเสี่ยงสูง (High-Risk Digital Work Permit - e-PTW)
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  STANDARDS: ISO 45001:2018 · ISO 18001 · ISO 9001:2015 · IATF 16949
                </p>
              </div>
            </div>

            <div className="text-right sm:text-right font-mono">
              <div className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded border border-slate-300 inline-block">
                PERMIT NO: {permit.id}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">STATUS: {permit.status}</div>
              <div className="text-[10px] text-slate-400">ISSUED: {permit.createdAt}</div>
            </div>
          </div>

          {/* 1. Scope of Work & Details Grid */}
          <div className="border border-slate-300 rounded-lg p-4 bg-slate-50/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="col-span-2">
              <span className="text-slate-500 font-semibold block text-[11px]">ชื่องาน / ภารกิจ (Job Title):</span>
              <span className="font-bold text-slate-900 text-sm">{permit.title}</span>
            </div>

            <div className="col-span-2">
              <span className="text-slate-500 font-semibold block text-[11px]">สถานที่ / โซนโรงงาน (Facility Zone):</span>
              <span className="font-bold text-slate-900">{permit.facilityZone}</span>
            </div>

            <div>
              <span className="text-slate-500 font-semibold block text-[11px]">ผู้ขออนุญาต (Requester):</span>
              <span className="font-semibold text-slate-900">{permit.requesterName}</span>
            </div>

            <div>
              <span className="text-slate-500 font-semibold block text-[11px]">บริษัท / แผนก (Company):</span>
              <span className="text-slate-800">{permit.requesterCompany}</span>
            </div>

            <div>
              <span className="text-slate-500 font-semibold block text-[11px]">เบอร์ติดต่อ (Contact):</span>
              <span className="font-mono text-slate-800">{permit.requesterPhone}</span>
            </div>

            <div>
              <span className="text-slate-500 font-semibold block text-[11px]">จำนวนผู้ปฏิบัติงาน (Workers):</span>
              <span className="font-mono text-slate-900 font-bold">{permit.workerCount} คน</span>
            </div>

            <div className="col-span-2">
              <span className="text-slate-500 font-semibold block text-[11px]">วัน-เวลา เริ่มต้น (Start Time):</span>
              <span className="font-mono font-bold text-slate-900">{permit.startDate.replace('T', ' ')}</span>
            </div>

            <div className="col-span-2">
              <span className="text-slate-500 font-semibold block text-[11px]">วัน-เวลา สิ้นสุด (End Time):</span>
              <span className="font-mono font-bold text-slate-900">{permit.endDate.replace('T', ' ')}</span>
            </div>
          </div>

          {/* 2. 8 High-Risk Standards Applicable */}
          <div className="border border-slate-300 rounded-lg p-4 space-y-2">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              ประเภทงานความเสี่ยงสูงที่ได้รับอนุญาต (Authorized High-Risk Categories):
            </div>
            <div className="flex flex-wrap gap-2">
              {permit.riskTypes.map((r) => (
                <div
                  key={r}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded border border-slate-300 text-xs font-bold text-slate-800"
                >
                  {getRiskIcon(r)}
                  <span>{t.riskTypes[r]?.title || r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Gas Testing Clearance Table */}
          <div className="border border-slate-300 rounded-lg overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-300 flex items-center justify-between text-xs font-bold text-slate-900">
              <span>ผลการตรวจวัดก๊าซในบรรยากาศ (Atmospheric Gas Testing Clearance - ISO 45001)</span>
              <span className="font-mono font-normal text-slate-600">
                ผู้ตรวจ: {permit.gasReadings?.testerName || 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (จป.วิชาชีพ)'}
              </span>
            </div>
            <div className="grid grid-cols-4 divide-x divide-slate-300 text-center text-xs p-3 bg-white font-mono">
              <div>
                <div className="text-[10px] text-slate-500 font-sans">LEL (&lt; 10%)</div>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {permit.gasReadings?.lelPercent ?? '0.0'}%
                </div>
                <div className="text-[10px] text-emerald-600 font-bold">PASS</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-sans">OXYGEN (19.5-23.5%)</div>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {permit.gasReadings?.oxygenPercent ?? '20.9'}%
                </div>
                <div className="text-[10px] text-emerald-600 font-bold">PASS</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-sans">H2S (&lt; 10 ppm)</div>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {permit.gasReadings?.h2sPpm ?? '0.0'} ppm
                </div>
                <div className="text-[10px] text-emerald-600 font-bold">PASS</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-sans">CO (&lt; 25 ppm)</div>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {permit.gasReadings?.coPpm ?? '2.0'} ppm
                </div>
                <div className="text-[10px] text-emerald-600 font-bold">PASS</div>
              </div>
            </div>
          </div>

          {/* 4. Safety Controls & Mandatory PPE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-300 rounded-lg p-3.5 space-y-2">
              <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                มาตรการความปลอดภัยที่ตรวจสอบแล้ว (Safety Controls Verified):
              </span>
              <ul className="space-y-1 text-slate-700">
                {permit.checklistSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-300 rounded-lg p-3.5 space-y-2">
              <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                อุปกรณ์ PPE บังคับสวมใส่ (Mandatory PPE):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {permit.ppeSelected.map((ppeId) => {
                  const opt = PPE_OPTIONS.find((o) => o.id === ppeId);
                  return (
                    <span
                      key={ppeId}
                      className="px-2 py-0.5 bg-slate-100 rounded border border-slate-300 text-[11px] font-medium text-slate-800"
                    >
                      {opt ? opt.label[language] : ppeId}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 5. Two Approval Boxes (Signatures) */}
          <div className="grid grid-cols-2 gap-6 pt-2">
            {/* Box 1: Requester */}
            <div className="border-2 border-slate-800 rounded-xl p-4 bg-white flex flex-col justify-between h-48">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  1. ผู้ขออนุญาต / ผู้รับเหมา (Requester)
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  ข้าพเจ้าขอรับรองว่าจะปฏิบัติตามกฎความปลอดภัย ISO 45001 เคร่งครัด
                </p>
              </div>

              <div className="h-20 flex items-center justify-center bg-slate-50 border border-slate-200 rounded my-1">
                {permit.requesterSignature?.dataUrl ? (
                  <img
                    src={permit.requesterSignature.dataUrl}
                    alt="Requester Signature"
                    className="max-h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400 italic">Signed Digitally</span>
                )}
              </div>

              <div className="text-[11px] flex justify-between border-t border-slate-200 pt-1 text-slate-700 font-mono">
                <span>{permit.requesterName}</span>
                <span>{permit.createdAt}</span>
              </div>
            </div>

            {/* Box 2: Safety Officer */}
            <div className="border-2 border-slate-800 rounded-xl p-4 bg-white flex flex-col justify-between h-48">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  2. จป.วิชาชีพ อนุมัติงาน (Safety Officer)
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  ตรวจสอบหน้างาน การตัดแยกพลังงาน และการตรวจวัดแก๊สแล้ว อนุมัติเริ่มงานได้
                </p>
              </div>

              <div className="h-20 flex items-center justify-center bg-slate-50 border border-slate-200 rounded my-1">
                {permit.safetyOfficerSignature?.dataUrl ? (
                  <img
                    src={permit.safetyOfficerSignature.dataUrl}
                    alt="Safety Officer Signature"
                    className="max-h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400 italic">Approved Digitally by Safety Officer</span>
                )}
              </div>

              <div className="text-[11px] flex justify-between border-t border-slate-200 pt-1 text-slate-700 font-mono">
                <span>นางสาวสุดาลักษ์ พิมพ์พันธ์ (จป.วิชาชีพ)</span>
                <span>{permit.updatedAt}</span>
              </div>
            </div>
          </div>

          {/* Footer ISO Seal */}
          <div className="border-t border-slate-300 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>BANFERT e-PTW SYSTEM · FORM ID: EHS-PTW-ISO45001-REV04</span>
            <span>AUDIT TRAIL VERIFIED BY SAFETY OFFICER SUDALAK P.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
