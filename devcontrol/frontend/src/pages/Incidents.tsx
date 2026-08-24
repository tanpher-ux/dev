import { PageHeader, Badge, Card } from '../components/ui'
import { incidents } from '../data/demoData'

export default function Incidents() {
  return (
    <div>
      <PageHeader title="Incidents" description="Complete downtime history for every monitored website." />
      <div className="space-y-4">
        {incidents.map((i) => (
          <Card key={i.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{i.website}</h3>
                <Badge status={i.status} />
              </div>
              <p className="text-xs text-textSecondary mt-1">{i.error}</p>
            </div>
            <div className="flex gap-6 text-xs">
              <div><div className="text-textSecondary mb-0.5">Started</div><div>{i.startedAt}</div></div>
              <div><div className="text-textSecondary mb-0.5">Recovered</div><div>{i.recoveredAt ?? '—'}</div></div>
              <div><div className="text-textSecondary mb-0.5">Duration</div><div>{i.duration}</div></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
