import { useState, useEffect, useCallback } from "react";
import { Calculator as CalcIcon, X } from "lucide-react";

type Btn = { label: string; val?: string; cls?: string; action?: "clear" | "back" | "equals" };

const BUTTONS: Btn[][] = [
  [
    { label: "sin", val: "Math.sin(" },
    { label: "cos", val: "Math.cos(" },
    { label: "tan", val: "Math.tan(" },
    { label: "π", val: "Math.PI" },
    { label: "e", val: "Math.E" },
  ],
  [
    { label: "asin", val: "Math.asin(" },
    { label: "acos", val: "Math.acos(" },
    { label: "atan", val: "Math.atan(" },
    { label: "ln", val: "Math.log(" },
    { label: "log", val: "Math.log10(" },
  ],
  [
    { label: "x²", val: "**2" },
    { label: "xʸ", val: "**" },
    { label: "√", val: "Math.sqrt(" },
    { label: "!", val: "!" },
    { label: "1/x", val: "1/(" },
  ],
  [
    { label: "(", val: "(" },
    { label: ")", val: ")" },
    { label: "%", val: "/100" },
    { label: "AC", action: "clear", cls: "bg-destructive/15 text-destructive hover:bg-destructive/25" },
    { label: "⌫", action: "back", cls: "bg-muted hover:bg-muted/70" },
  ],
  [
    { label: "7", val: "7" },
    { label: "8", val: "8" },
    { label: "9", val: "9" },
    { label: "÷", val: "/", cls: "bg-primary-soft text-primary hover:bg-primary/15" },
    { label: "×", val: "*", cls: "bg-primary-soft text-primary hover:bg-primary/15" },
  ],
  [
    { label: "4", val: "4" },
    { label: "5", val: "5" },
    { label: "6", val: "6" },
    { label: "−", val: "-", cls: "bg-primary-soft text-primary hover:bg-primary/15" },
    { label: "+", val: "+", cls: "bg-primary-soft text-primary hover:bg-primary/15" },
  ],
  [
    { label: "1", val: "1" },
    { label: "2", val: "2" },
    { label: "3", val: "3" },
    { label: "0", val: "0" },
    { label: ".", val: "." },
  ],
];

function factorial(n: number): number {
  if (n < 0 || !Number.isFinite(n) || n !== Math.floor(n)) return NaN;
  if (n > 170) return Infinity;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function evaluate(raw: string): string {
  if (!raw.trim()) return "";
  try {
    // Replace ! (factorial) on numbers/parens
    let expr = raw;
    // Repeatedly replace patterns like N! or )!
    for (let i = 0; i < 20; i++) {
      const next = expr.replace(/(\d+(?:\.\d+)?|\([^()]*\))!/g, (_m, g) => `factorial(${g})`);
      if (next === expr) break;
      expr = next;
    }
    // eslint-disable-next-line no-new-func
    const fn = new Function("factorial", `"use strict"; return (${expr});`);
    const out = fn(factorial);
    if (typeof out !== "number" || !Number.isFinite(out)) return "Error";
    return String(Number(out.toPrecision(12)));
  } catch {
    return "Error";
  }
}

export function ScientificCalculator() {
  const [open, setOpen] = useState(false);
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");

  const press = useCallback((b: Btn) => {
    if (b.action === "clear") { setExpr(""); setResult(""); return; }
    if (b.action === "back") { setExpr((p) => p.slice(0, -1)); return; }
    if (b.action === "equals") { setResult(evaluate(expr)); return; }
    if (b.val !== undefined) setExpr((p) => p + b.val);
  }, [expr]);

  useEffect(() => {
    setResult(evaluate(expr));
  }, [expr]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-50 print:hidden">
      {open ? (
        <div className="w-[320px] bg-surface-elevated border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CalcIcon className="h-4 w-4 text-primary" />
              Scientific Calculator
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close calculator"
              className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-3 space-y-2">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <input
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                placeholder="0"
                aria-label="Calculator expression"
                className="w-full bg-transparent outline-none font-mono-num text-sm text-foreground text-right truncate"
              />
              <div className="mt-1 font-mono-num text-xl font-semibold text-primary text-right truncate min-h-[28px]">
                {result || (expr ? "" : "0")}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {BUTTONS.flat().map((b, i) => (
                <button
                  key={i}
                  onClick={() => press(b)}
                  className={`h-9 rounded-md text-xs font-semibold border border-border bg-surface-elevated hover:border-primary hover:text-primary transition ${b.cls ?? ""}`}
                >
                  {b.label}
                </button>
              ))}
              <button
                onClick={() => press({ label: "=", action: "equals" })}
                className="col-span-5 h-10 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition"
              >
                =
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open scientific calculator"
          className="group flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:scale-105 transition-all"
        >
          <CalcIcon className="h-5 w-5" />
          <span className="text-sm font-semibold pr-1">Calculator</span>
        </button>
      )}
    </div>
  );
}
