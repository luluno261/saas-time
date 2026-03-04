import React, { useState, useRef } from "react";
import { 
  Workflow, 
  Plus, 
  Search, 
  MoreVertical, 
  Play, 
  Pause, 
  Settings2, 
  Trash2, 
  ExternalLink,
  Zap,
  MessageSquare,
  Mail,
  Users,
  Grid,
  List,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Workflows() {
  const container = useRef<HTMLDivElement>(null);
  const [viewMode, setViewViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchQuery] = useState("");

  useGSAP(() => {
    gsap.from(".wf-card", {
      scale: 0.95,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
    });
  }, { scope: container, dependencies: [viewMode, searchTerm] });

  const handleToggleStatus = (name: string, current: string) => {
    toast.success(`Workflow "${name}" ${current === 'active' ? 'mis en pause' : 'activé'}`);
  };

  const workflows = [
    { id: 1, name: "Réponse Auto WhatsApp", desc: "Répond aux nouveaux messages entrants sur WhatsApp Business.", trigger: "Nouv. Message", type: "WhatsApp", status: "active", executions: 1240, color: "text-green-500", bg: "bg-green-500/10" },
    { id: 2, name: "Séquence Welcome Email", desc: "Envoie un email de bienvenue 5 min après l'inscription.", trigger: "CRM Event", type: "Email", status: "active", executions: 856, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: 3, name: "Relance Panier Abandonné", desc: "Relance via WhatsApp après 1h d'inactivité.", trigger: "Cron 1h", type: "Sales", status: "paused", executions: 432, color: "text-orange-500", bg: "bg-orange-500/10" },
    { id: 4, name: "Sync HubSpot / Notion", desc: "Synchronise les nouveaux leads HubSpot vers Notion.", trigger: "Webhook", type: "CRM", status: "active", executions: 3120, color: "text-purple-500", bg: "bg-purple-500/10" },
    { id: 5, name: "Rappel RDV Calendly", desc: "Envoie un rappel WhatsApp 1h avant chaque RDV.", trigger: "Cron 30m", type: "Support", status: "active", executions: 215, color: "text-primary", bg: "bg-primary/10" },
    { id: 6, name: "Auto-Tag Support", desc: "Tag automatiquement les conversations selon les mots-clés.", trigger: "Nouv. Message", type: "Support", status: "draft", executions: 0, color: "text-zinc-500", bg: "bg-zinc-500/10" },
  ];

  const filteredWorkflows = workflows.filter(wf => 
    wf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    wf.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={container} className="p-6 space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 wf-card">
        <div>
          <h1 className="text-4xl font-display font-extrabold tracking-tight">Mes Workflows</h1>
          <p className="text-muted-foreground">Gérez et automatisez vos processus en quelques clics.</p>
        </div>
        <Button className="btn-primary rounded-xl h-10 shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Créer un Workflow
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-smooth" />
            <Input 
              placeholder="Rechercher un workflow..." 
              className="pl-10 bg-white/5 border-white/10 rounded-xl transition-smooth"
              value={searchTerm}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl border-white/10 h-10 w-10 shrink-0">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <Tabs defaultValue="grid" onValueChange={(v) => setViewViewMode(v as any)} className="w-auto">
          <TabsList className="bg-white/5 border border-white/10 rounded-xl p-1">
            <TabsTrigger value="grid" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth">
              <Grid className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="list" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth">
              <List className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredWorkflows.map((wf) => (
          <Card key={wf.id} className={`wf-card premium-glass border-white/5 group hover:border-primary/20 transition-smooth relative overflow-hidden ${viewMode === 'list' ? 'flex flex-row items-center p-4 py-3' : ''}`}>
            {viewMode === 'grid' && (
              <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-smooth`}>
                <Workflow className="w-24 h-24" />
              </div>
            )}
            
            <CardHeader className={viewMode === 'list' ? 'p-0 flex-1' : ''}>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className={`${wf.bg} ${wf.color} border-none font-bold text-[10px] uppercase tracking-widest`}>
                  {wf.type}
                </Badge>
                {viewMode === 'grid' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 glass border-white/10 rounded-xl p-2">
                      <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer transition-smooth">
                        <Settings2 className="w-4 h-4" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer transition-smooth">
                        <ExternalLink className="w-4 h-4" /> Voir Logs
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/5" />
                      <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer text-destructive focus:bg-destructive/10 transition-smooth">
                        <Trash2 className="w-4 h-4" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <CardTitle className={`font-display text-xl ${viewMode === 'list' ? 'text-lg' : ''}`}>{wf.name}</CardTitle>
              <CardDescription className={viewMode === 'list' ? 'hidden sm:block' : 'line-clamp-2 mt-2'}>
                {wf.desc}
              </CardDescription>
            </CardHeader>

            <CardContent className={viewMode === 'list' ? 'p-0 flex items-center gap-8' : 'mt-6'}>
              <div className={viewMode === 'list' ? 'flex gap-8 min-w-[300px]' : 'flex items-center justify-between'}>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-widest mb-1">Trigger</span>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className="text-sm font-bold">{wf.trigger}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-widest mb-1">Executions</span>
                  <span className="text-sm font-bold">{wf.executions.toLocaleString()}</span>
                </div>
              </div>

              <div className={`flex items-center gap-3 ${viewMode === 'list' ? 'ml-auto' : 'mt-8'}`}>
                <Button 
                  variant="ghost" 
                  size={viewMode === 'list' ? 'sm' : 'default'} 
                  className={`flex-1 rounded-xl gap-2 font-bold ${wf.status === 'active' ? 'text-orange-500 hover:bg-orange-500/10' : 'text-primary hover:bg-primary/10'}`}
                  onClick={() => handleToggleStatus(wf.name, wf.status)}
                >
                  {wf.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {wf.status === 'active' ? 'Pause' : 'Activer'}
                </Button>
                <Button variant="outline" size={viewMode === 'list' ? 'sm' : 'default'} className="flex-1 rounded-xl border-white/10 hover:bg-white/5">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
