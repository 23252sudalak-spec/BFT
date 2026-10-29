import React, { useRef, useState, useEffect } from 'react';
import { Eraser, RotateCcw, Sparkles, Upload, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface SignatureCanvasProps {
  onSignatureChange: (dataUrl: string, type: 'DRAWN' | 'UPLOADED' | 'SIMULATED') => void;
  language: Language;
  initialDataUrl?: string;
  roleLabel?: string;
  signerName?: string;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSignatureChange,
  language,
  initialDataUrl,
  roleLabel,
  signerName,
}) => {
  const t = translations[language];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [hasContent, setHasContent] = useState(false);
  const [mode, setMode] = useState<'DRAW' | 'UPLOAD'>('DRAW');
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(initialDataUrl || null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI display support with solid dimension fallbacks
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width > 0 ? rect.width : (canvas.parentElement?.clientWidth || 540);
    const h = rect.height > 0 ? rect.height : 144;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;

    // If initial image exists, draw it
    if (initialDataUrl && mode === 'DRAW') {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        setHasContent(true);
      };
      img.src = initialDataUrl;
    }
  }, [mode]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev, imageData]);
  };

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveState();
    setIsDrawing(true);
    setHasContent(true);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureChange(dataUrl, 'DRAWN');
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setHasContent(false);
    setUploadedPreview(null);
    onSignatureChange('', 'DRAWN');
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    const previousState = newHistory.pop();
    setHistory(newHistory);

    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
      if (newHistory.length === 0) {
        setHasContent(false);
        onSignatureChange('', 'DRAWN');
      } else {
        const dataUrl = canvas.toDataURL('image/png');
        onSignatureChange(dataUrl, 'DRAWN');
      }
    }
  };

  const handleSimulateSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    handleClear();
    setHasContent(true);

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.lineWidth = 2.8;
    ctx.strokeStyle = '#0f172a';
    ctx.beginPath();

    const startX = rect.width * 0.15;
    const baseY = rect.height * 0.55;

    ctx.moveTo(startX, baseY);
    ctx.bezierCurveTo(startX + 20, baseY - 35, startX + 50, baseY - 40, startX + 60, baseY);
    ctx.bezierCurveTo(startX + 75, baseY + 30, startX + 90, baseY - 30, startX + 115, baseY - 10);
    ctx.bezierCurveTo(startX + 130, baseY + 10, startX + 150, baseY - 20, startX + 180, baseY);
    ctx.bezierCurveTo(startX + 200, baseY + 15, startX + 230, baseY - 15, startX + 260, baseY - 5);
    // Flourish underline
    ctx.moveTo(startX - 10, baseY + 18);
    ctx.quadraticCurveTo(startX + 140, baseY + 32, startX + 280, baseY + 14);

    ctx.stroke();
    ctx.restore();

    const dataUrl = canvas.toDataURL('image/png');
    onSignatureChange(dataUrl, 'SIMULATED');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUploadedPreview(dataUrl);
      setHasContent(true);
      onSignatureChange(dataUrl, 'UPLOADED');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">
            {roleLabel || t.signatureTitle}
          </span>
          {signerName && (
            <span className="text-xs text-slate-500 font-medium">({signerName})</span>
          )}
        </div>

        {/* Tab Toggle: Draw or Upload */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setMode('DRAW')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              mode === 'DRAW' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.signatureDrawTab}
          </button>
          <button
            type="button"
            onClick={() => setMode('UPLOAD')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              mode === 'UPLOAD' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.signatureUploadTab}
          </button>
        </div>
      </div>

      {mode === 'DRAW' ? (
        <div className="relative border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
          <canvas
            ref={canvasRef}
            className="w-full h-36 touch-none cursor-crosshair block"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          {!hasContent && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-slate-400 select-none">
              <span>✍️ {t.signatureDrawTab}</span>
            </div>
          )}

          {/* Action Toolbar on Bottom Right */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs p-1 rounded-md border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0}
              className="px-2 py-1 text-xs text-slate-600 hover:text-slate-900 disabled:opacity-40 flex items-center gap-1 font-medium transition-colors"
              title={t.signatureUndo}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.signatureUndo}</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-2 py-1 text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium transition-colors"
              title={t.signatureClear}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>{t.signatureClear}</span>
            </button>
            <button
              type="button"
              onClick={handleSimulateSignature}
              className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded flex items-center gap-1 font-medium transition-colors border border-emerald-200"
              title={t.signatureSimulate}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.signatureSimulate}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-slate-300 rounded-lg p-5 bg-white text-center hover:border-slate-400 transition-colors">
          {uploadedPreview ? (
            <div className="space-y-3">
              <div className="h-28 flex items-center justify-center p-2 bg-slate-50 rounded border border-slate-200">
                <img
                  src={uploadedPreview}
                  alt="Uploaded Signature"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Signature Attached (Base64 Ready)
                </span>
                <label className="text-xs text-slate-600 hover:text-slate-900 underline cursor-pointer font-medium">
                  Change File
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          ) : (
            <label className="cursor-pointer block py-4 space-y-2">
              <Upload className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-xs text-slate-700 font-medium">{t.signatureUploadPrompt}</div>
              <div className="text-[11px] text-slate-400">PNG, JPG up to 2MB (Base64 encoded)</div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
};
