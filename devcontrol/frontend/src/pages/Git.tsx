import { PageHeader, Card } from '../components/ui'
import { gitStatuses } from '../data/demoData'
import { GitBranch, RefreshCw, History, ExternalLink, CheckCircle2 } from 'lucide-react'

export default function Git() {
  return (
    <div>
      <PageHeader title="Git" description="Repository status across every project." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {gitStatuses.map((g) => (
          <Card key={g.project} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">{g.project}</h3>
              {g.clean ? (
                <span className="badge-online"><CheckCircle2 size={12} /> Clean</span>
              ) : (
                <span className="badge-slow">Changes</span>
              )}
            </div>
            <div className="text-xs text-textSecondary font-mono">{g.repo}</div>
            <div className="flex items-center gap-2 text-sm">
              <GitBranch size={14} className="text-textSecondary" />
              <span className="font-mono">{g.branch}</span>
              {(g.ahead > 0 || g.behind > 0) && (
                <span className="text-xs text-textSecondary">
                  {g.ahead > 0 && `↑${g.ahead}`} {g.behind > 0 && `↓${g.behind}`}
                </span>
              )}
            </div>
            {!g.clean && (
              <div className="flex gap-2 text-xs">
                {g.modified > 0 && <span className="badge-slow">{g.modified} Modified</span>}
                {g.untracked > 0 && <span className="badge-neutral">{g.untracked} Untracked</span>}
                {g.deleted > 0 && <span className="badge-offline">{g.deleted} Deleted</span>}
              </div>
            )}
            <div className="text-sm border-t border-borderc/60 pt-3">
              <div className="font-medium">{g.lastCommitMsg}</div>
              <div className="text-xs text-textSecondary mt-1">{g.author} · {g.lastCommitAt}</div>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost text-xs flex-1 justify-center"><RefreshCw size={13} /> Refresh</button>
              <button className="btn-ghost text-xs flex-1 justify-center"><History size={13} /> History</button>
              <button className="btn-ghost text-xs flex-1 justify-center"><ExternalLink size={13} /> Open</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
