import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Workflow, 
  Database, 
  BarChart3, 
  Settings, 
  LogOut,
  Zap,
  BookOpen,
  Code,
  HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { blink } from '@/lib/blink'
import { Button } from '@/components/ui/button'

const navItems = [
  { icon: LayoutDashboard, label: "Vue d'ensemble", path: '/dashboard' },
  { icon: Workflow, label: 'Mes Workflows', path: '/workflows' },
  { icon: Database, label: 'Intégrations', path: '/integrations' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Paramètres', path: '/settings' },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 h-screen bg-background flex flex-col border-r border-white/5 hidden lg:flex">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-base font-display font-bold tracking-tight text-foreground block leading-tight">FlowBot <span className="text-primary">AI</span></span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-4 px-2">Menu Principal</p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-smooth group relative text-sm mb-1",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "w-4.5 h-4.5 transition-transform duration-200",
                isActive ? "text-primary" : "text-muted-foreground/60 group-hover:text-foreground"
              )} />
              <span>{item.label}</span>
            </Link>
          )
        })}

        <div className="pt-8">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-4 px-2">Ressources</p>
          {[
            { icon: BookOpen, label: 'Documentation', path: '/docs' },
            { icon: Code, label: 'API Reference', path: '/api-ref' },
            { icon: HelpCircle, label: 'Support', path: '/support' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-smooth text-sm mb-1"
            >
              <item.icon className="w-4.5 h-4.5 text-muted-foreground/60" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-primary/5 rounded-xl p-4 mb-4 border border-primary/10 relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-smooth" />
          <h4 className="text-xs font-bold mb-1">Passer à la version Pro</h4>
          <p className="text-[10px] text-muted-foreground mb-3 leading-relaxed">Automatisez sans limites et débloquez n8n expert.</p>
          <Button size="sm" className="w-full btn-primary text-[10px] h-7">Upgrade</Button>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl px-3 h-10 transition-smooth text-sm"
          onClick={() => blink.auth.signOut()}
        >
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </Button>
      </div>
    </aside>
  )
}
