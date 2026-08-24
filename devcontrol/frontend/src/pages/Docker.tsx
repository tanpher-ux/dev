import { PageHeader, Badge, Card } from '../components/ui'
import { containers } from '../data/demoData'
import { Play, Square, RotateCw, Trash2, ScrollText } from 'lucide-react'

export default function Docker() {
  return (
    <div>
      <PageHeader title="Docker" description="Manage containers, images, and resources tied to your projects." />
      <Card className="!p-0 overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              <th>Container</th><th>Image</th><th>Project</th><th>Status</th><th>CPU</th><th>Memory</th><th>Port</th><th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {containers.map((c) => (
              <tr key={c.id}>
                <td className="font-medium">{c.name}</td>
                <td className="font-mono text-xs text-textSecondary">{c.image}</td>
                <td className="text-textSecondary">{c.project}</td>
                <td><Badge status={c.status} /></td>
                <td>{c.cpu}</td>
                <td>{c.memory}</td>
                <td className="font-mono text-xs">{c.port}</td>
                <td>
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-ghost !px-2 !py-1"><Play size={13} /></button>
                    <button className="btn-ghost !px-2 !py-1"><Square size={13} /></button>
                    <button className="btn-ghost !px-2 !py-1"><RotateCw size={13} /></button>
                    <button className="btn-ghost !px-2 !py-1"><ScrollText size={13} /></button>
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
