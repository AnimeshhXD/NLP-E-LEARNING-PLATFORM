export interface SectionData {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  bgType: 'deep' | 'particles' | 'grid' | 'aurora' | 'nebula';
  threeZone: 'hero' | 'raw' | 'segmentation' | 'tokenization' | 'cleaning' | 'stemming' | 'lemmatization' | 'features' | 'embeddings' | 'word2vec' | 'transformers' | 'modern' | 'apps' | 'research' | 'sustainability' | 'ending';
}

export interface TokenItem {
  id: number;
  word: string;
  clean: string;
  stem: string;
  lemma: string;
  isStopword: boolean;
  tfidf: number;
  vector: [number, number, number];
  pos?: string;
  explanation: string;
}

export interface EmbeddingNode {
  word: string;
  category: 'royalty' | 'gender' | 'tech' | 'nature' | 'ai';
  position: [number, number, number];
  color: number;
  connections: string[];
}

export interface ApplicationPanel {
  id: string;
  title: string;
  iconName: string;
  tagline: string;
  illustration: string;
  workflow: string[];
  companies: string[];
  conceptsUsed: string[];
  benefits: string;
  color: string;
}

export interface ResearchYear {
  year: number;
  title: string;
  model: string;
  parameters: string;
  breakthrough: string;
  impact: string;
}

export interface SustainabilityMetric {
  title: string;
  stat: string;
  description: string;
  icon: string;
}
