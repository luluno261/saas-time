import React from "react";
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

export default function Settings() {
  const { user } = useAuth();

  const handleSave = () => {
    toast.success("Paramètres enregistrés avec succès");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Gérez votre compte, votre équipe et vos préférences d'automatisation.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 rounded-xl p-1 w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="profile" className="rounded-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <User className="w-4 h-4" /> Profil
          </TabsTrigger>
          <TabsTrigger value="workspace" className="rounded-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Globe className="w-4 h-4" /> Workspace
          </TabsTrigger>
          <TabsTrigger value="team" className="rounded-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Users className="w-4 h-4" /> Équipe
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Lock className="w-4 h-4" /> Sécurité
          </TabsTrigger>
          <TabsTrigger value="billing" className="rounded-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <CreditCard className="w-4 h-4" /> Facturation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="glass border-white/5 overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="font-display">Informations Personnelles</CardTitle>
              <CardDescription>Mettez à jour vos informations de contact et votre avatar.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border-2 border-primary/20 p-1">
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                    {user?.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="rounded-xl border-white/10">Changer l'avatar</Button>
                  <p className="text-xs text-muted-foreground">JPG, GIF ou PNG. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" defaultValue={user?.displayName} placeholder="Jean Dupont" className="bg-white/5 border-white/10 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user?.email} placeholder="jean@exemple.com" className="bg-white/5 border-white/10 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone (WhatsApp)</Label>
                  <Input id="phone" placeholder="+33 6 00 00 00 00" className="bg-white/5 border-white/10 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Input id="timezone" defaultValue="Europe/Paris (UTC+01:00)" className="bg-white/5 border-white/10 rounded-xl" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="btn-primary rounded-xl px-8" onClick={handleSave}>Enregistrer</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspace" className="space-y-6">
          <Card className="glass border-white/5 overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="font-display">Paramètres du Workspace</CardTitle>
              <CardDescription>Configuration globale pour vos automatisations FlowBot AI.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <Label className="text-base">Signature Automatique</Label>
                    <p className="text-sm text-muted-foreground">Ajouter "Envoyé par FlowBot AI" à la fin de chaque message.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <Label className="text-base">Mode n8n Expert</Label>
                    <p className="text-sm text-muted-foreground">Accéder aux nœuds avancés et à l'édition directe du JSON n8n.</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <Label className="text-base">Logs de Rétention</Label>
                    <p className="text-sm text-muted-foreground">Conserver les logs d'exécution pendant 90 jours (Plan Pro).</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Clé API de l'Espace de Travail</Label>
                <div className="flex gap-2">
                  <Input readOnly value="flw_live_8372hf92hf92h83hf2" className="bg-white/5 border-white/10 rounded-xl font-mono text-xs" />
                  <Button variant="outline" size="sm" className="rounded-xl border-white/10">Régénérer</Button>
                </div>
                <p className="text-xs text-muted-foreground">Utilisez cette clé pour vos webhooks entrants personnalisés.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="glass border-white/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-display">Membres de l'Équipe</CardTitle>
                <CardDescription>Gérez qui a accès à vos workflows.</CardDescription>
              </div>
              <Button size="sm" className="btn-primary rounded-xl">Inviter</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Moi (Vous)", email: user?.email, role: "Propriétaire", initial: "M" },
                  { name: "Sophie Bernard", email: "sophie@agence.com", role: "Éditeur", initial: "S" },
                  { name: "Lucas Martin", email: "lucas@agence.com", role: "Opérateur", initial: "L" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-xl transition-smooth">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10 border border-white/10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                          {member.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-white/5 border-none font-bold text-[10px] uppercase">
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