import type { Unit } from "./types";

/** Helper: build a linear unit (value * factor = base). Default factor = 1. */
export function u(id: string, name: string, symbol: string, factor: number = 1, aliases?: string[]): Unit {
  return {
    id,
    name,
    symbol,
    toBase: (v) => v * factor,
    fromBase: (v) => v / factor,
    aliases,
  };
}
