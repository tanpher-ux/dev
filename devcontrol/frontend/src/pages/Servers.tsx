import { PageHeader, Badge, Card } from '../components/ui'
import { projects } from '../data/demoData'
import { Play, Square, RotateCw, ScrollText } from 'lucide-react'

export default function Servers() {
  return (
    <div>
      <PageHeader title="Local Servers" description="Start, stop, and monitor your development servers." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {projects.map((p) => (
          <Card key={p.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">{p.name}</h3>
                <p className="text-xs text-textSecondary font-mono mt-0.5">Port {p.devPort}</p>
              </div>
              <Badge status={p.serverStatus} />
            </div>
            <div className="text-xs text-textSecondary font-mono bg-black/30 border border-borderc rounded-lg p-3">
              PID {1200 + Number(p.id.replace('p', ''))} · {p.localPath}
            </div>
            <div className="flex gap-2">
              {p.serverStatus === 'Running' ? (
                <button className="btn-danger text-xs flex-1 justify-center"><Square size={13} /> Stop</button>
              ) : (
                <button className="btn-primary text-xs flex-1 justify-center"><Play size={13} /> Start</button>
              )}
              <button className="btn-ghost text-xs flex-1 justify-center"><RotateCw size={13} /> Restart</button>
              <button className="btn-ghost text-xs flex-1 justify-center"><ScrollText size={13} /> Logs</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
