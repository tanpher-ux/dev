import { PageHeader, Badge, Card } from '../components/ui'
import { deployments } from '../data/demoData'

export default function Deployments() {
  return (
    <div>
      <PageHeader title="Deployments" description="Track every build and release across your projects." />
      <Card className="!p-0 overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              <th>Project</th><th>Environment</th><th>Version</th><th>Commit</th><th>Started</th><th>Duration</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deployments.map((d) => (
              <tr key={d.id}>
                <td className="font-medium">{d.project}</td>
                <td className="text-textSecondary">{d.environment}</td>
                <td className="font-mono text-xs">{d.version}</td>
                <td className="font-mono text-xs text-textSecondary">{d.commit}</td>
                <td className="text-textSecondary">{d.startedAt}</td>
                <td>{d.duration}</td>
                <td><Badge status={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
