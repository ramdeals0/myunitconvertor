export interface Unit {
  id: string;
  name: string;
  symbol: string;
  /** Convert this unit -> base unit value */
  toBase: (v: number) => number;
  /** Convert base unit value -> this unit */
  fromBase: (v: number) => number;
  aliases?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  group: CategoryGroup;
  baseUnit: string;
  units: Unit[];
  /** popular pair conversions for SEO direct routes */
  popular?: Array<{ from: string; to: string }>;
}

export type CategoryGroup =
  | "common"
  | "engineering"
  | "heat"
  | "fluids"
  | "light"
  | "electricity"
  | "magnetism"
  | "radiology"
  | "other";

export const GROUP_LABELS: Record<CategoryGroup, string> = {
  common: "Common",
  engineering: "Engineering",
  heat: "Heat",
  fluids: "Fluids",
  light: "Light",
  electricity: "Electricity",
  magnetism: "Magnetism",
  radiology: "Radiology",
  other: "Other",
};
