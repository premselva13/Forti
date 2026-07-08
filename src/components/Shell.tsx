import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { GlobalSearch } from "./GlobalSearch";
import { Ticker } from "./Ticker";

const NAV = [
  { to: "/", label: "Command Deck", end: true },
  { to: "/security-for-ai", label: "Security for AI" },
  { to: "/sase-sd-wan", label: "SASE / SD-WAN" },
  { to: "/tools/battlecards", label: "Battlecards" },
  { to: "/tools/skus", label: "SKUs" },
  { to: "/tools/migrations", label: "Migrations" },
  { to: "/learn", label: "Learn" },
  { to: "/deal-desk", label: "Deal Desk" },
  { to: "/why-cdw", label: "Why CDW" },
  { to: "/intel", label: "Intel" },
];

export function Shell() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Scroll to top on route change (hash links handle their own scroll)
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-ink-900 focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 lg:px-8">
          <NavLink to="/" className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="display text-xl text-fg">The Fabric Exchange</span>
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-fg-low uppercase sm:inline">
              CDW Canada × Fortinet
            </span>
          </NavLink>

          <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors ${
                    isActive ? "text-red-hi" : "text-fg-low hover:text-fg"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setSearchOpen(true)}
            className="ml-auto flex items-center gap-2 border border-ink-600 px-3 py-1.5 font-mono text-[11px] text-fg-low hover:border-ink-600 hover:text-fg xl:ml-2"
            aria-label="Open global search"
          >
            <span>Search</span>
            <kbd className="text-[10px]">⌘K</kbd>
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="border border-ink-600 px-3 py-1.5 font-mono text-[11px] text-fg-low xl:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            Menu
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-ink-700 xl:hidden" aria-label="Mobile">
            <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-ink-700 sm:grid-cols-3">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `bg-ink-950 px-4 py-3 font-mono text-xs tracking-wider uppercase ${
                      isActive ? "text-red-hi" : "text-fg-mid"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
        <Ticker />
      </header>

      <main id="main" className="mx-auto w-full max-w-[1440px] flex-1 px-4 lg:px-8">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-ink-700">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-baseline justify-between gap-3 px-4 py-6 lg:px-8">
          <p className="font-mono text-[11px] tracking-wider text-fg-low">
            THE FABRIC EXCHANGE · CDW CANADA × FORTINET · INTERNAL PARTNER PORTAL
          </p>
          <p className="font-mono text-[11px] text-fg-low">
            Sizing bands directional · pricing by formal quote only · v0.1
          </p>
        </div>
      </footer>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
