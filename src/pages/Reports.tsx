import React, { useState, useRef } from "react";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  ChevronDown, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  Mail, 
  MousePointer2, 
  UserPlus,
  RefreshCcw,
  Zap,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const performanceData = [
  { name: "Lun", sent: 450, opened: 320, clicked: 180 },
  { name: "Mar", sent: 620, opened: 480, clicked: 240 },
  { name: "Mer", sent: 580, opened: 410, clicked: 210 },
  { name: "Jeu", sent: 890, opened: 650, clicked: 320 },
  { name: "Ven", sent: 720, opened: 540, clicked: 280 },
  { name: "Sam", sent: 340, opened: 210, clicked: 95 },
  { name: "Dim", sent: 280, opened: 150, clicked: 60 },
];

const channelData = [
  { name: "WhatsApp", value: 65, color: "hsl(var(--primary))" },
  { name: "Email", value: 25, color: "hsl(var(--secondary))" },
  { name: "Webhooks", value: 10, color: "hsl(var(--muted-foreground))" },
];

export default function Analytics() {
  const container = useRef<HTMLDivElement>(null);
  const [timeRange, setTimeRange] = useState("7d");

  useGSAP(() => {
    gsap.from(".ana-card", {
      scale: 0.98,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: container });

  const handleExport = () => {
    toast.success("Rapport exporté au format PDF");
  };

  return (
    <div ref={container} className="p-6 space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ana-card">
        <div>
          <h1 className="text-4xl font-display font-extrabold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Analysez la performance de vos automatisations en temps réel.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="7d" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] rounded-xl border-white/10 bg-white/5 h-10">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent className="glass border-white/10 rounded-xl">
              <SelectItem value="24h">Dernières 24h</SelectItem>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">90 derniers jours</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleExport} className="rounded-xl border-white/10 h-10">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Envoyé", value: "3,892", trend: "+12%", color: "text-primary", icon: Zap },
          { label: "Taux d'ouverture", value: "72.4%", trend: "+5%", color: "text-blue-500", icon: Mail },
          { label: "Taux de clic", value: "38.1%", trend: "-2%", color: "text-secondary", icon: MousePointer2 },
          { label: "Leads Générés", value: "142", trend: "+18%", color: "text-green-500", icon: UserPlus },
        ].map((item, i) => (
          <Card key={i} className="ana-card premium-glass border-white/5 group hover:border-primary/20 transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shadow-inner">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className={`flex items-center text-[10px] font-extrabold ${item.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {item.trend.startsWith('+') ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {item.trend}
                </div>
              </div>
              <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
              <h3 className="text-3xl font-display font-extrabold">{item.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Graph */}
        <Card className="lg:col-span-2 ana-card premium-glass border-white/5 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-xl font-extrabold">Performance par Canal</CardTitle>
              <CardDescription className="font-medium">Volume d'interactions par jour</CardDescription>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-primary" /> Envoyer
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-blue-500" /> Ouvert
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
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
                    cursor={{fill: 'hsl(var(--white) / 0.05)'}}
                  />
                  <Bar dataKey="sent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="opened" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Channel Distribution */}
        <Card className="ana-card premium-glass border-white/5">
          <CardHeader>
            <CardTitle className="font-display text-xl font-extrabold">Distribution des Canaux</CardTitle>
            <CardDescription className="font-medium">Part des messages par plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border) / 0.1)', borderRadius: '12px'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-4">
              {channelData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Workflows */}
      <Card className="ana-card premium-glass border-white/5">
        <CardHeader>
          <CardTitle className="font-display text-xl font-extrabold">Top Performeurs</CardTitle>
          <CardDescription className="font-medium">Workflows avec le meilleur taux de conversion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { name: "Réponse Auto WhatsApp", conversion: "92%", status: "up", color: "text-green-500" },
              { name: "Séquence Lead Nurturing", conversion: "18.5%", status: "up", color: "text-blue-500" },
              { name: "Relance Panier Abandonné", conversion: "12.4%", status: "down", color: "text-orange-500" },
              { name: "Confirmation RDV", conversion: "98.2%", status: "up", color: "text-primary" },
            ].map((wf, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-3 -mx-3 rounded-2xl transition-smooth">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-extrabold text-xs shadow-inner">
                    {i+1}
                  </div>
                  <span className="text-sm font-bold group-hover:text-primary transition-smooth">{wf.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-base font-extrabold">{wf.conversion}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-widest leading-none">Conversion</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${wf.status === 'up' ? 'text-green-500' : 'text-red-500'} shadow-inner`}>
                    <ArrowUpRight className={`w-5 h-5 ${wf.status === 'down' ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
