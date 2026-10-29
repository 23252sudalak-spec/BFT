import React, { useMemo } from 'react';
import {
  Flame,
  ArrowUpCircle,
  Container,
  Zap,
  FlaskConical,
  Shovel,
  Anchor,
  Snowflake,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
} from 'lucide-react';
import { Language, HighRiskType, WorkPermit } from '../types';
import { translations } from '../i18n/translations';
import { LAST_ACCIDENT_DATE, BANFERT_PLANT_IMAGE } from '../data/constants';

interface SafetyMetricsBannerProps {
  permits: WorkPermit[];
  currentLang: Language;
  selectedRiskFilter: HighRiskType | 'ALL';
  onSelectRiskFilter: (filter: HighRiskType | 'ALL') => void;
  statusFilter: string;
  onSelectStatusFilter: (status: string) => void;
}

export const SafetyMetricsBanner: React.FC<SafetyMetricsBannerProps> = ({
  permits,
  currentLang,
  selectedRiskFilter,
  onSelectRiskFilter,
  statusFilter,
  onSelectStatusFilter,
}) => {
  const t = translations[currentLang];

  // Dynamic Safety Days Counter calculation
  const safeDays = useMemo(() => {
    // Current simulated date is 2026-10-29
    const now = new Date('2026-10-29T02:23:44');
    const diffMs = now.getTime() - LAST_ACCIDENT_DATE.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  }, []);

  // Compute metrics from real permit records
  const stats = useMemo(() => {
    const total = permits.length;
    const active = permits.filter((p) => p.status === 'ACTIVE').length;
    const pending = permits.filter((p) => p.status === 'PENDING').length;
    const approved = permits.filter((p) => p.status === 'APPROVED').length;
    const closed = permits.filter((p) => p.status === 'CLOSED').length;
    const rejected = permits.filter((p) => p.status === 'REJECTED').length;
    return { total, active, pending, approved, closed, rejected };
  }, [permits]);

  const riskButtons: { type: HighRiskType; icon: React.ReactNode }[] = [
    { type: 'HOT_WORK', icon: <Flame className="w-3.5 h-3.5 text-amber-500" /> },
    { type: 'WORKING_AT_HEIGHT', icon: <ArrowUpCircle className="w-3.5 h-3.5 text-blue-500" /> },
    { type: 'CONFINED_SPACE', icon: <Container className="w-3.5 h-3.5 text-purple-500" /> },
    { type: 'ELECTRICAL_WORK', icon: <Zap className="w-3.5 h-3.5 text-yellow-500" /> },
    { type: 'CHEMICAL_HANDLING', icon: <FlaskConical className="w-3.5 h-3.5 text-emerald-500" /> },
    { type: 'EXCAVATION', icon: <Shovel className="w-3.5 h-3.5 text-orange-500" /> },
    { type: 'LIFTING', icon: <Anchor className="w-3.5 h-3.5 text-indigo-500" /> },
    { type: 'COLD_WORK', icon: <Snowflake className="w-3.5 h-3.5 text-cyan-500" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Strip: Zero Accident Days & Plant Facility Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Col: Dynamic Zero Accident Days Counter (SaaS Dashboard KPI) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl text-white p-6 border border-slate-700 flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <ShieldCheck className="w-48 h-48 text-emerald-400" />
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.zeroAccidentTitle}</span>
            </div>

            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-extrabold font-mono tabular-nums tracking-tight text-white">
                {safeDays}
              </span>
              <div className="space-y-0.5">
                <span className="text-xl font-bold text-amber-400 uppercase tracking-wide">
                  {t.zeroAccidentDays}
                </span>
                <div className="text-[11px] text-slate-400">ZERO ACCIDENT STREAK</div>
              </div>
            </div>

            <div className="text-xs text-slate-300 pt-1 font-medium">
              {t.zeroAccidentSince}
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
            <span>{t.zeroAccidentTarget}</span>
            <span className="font-mono text-emerald-400 font-bold">100% Target Met</span>
          </div>
        </div>

        {/* Right Col: Facility Context & Safety Advisory */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between">
          <div className="relative h-32 sm:h-36 overflow-hidden bg-slate-900">
            <img
              src={BANFERT_PLANT_IMAGE}
              alt="BANFERT Industrial Plant"
              className="w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-4">
              <div className="text-white">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Banfert New Material (Thailand) Co.,Ltd.
                </div>
                <div className="text-sm sm:text-base font-bold text-white leading-snug">
                  Integrated Environment, Health & Safety (EHS) Operations
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50/60 border-t border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{t.advisoryTitle}: </span>
              <span>{t.advisoryText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Status Metric Cards (60-30-10 distribution, tabular numerals) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total */}
        <button
          onClick={() => onSelectStatusFilter('ALL')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            statusFilter === 'ALL'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1 font-medium">
            <span className={statusFilter === 'ALL' ? 'text-slate-300' : 'text-slate-500'}>
              {t.metricTotal}
            </span>
            <FileText className="w-4 h-4 opacity-70" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums">{stats.total}</div>
        </button>

        {/* Active */}
        <button
          onClick={() => onSelectStatusFilter('ACTIVE')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            statusFilter === 'ACTIVE'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
              : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1 font-medium">
            <span className={statusFilter === 'ACTIVE' ? 'text-emerald-100' : 'text-emerald-700'}>
              {t.metricActive}
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600">
            {stats.active}
          </div>
        </button>

        {/* Pending */}
        <button
          onClick={() => onSelectStatusFilter('PENDING')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            statusFilter === 'PENDING'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1 font-medium">
            <span className={statusFilter === 'PENDING' ? 'text-amber-100' : 'text-amber-700'}>
              {t.metricPending}
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-600">
            {stats.pending}
          </div>
        </button>

        {/* Approved */}
        <button
          onClick={() => onSelectStatusFilter('APPROVED')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            statusFilter === 'APPROVED'
              ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
              : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1 font-medium">
            <span className={statusFilter === 'APPROVED' ? 'text-blue-100' : 'text-blue-700'}>
              {t.metricApproved}
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-blue-600">
            {stats.approved}
          </div>
        </button>

        {/* Closed */}
        <button
          onClick={() => onSelectStatusFilter('CLOSED')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            statusFilter === 'CLOSED'
              ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1 font-medium">
            <span className={statusFilter === 'CLOSED' ? 'text-slate-200' : 'text-slate-500'}>
              {t.metricClosed}
            </span>
            <CheckCircle2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-600">
            {stats.closed}
          </div>
        </button>

        {/* Rejected */}
        <button
          onClick={() => onSelectStatusFilter('REJECTED')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            statusFilter === 'REJECTED'
              ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
              : 'bg-white text-slate-800 border-slate-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1 font-medium">
            <span className={statusFilter === 'REJECTED' ? 'text-rose-100' : 'text-rose-700'}>
              {t.metricRejected}
            </span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-rose-600">
            {stats.rejected}
          </div>
        </button>
      </div>

      {/* Row 3: 8 High-Risk Standards Filter Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>8 High-Risk Standards (ISO 45001 / IATF 16949):</span>
          <span>Click to filter work permits</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
          <button
            onClick={() => onSelectRiskFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedRiskFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {t.riskFilterAll}
          </button>

          {riskButtons.map((btn) => {
            const isSelected = selectedRiskFilter === btn.type;
            const title = t.riskTypes[btn.type]?.title.split('(')[0].trim() || btn.type;
            return (
              <button
                key={btn.type}
                onClick={() => onSelectRiskFilter(btn.type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {btn.icon}
                <span>{title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
