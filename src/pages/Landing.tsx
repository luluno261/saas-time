import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Zap, 
  MessageSquare, 
  Mail, 
  Database, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Users, 
  Workflow, 
  BarChart3, 
  Settings2, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Clock,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { blink } from "@/lib/blink";

export default function Landing() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const login = () => {
    blink.auth.login(window.location.origin + "/dashboard");
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight">FlowBot <span className="text-primary">AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">Fonctionnalités</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">Comment ça marche</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">Tarifs</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Button asChild variant="default" className="btn-primary">
                <Link to="/dashboard">Tableau de bord</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={login} className="text-sm font-medium">Connexion</Button>
                <Button variant="default" onClick={login} className="btn-primary">Essai Gratuit</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] hero-gradient-dark pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/30 text-primary bg-primary/5 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-2" />
              Nouveau : Workflows WhatsApp n8n prêts à l'emploi
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 leading-[1.1]">
              Automatisez votre relation <br />
              <span className="gradient-text">client sans une ligne de code</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Propulsez votre PME avec FlowBot AI. Déployez des workflows n8n préconfigurés pour WhatsApp et Email en un clic. Simple, puissant, évolutif.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="btn-primary px-8 text-base h-12" onClick={login}>
                Lancer mon premier workflow <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-base h-12 border-white/10 hover:bg-white/5">
                Voir la démo <Play className="ml-2 w-4 h-4 fill-current" />
              </Button>
            </div>
          </div>

          {/* Hero Image/Dashboard Mockup */}
          <div className={`mt-20 relative mx-auto max-w-5xl transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
            <div className="glow-card overflow-hidden p-1 shadow-glow-intense">
              <div className="rounded-xl overflow-hidden bg-zinc-950 border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" 
                  alt="FlowBot AI Dashboard" 
                  className="w-full h-auto object-cover opacity-80"
                />
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 hidden lg:block floating">
              <Card className="glass p-4 border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">WhatsApp Bot</p>
                    <p className="text-sm font-bold">Réponse envoyée</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="absolute -bottom-6 -left-10 hidden lg:block floating-delayed">
              <Card className="glass p-4 border-secondary/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Lead Nurturing</p>
                    <p className="text-sm font-bold">Relance automatique active</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-zinc-950/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text-static mb-1">2M+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Messages Automatisés</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text-static mb-1">500+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Templates n8n</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text-static mb-1">15k</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Heures Gagnées</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text-static mb-1">98%</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Satisfaction Client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Marquee */}
      <section className="py-20 overflow-hidden opacity-50">
        <div className="container mx-auto px-4 mb-10 text-center">
          <p className="text-sm font-medium text-muted-foreground">Ils automatisent déjà avec FlowBot AI</p>
        </div>
        <div className="marquee-container relative h-12">
          <div className="marquee flex items-center gap-16 whitespace-nowrap absolute left-0">
            {['WhatsApp', 'HubSpot', 'Salesforce', 'Gmail', 'Notion', 'Airtable', 'SendGrid', 'n8n', 'Stripe', 'Slack'].map((logo, i) => (
              <span key={i} className="text-xl font-bold text-muted-foreground/40 font-display italic">{logo}</span>
            ))}
            {/* Duplicate for infinite loop */}
            {['WhatsApp', 'HubSpot', 'Salesforce', 'Gmail', 'Notion', 'Airtable', 'SendGrid', 'n8n', 'Stripe', 'Slack'].map((logo, i) => (
              <span key={i+10} className="text-xl font-bold text-muted-foreground/40 font-display italic">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Tout ce dont vous avez besoin pour <br /><span className="text-primary">automatiser votre croissance</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Une plateforme complète conçue pour simplifier la technologie complexe de l'automatisation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
            {/* Feature 1 */}
            <div className="md:col-span-8 group scroll-fade-in stagger-1">
              <Card className="feature-card h-full flex flex-col justify-end p-8 border-primary/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-smooth">
                  <Workflow className="w-32 h-32 text-primary" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Workflow className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Bibliothèque de Workflows Prêts-à-l'emploi</h3>
                  <p className="text-muted-foreground max-w-md">Choisissez parmi des centaines de templates n8n optimisés pour WhatsApp Business et l'Email Marketing. Activez-les en un clic.</p>
                </div>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="md:col-span-4 group scroll-fade-in stagger-2">
              <Card className="feature-card h-full flex flex-col p-8 border-secondary/20">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Settings2 className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Éditeur No-Code</h3>
                <p className="text-muted-foreground">Personnalisez vos messages et conditions sans toucher au code n8n. Une interface drag-and-drop intuitive.</p>
              </Card>
            </div>

            {/* Feature 3 */}
            <div className="md:col-span-4 group scroll-fade-in stagger-3">
              <Card className="feature-card h-full flex flex-col p-8 border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Multi-Intégrations</h3>
                <p className="text-muted-foreground">Connectez nativement vos outils préférés : HubSpot, Notion, Airtable et plus encore.</p>
              </Card>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-8 group scroll-fade-in stagger-4">
              <Card className="feature-card h-full flex flex-col justify-end p-8 border-primary/20 overflow-hidden relative">
                <div className="absolute -bottom-10 -right-10 p-8 opacity-10 group-hover:opacity-20 transition-smooth">
                  <BarChart3 className="w-48 h-48 text-primary" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Analytics Avancés</h3>
                  <p className="text-muted-foreground max-w-md">Suivez vos performances en temps réel : taux d'ouverture, conversion de leads et ROI de chaque automatisation.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* "How It Works" Section */}
      <section id="how-it-works" className="py-24 bg-zinc-950/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Automatisez en <span className="text-primary">3 étapes simples</span></h2>
            <p className="text-muted-foreground">Pas de configuration complexe, juste de la croissance pure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block" />
            
            {[
              { 
                step: "01", 
                title: "Choisissez un Template", 
                desc: "Parcourez notre bibliothèque et sélectionnez le workflow n8n qui correspond à votre besoin.",
                icon: Globe
              },
              { 
                step: "02", 
                title: "Personnalisez & Connectez", 
                desc: "Adaptez les messages à votre marque et connectez WhatsApp, Email et votre CRM en quelques minutes.",
                icon: Settings2
              },
              { 
                step: "03", 
                title: "Activez & Automatisez", 
                desc: "Déployez en 1 clic. FlowBot AI s'occupe de tout, 24h/7j, en totale autonomie.",
                icon: Zap
              }
            ].map((item, i) => (
              <div key={i} className="relative z-10 text-center group scroll-fade-in" style={{ transitionDelay: `${i * 0.2}s` }}>
                <div className="w-20 h-20 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center mx-auto mb-8 transition-bounce group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-glow">
                  <item.icon className="w-10 h-10 text-primary" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold font-display">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Un plan pour chaque <span className="text-primary">stade de croissance</span></h2>
            <p className="text-muted-foreground">Transparent, sans frais cachés. Annulez à tout moment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <Card className="glass p-8 flex flex-col scroll-fade-in stagger-1">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-display">29€</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Idéal pour les indépendants et petites entreprises.</p>
              </div>
              
              <div className="flex-1 space-y-4 mb-8">
                {[
                  "3 Workflows actifs",
                  "1 000 Messages /mois",
                  "WhatsApp OU Email",
                  "Support par Email",
                  "Accès à 50+ templates"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5" onClick={login}>
                Commencer
              </Button>
            </Card>

            {/* Pro */}
            <Card className="glass p-8 flex flex-col relative border-primary/50 shadow-glow scroll-fade-in stagger-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-bold text-primary-foreground">
                LE PLUS POPULAIRE
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-display">79€</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Pour les entreprises en pleine expansion.</p>
              </div>
              
              <div className="flex-1 space-y-4 mb-8">
                {[
                  "15 Workflows actifs",
                  "10 000 Messages /mois",
                  "WhatsApp + Email",
                  "Analytics Dashboard",
                  "Accès Prioritaire",
                  "Multi-Intégrations CRM"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full btn-primary" onClick={login}>
                Démarrer l'essai gratuit
              </Button>
            </Card>

            {/* Agency */}
            <Card className="glass p-8 flex flex-col scroll-fade-in stagger-3">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Agency</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-display">199€</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Pour les agences gérant plusieurs clients.</p>
              </div>
              
              <div className="flex-1 space-y-4 mb-8">
                {[
                  "Workflows Illimités",
                  "Messages Illimités*",
                  "Multi-comptes / Clients",
                  "White-labeling",
                  "Accès API Complet",
                  "Support 24/7 Dédié"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5" onClick={login}>
                Contacter l'équipe
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Card className="glass p-12 md:p-20 text-center border-primary/20 max-w-5xl mx-auto overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Prêt à mettre votre <br />relation client en <span className="text-primary">pilote automatique ?</span></h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">Rejoignez plus de 2 000 entreprises qui utilisent FlowBot AI pour gagner du temps et augmenter leurs ventes.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" className="btn-primary px-10 h-14 text-lg" onClick={login}>
                  Commencer l'essai de 14 jours
                </Button>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Sans carte bancaire
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Installation en 2min
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-display font-bold tracking-tight">FlowBot <span className="text-primary">AI</span></span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                FlowBot AI est la solution de choix pour les entreprises cherchant à automatiser leur relation client via WhatsApp et Email sans connaissances techniques.
              </p>
              <div className="flex items-center gap-4">
                {['twitter', 'linkedin', 'github', 'youtube'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 transition-smooth text-muted-foreground">
                    <span className="sr-only">{social}</span>
                    <Globe className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold mb-6">Produit</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Templates</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Integrations</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Tarifs</a></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold mb-6">Ressources</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">API Ref</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Support</a></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-bold mb-6">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">Recevez nos derniers templates d'automatisation chaque semaine.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="flex-1 px-4 py-2 rounded-md bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50"
                />
                <Button className="btn-primary">OK</Button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2026 FlowBot AI. Tous droits réservés.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-primary transition-smooth">Mentions Légales</a>
              <a href="#" className="hover:text-primary transition-smooth">Confidentialité</a>
              <a href="#" className="hover:text-primary transition-smooth">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}