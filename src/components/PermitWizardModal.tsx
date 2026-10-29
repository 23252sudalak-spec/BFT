import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Calendar,
  User,
  Phone,
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
import { Language, HighRiskType, WorkPermit, UserPersona } from '../types';
import { translations } from '../i18n/translations';
import {
  FACILITY_ZONES_SUGGESTIONS,
  PPE_OPTIONS,
  RISK_SPECIFIC_CHECKLISTS,
} from '../data/constants';
import { SignatureCanvas } from './SignatureCanvas';

interface PermitWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (permitData: Omit<WorkPermit, 'id' | 'createdAt' | 'updatedAt'>) => void;
  language: Language;
  activePersona: UserPersona;
}

export const PermitWizardModal: React.FC<PermitWizardModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  language,
  activePersona,
}) => {
  const t = translations[language];

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [jobTitle, setJobTitle] = useState('');
  const [selectedRisks, setSelectedRisks] = useState<HighRiskType[]>(['HOT_WORK']);
  const [facilityZone, setFacilityZone] = useState('');
  const [contractorName, setContractorName] = useState(
    activePersona.role === 'CONTRACTOR' ? activePersona.name : 'นายสมชาย คำดี'
  );
  const [contractorCompany, setContractorCompany] = useState(
    activePersona.role === 'CONTRACTOR' ? activePersona.department : 'Thai Mech & Piping Engineering Ltd.'
  );
  const [phone, setPhone] = useState('081-998-3421');
  const [workerCount, setWorkerCount] = useState<number>(3);
  const [startDate, setStartDate] = useState('2026-10-29T08:30');
  const [endDate, setEndDate] = useState('2026-10-29T17:00');

  // Step 2 State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [selectedPpe, setSelectedPpe] = useState<string[]>([
    'ppe_helmet',
    'ppe_glasses',
    'ppe_shoes',
    'ppe_vest',
  ]);

  // Step 3 Signature
  const [requesterSig, setRequesterSig] = useState<{
    dataUrl: string;
    type: 'DRAWN' | 'UPLOADED' | 'SIMULATED';
  } | null>(null);

  // Error state for inline validation (no window.alert in iframe)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleRisk = (risk: HighRiskType) => {
    if (selectedRisks.includes(risk)) {
      if (selectedRisks.length > 1) {
        setSelectedRisks(selectedRisks.filter((r) => r !== risk));
      }
    } else {
      setSelectedRisks([...selectedRisks, risk]);
    }
  };

  const toggleChecklist = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePpe = (id: string) => {
    if (selectedPpe.includes(id)) {
      setSelectedPpe(selectedPpe.filter((item) => item !== id));
    } else {
      setSelectedPpe([...selectedPpe, id]);
    }
  };

  const handleNextStep = () => {
    setErrorMessage(null);
    if (currentStep === 1) {
      if (!jobTitle.trim()) {
        setErrorMessage('กรุณาระบุชื่องาน / ภารกิจปฏิบัติงาน');
        return;
      }
      if (!facilityZone.trim()) {
        setErrorMessage('กรุณาระบุโซน / อาคาร / ไลน์ผลิต สถานที่ปฏิบัติงาน');
        return;
      }
      if (!contractorName.trim()) {
        setErrorMessage('กรุณาระบุชื่อผู้ขออนุญาต / ผู้รับเหมา');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // If submitted prematurely while in step 1 or 2 (e.g. user pressed Enter key on an input)
    if (currentStep < 3) {
      handleNextStep();
      return;
    }

    // Determine final signature: user-drawn, uploaded, or auto-simulated
    const safeName = contractorName.trim() || 'Contractor';
    const finalDataUrl = requesterSig?.dataUrl || `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="60"><text x="15" y="38" font-family="sans-serif" font-weight="bold" font-size="18" fill="%230f172a">${encodeURIComponent(safeName)}</text><path d="M10 46 Q60 56 160 40 T210 38" stroke="%2316a34a" stroke-width="2.5" fill="none"/></svg>`;
    const finalType: 'DRAWN' | 'UPLOADED' | 'SIMULATED' = requesterSig?.type || 'SIMULATED';

    // Compile summary of checked risk controls
    const checklistSummaries: string[] = [];
    selectedRisks.forEach((r) => {
      const items = RISK_SPECIFIC_CHECKLISTS[r] || [];
      items.forEach((item) => {
        if (checkedItems[item.id]) {
          checklistSummaries.push(item.text[language] || item.text.EN);
        }
      });
    });

    const newPermitData: Omit<WorkPermit, 'id' | 'createdAt' | 'updatedAt'> = {
      title: jobTitle.trim() || 'General Maintenance Work',
      riskTypes: selectedRisks,
      facilityZone: facilityZone.trim() || 'General Facility',
      requesterName: safeName,
      requesterCompany: contractorCompany.trim() || 'Contractor Co.',
      requesterPhone: phone,
      workerCount: workerCount || 1,
      startDate: startDate,
      endDate: endDate,
      status: 'PENDING',
      safetyOfficerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
      safetyOfficerEmail: '23252sudalak@gmail.com',
      checklistSummary: checklistSummaries.length > 0 ? checklistSummaries : ['ตรวจความปลอดภัยตามมาตรฐานความเสี่ยง'],
      ppeSelected: selectedPpe,
      requesterSignature: {
        dataUrl: finalDataUrl,
        signerName: safeName,
        signerRole: 'Requester / Contractor',
        signedAt: new Date().toISOString(),
        type: finalType,
      },
    };

    onSubmit(newPermitData);

    // Reset form state for next submission
    setJobTitle('');
    setFacilityZone('');
    setRequesterSig(null);
    setCurrentStep(1);
    setErrorMessage(null);
    onClose();
  };

  const getRiskIcon = (type: HighRiskType) => {
    switch (type) {
      case 'HOT_WORK':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'WORKING_AT_HEIGHT':
        return <ArrowUpCircle className="w-4 h-4 text-blue-500" />;
      case 'CONFINED_SPACE':
        return <Container className="w-4 h-4 text-purple-500" />;
      case 'ELECTRICAL_WORK':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'CHEMICAL_HANDLING':
        return <FlaskConical className="w-4 h-4 text-emerald-500" />;
      case 'EXCAVATION':
        return <Shovel className="w-4 h-4 text-orange-500" />;
      case 'LIFTING':
        return <Anchor className="w-4 h-4 text-indigo-500" />;
      case 'COLD_WORK':
        return <Snowflake className="w-4 h-4 text-cyan-500" />;
    }
  };

  const riskOrder: HighRiskType[] = [
    'HOT_WORK',
    'WORKING_AT_HEIGHT',
    'CONFINED_SPACE',
    'ELECTRICAL_WORK',
    'CHEMICAL_HANDLING',
    'EXCAVATION',
    'LIFTING',
    'COLD_WORK',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl my-6 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold tracking-tight">{t.wizardTitle}</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              ISO 45001 / IATF 16949 · High-Risk Control Clearance
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Indicator */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono ${
                currentStep === 1
                  ? 'bg-slate-900 text-white'
                  : currentStep > 1
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
            </span>
            <span className={currentStep === 1 ? 'font-bold text-slate-900' : 'text-slate-500'}>
              {t.step1Title.split(':')[1] || t.step1Title}
            </span>
          </div>

          <div className="w-8 h-[1px] bg-slate-300 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono ${
                currentStep === 2
                  ? 'bg-slate-900 text-white'
                  : currentStep > 2
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {currentStep > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
            </span>
            <span className={currentStep === 2 ? 'font-bold text-slate-900' : 'text-slate-500'}>
              {t.step2Title.split(':')[1] || t.step2Title}
            </span>
          </div>

          <div className="w-8 h-[1px] bg-slate-300 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono ${
                currentStep === 3
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              3
            </span>
            <span className={currentStep === 3 ? 'font-bold text-slate-900' : 'text-slate-500'}>
              {t.step3Title.split(':')[1] || t.step3Title}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: General Info & 8 High Risk Selection */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.fieldJobTitle} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder={t.fieldJobTitlePlaceholder}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                />
              </div>

              {/* 8 High-Risk Selection Cards */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {t.fieldSelectRiskTypes} <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {riskOrder.map((risk) => {
                    const isSelected = selectedRisks.includes(risk);
                    const info = t.riskTypes[risk];
                    return (
                      <button
                        type="button"
                        key={risk}
                        onClick={() => toggleRisk(risk)}
                        className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900/5 ring-1 ring-slate-900'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="mt-0.5">{getRiskIcon(risk)}</div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {info.title}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{info.desc}</div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Facility Zone with Datalist Auto-Suggestions */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.fieldFacilityZone}</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  list="facility-zones-list"
                  type="text"
                  required
                  value={facilityZone}
                  onChange={(e) => setFacilityZone(e.target.value)}
                  placeholder={t.fieldFacilityZonePlaceholder}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                />
                <datalist id="facility-zones-list">
                  {FACILITY_ZONES_SUGGESTIONS.map((zone) => (
                    <option key={zone} value={zone} />
                  ))}
                </datalist>
                <div className="text-[11px] text-slate-400 mt-1">
                  💡 คำแนะนำ: พิมพ์ระบุโซนเฉพาะ หรือเลือกจากรายการที่ผ่านการรับรองระบบผังโรงงาน
                </div>
              </div>

              {/* Contractor / Applicant Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.fieldContractorName}</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contractorName}
                    onChange={(e) => setContractorName(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.fieldContractorCompany}
                  </label>
                  <input
                    type="text"
                    value={contractorCompany}
                    onChange={(e) => setContractorCompany(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.fieldPhone}</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.fieldWorkerCount}</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={workerCount}
                    onChange={(e) => setWorkerCount(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white font-mono"
                  />
                </div>
              </div>

              {/* Schedule Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.fieldStartTime}</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.fieldEndTime}</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Safety Checklist & PPE Requirements */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Dynamic Risk-Specific Controls */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t.checklistHeader}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    รายการมาตรการควบคุมความปลอดภัยเฉพาะสำหรับ {selectedRisks.length} ประเภทงานเสี่ยงสูงที่เลือก
                  </p>
                </div>

                {selectedRisks.map((risk) => {
                  const items = RISK_SPECIFIC_CHECKLISTS[risk] || [];
                  const riskInfo = t.riskTypes[risk];

                  return (
                    <div key={risk} className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        {getRiskIcon(risk)}
                        <span>{riskInfo.title}</span>
                      </div>

                      <div className="space-y-2">
                        {items.map((item) => {
                          const isChecked = !!checkedItems[item.id];
                          const label = item.text[language] || item.text.EN;

                          return (
                            <label
                              key={item.id}
                              className={`flex items-start gap-2.5 p-2 rounded-md cursor-pointer transition-colors text-xs ${
                                isChecked ? 'bg-emerald-50/80 text-emerald-950' : 'bg-white text-slate-700 hover:bg-slate-100'
                              } border border-slate-200/80`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleChecklist(item.id)}
                                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="flex-1 leading-relaxed">{label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mandatory PPE Checklist */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{t.ppeHeader}</h3>
                  <p className="text-xs text-slate-500">
                    ทำเครื่องหมายเลือกอุปกรณ์ป้องกันที่ผู้ปฏิบัติงานทุกคนต้องสวมใส่ก่อนเข้าพื้นที่
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PPE_OPTIONS.map((ppe) => {
                    const isChecked = selectedPpe.includes(ppe.id);
                    const label = ppe.label[language] || ppe.label.EN;

                    return (
                      <label
                        key={ppe.id}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                          isChecked
                            ? 'bg-slate-900 text-white border-slate-900 font-medium shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => togglePpe(ppe.id)}
                          className="rounded text-emerald-500 focus:ring-emerald-400"
                        />
                        <span className="truncate">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Digital Signature & Final Submission */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="bg-amber-50 p-3.5 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">ข้อกำหนดความรับผิดชอบตามกฎหมาย (ISO 45001 Compliance)</div>
                  <p className="leading-relaxed">{t.signatureRequesterNotice}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold">{t.requesterBoxTitle}</span>
                  <span className="text-slate-500 font-mono">Status: Pending Contractor Signature</span>
                </div>

                <SignatureCanvas
                  onSignatureChange={(dataUrl, type) => setRequesterSig({ dataUrl, type })}
                  language={language}
                  roleLabel="ลงนามผู้ขออนุญาต / ผู้รับเหมา (Requester Signature)"
                  signerName={contractorName}
                />
              </div>

              <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">ลำดับขั้นตอนต่อไป: </span>
                เมื่อส่งใบคำขอนี้แล้ว ระบบจะแจ้งเตือนอัตโนมัติไปยัง จป.วิชาชีพ นางสาวสุดาลักษ์ พิมพ์พันธ์ (23252sudalak@gmail.com) เพื่อตรวจสอบหน้างาน ตรวจวัดระดับก๊าซ และลงนามอนุมัติเปิดงาน
              </div>
            </div>
          )}

          {/* Error Message Alert Banner */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            <div>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.btnBack}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {t.btnCancel}
                </button>
              )}
            </div>

            <div>
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>{t.btnNext}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.btnSubmitPermit}</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
