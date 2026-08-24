import { PageHeader, Card } from '../components/ui'
import { websites } from '../data/demoData'
import { ShieldCheck, ShieldAlert } from 'lucide-react'

function level(days: number) {
  if (days <= 7) return { label: 'Critical', cls: 'badge-offline' }
  if (days <= 14) return { label: 'Urgent', cls: 'badge-offline' }
  if (days <= 30) return { label: 'Warning', cls: 'badge-slow' }
  return { label: 'Valid', cls: 'badge-online' }
}

export default function Ssl() {
  return (
    <div>
      <PageHeader title="SSL Certificates" description="Certificate health and expiry tracking. Alerts at 30, 14, and 7 days." />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {websites.map((w) => {
          const lv = level(w.sslDaysLeft)
          return (
            <Card key={w.id} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm truncate">{w.name}</h3>
                {w.sslDaysLeft <= 14 ? <ShieldAlert size={16} className="text-warning shrink-0" /> : <ShieldCheck size={16} className="text-success shrink-0" />}
              </div>
              <span className={lv.cls + ' w-fit'}>{lv.label}</span>
              <div className="text-xs text-textSecondary">Issuer: {w.sslIssuer}</div>
              <div className="text-sm">Expires <span className="font-medium">{w.sslExpiry}</span></div>
              <div className="text-2xl font-bold">{w.sslDaysLeft}<span className="text-sm font-normal text-textSecondary"> days remaining</span></div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
