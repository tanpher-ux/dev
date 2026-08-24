import { useState } from 'react'
import { PageHeader, Card } from '../components/ui'
import { logs } from '../data/demoData'
import { Search, Trash2 } from 'lucide-react'

const levelColor: Record<string, string> = {
  INFO: 'text-secondary', SUCCESS: 'text-success', WARNING: 'text-warning', ERROR: 'text-danger', DEBUG: 'text-textSecondary',
}

export default function Logs() {
  const [filter, setFilter] = useState('ALL')
  const levels = ['ALL', 'INFO', 'SUCCESS', 'WARNING', 'ERROR', 'DEBUG']
  const filtered = filter === 'ALL' ? logs : logs.filter((l) => l.level === filter)

  return (
    <div>
      <PageHeader title="Logs" description="Real-time logs across servers, Docker, deployments, and monitoring." />
      <Card className="!p-0">
        <div className="flex items-center justify-between gap-3 p-4 border-b border-borderc flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${filter === l ? 'bg-primary text-white' : 'bg-white/5 text-textSecondary hover:bg-white/10'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/5 border border-borderc rounded-lg px-2.5 py-1.5 w-52">
              <Search size={13} className="text-textSecondary" />
              <input placeholder="Search logs…" className="bg-transparent outline-none text-xs placeholder:text-textSecondary w-full" />
            </div>
            <button className="btn-ghost !px-2 !py-1.5"><Trash2 size={14} /></button>
          </div>
        </div>
        <div className="font-mono text-xs p-4 space-y-1.5 max-h-[520px] overflow-y-auto bg-black/20">
          {filtered.map((l, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-textSecondary shrink-0">{l.time}</span>
              <span className={`font-semibold shrink-0 w-16 ${levelColor[l.level]}`}>{l.level}</span>
              <span className="text-textSecondary shrink-0">[{l.source}]</span>
              <span>{l.message}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
