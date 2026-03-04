import React, { useRef } from "react";
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
  Sparkles,
  MousePointer2,
  Bot,
  Layers,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { blink } from "@/lib/blink";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "@/components/ui/magnetic-button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Landing() {
  const { user } = useAuth();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Text Reveal
    gsap.from(".hero-reveal", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
    });

    // Hero Image Parallax
    gsap.to(".hero-mockup", {
      y: -50,
      scrollTrigger: {
        trigger: ".hero-mockup",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Feature Cards Reveal
    gsap.from(".feature-reveal", {
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 80%",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Steps Reveal
    gsap.from(".step-reveal", {
      scrollTrigger: {
        trigger: ".steps-grid",
        start: "top 80%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });

    // Glow Animation
    gsap.to(".floating-glow", {
      x: "random(-20, 20)",
      y: "random(-20, 20)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.5,
        from: "random"
      }
    });
  }, { scope: container });

  const login = () => {
    blink.auth.login(window.location.origin + "/dashboard");
  };

  return (
    <div ref={container} className="min-h-screen bg-background selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 premium-glass border-b border-white/5">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow transition-bounce group-hover:scale-110 group-hover:rotate-12">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">FlowBot <span className="text-primary">AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Fonctionnalités', 'Comment ça marche', 'Tarifs'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Button asChild className="btn-primary rounded-xl px-6 h-11 font-bold">
                <Link to="/dashboard">Console</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={login} className="text-sm font-bold hover:bg-white/5 h-11 rounded-xl">Connexion</Button>
                <Button onClick={login} className="btn-primary rounded-xl px-6 h-11 font-bold shadow-glow">Démarrer</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-60 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-20 mask-radial" />
        <div className="hero-glow top-0 left-1/4 w-[500px] h-[500px]" />
        <div className="hero-glow bottom-0 right-1/4 w-[600px] h-[600px] opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="hero-reveal inline-block mb-8">
            <Badge variant="outline" className="px-5 py-1.5 border-primary/30 text-primary bg-primary/5 backdrop-blur-md rounded-full font-bold">
              <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" />
              Intelligence Automatisée n8n
            </Badge>
          </div>
          
          <h1 className="hero-reveal text-6xl md:text-8xl font-display font-extrabold tracking-tight mb-8 leading-[0.95] max-w-5xl mx-auto">
            L'automatisation <br />
            <span className="gradient-text">réinventée pour demain</span>
          </h1>
          
          <p className="hero-reveal max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-medium">
            Déployez des workflows complexes en un éclair. Sans code, sans limite, juste du résultat.
          </p>
          
          <div className="hero-reveal flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton 
              className="btn-primary px-10 h-14 text-lg font-bold rounded-2xl shadow-glow transition-bounce hover:scale-105 flex items-center justify-center" 
              onClick={login}
            >
              Décoller maintenant <ArrowRight className="ml-2 w-5 h-5" />
            </MagneticButton>
            <Button size="lg" variant="outline" className="px-10 h-14 text-lg font-bold border-white/10 hover:bg-white/5 rounded-2xl transition-smooth">
              Explorer la puissance
            </Button>
          </div>

          {/* Hero Mockup */}
          <div className="mt-32 relative mx-auto max-w-6xl hero-mockup perspective-1000">
            <div className="premium-glass p-2 rounded-[2.5rem] shadow-glow-intense transform rotate-x-6">
              <div className="rounded-[2rem] overflow-hidden bg-zinc-950 border border-white/5 relative">
                <img 
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" 
                  alt="FlowBot AI Interface" 
                  className="w-full h-auto object-cover opacity-90 transition-smooth hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute -top-12 -right-12 hidden lg:block floating-glow">
              <Card className="premium-glass p-5 border-primary/20 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shadow-inner">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">IA Active</p>
                    <p className="text-sm font-bold">Analyse en cours...</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="absolute top-1/2 -left-16 hidden lg:block floating-glow" style={{ animationDelay: '1s' }}>
              <Card className="premium-glass p-5 border-secondary/20 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Moteur n8n</p>
                    <p className="text-sm font-bold">99.9% Disponibilité</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="fonctionnalités" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24 feature-reveal">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6">Écosystème de <span className="text-primary">Performance</span></h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">Tout ce dont vous avez besoin pour dominer votre marché grâce à l'automatisation.</p>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px]">
            {/* Big Card */}
            <div className="md:col-span-8 feature-reveal">
              <Card className="premium-glass h-full relative overflow-hidden group hover:border-primary/30 transition-smooth rounded-[2rem]">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-smooth">
                  <Layers className="w-64 h-64 text-primary" />
                </div>
                <div className="p-12 h-full flex flex-col justify-end">
                  <Badge className="w-fit mb-6 bg-primary/10 text-primary border-none rounded-full px-4 font-bold">WORKFLOWS</Badge>
                  <h3 className="text-3xl md:text-4xl font-display font-extrabold mb-4 leading-tight">Bibliothèque de templates <br />haute fidélité</h3>
                  <p className="text-muted-foreground text-lg max-w-md">Plus de 500 scénarios n8n testés et approuvés pour tous les secteurs d'activité.</p>
                </div>
              </Card>
            </div>

            {/* Small Card */}
            <div className="md:col-span-4 feature-reveal">
              <Card className="premium-glass h-full p-10 flex flex-col group hover:border-secondary/30 transition-smooth rounded-[2rem]">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-bounce">
                  <MousePointer2 className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-display font-extrabold mb-4">Éditeur Visuel</h3>
                <p className="text-muted-foreground font-medium">Personnalisez chaque nœud sans jamais voir une ligne de code.</p>
              </Card>
            </div>

            {/* Small Card 2 */}
            <div className="md:col-span-4 feature-reveal">
              <Card className="premium-glass h-full p-10 flex flex-col group hover:border-blue-500/30 transition-smooth rounded-[2rem]">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-bounce">
                  <ShieldCheck className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-display font-extrabold mb-4">Sécurité Bancaire</h3>
                <p className="text-muted-foreground font-medium">Vos données sont cryptées de bout en bout avec les standards les plus stricts.</p>
              </Card>
            </div>

            {/* Big Card 2 */}
            <div className="md:col-span-8 feature-reveal">
              <Card className="premium-glass h-full relative overflow-hidden group hover:border-primary/30 transition-smooth rounded-[2rem]">
                <div className="absolute -bottom-10 -right-10 p-12 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-smooth">
                  <BarChart3 className="w-64 h-64 text-primary" />
                </div>
                <div className="p-12 h-full flex flex-col justify-center">
                  <Badge className="w-fit mb-6 bg-primary/10 text-primary border-none rounded-full px-4 font-bold">ANALYTICS</Badge>
                  <h3 className="text-3xl md:text-4xl font-display font-extrabold mb-4 leading-tight">Décisions basées <br />sur la donnée</h3>
                  <p className="text-muted-foreground text-lg max-w-md">Analysez chaque message, chaque conversion et optimisez votre ROI en temps réel.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative overflow-hidden">
        <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Card className="premium-glass p-16 md:p-32 text-center rounded-[3rem] border-white/10 shadow-glow-intense overflow-hidden relative group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-smooth" />
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-display font-extrabold mb-10 tracking-tight leading-[0.9]">
                Prêt pour le <br />
                <span className="gradient-text">futur ?</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                Rejoignez les leaders qui ont déjà franchi le pas vers l'automatisation intelligente.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <MagneticButton 
                  className="btn-primary px-12 h-16 text-xl font-bold rounded-2xl shadow-glow transition-bounce hover:scale-110 flex items-center justify-center" 
                  onClick={login}
                >
                  Commencer l'aventure
                </MagneticButton>
                <div className="flex items-center gap-6 text-muted-foreground font-bold">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Gratuit</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Sans engagement</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-zinc-950/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-display font-bold tracking-tight">FlowBot <span className="text-primary">AI</span></span>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md font-medium">
                La plateforme d'automatisation nouvelle génération qui transforme vos processus en avantages compétitifs.
              </p>
              <div className="flex items-center gap-5">
                {[Globe, Users, Mail, Settings2].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-bounce group">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-display font-bold text-lg mb-8 uppercase tracking-widest text-primary">Produit</h4>
                <ul className="space-y-5 text-muted-foreground font-medium">
                  {['Fonctionnalités', 'Templates', 'Intégrations', 'Moteur n8n'].map(link => (
                    <li key={link}><a href="#" className="hover:text-foreground transition-smooth">{link}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-display font-bold text-lg mb-8 uppercase tracking-widest text-secondary">Ressources</h4>
                <ul className="space-y-5 text-muted-foreground font-medium">
                  {['Documentation', 'API', 'Blog', 'Cas d\'usage'].map(link => (
                    <li key={link}><a href="#" className="hover:text-foreground transition-smooth">{link}</a></li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-display font-bold text-lg mb-8 uppercase tracking-widest text-blue-500">Support</h4>
                <ul className="space-y-5 text-muted-foreground font-medium">
                  {['Assistance', 'Sécurité', 'Confidentialité', 'Contact'].map(link => (
                    <li key={link}><a href="#" className="hover:text-foreground transition-smooth">{link}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-muted-foreground font-bold uppercase tracking-widest">
            <p>© 2026 FlowBot AI. Crafted for Excellence.</p>
            <div className="flex items-center gap-12">
              <a href="#" className="hover:text-primary transition-smooth">Legal</a>
              <a href="#" className="hover:text-primary transition-smooth">Privacy</a>
              <a href="#" className="hover:text-primary transition-smooth">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
