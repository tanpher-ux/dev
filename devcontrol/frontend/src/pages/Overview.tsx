import { StatCard, PageHeader, Card, Badge } from '../components/ui'
import { projects, containers, deployments, websites, recentActivity } from '../data/demoData'
import { GitBranch, Rocket, Container as ContainerIcon, ArrowDownCircle, ArrowUpCircle, Archive, ShieldAlert, FolderGit2, Server, Globe } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { responseTimeHistory } from '../data/demoData'

const iconMap: Record<string, any> = {
  git: GitBranch, deploy: Rocket, docker: ContainerIcon, down: ArrowDownCircle, up: ArrowUpCircle, backup: Archive, ssl: ShieldAlert,
}

export default function Overview() {
  const runningServers = projects.filter((p) => p.serverStatus === 'Running').length
  const runningContainers = containers.filter((c) => c.status === 'Running').length
  const activeDeployments = deployments.filter((d) => d.status === 'Deploying' || d.status === 'Building').length || 3
  const online = websites.filter((w) => w.status === 'Online').length
  const offline = websites.filter((w) => w.status === 'Offline').length
  const avgUptime = (websites.reduce((a, w) => a + w.uptime30d, 0) / websites.length).toFixed(2)

  return (
    <div>
      <PageHeader title="Overview" description="A single view of your development environment and live websites." />

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
        <StatCard label="Projects" value={String(projects.length)} icon={<FolderGit2 size={15} />} />
        <StatCard label="Local Servers" value={`${runningServers} Running`} icon={<Server size={15} />} trend="up" />
        <StatCard label="Docker Containers" value={`${runningContainers} Running`} icon={<ContainerIcon size={15} />} trend="up" />
        <StatCard label="Deployments" value={`${activeDeployments} Active`} icon={<Rocket size={15} />} />
        <StatCard label="Websites" value={String(websites.length)} icon={<Globe size={15} />} />
        <StatCard label="Online" value={String(online)} sub={`${online}/${websites.length} sites`} trend="up" />
        <StatCard label="Offline" value={String(offline)} trend={offline > 0 ? 'down' : 'flat'} />
        <StatCard label="Average Uptime" value={`${avgUptime}%`} trend="up" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Response Time — Last 24 Hours</h3>
              <span className="text-xs text-textSecondary">Avg 184ms</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={responseTimeHistory}>
                <XAxis dataKey="t" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} width={40} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="ms" stroke="#2563EB" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="font-semibold text-sm mb-4">Development Activity</h3>
            <div className="space-y-3">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-sm border-b border-borderc/60 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{p.name}</div>
                    <div className="text-xs text-textSecondary">{p.stack.join(' · ')} · {p.gitBranch}</div>
                  </div>
                  <Badge status={p.serverStatus} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-sm mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((a, i) => {
                const Icon = iconMap[a.icon]
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-borderc flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={13} className="text-textSecondary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm leading-snug">{a.text}</div>
                      <div className="text-xs text-textSecondary mt-0.5">{a.time}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-sm mb-4">Website Monitoring Snapshot</h3>
            <div className="space-y-3">
              {websites.map((w) => (
                <div key={w.id} className="flex items-center justify-between text-sm">
                  <span className="truncate">{w.name}</span>
                  <Badge status={w.status} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
