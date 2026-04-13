import { useState, useEffect } from "react";
import { CurrentQuestPanel } from "./CurrentQuestPanel";
import { JarvisTerminal } from "@/components/jarvis/JarvisTerminal";
import { useKAIROS } from "@/hooks/useKAIROS";
import { useSharedBrain } from "@/hooks/useSharedBrain";
import {
  Cpu, Activity, Flame, Target, Zap, TrendingUp,
  AlertCircle, ChevronRight, Calendar, Bot, Loader2,
  Wifi, WifiOff, Skull, Shield, RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardProps {
  onQuestlineClick?: (questlineId: string) => void;
}

const coldCallDeadline = new Date("2026-04-26");

export function Dashboard({ onQuestlineClick }: DashboardProps = {}) {
  const { xp, focoGems, streak, realCoins, availableAttributePoints, level } = useSharedBrain();
  const kairos = useKAIROS(30000);
  const [daysUntilCalls, setDaysUntilCalls] = useState(0);
  const [showJarvis, setShowJarvis] = useState(false);

  useEffect(() => {
    const diff = Math.ceil((coldCallDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    setDaysUntilCalls(Math.max(0, diff));
  }, []);

  const xpInLevel = xp % 100;
  const seasonStart = new Date("2026-04-10");
  const seasonDay = Math.max(1, Math.floor((Date.now() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  // Bosses from roadmap.md via API (dynamic)
  const activeBosses = kairos.bosses.filter(b => !b.status.includes("✅"));
  const completedBosses = kairos.bosses.filter(b => b.status.includes("✅"));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0': return 'text-red-400 border-red-500/40 bg-red-500/5';
      case 'P1': return 'text-orange-400 border-orange-500/40 bg-orange-500/5';
      case 'P2': return 'text-yellow-400 border-yellow-500/40 bg-yellow-500/5';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getStatusEmoji = (status: string) => {
    if (status.includes('🔥')) return '🔥';
    if (status.includes('✅')) return '✅';
    if (status.includes('🧊')) return '🧊';
    if (status.includes('🔧')) return '🔧';
    return '📋';
  };

  return (
    <div className="space-y-6">
      {/* War Banner */}
      <div className="glass-card p-8 relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(hsl(var(--neon-cyan) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--neon-cyan) / 0.15) 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-neon-magenta/10" />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Cpu className="w-6 h-6 text-primary" />
              <span className="text-sm font-mono text-primary">
                GABRIEL OS v4.1 // LVL {level} // T1-2026 · DIA {seasonDay}/90
              </span>
              <Activity className="w-4 h-4 text-neon-green animate-pulse" />
              {/* Backend status indicator */}
              {kairos.backendOnline ? (
                <span className="flex items-center gap-1 text-[10px] font-mono text-neon-green">
                  <Wifi className="w-3 h-3" /> LIVE
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-mono text-red-400">
                  <WifiOff className="w-3 h-3" /> OFFLINE
                </span>
              )}
            </div>

            <h2 className="font-display text-4xl text-primary glow-cyan mb-2 uppercase tracking-wider">
              Gabriel Lima
            </h2>
            <p className="text-muted-foreground font-mono text-sm mb-4">
              &gt; Arquiteto-Comunicador · Voice of the Dragonborn
            </p>

            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 w-fit">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-mono text-red-400">
                {kairos.isolationActive ? '🔴 ISOLATION MODE — DEEP WORK ATIVO' : 'T1 FUNDAÇÃO — MODO DE GUERRA ATIVO'}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <StatPill icon={Flame} value={`${streak}d`} label="streak" color="text-neon-orange" borderColor="border-neon-orange/30" bgColor="bg-neon-orange/10" />
              <StatPill icon={Zap} value={`${focoGems} GEMS`} label="foco" color="text-blue-400" borderColor="border-blue-400/30" bgColor="bg-blue-500/10" />
              <StatPill icon={Target} value={`R$ ${realCoins.toLocaleString("pt-BR")}`} label="faturado" color="text-green-400" borderColor="border-green-500/30" bgColor="bg-green-500/10" />
              {availableAttributePoints > 0 && (
                <StatPill icon={TrendingUp} value={`${availableAttributePoints} pts`} label="skill pts" color="text-yellow-400" borderColor="border-yellow-500/30" bgColor="bg-yellow-500/10" />
              )}
            </div>
          </div>

          {/* XP Orb */}
          <div className="hidden xl:block relative text-center flex-shrink-0">
            <div className="w-32 h-32 border-2 border-primary/30 rounded-full flex items-center justify-center relative">
              <div className="text-center">
                <span className="font-display text-2xl text-primary block">{xp}</span>
                <div className="text-[10px] text-muted-foreground uppercase font-mono">XP Total</div>
                <div className="text-[10px] text-primary/70 font-mono">Nível {level}</div>
              </div>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-muted/20" />
                <circle
                  cx="64" cy="64" r="60"
                  stroke="currentColor" strokeWidth="4" fill="transparent"
                  strokeDasharray="377"
                  strokeDashoffset={377 - (377 * (xpInLevel / 100))}
                  className="text-primary transition-all duration-1000"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ══ BOSS FIGHTS — Dynamic from roadmap.md ══ */}
      <div className="glass-card p-6 border border-red-500/20 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skull className="w-5 h-5 text-red-400" />
            <div>
              <h3 className="font-display text-lg text-red-400 uppercase tracking-wide">
                Boss Fights Ativas (P0)
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {kairos.backendOnline
                  ? `${activeBosses.length} boss(es) ativos · lido do roadmap.md`
                  : 'Backend offline — inicie: node scripts/dashboard.js'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => kairos.refetch()}
              className="icon-btn w-7 h-7 text-muted-foreground hover:text-primary"
              title="Sincronizar roadmap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-lg">
              <Calendar className="w-3 h-3" />
              <span className="font-mono">{daysUntilCalls}d até cold calls</span>
            </div>
          </div>
        </div>

        {kairos.loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 text-primary animate-spin mr-2" />
            <span className="text-sm text-muted-foreground font-mono">Carregando roadmap...</span>
          </div>
        ) : activeBosses.length === 0 ? (
          <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-neon-green" />
            <span className="font-mono text-sm">Nenhum boss ativo — área limpa! 🏆</span>
          </div>
        ) : (
          <div className="space-y-3">
            {activeBosses.map((boss, i) => (
              <div
                key={boss.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:border-red-500/40 transition-all"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex-shrink-0 text-xl">{getStatusEmoji(boss.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn('text-[10px] font-mono font-bold px-2 py-0.5 rounded border', getPriorityColor(boss.priority))}>
                      {boss.priority}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{boss.project}</span>
                    {boss.owner && (
                      <span className="text-[10px] text-muted-foreground/50 font-mono">{boss.owner}</span>
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-tight">{boss.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-mono">{boss.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quests P1/P2 in pipeline */}
        {kairos.quests.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground font-mono mb-2">PIPELINE (P1–P3)</p>
            <div className="flex flex-wrap gap-2">
              {kairos.quests.slice(0, 5).map(q => (
                <span
                  key={q.id}
                  className={cn('text-[10px] font-mono px-2 py-1 rounded border', getPriorityColor(q.priority))}
                >
                  [{q.priority}] {q.project}: {q.description.substring(0, 40)}{q.description.length > 40 ? '...' : ''}
                </span>
              ))}
              {kairos.quests.length > 5 && (
                <span className="text-[10px] font-mono text-muted-foreground px-2 py-1">
                  +{kairos.quests.length - 5} mais
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content + JARVIS Terminal lado a lado */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Quest Panel — 3 colunas */}
        <div className="xl:col-span-3">
          <CurrentQuestPanel />
        </div>

        {/* JARVIS Terminal — 2 colunas */}
        <div className="xl:col-span-2">
          <JarvisTerminal
            isolationActive={kairos.isolationActive}
            className="h-full min-h-[460px]"
          />
        </div>
      </div>

      {/* Quick Nav Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Questlines", emoji: "📜", desc: "7 ativas · 2 P0", section: "questlines" },
          { label: "Skill Tree", emoji: "🌳", desc: `${availableAttributePoints} pontos disponíveis`, section: "skills" },
          { label: "Boss Room", emoji: "💀", desc: `${activeBosses.length} boss(es) ativos`, section: "bosses" },
        ].map((card) => (
          <button
            key={card.section}
            onClick={() => onQuestlineClick?.(card.section === "questlines" ? "experia" : "")}
            className="glass-card p-4 text-left hover:border-primary/50 transition-all group"
          >
            <div className="text-2xl mb-2">{card.emoji}</div>
            <div className="font-medium group-hover:text-primary transition-colors">{card.label}</div>
            <div className="text-xs text-muted-foreground">{card.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StatPill({
  icon: Icon, value, label, color, borderColor, bgColor
}: {
  icon: typeof Flame;
  value: string;
  label: string;
  color: string;
  borderColor: string;
  bgColor: string;
}) {
  return (
    <div className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border", borderColor, bgColor)}>
      <Icon className={cn("w-4 h-4", color)} />
      <span className={cn("text-sm font-mono", color)}>{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
