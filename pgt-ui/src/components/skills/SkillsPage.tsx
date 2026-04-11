import { useState } from "react";
import { Brain, Zap, Target, Mic, Lightbulb, TrendingUp, Bot, Plus, Lock, ChevronRight, Star, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSharedBrain } from "../../hooks/useSharedBrain";

interface SkillNode {
  id: string;
  name: string;
  emoji: string;
  description: string;
  zone: "genius" | "excellence" | "impact";
  color: string;
  borderColor: string;
  maxLevel: number;
  icon: typeof Brain;
  unlocks: string[]; // what you unlock at each level (index 0 = level 1, etc.)
  children?: string[]; // skill IDs that this skill unlocks access to
  requires?: string; // skill ID required to unlock this skill
}

const skillTree: SkillNode[] = [
  // ═══ RAIZ — GENIALIDADE 🔵
  {
    id: "voice",
    name: "Voz & Comunicação",
    emoji: "🎙️",
    description: "A arma primária. Herdada da mãe locutora. Reconhecida por todos.",
    zone: "genius",
    color: "text-blue-400",
    borderColor: "border-blue-500/50",
    maxLevel: 5,
    icon: Mic,
    artUrl: "/skills/voice.png",
    unlocks: [
      "Nível 1 — Narrar demos e vídeos para a Experia",
      "Nível 2 — Gravar auto-hipnose guiada com a própria voz",
      "Nível 3 — Canal de voz (YouTube / podcast)",
      "Nível 4 — Produtos monetizados de narração",
      "Nível 5 — THE WAY OF THE VOICE (Dragonborn Mode)",
    ],
    children: ["hypnosis"],
  },
  {
    id: "architecture",
    name: "Arquitetura de Sistemas",
    emoji: "🏗️",
    description: "Construir pontes entre IA e negócios reais. Só Gabriel faz desse jeito.",
    zone: "genius",
    color: "text-blue-400",
    borderColor: "border-blue-500/50",
    maxLevel: 5,
    icon: Lightbulb,
    artUrl: "/skills/architecture.png",
    unlocks: [
      "Nível 1 — Mapear processos de clientes (Bilhon Chronicles)",
      "Nível 2 — Desenhar squads de agentes por departamento",
      "Nível 3 — Quality Gates + Handoff automático",
      "Nível 4 — Dashboard de governança para cliente",
      "Nível 5 — KAIROS SKY multi-tenant (escalável sem Gabriel)",
    ],
    children: ["agentification"],
  },

  // ═══ DEPENDENTES — GENIALIDADE
  {
    id: "hypnosis",
    name: "Domínio do Subconsciente",
    emoji: "🌀",
    description: "A chave trancada. Bypass via sistema externo (KAIROS).",
    zone: "genius",
    color: "text-purple-400",
    borderColor: "border-purple-500/50",
    maxLevel: 5,
    icon: Brain,
    artUrl: "", // Icebox
    requires: "voice",
    unlocks: [
      "Nível 1 — Auto-hipnose leve (5min diários)",
      "Nível 2 — Protocolo anti-procrastinação personalizado",
      "Nível 3 — Flow state on demand (30min+ 🔵)",
      "Nível 4 — Hipnose para outros (produto terapêutico)",
      "Nível 5 — Domínio pleno do subconsciente",
    ],
  },

  // ═══ RAIZ — EXCELÊNCIA 🟢
  {
    id: "agentification",
    name: "Agentificação",
    emoji: "🤖",
    description: "KAIROS, AIOS, fluxos multi-agente. IA como equipe infinita.",
    zone: "excellence",
    color: "text-green-400",
    borderColor: "border-green-500/50",
    maxLevel: 5,
    icon: Bot,
    artUrl: "/skills/agent.png",
    requires: "architecture",
    unlocks: [
      "Nível 1 — Configurar agentes básicos KAIROS",
      "Nível 2 — Multi-agente flows (Worker + Analyst)",
      "Nível 3 — KAIROS SKY 24/7 autônomo (Railway/free tier)",
      "Nível 4 — Squad builder Experia (4 executores)",
      "Nível 5 — God Pool + Multi-LLM routing soberano",
    ],
  },
  {
    id: "sales",
    name: "Vendas & Fechamento",
    emoji: "🎯",
    description: "Cold approach, pitch, proposta, fechar. O Bilhon Chronicles na prática.",
    zone: "excellence",
    color: "text-green-400",
    borderColor: "border-green-500/50",
    maxLevel: 5,
    icon: Target,
    artUrl: "/skills/sales.png",
    unlocks: [
      "Nível 1 — Script de abordagem local pronto + 1ª visita",
      "Nível 2 — Cold call com case documentado",
      "Nível 3 — Demo regional fechada",
      "Nível 4 — Proposta industrial (Master Pumps)",
      "Nível 5 — Master Pumps: contrato R$10K+ assinado",
    ],
  },

  // ═══ RAIZ — IMPACTO 🟡
  {
    id: "execution",
    name: "Execução Disciplinada",
    emoji: "⚡",
    description: "Anti-procrastinação, Pareto Score, streak. O gargalo histórico quebrado.",
    zone: "impact",
    color: "text-yellow-400",
    borderColor: "border-yellow-500/50",
    maxLevel: 5,
    icon: Zap,
    artUrl: "/skills/execution.png",
    unlocks: [
      "Nível 1 — RITUAL completo por 7 dias seguidos",
      "Nível 2 — Primeiro Streak Shield conquistado",
      "Nível 3 — Pareto Score >30% por uma semana",
      "Nível 4 — Missão 🔵 concluída 5 dias seguidos",
      "Nível 5 — MODO DE GUERRA dominado (T1 encerrada)",
    ],
    children: ["sales"],
  },
  {
    id: "growth",
    name: "Crescimento Perpétuo",
    emoji: "📚",
    description: "Estudo que expande a Zona de Genialidade. SEEDS = sementes do futuro.",
    zone: "impact",
    color: "text-yellow-400",
    borderColor: "border-yellow-500/50",
    maxLevel: 5,
    icon: TrendingUp,
    artUrl: "", // Icebox
    unlocks: [
      "Nível 1 — 5 sessões de estudo/semana (Academia)",
      "Nível 2 — Método de idiomas via IA (inglês MVP)",
      "Nível 3 — Mentor IA tier (Alan Nicolas style)",
      "Nível 4 — Academia Gamer prototipada",
      "Nível 5 — Liberdade do aprendizado perpétuo",
    ],
  },
];

const zoneConfig = {
  genius: { label: "🔵 Genialidade", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  excellence: { label: "🟢 Excelência", bg: "bg-green-500/10", border: "border-green-500/30" },
  impact: { label: "🟡 Impacto", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
};

export function SkillsPage() {
  const { skillPoints, availableAttributePoints, level, allocateSkillPoint } = useSharedBrain();
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getSkillLevel = (id: string) => skillPoints[id] ?? 0;

  const canAllocate = (skill: SkillNode) => {
    if (availableAttributePoints <= 0) return false;
    if (getSkillLevel(skill.id) >= skill.maxLevel) return false;
    if (skill.requires) {
      const reqLevel = getSkillLevel(skill.requires);
      if (reqLevel < 1) return false; // requerer pelo menos nível 1
    }
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-secondary glow-gold flex items-center gap-3">
            <TrendingUp className="w-8 h-8" />
            Skill Tree — Árvore de Habilidades
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Baseada nos padrões da Anamnesis · Pareto Cubed · Zona de Genialidade
          </p>
        </div>

        {/* Attribute Points Counter */}
        <div className={cn(
          "glass-card px-6 py-4 text-center border",
          availableAttributePoints > 0 ? "border-yellow-400/50 bg-yellow-500/10" : "border-border"
        )}>
          <div className={cn(
            "font-display text-3xl",
            availableAttributePoints > 0 ? "text-yellow-400 glow-gold" : "text-muted-foreground"
          )}>
            {availableAttributePoints}
          </div>
          <div className="text-xs text-muted-foreground font-mono mt-1">PONTOS DISPONÍVEIS</div>
          <div className="text-xs text-muted-foreground/60 mt-1">Level {level} · {level - availableAttributePoints} usados</div>
          {availableAttributePoints > 0 && (
            <div className="text-xs text-yellow-400 mt-1 animate-pulse">▼ Aloque nas skills</div>
          )}
        </div>
      </div>

      {/* Zone legend */}
      <div className="flex gap-4">
        {Object.entries(zoneConfig).map(([z, cfg]) => (
          <div key={z} className={cn("px-3 py-1.5 rounded-lg text-xs font-mono border", cfg.bg, cfg.border)}>
            {cfg.label}
          </div>
        ))}
        <div className="px-3 py-1.5 rounded-lg text-xs font-mono border border-border text-muted-foreground">
          <Lock className="w-3 h-3 inline mr-1" />Requer skill pré-requisito
        </div>
      </div>

      {/* Skill Grid */}
      <div className="grid grid-cols-3 gap-6">
        {skillTree.map((skill) => {
          const currentLevel = getSkillLevel(skill.id);
          const isLocked = skill.requires && getSkillLevel(skill.requires) < 1;
          const canAdd = canAllocate(skill);
          const isSelected = selectedSkill?.id === skill.id;
          const Icon = skill.icon;
          
          // Cast the interface to allow artUrl if TS complains, or better to use type assertion
          // Wait, I updated the interface above too? NO! I didn't replace lines 6-20! I will do that in the next tool call.

          return (
            <div key={skill.id} className="flex flex-col gap-3">
              {/* Skill card */}
              <button
                onClick={() => setSelectedSkill(isSelected ? null : skill)}
                onMouseEnter={() => setHoveredNode(skill.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={cn(
                  "relative p-5 rounded-xl border-2 text-left transition-all duration-300 overflow-hidden group",
                  isLocked ? "opacity-40 cursor-not-allowed border-muted bg-muted/10" : "",
                  !isLocked && isSelected ? `${skill.borderColor} bg-muted/20` : "",
                  !isLocked && !isSelected ? `border-border hover:${skill.borderColor} hover:bg-muted/10` : "",
                )}
                disabled={isLocked as boolean}
              >
                {/* Blizzard Art Wrap Background */}
                {(skill as any).artUrl && !isLocked && (
                  <>
                    <div className="absolute inset-0 z-0">
                      <img src={(skill as any).artUrl} alt={skill.name} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/20 z-0 pointer-events-none" />
                  </>
                )}

                <div className="relative z-10">
                  {/* Lock overlay */}
                  {isLocked && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}

                  {/* Zone badge */}
                  <div className={cn(
                    "text-xs font-mono px-2 py-0.5 rounded w-fit mb-3",
                    zoneConfig[skill.zone].bg,
                    zoneConfig[skill.zone].border,
                    "border"
                  )}>
                    {zoneConfig[skill.zone].label}
                  </div>

                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn("w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-lg")}>
                      {skill.emoji}
                    </div>
                    <div>
                      <h3 className={cn("font-medium", skill.color, "glow-gold")}>{skill.name}</h3>
                      {skill.requires && (
                        <p className="text-xs text-muted-foreground/60 font-mono">
                          Requer: {skillTree.find(s => s.id === skill.requires)?.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{skill.description}</p>

                {/* Level Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: skill.maxLevel }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4 transition-all",
                        i < currentLevel ? skill.color : "text-muted-foreground/30"
                      )}
                      fill={i < currentLevel ? "currentColor" : "none"}
                    />
                  ))}
                  <span className={cn("ml-2 text-sm font-mono", skill.color)}>
                    {currentLevel}/{skill.maxLevel}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500",
                      skill.zone === "genius" ? "bg-blue-400" :
                      skill.zone === "excellence" ? "bg-green-400" : "bg-yellow-400"
                    )}
                    style={{ width: `${(currentLevel / skill.maxLevel) * 100}%` }}
                  />
                </div>

                {/* Current unlock */}
                {currentLevel > 0 && (
                  <div className="text-xs text-muted-foreground bg-muted/30 rounded px-2 py-1 mb-2">
                    ✓ {skill.unlocks[currentLevel - 1]}
                  </div>
                )}

                {/* Next unlock */}
                {currentLevel < skill.maxLevel && (
                  <div className={cn("text-xs rounded px-2 py-1",
                    canAdd ? `${skill.color} bg-muted/20` : "text-muted-foreground/50"
                  )}>
                    → {skill.unlocks[currentLevel]}
                  </div>
                )}

                {/* Allocate button */}
                {!isLocked && canAdd && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      allocateSkillPoint(skill.id);
                    }}
                    className={cn(
                      "mt-4 w-full py-2 rounded-lg flex items-center justify-center gap-2 font-medium text-sm transition-all",
                      "bg-yellow-500/20 hover:bg-yellow-500/40 border border-yellow-500/50 text-yellow-400"
                    )}
                  >
                    <Plus className="w-4 h-4" />
                    Alocar Ponto
                  </button>
                )}

                {!isLocked && !canAdd && currentLevel >= skill.maxLevel && (
                  <div className="mt-4 w-full py-2 rounded-lg text-center text-xs font-mono text-secondary border border-secondary/30">
                    ✦ SKILL MÁXIMA
                  </div>
                )}
                </div>
              </button>


              {/* Arrow to children */}
              {skill.children && skill.children.length > 0 && currentLevel > 0 && (
                <div className="flex justify-center">
                  <ChevronRight className={cn("w-5 h-5 rotate-90", skill.color)} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Panel */}
      {selectedSkill && (
        <div className={cn(
          "glass-card p-6 border-2 animate-fade-in",
          selectedSkill.borderColor
        )}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{selectedSkill.emoji}</span>
            <div>
              <h3 className={cn("font-display text-xl", selectedSkill.color)}>{selectedSkill.name}</h3>
              <p className="text-xs text-muted-foreground font-mono">{zoneConfig[selectedSkill.zone].label}</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {selectedSkill.unlocks.map((unlock, i) => {
              const thisLevel = i + 1;
              const currentLevel = getSkillLevel(selectedSkill.id);
              const isAchieved = currentLevel >= thisLevel;
              const isCurrent = currentLevel === i;

              return (
                <div key={i} className={cn(
                  "p-4 rounded-lg border text-center transition-all",
                  isAchieved
                    ? `${selectedSkill.borderColor} bg-muted/20`
                    : isCurrent && availableAttributePoints > 0
                    ? "border-yellow-500/50 bg-yellow-500/10"
                    : "border-border bg-muted/10 opacity-60"
                )}>
                  <div className="flex justify-center mb-2">
                    <Star
                      className={cn("w-5 h-5", isAchieved ? selectedSkill.color : "text-muted-foreground/30")}
                      fill={isAchieved ? "currentColor" : "none"}
                    />
                  </div>
                  <div className={cn("text-xs font-mono mb-1", isAchieved ? selectedSkill.color : "text-muted-foreground")}>
                    NÍVEL {thisLevel}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {unlock.replace(`Nível ${thisLevel} — `, "")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mindclone Audit Note */}
      <div className="glass-card p-4 border border-blue-500/20 bg-blue-500/5">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-blue-400 font-mono">AUDITORIA GAMIFICAÇÃO (Hormozi + Naval + Tencent mechanics):</span>{" "}
            Skills refletem alavancagem real — cada nível desbloqueado tem impacto tangível na vida e na Experia.
            Pontos de atributo = 1 por level-up. Variable reward + completion pull embutidos.
            Streak Shield disponível (1/semana) protege o progresso sem punição.
          </div>
        </div>
      </div>
    </div>
  );
}
