import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/c/length", label: "Length" },
  { to: "/c/weight", label: "Weight" },
  { to: "/c/temperature", label: "Temperature" },
  { to: "/c/volume", label: "Volume" },
  { to: "/converters", label: "All Converters" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="bg-surface-elevated/80 backdrop-blur-md border-b border-border fixed top-0 inset-x-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          UnitPrecise
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => {
            const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                  active ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={toggle} className="p-2 rounded-full hover:bg-muted transition" aria-label="Toggle theme">
            {dark ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-surface-elevated px-4 py-3 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-20 bg-surface-elevated">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-foreground">UnitPrecise</span> — Professional unit conversion &amp; technical tools.
        </div>
        <div className="flex flex-col md:items-end gap-1">
          <div>© {new Date().getFullYear()} UnitPrecise. Engineered for accuracy.</div>
        </div>
      </div>
    </footer>
  );
}
