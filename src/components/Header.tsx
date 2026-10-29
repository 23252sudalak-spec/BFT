import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, Database, FolderArchive, Bell, Settings, ChevronDown, CheckCircle, UserCheck } from 'lucide-react';
import { Language, UserPersona, SheetsConfig } from '../types';
import { translations } from '../i18n/translations';
import { USER_PERSONAS, BANFERT_OFFICIAL_LOGO } from '../data/constants';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activePersona: UserPersona;
  onPersonaChange: (persona: UserPersona) => void;
  sheetsConfig: SheetsConfig;
  onTriggerSync: () => void;
  isSyncing: boolean;
  totalPermitsCount: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenNewPermit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activePersona,
  onPersonaChange,
  sheetsConfig,
  onTriggerSync,
  isSyncing,
  totalPermitsCount,
  activeTab,
  onTabChange,
  onOpenNewPermit,
}) => {
  const t = translations[currentLang];
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const formatLastSync = (isoString: string | null) => {
    if (!isoString) return '--:--';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      {/* Top Banner: ISO & Real-time Sheets Sync Status Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-amber-400 tracking-wide">Banfert New Material (Thailand) Co.,Ltd.</span>
          <span className="text-slate-500" aria-hidden="true">|</span>
          <span className="hidden md:inline text-emerald-400 font-medium">
            จป.วิชาชีพ: นางสาวสุดาลักษ์ พิมพ์พันธ์ (23252sudalak@gmail.com)
          </span>
        </div>

        {/* Real-time Google Drive / Sheets Sync Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline text-slate-400">Google Sheets:</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" /> Connected
            </span>
            <span className="text-slate-500">·</span>
            <span className="font-mono tabular-nums text-slate-200">{totalPermitsCount} records</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{t.lastSynced}</span>
            <span className="font-mono tabular-nums text-slate-200">{formatLastSync(sheetsConfig.lastSyncTime)}</span>
          </div>

          <button
            onClick={onTriggerSync}
            disabled={isSyncing}
            className="flex items-center gap-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 rounded transition-colors border border-slate-700 disabled:opacity-50"
            title={t.btnSyncSheets}
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-emerald-400' : 'text-slate-300'}`} />
            <span className="hidden sm:inline">{t.btnSyncSheets}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Official Brand Logo & Identity */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="h-11 px-2.5 py-1 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-xs">
              <img
                src={BANFERT_OFFICIAL_LOGO}
                alt="Banfert New Material Logo"
                className="h-7 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 tracking-tight">
                  Banfert New Material (Thailand) Co.,Ltd.
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 font-mono">
                  e-PTW
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block leading-tight">
                ระบบใบอนุญาตทำงานปลอดภัยดิจิทัล (Digital Work Permit System)
              </p>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Single-line, clean hover underline) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`transition-colors whitespace-nowrap py-1 ${
                activeTab === 'dashboard'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : 'hover:text-slate-900'
              }`}
            >
              {t.navDashboard}
            </button>
            <button
              onClick={() => onTabChange('permits')}
              className={`transition-colors whitespace-nowrap py-1 ${
                activeTab === 'permits'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : 'hover:text-slate-900'
              }`}
            >
              {t.navPermits}
            </button>
            <button
              onClick={() => onTabChange('analytics')}
              className={`transition-colors whitespace-nowrap py-1 ${
                activeTab === 'analytics'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : 'hover:text-slate-900'
              }`}
            >
              {t.navAnalytics}
            </button>
            <button
              onClick={() => onTabChange('drive')}
              className={`transition-colors whitespace-nowrap py-1 flex items-center gap-1.5 ${
                activeTab === 'drive'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : 'hover:text-slate-900'
              }`}
            >
              <FolderArchive className="w-4 h-4 text-slate-500" />
              <span>{t.navDriveVault}</span>
            </button>
            <button
              onClick={() => onTabChange('webhooks')}
              className={`transition-colors whitespace-nowrap py-1 flex items-center gap-1.5 ${
                activeTab === 'webhooks'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : 'hover:text-slate-900'
              }`}
            >
              <Bell className="w-4 h-4 text-slate-500" />
              <span>{t.navWebhooks}</span>
            </button>
            <button
              onClick={() => onTabChange('sheets')}
              className={`transition-colors whitespace-nowrap py-1 flex items-center gap-1.5 ${
                activeTab === 'sheets'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : 'hover:text-slate-900'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Sheets API</span>
            </button>
          </nav>

          {/* Zone 3: Actions - Language Switcher, Persona Switcher & New Permit CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher 4 Languages (TH, ZH, EN, MY) */}
            <div className="flex items-center gap-0.5 p-0.5 bg-slate-100 rounded-lg border border-slate-200">
              <button
                onClick={() => onLanguageChange('TH')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  currentLang === 'TH' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ภาษาไทย (TH)"
              >
                🇹🇭 TH
              </button>
              <button
                onClick={() => onLanguageChange('ZH')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  currentLang === 'ZH' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="中文 (ZH)"
              >
                🇨🇳 ZH
              </button>
              <button
                onClick={() => onLanguageChange('EN')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  currentLang === 'EN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English (EN)"
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => onLanguageChange('MY')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  currentLang === 'MY' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="မြန်မာ (MY)"
              >
                🇲🇲 MY
              </button>
            </div>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-left"
                title={t.personaSwitch}
              >
                {activePersona.avatarUrl ? (
                  <img
                    src={activePersona.avatarUrl}
                    alt={activePersona.name}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                    {activePersona.name.charAt(0)}
                  </div>
                )}
                <div className="hidden xl:block text-xs">
                  <div className="font-semibold text-slate-900 truncate max-w-[120px]">
                    {activePersona.nameDisplay[currentLang] || activePersona.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {activePersona.role === 'SAFETY_OFFICER' ? 'จป.วิชาชีพ' : activePersona.channel}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showPersonaMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowPersonaMenu(false)} />
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {t.personaSwitch}
                    </div>
                    {USER_PERSONAS.map((p) => {
                      const isSelected = p.id === activePersona.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            onPersonaChange(p);
                            setShowPersonaMenu(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 transition-colors ${
                            isSelected ? 'bg-emerald-50/60 font-semibold text-slate-900' : 'text-slate-700'
                          }`}
                        >
                          {p.avatarUrl ? (
                            <img
                              src={p.avatarUrl}
                              alt={p.name}
                              className="w-6 h-6 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-slate-700 text-white text-[10px] flex items-center justify-center shrink-0">
                              {p.name.charAt(0)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="truncate text-slate-900">
                              {p.nameDisplay[currentLang] || p.name}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate font-mono">
                              {p.channelLabel}
                            </div>
                          </div>
                          {isSelected && <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Primary Action Button: Create New Permit */}
            <button
              onClick={onOpenNewPermit}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>{t.btnCreatePermit}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
