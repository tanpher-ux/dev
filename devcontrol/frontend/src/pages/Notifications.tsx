import { useState } from 'react'
import { PageHeader, Card } from '../components/ui'
import { notifications as initial } from '../data/demoData'
import { CheckCircle2, AlertTriangle, XCircle, Info, Trash2 } from 'lucide-react'

const sevIcon: Record<string, any> = { critical: XCircle, warning: AlertTriangle, success: CheckCircle2, info: Info }
const sevColor: Record<string, string> = { critical: 'text-danger', warning: 'text-warning', success: 'text-success', info: 'text-secondary' }

export default function Notifications() {
  const [items, setItems] = useState(initial)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? items : filter === 'unread' ? items.filter((i) => !i.read) : items.filter((i) => i.severity === filter)

  return (
    <div>
      <PageHeader title="Notifications" description="Alerts for downtime, recovery, SSL and domain expiry." />

      <Card className="mb-6">
        <h3 className="font-semibold text-sm mb-4">Notification Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="section-title mb-2">Alerts</div>
            {['Website Down', 'Website Recovery', 'Slow Response', 'SSL Expiry', 'Domain Expiry'].map((l) => (
              <label key={l} className="flex items-center gap-2 text-sm py-1.5">
                <input type="checkbox" defaultChecked className="accent-primary" /> {l}
              </label>
            ))}
          </div>
          <div>
            <div className="section-title mb-2">Channels</div>
            {['Email', 'WhatsApp'].map((l) => (
              <label key={l} className="flex items-center gap-2 text-sm py-1.5">
                <input type="checkbox" defaultChecked className="accent-primary" /> {l}
              </label>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex gap-1.5 mb-4">
        {['all', 'unread', 'critical', 'warning', 'success', 'info'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize ${filter === f ? 'bg-primary text-white' : 'bg-white/5 text-textSecondary hover:bg-white/10'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((n) => {
          const Icon = sevIcon[n.severity]
          return (
            <div key={n.id} className={`panel p-4 flex items-start gap-3 ${!n.read ? 'border-primary/40' : ''}`}>
              <Icon size={18} className={`shrink-0 mt-0.5 ${sevColor[n.severity]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{n.title}</h4>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </div>
                <p className="text-sm text-textSecondary mt-0.5">{n.message}</p>
                <p className="text-xs text-textSecondary mt-1">{n.time}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {!n.read && (
                  <button onClick={() => setItems((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))} className="btn-ghost !px-2 !py-1 text-xs">Mark read</button>
                )}
                <button onClick={() => setItems((prev) => prev.filter((x) => x.id !== n.id))} className="btn-ghost !px-2 !py-1"><Trash2 size={13} /></button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
