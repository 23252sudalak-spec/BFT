import React, { useState } from 'react';
import {
  Search,
  Plus,
  Printer,
  ChevronRight,
  Flame,
  ArrowUpCircle,
  Container,
  Zap,
  FlaskConical,
  Shovel,
  Anchor,
  Snowflake,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Language, WorkPermit, HighRiskType, UserPersona } from '../types';
import { translations } from '../i18n/translations';

interface PermitListProps {
  permits: WorkPermit[];
  language: Language;
  activePersona: UserPersona;
  selectedRiskFilter: HighRiskType | 'ALL';
  statusFilter: string;
  onOpenNewPermit: () => void;
  onSelectPermit: (permit: WorkPermit) => void;
  onOpenPrint: (permit: WorkPermit) => void;
  onLoadSampleData: () => void;
  onResetFilters?: () => void;
}

export const PermitList: React.FC<PermitListProps> = ({
  permits,
  language,
  selectedRiskFilter,
  statusFilter,
  onOpenNewPermit,
  onSelectPermit,
  onOpenPrint,
  onLoadSampleData,
  onResetFilters,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredPermits = permits.filter((p) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.id.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.requesterName.toLowerCase().includes(q) ||
        p.facilityZone.toLowerCase().includes(q) ||
        p.requesterCompany.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Status filter
    if (statusFilter !== 'ALL' && p.status !== statusFilter) {
      return false;
    }

    // High risk filter
    if (selectedRiskFilter !== 'ALL' && !p.riskTypes.includes(selectedRiskFilter)) {
      return false;
    }

    return true;
  });

  const getRiskIcon = (type: HighRiskType) => {
    switch (type) {
      case 'HOT_WORK':
        return <Flame className="w-3.5 h-3.5 text-amber-500" />;
      case 'WORKING_AT_HEIGHT':
        return <ArrowUpCircle className="w-3.5 h-3.5 text-blue-500" />;
      case 'CONFINED_SPACE':
        return <Container className="w-3.5 h-3.5 text-purple-500" />;
      case 'ELECTRICAL_WORK':
        return <Zap className="w-3.5 h-3.5 text-yellow-500" />;
      case 'CHEMICAL_HANDLING':
        return <FlaskConical className="w-3.5 h-3.5 text-emerald-500" />;
      case 'EXCAVATION':
        return <Shovel className="w-3.5 h-3.5 text-orange-500" />;
      case 'LIFTING':
        return <Anchor className="w-3.5 h-3.5 text-indigo-500" />;
      case 'COLD_WORK':
        return <Snowflake className="w-3.5 h-3.5 text-cyan-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.statusActive}</span>
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 rounded border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.statusPending}</span>
          </span>
        );
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.statusApproved}</span>
          </span>
        );
      case 'CLOSED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.statusClosed}</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 rounded border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>{t.statusRejected}</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar & Table Header Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenNewPermit}
            className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{t.btnCreatePermit}</span>
          </button>
        </div>
      </div>

      {/* Main Table or Empty State */}
      {filteredPermits.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-2xs space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <FileText className="w-8 h-8" />
          </div>

          {permits.length === 0 ? (
            <>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-slate-900">{t.noPermitsFound}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{t.noPermitsDesc}</p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onOpenNewPermit}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.btnCreatePermit}</span>
                </button>
                <button
                  onClick={onLoadSampleData}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.btnLoadSampleData}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  มีใบงาน {permits.length} รายการในระบบ แต่ไม่ตรงกับตัวกรองที่เลือก
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  (ตัวกรองปัจจุบัน: สถานะ {statusFilter}, ความเสี่ยง {selectedRiskFilter})
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    if (onResetFilters) onResetFilters();
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                >
                  แสดงใบงานทั้งหมด ({permits.length} รายการ)
                </button>
                <button
                  onClick={onOpenNewPermit}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.btnCreatePermit}</span>
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">{t.tablePermitId}</th>
                  <th className="py-3 px-4">{t.tableTitle}</th>
                  <th className="py-3 px-4">{t.tableRiskType}</th>
                  <th className="py-3 px-4">{t.tableZone}</th>
                  <th className="py-3 px-4">{t.tableRequester}</th>
                  <th className="py-3 px-4">{t.tableTiming}</th>
                  <th className="py-3 px-4">{t.tableStatus}</th>
                  <th className="py-3 px-4 text-right">{t.tableActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPermits.map((permit) => (
                  <tr
                    key={permit.id}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    onClick={() => onSelectPermit(permit)}
                  >
                    {/* Permit ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {permit.id}
                    </td>

                    {/* Job Title */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900 truncate">{permit.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {permit.checklistSummary.slice(0, 2).join(' · ') || 'ISO 45001 Compliance'}
                      </div>
                    </td>

                    {/* High Risk Types */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {permit.riskTypes.map((r) => (
                          <span
                            key={r}
                            title={r}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                          >
                            {getRiskIcon(r)}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Zone */}
                    <td className="py-3.5 px-4 max-w-[180px] truncate text-slate-600 font-medium">
                      {permit.facilityZone}
                    </td>

                    {/* Requester */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900">{permit.requesterName}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                        {permit.requesterCompany}
                      </div>
                    </td>

                    {/* Timing */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-slate-500">
                      <div>{permit.startDate.split('T')[0]}</div>
                      <div className="text-[10px] text-slate-400">
                        {permit.startDate.split('T')[1]} - {permit.endDate.split('T')[1]}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(permit.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div
                        className="flex items-center justify-end gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => onOpenPrint(permit)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                          title={t.btnPrintISO}
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelectPermit(permit)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
                        >
                          <span>ตรวจสอบ</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
