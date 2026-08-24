import { PageHeader, Card } from '../components/ui'
import { websites } from '../data/demoData'

function statusFor(days: number) {
  if (days <= 14) return 'badge-offline'
  if (days <= 30) return 'badge-slow'
  return 'badge-online'
}

export default function Domains() {
  return (
    <div>
      <PageHeader title="Domains" description="Track domain registration expiry across your properties." />
      <Card className="!p-0 overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr><th>Domain</th><th>Expires</th><th>Days Remaining</th><th>Status</th></tr>
          </thead>
          <tbody>
            {websites.map((w) => (
              <tr key={w.id}>
                <td className="font-medium font-mono text-xs">{w.url.replace('https://', '')}</td>
                <td className="text-textSecondary">{w.domainExpiry}</td>
                <td>{w.domainDaysLeft} days</td>
                <td><span className={statusFor(w.domainDaysLeft)}>{w.domainDaysLeft <= 14 ? 'Urgent' : w.domainDaysLeft <= 30 ? 'Renew Soon' : 'Active'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
