
export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  cefr_level: CefrLevel;
  category: string;
  synopsis: string;
  status: 'available' | 'borrowed';
}