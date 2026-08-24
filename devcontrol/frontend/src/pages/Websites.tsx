import { PageHeader, Badge, Card } from '../components/ui'
import { websites } from '../data/demoData'
import { Plus, ExternalLink } from 'lucide-react'

export default function Websites() {
  return (
    <div>
      <PageHeader
        title="Websites"
        description="Every site you're monitoring for uptime, performance, SSL, and domain expiry."
        action={<button className="btn-primary"><Plus size={15} /> Add Website</button>}
      />

      <Card className="mb-6">
        <h3 className="font-semibold text-sm mb-4">Add Website</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input placeholder="Website Name" className="bg-white/5 border border-borderc rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
          <input placeholder="https://example.com" className="bg-white/5 border border-borderc rounded-lg px-3 py-2 text-sm outline-none focus:border-primary md:col-span-2" />
          <select className="bg-white/5 border border-borderc rounded-lg px-3 py-2 text-sm outline-none focus:border-primary">
            <option>Every 1 minute</option>
            <option>Every 5 minutes</option>
            <option>Every 10 minutes</option>
            <option>Every 30 minutes</option>
          </select>
        </div>
        <button className="btn-primary mt-3">Add Website</button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {websites.map((w) => (
          <Card key={w.id} className="flex flex-col gap-4 panel-hover">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{w.name}</h3>
                <a className="text-xs text-secondary flex items-center gap-1 mt-1 truncate">
                  {w.url} <ExternalLink size={11} />
                </a>
              </div>
              <Badge status={w.status} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-borderc/60">
              <div>
                <div className="text-textSecondary mb-1">Response</div>
                <div className="font-semibold">{w.status === 'Offline' ? '—' : `${w.responseMs}ms`}</div>
              </div>
              <div>
                <div className="text-textSecondary mb-1">30d Uptime</div>
                <div className="font-semibold">{w.uptime30d}%</div>
              </div>
              <div>
                <div className="text-textSecondary mb-1">SSL</div>
                <div className={`font-semibold ${w.sslDaysLeft <= 14 ? 'text-warning' : ''}`}>{w.sslDaysLeft}d</div>
              </div>
            </div>
            <div className="text-xs text-textSecondary">Checks every {w.interval} · Project: {w.project}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}
