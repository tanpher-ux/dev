import { useState } from 'react'
import { PageHeader, Card } from '../components/ui'
import { websites, responseTimeHistory } from '../data/demoData'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const ranges = ['24 Hours', '7 Days', '30 Days', '90 Days']

export default function Performance() {
  const [range, setRange] = useState('24 Hours')
  const [site, setSite] = useState(websites[0].id)
  const w = websites.find((s) => s.id === site)!

  return (
    <div>
      <PageHeader title="Performance" description="Response-time history and trends for your monitored websites." />

      <Card>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <select value={site} onChange={(e) => setSite(e.target.value)} className="bg-white/5 border border-borderc rounded-lg px-3 py-1.5 text-sm outline-none">
            {websites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <div className="flex gap-1.5">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${range === r ? 'bg-primary text-white' : 'bg-white/5 text-textSecondary hover:bg-white/10'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={responseTimeHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="t" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} width={40} unit="ms" />
            <Tooltip contentStyle={{ background: '#111827', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="ms" stroke="#0EA5E9" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-borderc/60 text-center">
          <div><div className="text-xs text-textSecondary mb-1">Current</div><div className="font-semibold">{w.responseMs}ms</div></div>
          <div><div className="text-xs text-textSecondary mb-1">Average</div><div className="font-semibold">{w.avgMs}ms</div></div>
          <div><div className="text-xs text-textSecondary mb-1">Minimum</div><div className="font-semibold">{w.minMs}ms</div></div>
          <div><div className="text-xs text-textSecondary mb-1">Maximum</div><div className="font-semibold">{w.maxMs}ms</div></div>
        </div>
      </Card>
    </div>
  )
}
