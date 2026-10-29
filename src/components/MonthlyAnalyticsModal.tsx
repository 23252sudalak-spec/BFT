import React, { useState, useMemo } from 'react';
import {
  X,
  Printer,
  Calendar,
  Flame,
  ArrowUpCircle,
  Container,
  Zap,
  FlaskConical,
  Shovel,
  Anchor,
  Snowflake,
  TrendingUp,
  Award,
} from 'lucide-react';
import { Language, WorkPermit, HighRiskType } from '../types';
import { translations } from '../i18n/translations';

interface MonthlyAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  permits: WorkPermit[];
  language: Language;
}

export const MonthlyAnalyticsModal: React.FC<MonthlyAnalyticsModalProps> = ({
  isOpen,
  onClose,
  permits,
  language,
}) => {
  const t = translations[language];
  const [selectedMonth, setSelectedMonth] = useState('2026-10');

  const months = [
    { value: '2026-10', label: 'October 2026 / ตุลาคม 2569' },
    { value: '2026-09', label: 'September 2026 / กันยายน 2569' },
    { value: '2026-08', label: 'August 2026 / สิงหาคม 2569' },
  ];

  // Filter permits by selected month
  const monthPermits = useMemo(() => {
    return permits.filter((p) => p.startDate.startsWith(selectedMonth));
  }, [permits, selectedMonth]);

  // Calculate Safe Man-Hours
  const totalSafeManHours = useMemo(() => {
    let hours = 0;
    monthPermits.forEach((p) => {
      if (p.status === 'ACTIVE' || p.status === 'CLOSED' || p.status === 'APPROVED') {
        const start = new Date(p.startDate).getTime();
        const end = new Date(p.endDate).getTime();
        const diffHours = Math.max(1, (end - start) / (1000 * 60 * 60));
        hours += Math.round(diffHours * p.workerCount);
      }
    });
    // Add baseline plant operational safe hours for BANFERT facility
    return hours + 12480;
  }, [monthPermits]);

  // Patrol Pass Rate
  const patrolPassRate = useMemo(() => {
    if (monthPermits.length === 0) return 100;
    const closedOrActive = monthPermits.filter(
      (p) => p.status === 'ACTIVE' || p.status === 'CLOSED' || p.status === 'APPROVED'
    );
    if (closedOrActive.length === 0) return 100;
    const passed = closedOrActive.filter((p) => p.patrolAuditPassed !== false).length;
    return Math.round((passed / closedOrActive.length) * 100);
  }, [monthPermits]);

  // Breakdown by 8 High-Risk Standards
  const riskBreakdown = useMemo(() => {
    const counts: Record<HighRiskType, number> = {
      HOT_WORK: 0,
      WORKING_AT_HEIGHT: 0,
      CONFINED_SPACE: 0,
      ELECTRICAL_WORK: 0,
      CHEMICAL_HANDLING: 0,
      EXCAVATION: 0,
      LIFTING: 0,
      COLD_WORK: 0,
    };

    monthPermits.forEach((p) => {
      p.riskTypes.forEach((r) => {
        if (counts[r] !== undefined) counts[r]++;
      });
    });

    return counts;
  }, [monthPermits]);

  // Breakdown by Facility Zone
  const zoneBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    monthPermits.forEach((p) => {
      const zoneKey = p.facilityZone.split('-')[0].trim() || 'General Facility';
      counts[zoneKey] = (counts[zoneKey] || 0) + 1;
    });
    return counts;
  }, [monthPermits]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
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

  const allRisks: HighRiskType[] = [
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
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold tracking-tight">{t.analyticsTitle}</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Banfert New Material (Thailand) Co.,Ltd. · EHS Management Review
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>{t.exportPdf}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Month Selector Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>เลือกช่วงเวลารายงาน (Reporting Period):</span>
            </div>

            <div className="flex items-center gap-1.5">
              {months.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setSelectedMonth(m.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedMonth === m.value
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m.label.split('/')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-xs space-y-1">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>{t.safeManHours}</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400">
                {totalSafeManHours.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400">ชั่วโมงทำงานปลอดภัยสะสม</div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>{t.patrolPassRate}</span>
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-3xl font-extrabold font-mono tabular-nums text-blue-600">
                {patrolPassRate}%
              </div>
              <div className="text-[11px] text-slate-400">จป.วิชาชีพ ตรวจสอบภาคสนาม 100%</div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>จำนวนใบงานในเดือนที่เลือก</span>
                <Calendar className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900">
                {monthPermits.length}
              </div>
              <div className="text-[11px] text-slate-400">e-PTW Permits Issued</div>
            </div>
          </div>

          {/* 8 High-Risk Standards Distribution */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t.monthlyBreakdown}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {allRisks.map((risk) => {
                const count = riskBreakdown[risk] || 0;
                const riskTitle = t.riskTypes[risk]?.title.split('(')[0].trim() || risk;

                return (
                  <div
                    key={risk}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {getRiskIcon(risk)}
                      <span className="text-xs font-medium text-slate-700 truncate max-w-[100px]">
                        {riskTitle}
                      </span>
                    </div>
                    <span className="text-sm font-bold font-mono text-slate-900 tabular-nums">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Facility Zones Breakdown */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
            <h3 className="text-sm font-bold text-slate-900">{t.zoneBreakdown}</h3>
            {Object.keys(zoneBreakdown).length === 0 ? (
              <div className="text-xs text-slate-400 py-4 text-center">
                ยังไม่มีข้อมูลสถิติในเดือนนี้
              </div>
            ) : (
              <div className="space-y-2">
                {Object.entries(zoneBreakdown).map(([zone, count]) => {
                  const pct = Math.round((count / monthPermits.length) * 100);
                  return (
                    <div key={zone} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-800">{zone}</span>
                        <span className="font-mono text-slate-600">
                          {count} ใบงาน ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-slate-900 h-2 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Standards Certifications Seal */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium">
              <span className="font-bold text-slate-900">การรับรองมาตรฐาน:</span>
              <span>ISO 45001:2018 (EHS) · IATF 16949:2016 (Automotive) · ISO 9001:2015</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              ลงชื่อรับรอง: นางสาวสุดาลักษ์ พิมพ์พันธ์ (Safety Officer)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
