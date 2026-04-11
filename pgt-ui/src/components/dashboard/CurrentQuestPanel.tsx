import { useState, useEffect } from "react";
import { Sun, Zap, Moon, CheckCircle2, Circle, Clock, Target, Flame, BookOpen, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

interface Quest {
  id: string;
  title: string;
  zone: "genius" | "excellence" | "impact" | "vortex";
  rewardType: "XP" | "GEMS" | "SEEDS";
  rewardAmount: number;
  completed: boolean;
}

interface TimePeriod {
  id: string;
  name: string;
  emoji: string;
  timeRange: string;
  icon: typeof Sun;
  zoneColor: string;
  quests: Quest[];
}

// v4.0 — Gabriel OS Level Zero — Rotinas reais baseadas na vida atual
const timePeriods: TimePeriod[] = [
  {
    id: "ritual",
    name: "RITUAL",
    emoji: "🌅",
    timeRange: "07:00 - 09:00",
    icon: Sun,
    zoneColor: "text-yellow-400",
    quests: [
      { id: "r1", title: "Higiene básica (Escovar os dentes)", zone: "impact", rewardType: "XP", rewardAmount: 10, completed: false },
      { id: "r2", title: "Alongamento (5-10 min)", zone: "impact", rewardType: "XP", rewardAmount: 10, completed: false },
      { id: "r3", title: "Arrumar-se / Se vestir", zone: "impact", rewardType: "XP", rewardAmount: 5, completed: false },
      { id: "r4", title: "Tapa na casa (1 tarefa doméstica)", zone: "impact", rewardType: "XP", rewardAmount: 10, completed: false },
      { id: "r5", title: "Sentar no computador e abrir o plano do dia", zone: "impact", rewardType: "XP", rewardAmount: 5, completed: false },
    ],
  },
  {
    id: "raid1",
    name: "RAID I — GENIALIDADE",
    emoji: "⚔️",
    timeRange: "09:00 - 12:30",
    icon: Flame,
    zoneColor: "text-blue-400",
    quests: [
      { id: "g1", title: "🔵 A ÚNICA COISA (Pareto 0.8%) — missão que move o jogo permanentemente", zone: "genius", rewardType: "GEMS", rewardAmount: 50, completed: false },
      { id: "g2", title: "Deep Work ≥90min sem interrupção (telefone fora de alcance)", zone: "genius", rewardType: "GEMS", rewardAmount: 30, completed: false },
      { id: "g3", title: "Criar/refinar 1 asset da Experia (script, proposta, demo)", zone: "excellence", rewardType: "GEMS", rewardAmount: 25, completed: false },
    ],
  },
  {
    id: "raid2",
    name: "RAID II — EXCELÊNCIA",
    emoji: "⚡",
    timeRange: "13:30 - 17:30",
    icon: Zap,
    zoneColor: "text-green-400",
    quests: [
      { id: "e1", title: "🟢 Entregável concreto da Experia (não planejar, FAZER)", zone: "excellence", rewardType: "GEMS", rewardAmount: 25, completed: false },
      { id: "e2", title: "Documentar 1 case/prova social para comércio local", zone: "excellence", rewardType: "GEMS", rewardAmount: 20, completed: false },
      { id: "e3", title: "🟡 Batch de impacto: 30min de follow-ups / comunicação", zone: "impact", rewardType: "XP", rewardAmount: 15, completed: false },
    ],
  },
  {
    id: "academia",
    name: "ACADEMIA",
    emoji: "📚",
    timeRange: "17:30 - 19:00",
    icon: BookOpen,
    zoneColor: "text-purple-400",
    quests: [
      { id: "a1", title: "Estudo que expande a Zona de Genialidade (IA, Agentificação, Inglês)", zone: "impact", rewardType: "SEEDS", rewardAmount: 30, completed: false },
    ],
  },
  {
    id: "santuario",
    name: "SANTUÁRIO",
    emoji: "🌙",
    timeRange: "20:30 - 22:30",
    icon: Moon,
    zoneColor: "text-indigo-400",
    quests: [
      { id: "s1", title: "Recap do dia — Nota (A-F) + o que travou + 1 coisa boa", zone: "impact", rewardType: "XP", rewardAmount: 15, completed: false },
      { id: "s2", title: "Missão 🔵 de amanhã definida (1 frase clara)", zone: "impact", rewardType: "XP", rewardAmount: 10, completed: false },
      { id: "s3", title: "Plano das 3 missões do dia seguinte", zone: "impact", rewardType: "XP", rewardAmount: 10, completed: false },
    ],
  },
];

const zoneLabels: Record<string, { label: string; color: string }> = {
  genius: { label: "🔵 Genialidade", color: "text-blue-400" },
  excellence: { label: "🟢 Excelência", color: "text-green-400" },
  impact: { label: "🟡 Impacto", color: "text-yellow-400" },
  vortex: { label: "🔴 Vórtex", color: "text-red-400" },
};

function getCurrentPeriod(): string {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 9) return "ritual";
  if (hour >= 9 && hour < 13) return "raid1";
  if (hour >= 13 && hour < 18) return "raid2";
  if (hour >= 17 && hour < 19) return "academia";
  if (hour >= 20 || hour < 7) return "santuario";
  return "raid1";
}

export function CurrentQuestPanel() {
  const [periods, setPeriods] = useState<TimePeriod[]>(timePeriods);
  const [currentPeriodId, setCurrentPeriodId] = useState(getCurrentPeriod());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPeriodId(getCurrentPeriod());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentPeriod = periods.find(p => p.id === currentPeriodId) || periods[0];
  const completedCount = currentPeriod.quests.filter(q => q.completed).length;
  const totalXp = currentPeriod.quests.reduce((acc, q) => acc + (q.completed ? q.rewardAmount : 0), 0);
  const maxXp = currentPeriod.quests.reduce((acc, q) => acc + q.rewardAmount, 0);

  const toggleQuest = async (questId: string) => {
    let quest: Quest | null = null;
    let nowCompleted = false;

    const newPeriods = periods.map(period => {
      if (period.id === currentPeriodId) {
        return {
          ...period,
          quests: period.quests.map(q => {
            if (q.id === questId) {
              quest = q;
              nowCompleted = !q.completed;
              return { ...q, completed: nowCompleted };
            }
            return q;
          }),
        };
      }
      return period;
    });

    setPeriods(newPeriods);

    // Persist to Supabase only when completing (not unchecking)
    if (quest && nowCompleted) {
      await supabase.from("kairos_events").insert({
        event_type: "quest_completed",
        agent_id: "gabriel-os",
        machine: "pgt-ui",
        payload: {
          questId,
          period: currentPeriodId,
          zone: (quest as Quest).zone,
          rewardType: (quest as Quest).rewardType,
          amount: (quest as Quest).rewardAmount,
          timestamp: new Date().toISOString(),
        },
      });
    }
  };

  const PeriodIcon = currentPeriod.icon;

  return (
    <div className="glass-card p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <PeriodIcon className={cn("w-7 h-7", currentPeriod.zoneColor)} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-neon-magenta" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Período Atual
              </span>
            </div>
            <h2 className="font-display text-2xl text-primary glow-cyan uppercase tracking-wide">
              {currentPeriod.emoji} {currentPeriod.name}
            </h2>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{currentPeriod.timeRange}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Zap className="w-4 h-4 text-neon-purple" />
            <span className="font-mono text-neon-purple">{totalXp}/{maxXp} pts</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-muted-foreground font-mono">PROGRESSO DO PERÍODO</span>
          <span className="text-primary font-mono">{completedCount}/{currentPeriod.quests.length}</span>
        </div>
        <div className="progress-bar h-3">
          <div
            className="progress-fill-cyan"
            style={{ width: `${(completedCount / currentPeriod.quests.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Quest Checklist */}
      <div className="space-y-3">
        {currentPeriod.quests.map((quest, index) => {
          const zone = zoneLabels[quest.zone];
          return (
            <button
              key={quest.id}
              onClick={() => toggleQuest(quest.id)}
              className={cn(
                "w-full text-left p-4 rounded-lg border transition-all duration-300 group",
                quest.completed
                  ? "bg-neon-green/10 border-neon-green/30"
                  : "bg-muted/30 border-border hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 flex-shrink-0",
                  quest.completed
                    ? "border-neon-green bg-neon-green/20"
                    : "border-muted-foreground group-hover:border-primary"
                )}>
                  {quest.completed && <CheckCircle2 className="w-4 h-4 text-neon-green" />}
                </div>

                <div className="flex-1">
                  <p className={cn(
                    "font-medium transition-all text-sm",
                    quest.completed && "line-through text-muted-foreground"
                  )}>
                    {quest.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={cn("text-xs font-mono", zone.color)}>{zone.label}</span>
                    <span className="text-xs text-neon-purple font-mono">+{quest.rewardAmount} {quest.rewardType}</span>
                  </div>
                </div>

                <span className={cn(
                  "text-xs font-mono px-2 py-1 rounded flex-shrink-0",
                  quest.completed
                    ? "bg-neon-green/20 text-neon-green"
                    : "bg-muted text-muted-foreground"
                )}>
                  {quest.completed ? "DONE" : `#${index + 1}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Period Tabs */}
      <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-border flex-wrap">
        {periods.map(period => {
          const Icon = period.icon;
          const isActive = period.id === currentPeriodId;
          const done = period.quests.filter(q => q.completed).length;

          return (
            <button
              key={period.id}
              onClick={() => setCurrentPeriodId(period.id)}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all text-xs",
                isActive
                  ? "bg-primary/20 border border-primary/50"
                  : "bg-muted/30 border border-transparent hover:border-border"
              )}
            >
              <span>{period.emoji}</span>
              <span className={cn("font-mono", isActive ? "text-primary" : "text-muted-foreground")}>
                {done}/{period.quests.length}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
