import { TerminalSquare } from 'lucide-react'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow mb-3">
            <TerminalSquare size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">DevControl</h1>
          <p className="text-sm text-textSecondary mt-1">Manage Your Code. Monitor Your Web.</p>
        </div>
        <div className="panel p-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-textSecondary mb-1.5 block">Email</label>
              <input className="w-full bg-white/5 border border-borderc rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" placeholder="you@company.com" />
            </div>
            <div>
              <label className="text-xs text-textSecondary mb-1.5 block">Password</label>
              <input type="password" className="w-full bg-white/5 border border-borderc rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" placeholder="••••••••" />
            </div>
            <button className="btn-primary w-full justify-center py-2">Sign In</button>
          </div>
          <div className="text-center text-xs text-textSecondary mt-4">
            Don't have an account? <span className="text-primary cursor-pointer">Create one</span>
          </div>
        </div>
      </div>
    </div>
  )
}
