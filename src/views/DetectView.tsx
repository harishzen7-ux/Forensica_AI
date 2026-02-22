import React from 'react';
import { motion } from 'motion/react';
import { Camera, Video, FileText, Mic, ChevronLeft, Upload, Info } from 'lucide-react';
import { Page, Modality, DetectionResult } from '../types';
import { AnalysisProgress } from '../components/Analysis/AnalysisProgress';
import { AnalysisResult } from '../components/Analysis/AnalysisResult';

interface DetectViewProps {
  selectedModality: Modality;
  onNavigate: (page: Page, modality?: Modality | null) => void;
  isAnalyzing: boolean;
  result: DetectionResult | null;
  textInput: string;
  setTextInput: (val: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnalyze: () => void;
  resetAnalysis: () => void;
}

export function DetectView({
  selectedModality,
  onNavigate,
  isAnalyzing,
  result,
  textInput,
  setTextInput,
  file,
  setFile,
  previewUrl,
  setPreviewUrl,
  handleFileChange,
  handleAnalyze,
  resetAnalysis
}: DetectViewProps) {
  return (
    <motion.div 
      key="detect"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl"
    >
      <button 
        onClick={() => onNavigate('selection')}
        className="flex items-center gap-2 text-cloud/60 hover:text-cloud mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Selection
      </button>

      <div className="space-y-6">
        {/* Header Tile */}
        <div className={`cloud-tile !p-6 flex items-center gap-4 no-anim-cloud`}>
          <div className="p-3 bg-white/10 rounded-xl">
            {selectedModality === 'photo' && <Camera className="w-6 h-6" />}
            {selectedModality === 'video' && <Video className="w-6 h-6" />}
            {selectedModality === 'text' && <FileText className="w-6 h-6" />}
            {selectedModality === 'audio' && <Mic className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-2xl font-bold capitalize">{selectedModality} Detection</h2>
            <p className="text-cloud/50 text-sm">AI Forensic Analysis Engine</p>
          </div>
        </div>

        {!result && !isAnalyzing && (
          <>
            {/* Upload/Input Tile */}
            <div className="cloud-tile !p-8 no-anim-cloud">
              {selectedModality === 'text' ? (
                <textarea 
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste text content here..."
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-cloud/30 transition-colors resize-none"
                />
              ) : (
                <div 
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <Upload className="w-12 h-12 text-cloud/20 group-hover:text-cloud/40 transition-colors" />
                  <div className="text-center">
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-cloud/40 mt-1">
                      {selectedModality === 'photo' && 'JPG, PNG, WEBP (Max 10MB)'}
                      {selectedModality === 'video' && 'MP4, MOV (Max 50MB)'}
                      {selectedModality === 'audio' && 'MP3, WAV (Max 20MB)'}
                    </p>
                  </div>
                  <input 
                    id="file-upload"
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </div>
              )}

              {file && (
                <div className="mt-6 space-y-4">
                  {previewUrl && selectedModality === 'photo' && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/20">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Info className="w-5 h-5 text-cloud/40" />
                      <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                    </div>
                    <button onClick={() => { setFile(null); setPreviewUrl(null); }} className="text-xs text-red-400 hover:underline">Remove</button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Tile */}
            <div className="cloud-tile !p-6 no-anim-cloud">
              <button 
                disabled={(selectedModality === 'text' ? !textInput : !file) || isAnalyzing}
                onClick={handleAnalyze}
                className="btn-cloud w-full disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Analyze Content
              </button>
            </div>
          </>
        )}

        {isAnalyzing && <AnalysisProgress />}

        {result && (
          <AnalysisResult 
            result={result} 
            onNewAnalysis={resetAnalysis} 
            onChangeModality={() => onNavigate('selection')} 
          />
        )}
      </div>
    </motion.div>
  );
}
