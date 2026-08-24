import { PageHeader, Badge, Card } from '../components/ui'
import { projects } from '../data/demoData'
import { Plus, GitBranch, FolderCog } from 'lucide-react'

export default function Projects() {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Every development project you're managing, in one place."
        action={<button className="btn-primary"><Plus size={15} /> Add Project</button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((p) => (
          <Card key={p.id} className="flex flex-col gap-4 panel-hover">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-xs text-textSecondary mt-1 line-clamp-2">{p.description}</p>
              </div>
              <FolderCog size={16} className="text-textSecondary shrink-0" />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="badge-neutral">{s}</span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-borderc/60">
              <div>
                <div className="text-textSecondary mb-1">Status</div>
                <Badge status={p.status} />
              </div>
              <div>
                <div className="text-textSecondary mb-1">Local Server</div>
                <Badge status={p.serverStatus} />
              </div>
              <div>
                <div className="text-textSecondary mb-1 flex items-center gap-1"><GitBranch size={11} /> Branch</div>
                <div className="font-mono">{p.gitBranch}</div>
              </div>
              <div>
                <div className="text-textSecondary mb-1">Last Updated</div>
                <div>{p.lastActivity}</div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button className="btn-ghost flex-1 justify-center text-xs">Open</button>
              <button className="btn-ghost flex-1 justify-center text-xs">Configure</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
