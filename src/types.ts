export type Stat = { name: string; base: number };
export type Pokemon = { id: number; name: string; sprite?: string; types: string[]; stats: Stat[] };
