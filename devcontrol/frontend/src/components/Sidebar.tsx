import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, FolderGit2, Server, Container, GitBranch, Rocket, FolderOpen,
  ScrollText, Archive, Globe, Activity, Gauge, ShieldCheck, Globe2, AlertTriangle,
  Bell, X, TerminalSquare,
} from 'lucide-react'

const devLinks = [
  { to: '/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/servers', label: 'Local Servers', icon: Server },
  { to: '/docker', label: 'Docker', icon: Container },
  { to: '/git', label: 'Git', icon: GitBranch },
  { to: '/deployments', label: 'Deployments', icon: Rocket },
  { to: '/files', label: 'Files', icon: FolderOpen },
  { to: '/logs', label: 'Logs', icon: ScrollText },
  { to: '/backups', label: 'Backups', icon: Archive },
]

const webLinks = [
  { to: '/websites', label: 'Websites', icon: Globe },
  { to: '/uptime', label: 'Uptime', icon: Activity },
  { to: '/performance', label: 'Performance', icon: Gauge },
  { to: '/ssl', label: 'SSL', icon: ShieldCheck },
  { to: '/domains', label: 'Domains', icon: Globe2 },
  { to: '/incidents', label: 'Incidents', icon: AlertTriangle },
  { to: '/notifications', label: 'Notifications', icon: Bell },
]

function NavItem({ to, label, icon: Icon }: { to: string; label: string; icon: any }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
          isActive
            ? 'bg-primary/15 text-primary border border-primary/30 font-medium'
            : 'text-textSecondary hover:text-textPrimary hover:bg-white/5 border border-transparent'
        }`
      }
    >
      <Icon size={16} strokeWidth={2} />
      {label}
    </NavLink>
  )
}

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 shrink-0 bg-[#0B1220] border-r border-borderc z-50
        transform transition-transform duration-200 lg:translate-x-0 flex flex-col
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-borderc">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
              <TerminalSquare size={17} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-wide leading-none">DEVCONTROL</div>
              <div className="text-[10px] text-textSecondary leading-none mt-0.5">v1.0 · production</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-textSecondary hover:text-textPrimary">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <NavItem to="/" label="Overview" icon={LayoutDashboard} />

          <div>
            <div className="section-title px-3 mb-2">🖥 Developer System</div>
            <div className="space-y-1">
              {devLinks.map((l) => <NavItem key={l.to} {...l} />)}
            </div>
          </div>

          <div>
            <div className="section-title px-3 mb-2">🌐 Website Monitoring</div>
            <div className="space-y-1">
              {webLinks.map((l) => <NavItem key={l.to} {...l} />)}
            </div>
          </div>
        </nav>

        <div className="px-4 py-4 border-t border-borderc">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-semibold text-primary">
              JM
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium truncate">j.mwangi@acme.dev</div>
              <div className="text-[11px] text-textSecondary">Administrator</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
