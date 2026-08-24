import { Menu, Search, Bell, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { notifications } from '../data/demoData'

export default function Topbar({ onMenu, title }: { onMenu: () => void; title: string }) {
  const [light, setLight] = useState(false)
  const unread = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between gap-4 px-4 lg:px-8 border-b border-borderc bg-darkbg/80 backdrop-blur">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenu} className="lg:hidden text-textSecondary hover:text-textPrimary">
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-borderc rounded-lg px-3 py-1.5 w-64">
          <Search size={15} className="text-textSecondary" />
          <input
            placeholder="Search projects, sites, logs…"
            className="bg-transparent outline-none text-sm placeholder:text-textSecondary w-full"
          />
        </div>
        <button
          onClick={() => setLight((v) => !v)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-borderc text-textSecondary hover:text-textPrimary hover:bg-white/5"
          title="Toggle theme"
        >
          {light ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <div className="relative">
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-borderc text-textSecondary hover:text-textPrimary hover:bg-white/5">
            <Bell size={16} />
          </button>
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-[10px] font-bold flex items-center justify-center text-white">
              {unread}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
