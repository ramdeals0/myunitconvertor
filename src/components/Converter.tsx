import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Copy, Check, ChevronsUpDown, Search } from "lucide-react";
import { Category } from "@/lib/converters/types";
import { convert, formatResult } from "@/lib/converters/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";


interface Props {
  category: Category;
  initialFrom?: string;
  initialTo?: string;
  compact?: boolean;
}

export function Converter({ category, initialFrom, initialTo, compact }: Props) {
  const [from, setFrom] = useState(initialFrom ?? category.units[0].id);
  const [to, setTo] = useState(initialTo ?? category.units[1]?.id ?? category.units[0].id);
  const [input, setInput] = useState("1");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFrom(initialFrom ?? category.units[0].id);
    setTo(initialTo ?? category.units[1]?.id ?? category.units[0].id);
  }, [category.id, initialFrom, initialTo]);

  const result = useMemo(() => {
    const n = parseFloat(input);
    if (isNaN(n)) return "";
    return formatResult(convert(category, n, from, to));
  }, [input, from, to, category]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    if (result) setInput(result);
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`bg-surface-elevated rounded-2xl border border-border shadow-[var(--shadow-card)] ${compact ? "p-6" : "p-8 md:p-12"}`}>
      {!compact && (
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Precision {category.name} Converter
          </h2>
          <p className="text-muted-foreground mt-2">{category.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-end">
        <UnitField
          label="From"
          value={input}
          onChange={setInput}
          unit={from}
          onUnitChange={setFrom}
          category={category}
          editable
        />

        <div className="flex md:pb-2 justify-center">
          <button
            onClick={swap}
            aria-label="Swap units"
            className="group bg-surface-elevated border border-border hover:border-primary hover:text-primary transition-all p-3 rounded-full"
          >
            <ArrowLeftRight className="h-5 w-5 transition-transform group-active:rotate-180" />
          </button>
        </div>

        <UnitField
          label="To"
          value={result}
          onChange={() => {}}
          unit={to}
          onUnitChange={setTo}
          category={category}
          readOnly
          trailing={
            <button
              onClick={copy}
              aria-label="Copy result"
              className="text-muted-foreground hover:text-primary p-1 transition"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          }
        />
      </div>
    </div>
  );
}

function UnitField({
  label, value, onChange, unit, onUnitChange, category, editable, readOnly, trailing,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  onUnitChange: (v: string) => void;
  category: Category;
  editable?: boolean;
  readOnly?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] tracking-[0.08em] font-semibold uppercase text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          type={editable ? "text" : "text"}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          placeholder="0"
          className={`w-full bg-surface-elevated border border-border rounded-xl pl-4 pr-36 py-4 text-2xl font-mono-num font-medium outline-none transition-all
            ${readOnly ? "text-muted-foreground bg-muted/40" : "focus:border-primary focus:shadow-[var(--shadow-glow)]"}`}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {trailing}
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            className="bg-muted border-none rounded-lg py-1.5 pl-2 pr-7 text-xs font-semibold focus:ring-0 cursor-pointer max-w-[140px] truncate"
          >
            {category.units.map((u) => (
              <option key={u.id} value={u.id}>{u.symbol} — {u.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
