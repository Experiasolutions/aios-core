import { useState, useEffect } from "react";
import { CurrentQuestPanel } from "./CurrentQuestPanel";
import { Cpu, Activity, Flame, Target, Zap, TrendingUp, AlertCircle, ChevronRight, Calendar } from "lucide-react";
import { useSharedBrain } from "../../hooks/useSharedBrain";
import { cn } from "@/lib/utils";

interface DashboardProps {
  onQuestlineClick?: (questlineId: string) => void;
}

// Experia Empire roadmap — fases sequenciais
const imperiumRoadmap = [
  { id: "prd", label: "PRD Experia", emoji: "📄", status: "active", hint: "PRÓXIMA MISSÃO 🔵" },
  { id: "ds", label: "Design System", emoji: "🎨", status: "locked", hint: "Após PRD" },
  { id: "digital", label: "Presença Digital", emoji: "🌐", status: "locked", hint: "LP + Insta + WA" },
  { id: "cases", label: "3 Cases Locais", emoji: "📸", status: "locked", hint: "15 dias" },
  { id: "calls", label: "Cold Calls", emoji: "📞", status: "locked", hint: "Com cases na mão" },
  { id: "contrato", label: "1º Contrato", emoji: "💰", status: "locked", hint: "Boss do IPTU sangra" },
];

// Countdown para cold calls (~15 dias a partir de 11/04/2026)
const coldCallDeadline = new Date("2026-04-26");

export function Dashboard({ onQuestlineClick }: DashboardProps = {}) {
  const { xp, focoGems, streak, realCoins, availableAttributePoints, level } = useSharedBrain();
  const [daysUntilCalls, setDaysUntilCalls] = useState(0);

  useEffect(() => {
    const diff = Math.ceil((coldCallDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    setDaysUntilCalls(Math.max(0, diff));
  }, []);

  const xpInLevel = xp % 100;
  const xpPercentage = xpInLevel;
  const seasonStart = new Date("2026-04-10");
  const seasonDay = Math.max(1, Math.floor((Date.now() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);

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
            </div>

            <h2 className="font-display text-4xl text-primary glow-cyan mb-2 uppercase tracking-wider">
              Gabriel Lima
            </h2>
            <p className="text-muted-foreground font-mono text-sm mb-4">
              &gt; Arquiteto-Comunicador · Voice of the Dragonborn
            </p>

            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 w-fit">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-mono text-red-400">T1 FUNDAÇÃO — MODO DE GUERRA ATIVO</span>
            </div>

            {/* Quick Stats */}
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
                  strokeDashoffset={377 - (377 * (xpPercentage / 100))}
                  className="text-primary transition-all duration-1000"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIA EMPIRE ROADMAP — destaque máximo */}
      <div className="glass-card p-6 border border-yellow-500/30 bg-yellow-500/5 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg text-yellow-400 uppercase tracking-wide">
              ⚔️ Experia Empire — Roadmap T1
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              A sequência que resolve tudo. Siga a ordem.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-lg">
            <Calendar className="w-3 h-3" />
            <span className="font-mono">{daysUntilCalls}d até cold calls</span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {imperiumRoadmap.map((phase, i) => (
            <div key={phase.id} className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onQuestlineClick?.("experia")}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl border transition-all text-center min-w-[90px]",
                  phase.status === "active"
                    ? "border-yellow-400/70 bg-yellow-500/15 cursor-pointer hover:bg-yellow-500/25"
                    : "border-border bg-muted/10 opacity-50 cursor-default"
                )}
              >
                <span className="text-2xl mb-1">{phase.emoji}</span>
                <span className={cn(
                  "text-xs font-mono font-medium text-center leading-tight",
                  phase.status === "active" ? "text-yellow-400" : "text-muted-foreground"
                )}>
                  {phase.label}
                </span>
                {phase.status === "active" && (
                  <span className="text-[9px] text-neon-orange mt-1 font-mono animate-pulse">
                    {phase.hint}
                  </span>
                )}
              </button>
              {i < imperiumRoadmap.length - 1 && (
                <ChevronRight className={cn(
                  "w-4 h-4 flex-shrink-0",
                  phase.status === "active" ? "text-yellow-400" : "text-muted-foreground/30"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pareto Zones */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { zone: "🔵 Genialidade", desc: "0.8% → 51%", color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/5", hint: "RAID I SAGRADO" },
          { zone: "🟢 Excelência", desc: "4% → 64%", color: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/5", hint: "RAID II" },
          { zone: "🟡 Impacto", desc: "20% → 80%", color: "text-yellow-400", border: "border-yellow-500/30", bg: "bg-yellow-500/5", hint: "Batch 30min" },
          { zone: "🔴 Vórtex", desc: "Concentrar lixo", color: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/5", hint: "Sexta 14-16h" },
        ].map((z, i) => (
          <div key={i} className={cn("glass-card p-4 animate-fade-in border", z.border, z.bg)} style={{ animationDelay: `${i * 80}ms` }}>
            <div className={cn("text-base font-mono font-bold", z.color)}>{z.zone}</div>
            <div className="text-xs text-muted-foreground mt-1">{z.desc}</div>
            <div className={cn("text-[10px] font-mono mt-2 opacity-70", z.color)}>{z.hint}</div>
          </div>
        ))}
      </div>

      {/* Main Content — Quest Panel full width */}
      <div className="grid grid-cols-1 gap-6">
        <CurrentQuestPanel />
      </div>

      {/* Quick Nav Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Questlines", emoji: "📜", desc: "7 ativas · 2 P0", section: "questlines" },
          { label: "Skill Tree", emoji: "🌳", desc: `${availableAttributePoints} pontos disponíveis`, section: "skills" },
          { label: "Boss Room", emoji: "💀", desc: "R$25.2K em aberto", section: "bosses" },
        ].map((card) => (
          <button
            key={card.section}
            onClick={() => onQuestlineClick && card.section !== "questlines"
              ? undefined
              : onQuestlineClick?.("")}
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
