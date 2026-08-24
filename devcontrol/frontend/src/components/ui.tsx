import { ReactNode } from 'react'

export function StatCard({
  label, value, sub, trend, icon,
}: { label: string; value: string; sub?: string; trend?: 'up' | 'down' | 'flat'; icon?: ReactNode }) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <span className="section-title">{label}</span>
        {icon && <span className="text-textSecondary">{icon}</span>}
      </div>
      <div className="text-2xl font-bold tracking-tight mt-1">{value}</div>
      {sub && (
        <div className={`text-xs mt-0.5 ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-textSecondary'}`}>
          {sub}
        </div>
      )}
    </div>
  )
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {description && <p className="text-sm text-textSecondary mt-1 max-w-2xl">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="panel flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 mb-4" />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-textSecondary max-w-sm mb-5">{description}</p>
      {action}
    </div>
  )
}

export function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    Running: 'bg-success', Online: 'bg-success', Active: 'bg-success', Successful: 'bg-success', Completed: 'bg-success',
    Slow: 'bg-warning', Starting: 'bg-warning', Development: 'bg-warning', Building: 'bg-warning', Deploying: 'bg-warning', Restarting: 'bg-warning',
    Stopped: 'bg-textSecondary', Paused: 'bg-textSecondary', Archived: 'bg-textSecondary', Queued: 'bg-textSecondary', Cancelled: 'bg-textSecondary',
    Offline: 'bg-danger', Error: 'bg-danger', Failed: 'bg-danger',
  }
  return <span className={`inline-block w-2 h-2 rounded-full ${map[status] ?? 'bg-textSecondary'}`} />
}

export function Badge({ status }: { status: string }) {
  const positive = ['Running', 'Online', 'Active', 'Successful', 'Completed', 'Valid', 'Resolved']
  const warning = ['Slow', 'Starting', 'Development', 'Building', 'Deploying', 'Restarting', 'Ongoing']
  const negative = ['Offline', 'Error', 'Failed']
  const cls = positive.includes(status) ? 'badge-online' : warning.includes(status) ? 'badge-slow' : negative.includes(status) ? 'badge-offline' : 'badge-neutral'
  return <span className={cls}><StatusDot status={status} />{status}</span>
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`panel p-5 ${className}`}>{children}</div>
}
