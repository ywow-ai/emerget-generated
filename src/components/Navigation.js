import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Home, Users, Calendar, Shirt, User, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/costumes', label: 'Costumes', icon: Shirt },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-[var(--surface)] border-b border-[var(--border)] backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--hero-gradient)' }}>
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                CosplayHub
              </span>
            </Link>

            {/* Desktop Nav Items */}
            <div className="flex items-center space-x-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    isActive(path)
                      ? 'text-[var(--primary)] font-medium'
                      : 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--surface-light)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Theme Toggle & Auth */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-[var(--surface-light)] transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
                ) : (
                  <Sun className="w-5 h-5 text-[var(--text-secondary)]" />
                )}
              </button>
              <Link to="/login">
                <Button variant="outline" className="rounded-lg">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="rounded-lg text-white" style={{ background: 'var(--button-primary)' }}>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--surface)] border-b border-[var(--border)] backdrop-blur-lg bg-opacity-90">
        <div className="flex justify-between items-center h-16 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--hero-gradient)' }}>
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              CosplayHub
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--surface-light)] transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
              ) : (
                <Sun className="w-5 h-5 text-[var(--text-secondary)]" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-[var(--surface-light)] transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--text-primary)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--text-primary)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-[var(--surface)] border-b border-[var(--border)] shadow-lg">
            <div className="px-4 py-3 space-y-1">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-lg mb-2">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-lg text-white" style={{ background: 'var(--button-primary)' }}>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] border-t border-[var(--border)] backdrop-blur-lg bg-opacity-95">
        <div className="grid grid-cols-4 h-16">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                isActive(path)
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <Icon className={`w-6 h-6 ${
                isActive(path) ? 'scale-110' : ''
              }`} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;