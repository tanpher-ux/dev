import { PageHeader, Badge, Card } from '../components/ui'
import { backups, projects } from '../data/demoData'
import { Download, Trash2, RotateCcw, Plus } from 'lucide-react'

export default function Backups() {
  return (
    <div>
      <PageHeader
        title="Backups"
        description="Create, restore, and manage backups for your projects. Secrets and credentials are excluded by default."
        action={<button className="btn-primary"><Plus size={15} /> Create Backup</button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {projects.slice(0, 4).map((p) => (
          <div key={p.id} className="panel px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium">{p.name}</span>
            <button className="btn-ghost text-xs">Backup Now</button>
          </div>
        ))}
      </div>
      <Card className="!p-0 overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr><th>Project</th><th>Created</th><th>Size</th><th>Status</th><th className="text-right">Actions</th></tr>
          </thead>
          <tbody>
            {backups.map((b) => (
              <tr key={b.id}>
                <td className="font-medium">{b.project}</td>
                <td className="text-textSecondary">{b.createdAt}</td>
                <td>{b.size}</td>
                <td><Badge status={b.status} /></td>
                <td>
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-ghost !px-2 !py-1"><Download size={13} /></button>
                    <button className="btn-ghost !px-2 !py-1"><RotateCcw size={13} /></button>
                    <button className="btn-danger !px-2 !py-1"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
