import React, { useRef } from "react";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Users,
  Zap,
  Globe,
  Mail,
  Smartphone,
  Lock,
  Eye,
  Key
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/ui/badge";

export default function Settings() {
  const container = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useGSAP(() => {
    gsap.from(".set-card", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { scope: container });

  const handleSave = () => {
    toast.success("Paramètres enregistrés avec succès");
  };

  return (
    <div ref={container} className="p-6 max-w-5xl mx-auto space-y-8 animate-in">
      <div className="set-card">
        <h1 className="text-4xl font-display font-extrabold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground font-medium">Gérez votre compte, votre équipe et vos préférences d'automatisation.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="set-card bg-white/5 border border-white/10 rounded-2xl p-1 w-full md:w-auto overflow-x-auto justify-start backdrop-blur-md">
          <TabsTrigger value="profile" className="rounded-xl gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-bounce px-6">
            <User className="w-4 h-4" /> Profil
          </TabsTrigger>
          <TabsTrigger value="workspace" className="rounded-xl gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-bounce px-6">
            <Globe className="w-4 h-4" /> Workspace
          </TabsTrigger>
          <TabsTrigger value="team" className="rounded-xl gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-bounce px-6">
            <Users className="w-4 h-4" /> Équipe
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-bounce px-6">
            <Lock className="w-4 h-4" /> Sécurité
          </TabsTrigger>
          <TabsTrigger value="billing" className="rounded-xl gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-bounce px-6">
            <CreditCard className="w-4 h-4" /> Facturation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="set-card premium-glass border-white/5 overflow-hidden rounded-[2rem]">
            <CardHeader className="border-b border-white/5 bg-white/5 p-10">
              <CardTitle className="font-display text-2xl font-extrabold">Informations Personnelles</CardTitle>
              <CardDescription className="font-medium text-muted-foreground">Mettez à jour vos informations de contact et votre avatar.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-smooth" />
                  <Avatar className="w-24 h-24 border-2 border-primary/20 p-1 relative z-10 transition-bounce group-hover:scale-105">
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-extrabold">
                      {user?.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="rounded-xl border-white/10 font-bold hover:bg-white/5 transition-smooth">Changer l'avatar</Button>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">JPG, GIF ou PNG. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Nom complet</Label>
                  <Input id="name" defaultValue={user?.displayName} placeholder="Jean Dupont" className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-primary/50 transition-smooth font-bold" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                  <Input id="email" defaultValue={user?.email} placeholder="jean@exemple.com" className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-primary/50 transition-smooth font-bold" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Numéro de téléphone (WhatsApp)</Label>
                  <Input id="phone" placeholder="+33 6 00 00 00 00" className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-primary/50 transition-smooth font-bold" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="timezone" className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Fuseau horaire</Label>
                  <Input id="timezone" defaultValue="Europe/Paris (UTC+01:00)" className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-primary/50 transition-smooth font-bold" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="btn-primary rounded-xl px-8 h-12 font-bold transition-smooth hover:scale-105" onClick={handleSave}>Enregistrer</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspace" className="space-y-6">
          <Card className="set-card premium-glass border-white/5 overflow-hidden rounded-[2rem]">
            <CardHeader className="border-b border-white/5 bg-white/5 p-10">
              <CardTitle className="font-display text-2xl font-extrabold">Paramètres du Workspace</CardTitle>
              <CardDescription className="font-medium text-muted-foreground">Configuration globale pour vos automatisations FlowBot AI.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Signature Automatique</Label>
                    <p className="text-sm text-muted-foreground font-medium">Ajouter "Envoyé par FlowBot AI" à la fin de chaque message.</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Mode n8n Expert</Label>
                    <p className="text-sm text-muted-foreground font-medium">Accéder aux nœuds avancés et à l'édition directe du JSON n8n.</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Logs de Rétention</Label>
                    <p className="text-sm text-muted-foreground font-medium">Conserver les logs d'exécution pendant 90 jours (Plan Pro).</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Clé API de l'Espace de Travail</Label>
                <div className="flex gap-2">
                  <Input readOnly value="flw_live_8372hf92hf92h83hf2" className="bg-white/5 border-white/10 rounded-xl font-mono text-xs h-12 focus:border-primary/50 transition-smooth" />
                  <Button variant="outline" size="sm" className="rounded-xl border-white/10 font-bold transition-smooth hover:bg-white/5">Régénérer</Button>
                </div>
                <p className="text-xs text-muted-foreground font-medium">Utilisez cette clé pour vos webhooks entrants personnalisés.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="set-card premium-glass border-white/5 rounded-[2rem]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/5 p-10">
              <div>
                <CardTitle className="font-display text-2xl font-extrabold">Membres de l'Équipe</CardTitle>
                <CardDescription className="font-medium text-muted-foreground">Gérez qui a accès à vos workflows.</CardDescription>
              </div>
              <Button size="sm" className="btn-primary rounded-xl h-10 font-bold transition-smooth hover:scale-105">Inviter</Button>
            </CardHeader>
            <CardContent className="p-10">
              <div className="space-y-6">
                {[
                  { name: "Moi (Vous)", email: user?.email, role: "Propriétaire", initial: "M" },
                  { name: "Sophie Bernard", email: "sophie@agence.com", role: "Éditeur", initial: "S" },
                  { name: "Lucas Martin", email: "lucas@agence.com", role: "Opérateur", initial: "L" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-smooth">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border border-white/10">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                          {member.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-white/5 border-none font-bold text-[10px] uppercase px-3 py-1">
                      {member.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
