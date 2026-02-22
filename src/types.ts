export type Page = 'home' | 'specs' | 'selection' | 'detect';
export type Modality = 'photo' | 'video' | 'text' | 'audio';

export interface DetectionResult {
  type: Modality;
  generation_source: 'HUMAN' | 'AI';
  score: number;
  justification: string;
  confidence: number;
}
