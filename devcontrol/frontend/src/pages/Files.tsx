import { useState } from 'react'
import { PageHeader, Card } from '../components/ui'
import { projects } from '../data/demoData'
import { Folder, FileText, Search } from 'lucide-react'

const tree = [
  { name: 'src', type: 'dir' },
  { name: 'public', type: 'dir' },
  { name: 'components', type: 'dir' },
  { name: 'assets', type: 'dir' },
  { name: 'tests', type: 'dir' },
  { name: 'package.json', type: 'file' },
  { name: 'README.md', type: 'file' },
  { name: '.gitignore', type: 'file' },
]

export default function Files() {
  const [active, setActive] = useState(projects[0].id)
  const project = projects.find((p) => p.id === active)!

  return (
    <div>
      <PageHeader title="Project Files" description="Browse authorized project directories securely." />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <Card className="lg:col-span-1 !p-3">
          <div className="section-title px-1 mb-2">Projects</div>
          <div className="space-y-1">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg truncate ${active === p.id ? 'bg-primary/15 text-primary' : 'hover:bg-white/5 text-textSecondary'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-textSecondary font-mono">{project.localPath}/</div>
            <div className="flex items-center gap-2 bg-white/5 border border-borderc rounded-lg px-2.5 py-1.5 w-56">
              <Search size={13} className="text-textSecondary" />
              <input placeholder="Search files…" className="bg-transparent outline-none text-xs placeholder:text-textSecondary w-full" />
            </div>
          </div>
          <div className="space-y-1">
            {tree.map((item) => (
              <div key={item.name} className="flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
                {item.type === 'dir' ? <Folder size={15} className="text-primary" /> : <FileText size={15} className="text-textSecondary" />}
                <span className="font-mono">{item.name}</span>
                {item.type === 'dir' && <span className="text-xs text-textSecondary">/</span>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
