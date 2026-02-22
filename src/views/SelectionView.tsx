import React from 'react';
import { motion } from 'motion/react';
import { Camera, Video, FileText, Mic } from 'lucide-react';
import { SelectionTile } from '../components/SelectionTile';
import { Page, Modality } from '../types';

interface SelectionViewProps {
  onNavigate: (page: Page, modality: Modality) => void;
}

export function SelectionView({ onNavigate }: SelectionViewProps) {
  return (
    <motion.div 
      key="selection"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="w-full max-w-5xl text-center"
    >
      <h2 className="text-4xl font-bold mb-12">What do you want me to detect?</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SelectionTile 
          icon={<Camera className="w-8 h-8" />}
          title="Photo"
          label="Fake Ends Here."
          onClick={() => onNavigate('detect', 'photo')}
          noAnimation
        />
        <SelectionTile 
          icon={<Video className="w-8 h-8" />}
          title="Video"
          label="Deepfake Clarity"
          onClick={() => onNavigate('detect', 'video')}
        />
        <SelectionTile 
          icon={<FileText className="w-8 h-8" />}
          title="Text"
          label="Text Authenticity"
          onClick={() => onNavigate('detect', 'text')}
        />
        <SelectionTile 
          icon={<Mic className="w-8 h-8" />}
          title="Audio"
          label="Audio Forensics"
          onClick={() => onNavigate('detect', 'audio')}
        />
      </div>
    </motion.div>
  );
}
