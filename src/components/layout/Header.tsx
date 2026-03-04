import React, { useState } from 'react'
import { Bell, Search, User, Zap, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { blink } from '@/lib/blink'

export function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      toast.info(`Recherche de "${searchQuery}"`, {
        description: 'La recherche globale arrive bientôt !'
      })
    }
  }

  const handleNotifications = () => {
    toast.info('Pas de nouvelles notifications', {
      description: 'Vous êtes à jour !'
    })
  }

  const handleProfile = () => {
    navigate('/settings')
  }

  const handleSubscription = () => {
    toast.info('Passer à la version Pro', {
      description: 'Fonctionnalités premium bientôt disponibles !'
    })
  }

  const handleUpgradePro = () => {
    toast.info('FlowBot AI Pro', {
      description: 'Débloquez les workflows illimités et le support prioritaire !'
    })
  }

  return (
    <header className="h-16 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
      <div className="flex-1 max-w-lg hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-smooth" />
          <Input 
            placeholder="Rechercher un workflow, un log..." 
            className="pl-10 bg-white/5 border-white/10 rounded-xl h-10 text-sm focus-visible:ring-1 focus-visible:ring-primary/20 transition-smooth"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/5" onClick={handleNotifications}>
          <Bell className="w-5 h-5 text-muted-foreground" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 p-1 pr-3 rounded-xl hover:bg-white/5 transition-smooth">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/10 shadow-soft">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-xs font-bold text-primary">{user?.displayName?.[0] || 'U'}</span>
                )}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-bold leading-none mb-1">{user?.displayName}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Admin</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl glass border-white/10 shadow-xl mt-2 p-2">
            <DropdownMenuLabel className="font-display font-bold px-2 py-1.5">Mon Compte</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="rounded-lg text-sm focus:bg-white/5 gap-3 py-2 cursor-pointer transition-smooth" onClick={handleProfile}>
              <User className="w-4 h-4 text-muted-foreground" /> Profil
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg text-sm focus:bg-white/5 gap-3 py-2 cursor-pointer transition-smooth" onClick={handleSubscription}>
              <Zap className="w-4 h-4 text-muted-foreground" /> Facturation
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem 
              className="rounded-lg text-sm text-destructive focus:bg-destructive/10 gap-3 py-2 cursor-pointer transition-smooth"
              onClick={() => blink.auth.signOut()}
            >
              <LogOut className="w-4 h-4" /> Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="sm" className="hidden sm:flex rounded-xl gap-2 h-10 px-5 font-bold btn-primary transition-bounce" onClick={handleUpgradePro}>
          <Sparkles className="w-4 h-4" />
          Pro
        </Button>
      </div>
    </header>
  )
}
