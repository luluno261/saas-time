import React, { useState } from 'react'
import { blink } from '@/lib/blink'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

export function SignupForm({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await blink.auth.signUp({ 
        email, 
        password,
        displayName
      })
      toast.success('Compte créé avec succès !', {
        description: 'Bienvenue sur FlowBot AI.'
      })
    } catch (error: any) {
      toast.error(error.message || "Échec de l'inscription")
    } finally {
      setIsLoading(false)
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
        <CardTitle className="text-3xl font-display font-bold tracking-tight">Créer un compte</CardTitle>
        <CardDescription className="text-muted-foreground">Commencez à automatiser gratuitement pendant 14 jours.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSignup}>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="signup-name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nom complet</Label>
            <Input 
              id="signup-name" 
              placeholder="Jean Dupont" 
              className="bg-white/5 border-white/10 rounded-xl h-11 focus:border-primary/50 transition-smooth"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</Label>
            <Input 
              id="signup-email" 
              type="email" 
              placeholder="votre@email.com" 
              className="bg-white/5 border-white/10 rounded-xl h-11 focus:border-primary/50 transition-smooth"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mot de passe</Label>
            <Input 
              id="signup-password" 
              type="password" 
              placeholder="••••••••" 
              className="bg-white/5 border-white/10 rounded-xl h-11 focus:border-primary/50 transition-smooth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <div className="flex items-start gap-2 pt-2">
            <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-foreground leading-normal">
              En vous inscrivant, vous acceptez nos <strong>Conditions d'Utilisation</strong> et notre <strong>Politique de Confidentialité</strong>.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6 pt-4">
          <Button type="submit" className="w-full btn-primary h-11 rounded-xl font-bold shadow-glow transition-bounce" disabled={isLoading}>
            {isLoading ? 'Création...' : 'Démarrer l\'essai gratuit'}
          </Button>
          
          <p className="text-center text-sm text-muted-foreground pb-4">
            Déjà un compte ?{' '}
            <Button variant="link" className="px-0 font-bold text-primary hover:text-primary/80" onClick={onToggle}>Se connecter</Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}