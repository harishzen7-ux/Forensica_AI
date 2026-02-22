import React from 'react';
import { motion } from 'motion/react';
import { DetectionResult } from '../../types';

interface AnalysisResultProps {
  result: DetectionResult;
  onNewAnalysis: () => void;
  onChangeModality: () => void;
}

export function AnalysisResult({ result, onNewAnalysis, onChangeModality }: AnalysisResultProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="cloud-tile !p-8 md:!p-12 no-anim-cloud space-y-8"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/10"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * result.score) / 100}
              className={`${result.score > 50 ? 'text-emerald-500' : 'text-red-500'} transition-all duration-1000`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{result.score}</span>
            <span className="text-[10px] uppercase tracking-widest opacity-50">Genuine Score</span>
          </div>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
            <span className={`px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${result.generation_source === 'HUMAN' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {result.generation_source} Generated
            </span>
            <span className="text-sm text-cloud/40">Confidence: {(result.confidence * 100).toFixed(0)}%</span>
          </div>
          <p className="text-cloud/80 leading-relaxed italic">
            "{result.justification}"
          </p>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex gap-4">
        <button 
          onClick={onNewAnalysis}
          className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium"
        >
          New Analysis
        </button>
        <button 
          onClick={onChangeModality}
          className="flex-1 py-3 rounded-xl bg-cloud text-charcoal font-bold hover:bg-white transition-colors"
        >
          Change Modality
        </button>
      </div>
    </motion.div>
  );
}
