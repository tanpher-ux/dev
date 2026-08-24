import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

import Overview from './pages/Overview'
import Projects from './pages/Projects'
import Servers from './pages/Servers'
import Docker from './pages/Docker'
import Git from './pages/Git'
import Deployments from './pages/Deployments'
import Files from './pages/Files'
import Logs from './pages/Logs'
import Backups from './pages/Backups'
import Websites from './pages/Websites'
import Uptime from './pages/Uptime'
import Performance from './pages/Performance'
import Ssl from './pages/Ssl'
import Domains from './pages/Domains'
import Incidents from './pages/Incidents'
import Notifications from './pages/Notifications'
import Login from './pages/Login'

const titles: Record<string, string> = {
  '/': 'Overview',
  '/projects': 'Projects',
  '/servers': 'Local Servers',
  '/docker': 'Docker',
  '/git': 'Git',
  '/deployments': 'Deployments',
  '/files': 'Project Files',
  '/logs': 'Logs',
  '/backups': 'Backups',
  '/websites': 'Websites',
  '/uptime': 'Uptime',
  '/performance': 'Performance',
  '/ssl': 'SSL Certificates',
  '/domains': 'Domains',
  '/incidents': 'Incidents',
  '/notifications': 'Notifications',
}

export default function App() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  if (location.pathname === '/login') {
    return <Login />
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar onMenu={() => setOpen(true)} title={titles[location.pathname] ?? 'DevControl'} />
        <main className="flex-1 px-4 lg:px-8 py-6 max-w-[1600px] w-full mx-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/servers" element={<Servers />} />
            <Route path="/docker" element={<Docker />} />
            <Route path="/git" element={<Git />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/files" element={<Files />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/backups" element={<Backups />} />
            <Route path="/websites" element={<Websites />} />
            <Route path="/uptime" element={<Uptime />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/ssl" element={<Ssl />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
