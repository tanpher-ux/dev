/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#0EA5E9',
        darkbg: '#0F172A',
        card: '#111827',
        borderc: '#334155',
        lightbg: '#F8FAFC',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(37,99,235,0.15), 0 8px 24px -8px rgba(37,99,235,0.35)',
      },
    },
  },
  plugins: [],
}
