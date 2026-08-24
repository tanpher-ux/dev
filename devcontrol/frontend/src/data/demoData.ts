export type ProjectStatus = 'Active' | 'Development' | 'Paused' | 'Completed' | 'Archived'
export type ServerStatus = 'Running' | 'Starting' | 'Stopped' | 'Error'
export type SiteStatus = 'Online' | 'Slow' | 'Offline'

export interface Project {
  id: string
  name: string
  description: string
  localPath: string
  gitRepo: string
  gitBranch: string
  stack: string[]
  environment: string
  devPort: number
  status: ProjectStatus
  serverStatus: ServerStatus
  lastActivity: string
}

export const projects: Project[] = [
  {
    id: 'p1', name: 'POS Management System',
    description: 'Point-of-sale system for retail chains with inventory sync.',
    localPath: '~/dev/pos-management-system', gitRepo: 'github.com/acme/pos-system', gitBranch: 'main',
    stack: ['React', 'FastAPI', 'PostgreSQL'], environment: 'Development', devPort: 5173,
    status: 'Active', serverStatus: 'Running', lastActivity: '2 minutes ago',
  },
  {
    id: 'p2', name: 'E-Commerce Platform',
    description: 'Multi-vendor storefront with checkout and order management.',
    localPath: '~/dev/ecommerce-platform', gitRepo: 'github.com/acme/ecommerce', gitBranch: 'develop',
    stack: ['React', 'Node.js', 'PostgreSQL'], environment: 'Staging', devPort: 3000,
    status: 'Development', serverStatus: 'Stopped', lastActivity: '1 hour ago',
  },
  {
    id: 'p3', name: 'Developer Portfolio',
    description: 'Personal portfolio and case-study showcase site.',
    localPath: '~/dev/portfolio', gitRepo: 'github.com/acme/portfolio', gitBranch: 'main',
    stack: ['React', 'Vite'], environment: 'Production', devPort: 4173,
    status: 'Completed', serverStatus: 'Stopped', lastActivity: '3 days ago',
  },
  {
    id: 'p4', name: 'Client Management System',
    description: 'CRM for freelance client onboarding and invoicing.',
    localPath: '~/dev/client-crm', gitRepo: 'github.com/acme/client-crm', gitBranch: 'feature/invoices',
    stack: ['React', 'Python', 'PostgreSQL'], environment: 'Development', devPort: 5174,
    status: 'Active', serverStatus: 'Running', lastActivity: '18 minutes ago',
  },
  {
    id: 'p5', name: 'Internal Analytics Dashboard',
    description: 'Metrics dashboard for internal team reporting.',
    localPath: '~/dev/analytics-dashboard', gitRepo: 'github.com/acme/analytics', gitBranch: 'main',
    stack: ['React', 'FastAPI'], environment: 'Development', devPort: 5175,
    status: 'Paused', serverStatus: 'Stopped', lastActivity: '2 weeks ago',
  },
  {
    id: 'p6', name: 'Legacy Booking Tool',
    description: 'Older reservation tool kept for archival reference.',
    localPath: '~/dev/legacy-booking', gitRepo: 'github.com/acme/legacy-booking', gitBranch: 'main',
    stack: ['Vue', 'Express'], environment: 'Archived', devPort: 8080,
    status: 'Archived', serverStatus: 'Stopped', lastActivity: '5 months ago',
  },
]

export interface DockerContainer {
  id: string; name: string; image: string; status: 'Running' | 'Stopped' | 'Restarting'
  cpu: string; memory: string; port: string; project: string
}

export const containers: DockerContainer[] = [
  { id: 'c1', name: 'postgres-db', image: 'postgres:16', status: 'Running', cpu: '4.2%', memory: '312 MB', port: '5432:5432', project: 'POS Management System' },
  { id: 'c2', name: 'redis-cache', image: 'redis:7-alpine', status: 'Running', cpu: '1.1%', memory: '48 MB', port: '6379:6379', project: 'POS Management System' },
  { id: 'c3', name: 'pos-api', image: 'pos-api:latest', status: 'Running', cpu: '8.7%', memory: '520 MB', port: '8000:8000', project: 'POS Management System' },
  { id: 'c4', name: 'ecommerce-worker', image: 'ecommerce-worker:1.2', status: 'Stopped', cpu: '0%', memory: '0 MB', port: '—', project: 'E-Commerce Platform' },
  { id: 'c5', name: 'nginx-proxy', image: 'nginx:1.27-alpine', status: 'Running', cpu: '0.6%', memory: '22 MB', port: '80:80, 443:443', project: 'Global' },
  { id: 'c6', name: 'crm-db', image: 'postgres:16', status: 'Restarting', cpu: '—', memory: '—', port: '5433:5432', project: 'Client Management System' },
]

export interface Deployment {
  id: string; project: string; environment: string; version: string; commit: string
  startedAt: string; duration: string; status: 'Queued' | 'Building' | 'Deploying' | 'Successful' | 'Failed' | 'Cancelled'
}

export const deployments: Deployment[] = [
  { id: 'd1', project: 'POS Management System', environment: 'Production', version: 'v2.4.1', commit: '8f92ac3', startedAt: '10:12 AM', duration: '2m 18s', status: 'Successful' },
  { id: 'd2', project: 'Client Management System', environment: 'Staging', version: 'v1.9.0-rc.2', commit: 'a13ef90', startedAt: '9:48 AM', duration: '1m 44s', status: 'Successful' },
  { id: 'd3', project: 'E-Commerce Platform', environment: 'Production', version: 'v3.1.0', commit: 'c02bb17', startedAt: '9:20 AM', duration: '—', status: 'Failed' },
  { id: 'd4', project: 'Developer Portfolio', environment: 'Production', version: 'v1.0.4', commit: '5e771fa', startedAt: 'Yesterday', duration: '58s', status: 'Successful' },
]

export interface GitStatusItem {
  project: string; repo: string; branch: string; clean: boolean
  modified: number; untracked: number; deleted: number; lastCommitMsg: string
  author: string; lastCommitAt: string; ahead: number; behind: number
}

export const gitStatuses: GitStatusItem[] = [
  { project: 'POS Management System', repo: 'acme/pos-system', branch: 'main', clean: true, modified: 0, untracked: 0, deleted: 0, lastCommitMsg: 'Fix authentication issue', author: 'j.mwangi', lastCommitAt: '2 minutes ago', ahead: 0, behind: 0 },
  { project: 'E-Commerce Platform', repo: 'acme/ecommerce', branch: 'develop', clean: false, modified: 3, untracked: 2, deleted: 1, lastCommitMsg: 'WIP: checkout redesign', author: 'a.otieno', lastCommitAt: '2 hours ago', ahead: 4, behind: 1 },
  { project: 'Client Management System', repo: 'acme/client-crm', branch: 'feature/invoices', clean: false, modified: 1, untracked: 0, deleted: 0, lastCommitMsg: 'Add PDF invoice export', author: 'j.mwangi', lastCommitAt: '18 minutes ago', ahead: 2, behind: 0 },
]

export interface Website {
  id: string; name: string; url: string; project: string
  status: SiteStatus; interval: string; expectedCode: number
  uptime24h: number; uptime7d: number; uptime30d: number; uptime90d: number
  responseMs: number; avgMs: number; minMs: number; maxMs: number
  sslDaysLeft: number; sslIssuer: string; sslExpiry: string
  domainDaysLeft: number; domainExpiry: string
}

export const websites: Website[] = [
  { id: 'w1', name: 'Portfolio Website', url: 'https://portfolio.example.com', project: 'Developer Portfolio', status: 'Online', interval: '5 minutes', expectedCode: 200, uptime24h: 100, uptime7d: 99.98, uptime30d: 99.98, uptime90d: 99.96, responseMs: 142, avgMs: 156, minMs: 98, maxMs: 340, sslDaysLeft: 65, sslIssuer: "Let's Encrypt", sslExpiry: 'October 28, 2026', domainDaysLeft: 113, domainExpiry: 'December 15, 2026' },
  { id: 'w2', name: 'POS Platform', url: 'https://pos.example.com', project: 'POS Management System', status: 'Online', interval: '1 minute', expectedCode: 200, uptime24h: 99.99, uptime7d: 99.97, uptime30d: 99.95, uptime90d: 99.92, responseMs: 184, avgMs: 190, minMs: 120, maxMs: 512, sslDaysLeft: 12, sslIssuer: "Let's Encrypt", sslExpiry: 'September 5, 2026', domainDaysLeft: 28, domainExpiry: 'September 21, 2026' },
  { id: 'w3', name: 'E-Commerce Website', url: 'https://shop.example.com', project: 'E-Commerce Platform', status: 'Slow', interval: '5 minutes', expectedCode: 200, uptime24h: 98.71, uptime7d: 98.91, uptime30d: 99.10, uptime90d: 99.30, responseMs: 890, avgMs: 610, minMs: 210, maxMs: 2100, sslDaysLeft: 172, sslIssuer: 'DigiCert', sslExpiry: 'February 12, 2027', domainDaysLeft: 240, domainExpiry: 'April 21, 2027' },
  { id: 'w4', name: 'Company Website', url: 'https://acme.example.com', project: 'Global', status: 'Online', interval: '10 minutes', expectedCode: 200, uptime24h: 100, uptime7d: 99.99, uptime30d: 99.99, uptime90d: 99.97, responseMs: 98, avgMs: 110, minMs: 80, maxMs: 260, sslDaysLeft: 200, sslIssuer: "Let's Encrypt", sslExpiry: 'March 10, 2027', domainDaysLeft: 300, domainExpiry: 'June 30, 2027' },
  { id: 'w5', name: 'Client CRM App', url: 'https://crm.example.com', project: 'Client Management System', status: 'Offline', interval: '1 minute', expectedCode: 200, uptime24h: 91.20, uptime7d: 97.40, uptime30d: 98.85, uptime90d: 99.10, responseMs: 0, avgMs: 240, minMs: 110, maxMs: 5000, sslDaysLeft: 5, sslIssuer: "Let's Encrypt", sslExpiry: 'August 29, 2026', domainDaysLeft: 60, domainExpiry: 'October 23, 2026' },
]

export const responseTimeHistory = [
  { t: '00:00', ms: 140 }, { t: '02:00', ms: 132 }, { t: '04:00', ms: 128 }, { t: '06:00', ms: 150 },
  { t: '08:00', ms: 210 }, { t: '10:00', ms: 260 }, { t: '12:00', ms: 300 }, { t: '14:00', ms: 245 },
  { t: '16:00', ms: 198 }, { t: '18:00', ms: 175 }, { t: '20:00', ms: 160 }, { t: '22:00', ms: 148 },
]

export interface Incident {
  id: string; website: string; startedAt: string; recoveredAt: string | null
  duration: string; error: string; status: 'Resolved' | 'Ongoing'
}

export const incidents: Incident[] = [
  { id: 'i1', website: 'Client CRM App', startedAt: 'Today, 10:42 AM', recoveredAt: null, duration: '38 minutes (ongoing)', error: 'Connection timeout', status: 'Ongoing' },
  { id: 'i2', website: 'E-Commerce Website', startedAt: 'Yesterday, 10:42 AM', recoveredAt: 'Yesterday, 10:49 AM', duration: '7 minutes', error: 'HTTP 503 Service Unavailable', status: 'Resolved' },
  { id: 'i3', website: 'POS Platform', startedAt: 'Aug 21, 3:12 AM', recoveredAt: 'Aug 21, 3:15 AM', duration: '3 minutes', error: 'HTTP 502 Bad Gateway', status: 'Resolved' },
  { id: 'i4', website: 'Portfolio Website', startedAt: 'Aug 18, 11:05 PM', recoveredAt: 'Aug 18, 11:07 PM', duration: '2 minutes', error: 'DNS resolution failed', status: 'Resolved' },
]

export interface LogEntry {
  time: string; level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'DEBUG'; source: string; message: string
}

export const logs: LogEntry[] = [
  { time: '12:42:18', level: 'INFO', source: 'pos-api', message: 'Server started on port 5173' },
  { time: '12:42:21', level: 'SUCCESS', source: 'pos-api', message: 'Database connected' },
  { time: '12:43:05', level: 'WARNING', source: 'ecommerce-worker', message: 'High memory usage detected (812MB)' },
  { time: '12:44:12', level: 'ERROR', source: 'ecommerce-platform', message: 'Build failed: module not found "stripe-sdk"' },
  { time: '12:45:02', level: 'INFO', source: 'monitor', message: 'Checked 5 websites — all reachable' },
  { time: '12:45:44', level: 'DEBUG', source: 'client-crm', message: 'Cache warmed for /dashboard route' },
  { time: '12:47:10', level: 'ERROR', source: 'monitor', message: 'crm.example.com — connection timeout after 10s' },
  { time: '12:48:00', level: 'SUCCESS', source: 'deploy', message: 'Deployment v2.4.1 completed for POS Management System' },
]

export interface Backup {
  id: string; project: string; createdAt: string; size: string; status: 'Completed' | 'In Progress' | 'Failed'
}

export const backups: Backup[] = [
  { id: 'b1', project: 'POS Management System', createdAt: 'August 24, 2026 — 06:00 AM', size: '245 MB', status: 'Completed' },
  { id: 'b2', project: 'Client Management System', createdAt: 'August 24, 2026 — 06:00 AM', size: '118 MB', status: 'Completed' },
  { id: 'b3', project: 'E-Commerce Platform', createdAt: 'August 23, 2026 — 06:00 AM', size: '390 MB', status: 'Completed' },
  { id: 'b4', project: 'Developer Portfolio', createdAt: 'August 22, 2026 — 06:00 AM', size: '32 MB', status: 'Completed' },
]

export interface NotificationItem {
  id: string; severity: 'critical' | 'warning' | 'success' | 'info'
  title: string; message: string; time: string; read: boolean
}

export const notifications: NotificationItem[] = [
  { id: 'n1', severity: 'critical', title: 'Website Offline', message: 'crm.example.com has been offline for 38 minutes.', time: '2 min ago', read: false },
  { id: 'n2', severity: 'warning', title: 'SSL Expiring Soon', message: 'pos.example.com SSL certificate expires in 12 days.', time: '1 hr ago', read: false },
  { id: 'n3', severity: 'success', title: 'Website Recovered', message: 'shop.example.com response time back to normal.', time: '3 hr ago', read: true },
  { id: 'n4', severity: 'info', title: 'Backup Completed', message: 'POS Management System backup finished (245 MB).', time: '6 hr ago', read: true },
  { id: 'n5', severity: 'warning', title: 'Domain Expiring', message: 'pos.example.com domain expires in 28 days.', time: '1 day ago', read: true },
]

export const recentActivity = [
  { icon: 'git', text: 'Git repository updated — POS Management System', time: '2 min ago' },
  { icon: 'deploy', text: 'Deployment completed — v2.4.1 to Production', time: '8 min ago' },
  { icon: 'docker', text: 'Docker container started — pos-api', time: '14 min ago' },
  { icon: 'down', text: 'Website went offline — crm.example.com', time: '38 min ago' },
  { icon: 'up', text: 'Website recovered — shop.example.com', time: '2 hr ago' },
  { icon: 'backup', text: 'Backup completed — Client Management System', time: '6 hr ago' },
  { icon: 'ssl', text: 'SSL certificate warning — pos.example.com (12 days left)', time: '1 hr ago' },
]
