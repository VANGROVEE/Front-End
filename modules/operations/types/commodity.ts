export enum CommodityCategory {
  MANGROVE = "MANGROVE",
  PANGAN = "PANGAN",
  HORTIKULTURA_SAYUR = "HORTIKULTURA_SAYUR",
  HORTIKULTURA_BUAH = "HORTIKULTURA_BUAH",
  PERKEBUNAN = "PERKEBUNAN",
  HERBAL = "HERBAL",
}

export interface Commodity {
  id: string;
  name: string;
  slug_ai: string;
  category: CommodityCategory;
  is_ai_supported: boolean;
}
export interface CommodityStats {
  total_commodities: number;
  total_ai_supported: number;
  categories: {};
  total_categories: number;
}
