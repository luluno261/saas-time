import React, { useRef } from "react";
import { 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Workflow, 
  Activity, 
  MessageSquare, 
  MoreVertical,
  Play,
  Settings,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { toast } from "sonner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const data = [
  { name: "Lun", messages: 450, conversions: 12 },
  { name: "Mar", messages: 620, conversions: 18 },
  { name: "Mer", messages: 580, conversions: 15 },
  { name: "Jeu", messages: 890, conversions: 24 },
  { name: "Ven", messages: 720, conversions: 20 },
  { name: "Sam", messages: 340, conversions: 8 },
  { name: "Dim", messages: 280, conversions: 5 },
];

export default function Dashboard() {
  const container = useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  useGSAP(() => {
    gsap.from(".dash-card", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: container });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Données actualisées");
    }, 1000);
  };

  return (
    <div ref={container} className="p-6 space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 dash-card">
        <div>
          <h1 className="text-4xl font-display font-extrabold tracking-tight">Vue d'ensemble</h1>
          <p className="text-muted-foreground">Bienvenue sur votre centre de pilotage FlowBot AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="rounded-xl border-white/10 h-10">
            <Activity className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button className="btn-primary rounded-xl h-10 shadow-glow">
            <Zap className="w-4 h-4 mr-2" />
            Nouveau Workflow
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Messages Envoyés", value: "3,892", change: "+12.5%", icon: MessageSquare, color: "text-primary" },
          { label: "Taux de Succès", value: "99.4%", change: "+0.2%", icon: CheckCircle2, color: "text-green-500" },
          { label: "Heures Gagnées", value: "124h", change: "+8.4%", icon: Clock, color: "text-secondary" },
          { label: "Leads Qualifiés", value: "142", change: "+15.2%", icon: Workflow, color: "text-blue-500" },
        ].map((stat, i) => (
          <Card key={i} className="dash-card premium-glass border-white/5 overflow-hidden group hover:border-primary/20 transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-bounce group-hover:scale-110 shadow-inner`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-none font-bold text-[10px] rounded-full">
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-display font-extrabold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 dash-card premium-glass border-white/5 overflow-hidden">
          <CardHeader>
            <CardTitle className="font-display text-2xl font-extrabold">Activité des Workflows</CardTitle>
            <CardDescription className="font-medium">Volume de messages traités les 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.1)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                  />
                  <Tooltip 
                    contentStyle={{backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border) / 0.1)', borderRadius: '12px'}}
                    itemStyle={{color: 'hsl(var(--primary))'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorMessages)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dash-card premium-glass border-white/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-xl font-extrabold">Workflows Actifs</CardTitle>
              <Workflow className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { name: "Réponse Auto WA", status: "active", executions: 1240, color: "bg-primary" },
              { name: "Lead Nurturing Pro", status: "active", executions: 856, color: "bg-secondary" },
              { name: "Relance Panier", status: "paused", executions: 432, color: "bg-zinc-500" },
              { name: "Rappel RDV", status: "active", executions: 215, color: "bg-blue-500" },
            ].map((wf, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-smooth">
                <div className="flex items-center gap-4">
                  <div className={`w-2.5 h-2.5 rounded-full ${wf.status === 'active' ? 'animate-pulse ' + wf.color : 'bg-zinc-500'}`} />
                  <div>
                    <p className="text-sm font-bold group-hover:text-primary transition-smooth">{wf.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{wf.executions} exécutions</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <Play className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <Settings className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 border-white/10 rounded-xl h-10 text-xs">
              Voir tous les workflows
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="dash-card premium-glass border-white/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-display">Logs d'exécution récents</CardTitle>
              <CardDescription>Dernières actions automatisées en temps réel</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 rounded-xl">
              Voir tout <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest">Workflow</TableHead>
                <TableHead className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest">Déclencheur</TableHead>
                <TableHead className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest">Statut</TableHead>
                <TableHead className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest">Date/Heure</TableHead>
                <TableHead className="text-right text-muted-foreground font-bold text-[10px] uppercase tracking-widest">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Réponse Auto WA", trigger: "Nouv. Message", status: "success", time: "À l'instant" },
                { name: "Lead Nurturing Pro", trigger: "Inscription CRM", status: "success", time: "Il y a 5 min" },
                { name: "Relance Panier", trigger: "Cron 1h", status: "failed", time: "Il y a 12 min" },
                { name: "Rappel RDV", trigger: "Calendly Event", status: "success", time: "Il y a 24 min" },
                { name: "Réponse Auto WA", trigger: "Nouv. Message", status: "success", time: "Il y a 45 min" },
              ].map((log, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-smooth group">
                  <TableCell className="font-bold">{log.name}</TableCell>
                  <TableCell>
                    <Badge variant="ghost" className="bg-white/5 text-[10px] font-bold border-none uppercase tracking-tighter">
                      {log.trigger}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {log.status === 'success' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-green-500 font-medium">Réussi</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-destructive" />
                          <span className="text-xs text-destructive font-medium">Échec</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{log.time}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
