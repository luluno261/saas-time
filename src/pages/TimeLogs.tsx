import React, { useState, useRef } from "react";
import { 
  Database, 
  Plus, 
  Search, 
  MessageSquare, 
  Mail, 
  LayoutGrid as HubSpot, 
  Settings2, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Link2,
  Unlink,
  ExternalLink,
  ShieldCheck,
  Zap,
  LayoutGrid,
  Filter
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Integrations() {
  const container = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useGSAP(() => {
    gsap.from(".int-card", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
    });
  }, { scope: container, dependencies: [searchTerm] });

  const integrations = [
    { id: 1, provider: "WhatsApp Business", icon: MessageSquare, status: "connected", account: "+33 6 12 34 56 78", lastSync: "Il y a 5 min", color: "text-green-500", bg: "bg-green-500/10" },
    { id: 2, provider: "Gmail / Workspace", icon: Mail, status: "connected", account: "contact@entreprise.com", lastSync: "Il y a 12 min", color: "text-red-500", bg: "bg-red-500/10" },
    { id: 3, provider: "HubSpot CRM", icon: HubSpot, status: "disconnected", account: "Non connecté", lastSync: "-", color: "text-orange-500", bg: "bg-orange-500/10" },
    { id: 4, provider: "Notion", icon: Database, status: "connected", account: "Workspace Marketing", lastSync: "Il y a 1h", color: "text-zinc-500", bg: "bg-zinc-500/10" },
    { id: 5, provider: "Airtable", icon: Database, status: "error", account: "Invalid API Key", lastSync: "Hier", color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: 6, provider: "SendGrid", icon: Zap, status: "connected", account: "Transactional Email", lastSync: "Il y a 30 min", color: "text-primary", bg: "bg-primary/10" },
  ];

  const handleConnect = (name: string) => {
    toast.info(`Connexion à ${name}...`, {
      description: "Vous allez être redirigé vers l'authentification officielle."
    });
  };

  const filteredIntegrations = integrations.filter(int => 
    int.provider.toLowerCase().includes(searchTerm.toLowerCase()) || 
    int.account.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={container} className="p-6 space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 int-card">
        <div>
          <h1 className="text-4xl font-display font-extrabold tracking-tight">Intégrations</h1>
          <p className="text-muted-foreground">Connectez vos outils et canaux de communication préférés.</p>
        </div>
        <Button className="btn-primary rounded-xl h-10 shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une Intégration
        </Button>
      </div>

      {/* Integration Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="int-card premium-glass border-white/5 p-6 flex items-center gap-4 hover:border-primary/20 transition-smooth">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-3xl font-display font-extrabold">4</p>
            <p className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-widest">Connectées</p>
          </div>
        </Card>
        <Card className="int-card premium-glass border-white/5 p-6 flex items-center gap-4 hover:border-primary/20 transition-smooth">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center shadow-inner">
            <ShieldCheck className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-3xl font-display font-extrabold">1</p>
            <p className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-widest">En attente</p>
          </div>
        </Card>
        <Card className="int-card premium-glass border-white/5 p-6 flex items-center gap-4 hover:border-primary/20 transition-smooth">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shadow-inner">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-3xl font-display font-extrabold">1</p>
            <p className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-widest">En erreur</p>
          </div>
        </Card>
      </div>

      <div className="flex items-center gap-4 max-w-md group int-card">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-smooth" />
          <Input 
            placeholder="Rechercher une intégration..." 
            className="pl-10 bg-white/5 border-white/10 rounded-xl transition-smooth"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="rounded-xl border-white/10 h-10 w-10 shrink-0">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((int) => (
          <Card key={int.id} className="int-card premium-glass border-white/5 group hover:border-primary/20 transition-smooth overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${int.bg} flex items-center justify-center transition-bounce group-hover:scale-110 shadow-inner`}>
                  <int.icon className={`w-7 h-7 ${int.color}`} />
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    int.status === 'connected' ? "bg-green-500/10 text-green-500 border-none" :
                    int.status === 'error' ? "bg-red-500/10 text-red-500 border-none" :
                    "bg-zinc-500/10 text-zinc-500 border-none"
                  }
                >
                  <span className="w-1.5 h-1.5 rounded-full mr-2 bg-current" />
                  {int.status.toUpperCase()}
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl font-extrabold tracking-tight">{int.provider}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1 font-medium">
                <span className="truncate max-w-[180px]">{int.account}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground mb-6 px-1">
                <span>Dernière synchro</span>
                <span className="text-foreground">{int.lastSync}</span>
              </div>
              
              <div className="flex gap-2">
                {int.status === 'connected' ? (
                  <Button variant="outline" className="flex-1 rounded-xl border-white/10 hover:bg-red-500/10 hover:text-red-500 group/btn">
                    <Unlink className="w-4 h-4 mr-2" />
                    Déconnecter
                  </Button>
                ) : (
                  <Button className="flex-1 btn-primary rounded-xl" onClick={() => handleConnect(int.provider)}>
                    <Link2 className="w-4 h-4 mr-2" />
                    Connecter
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="rounded-xl bg-white/5">
                  <Settings2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Placeholder for new integration */}
        <Card className="int-card border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center p-8 group cursor-pointer hover:border-primary/50 transition-smooth rounded-2xl">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-smooth">
            <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-smooth" />
          </div>
          <p className="font-bold text-muted-foreground group-hover:text-foreground">Parcourir les connecteurs</p>
          <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-widest">50+ applications disponibles</p>
        </Card>
      </div>
    </div>
  );
}
