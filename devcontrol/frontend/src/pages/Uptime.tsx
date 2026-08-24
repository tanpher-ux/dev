import { PageHeader, StatCard, Badge, Card } from '../components/ui'
import { websites, incidents } from '../data/demoData'

export default function Uptime() {
  const avgUptime = (websites.reduce((a, w) => a + w.uptime30d, 0) / websites.length).toFixed(2)
  const online = websites.filter((w) => w.status !== 'Offline').length
  const activeIncidents = incidents.filter((i) => i.status === 'Ongoing').length
  const avgResponse = Math.round(websites.reduce((a, w) => a + w.responseMs, 0) / websites.length)

  return (
    <div>
      <PageHeader title="Uptime" description="Overall reliability across every monitored website." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Average Uptime" value={`${avgUptime}%`} trend="up" />
        <StatCard label="Websites Online" value={`${online} / ${websites.length}`} />
        <StatCard label="Active Incidents" value={String(activeIncidents)} trend={activeIncidents ? 'down' : 'flat'} />
        <StatCard label="Average Response Time" value={`${avgResponse}ms`} />
      </div>

      <Card className="!p-0 overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr><th>Website</th><th>Status</th><th>24 Hours</th><th>7 Days</th><th>30 Days</th><th>90 Days</th></tr>
          </thead>
          <tbody>
            {websites.map((w) => (
              <tr key={w.id}>
                <td className="font-medium">{w.name}</td>
                <td><Badge status={w.status} /></td>
                <td>{w.uptime24h}%</td>
                <td>{w.uptime7d}%</td>
                <td>{w.uptime30d}%</td>
                <td>{w.uptime90d}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
