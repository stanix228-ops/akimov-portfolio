import React, { useState, useEffect } from 'react';
import { ABOUT_DATA } from '../data/projects';
import { Moon, Sun, Menu, X, Send, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Обо мне', href: '#about' },
    { label: 'Услуги', href: '#services' },
    { label: 'Проекты & Кейсы', href: '#projects' },
    { label: 'Расчет ROI', href: '#roi-calculator' },
    { label: 'Стек', href: '#skills' },
    { label: 'Процесс', href: '#process' },
    { label: 'Контакты', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#121010]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[67.5rem] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#121010] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
                A
              </span>
            </div>
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-white flex items-center gap-1.5 font-mono">
              <span>{ABOUT_DATA.name}</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[11px] text-zinc-400 font-mono tracking-wide">Full-Stack & AI</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-zinc-300 hover:text-white px-3 py-1 rounded-full hover:bg-white/10 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle theme"
            className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Telegram CTA */}
          <a
            href={ABOUT_DATA.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>TG: {ABOUT_DATA.telegram}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121010]/95 border-b border-white/10 px-6 py-5 space-y-3 backdrop-blur-xl animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-200 py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ABOUT_DATA.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2"
          >
            <span>Написать в Telegram ({ABOUT_DATA.telegram})</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
