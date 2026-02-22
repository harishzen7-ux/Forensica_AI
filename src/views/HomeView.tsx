import React from 'react';
import { motion } from 'motion/react';
import { Logo } from '../components/Logo';
import { Page } from '../types';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <motion.div 
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full grid md:grid-cols-2 gap-12 items-center"
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Hi, Welcome to <span className="text-cloud/90">Forensica</span>
          </h1>
          <p className="text-2xl text-cloud/60 font-medium">Unmask the Unreal.</p>
        </div>

        <div className="space-y-4 pt-8">
          <button 
            onClick={() => onNavigate('selection')}
            className="btn-cloud w-fit text-lg"
          >
            Get Started
          </button>
          
          <div className="pt-4">
            <button 
              onClick={() => onNavigate('specs')}
              className="group flex flex-col items-start gap-1 text-cloud/40 hover:text-cloud active:text-violet-400 active:scale-95 transition-all duration-200"
            >
              <span className="text-sm uppercase tracking-widest font-semibold">SEE WHAT FORENSICA AI CAN DO?</span>
              <div className="h-px w-0 group-hover:w-full bg-cloud group-active:bg-violet-400 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block">
        <div className="relative aspect-square glass-card flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cloud/10 to-transparent" />
          <Logo className="w-48 h-48 opacity-80" />
          <div className="absolute bottom-8 left-8 right-8 p-6 violet-tile no-anim-violet space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <p className="text-sm font-mono text-cloud/60 uppercase tracking-wider">System Status: <span className="text-emerald-400">Active</span></p>
            </div>
            <p className="text-sm font-mono text-cloud/60 uppercase tracking-wider pl-3.5">Models: V4.2.0-Stable</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
