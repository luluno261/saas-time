import React, { useState } from 'react'
import { blink } from '@/lib/blink'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap } from 'lucide-react'
import { toast } from 'sonner'

export function LoginForm({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await blink.auth.signInWithEmail(email, password)
      toast.success('Ravi de vous revoir !')
    } catch (error: any) {
      toast.error(error.message || 'Échec de la connexion')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Veuillez entrer votre adresse email d'abord")
      return
    }
    setIsResetting(true)
    try {
      await blink.auth.sendPasswordResetEmail(email)
      toast.success('Email de réinitialisation envoyé !', {
        description: 'Vérifiez votre boîte de réception.'
      })
    } catch (error: any) {
      toast.error(error.message || "Échec de l'envoi de l'email")
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto glass border-white/10 shadow-2xl p-2 rounded-2xl overflow-hidden animate-in">
      <CardHeader className="space-y-2 text-center pb-8">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-glow transition-bounce hover:scale-110">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-3xl font-display font-bold tracking-tight">FlowBot <span className="text-primary">AI</span></CardTitle>
        <CardDescription className="text-muted-foreground">Entrez vos identifiants pour accéder à vos automatisations.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="votre@email.com" 
              className="bg-white/5 border-white/10 rounded-xl h-11 focus:border-primary/50 transition-smooth"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mot de passe</Label>
              <Button 
                variant="link" 
                type="button"
                className="px-0 font-medium h-auto text-xs text-primary hover:text-primary/80" 
                onClick={handleForgotPassword}
                disabled={isResetting}
              >
                {isResetting ? 'Envoi...' : 'Mot de passe oublié ?'}
              </Button>
            </div>
            <Input 
              id="password" 
              type="password" 
              className="bg-white/5 border-white/10 rounded-xl h-11 focus:border-primary/50 transition-smooth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6 pt-4">
          <Button type="submit" className="w-full btn-primary h-11 rounded-xl font-bold shadow-glow transition-bounce" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </Button>
          
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
              <span className="bg-[#0A0A0F] px-3 text-muted-foreground">Ou continuer avec</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" type="button" className="rounded-xl border-white/10 hover:bg-white/5 h-11" onClick={() => blink.auth.signInWithGoogle()}>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-3.27 3.28-8.11 3.28-13.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </Button>
            <Button variant="outline" type="button" className="rounded-xl border-white/10 hover:bg-white/5 h-11" onClick={() => blink.auth.signInWithGitHub()}>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.082.814-.26.814-.577 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground pb-4">
            Pas encore de compte ?{' '}
            <Button variant="link" className="px-0 font-bold text-primary hover:text-primary/80" onClick={onToggle}>S'inscrire</Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}