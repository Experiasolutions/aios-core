import { useState, useEffect } from "react";
import { Sun, Flame, Zap, BookOpen, Moon, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSharedBrain } from "../../hooks/useSharedBrain";

interface Quest {
  id: string;
  title: string;
  rewardType: 'XP' | 'GEMS' | 'SEEDS';
  rewardAmount: number;
  completed: boolean;
}

interface QuestBlock {
  id: string;
  name: string;
  time: string;
  icon: any;
  quests: Quest[];
}

const gabrielOSBlocks: QuestBlock[] = [
  {
    id: "aurora",
    name: "AURORA ☀️",
    time: "06:30 - 09:00",
    icon: Sun,
    quests: [
      { id: "a1", title: "Acordar ≤ 07:30", rewardType: 'XP', rewardAmount: 10, completed: false },
      { id: "a2", title: "Movimento Corporal (≥15min)", rewardType: 'XP', rewardAmount: 10, completed: false },
      { id: "a3", title: "Silêncio/Intenção (5min)", rewardType: 'XP', rewardAmount: 10, completed: false },
      { id: "a4", title: "1 Tarefa Doméstica", rewardType: 'XP', rewardAmount: 10, completed: false },
    ],
  },
  {
    id: "raid1",
    name: "RAID I ⚔️ (Genialidade)",
    time: "09:00 - 12:30",
    icon: Flame,
    quests: [
      { id: "r1-1", title: "A Única Coisa (Pareto 0.8%)", rewardType: 'GEMS', rewardAmount: 50, completed: false },
      { id: "r1-2", title: "Deep Work Isolado (≥90min)", rewardType: 'GEMS', rewardAmount: 30, completed: false },
    ],
  },
  {
    id: "raid2",
    name: "RAID II ⚡ (Excelência)",
    time: "13:30 - 17:30",
    icon: Zap,
    quests: [
      { id: "r2-1", title: "Entregável Concreto do Dia", rewardType: 'GEMS', rewardAmount: 25, completed: false },
      { id: "r2-2", title: "Prospecção / Vendas (1x)", rewardType: 'GEMS', rewardAmount: 20, completed: false },
      { id: "r2-3", title: "Batch Impacto (30min folow-ups)", rewardType: 'XP', rewardAmount: 15, completed: false },
    ],
  },
  {
    id: "academia",
    name: "ACADEMIA 📚",
    time: "17:30 - 19:00",
    icon: BookOpen,
    quests: [
      { id: "ac1", title: "Estudo Focado (IA/Inglês/Cloud)", rewardType: 'SEEDS', rewardAmount: 30, completed: false },
    ],
  },
  {
    id: "santuario",
    name: "SANTUÁRIO 🌙",
    time: "20:30 - 22:30",
    icon: Moon,
    quests: [
      { id: "s1", title: "Journaling (≥5min)", rewardType: 'XP', rewardAmount: 15, completed: false },
      { id: "s2", title: "Planejamento de Amanhã", rewardType: 'XP', rewardAmount: 10, completed: false },
    ],
  },
];

export function DailyQuestTracker() {
  const { completeQuest, xp, focoGems, streak } = useSharedBrain();
  const [blocks, setBlocks] = useState<QuestBlock[]>(gabrielOSBlocks);
  const [localStreak, setLocalStreak] = useState(streak);

  useEffect(() => {
    // Sync streak when loaded from brain
    if (streak > 0) setLocalStreak(streak);
  }, [streak]);

  const toggleQuest = async (blockId: string, questId: string) => {
    // Find quest
    let targetQuest: Quest | null = null;
    
    const newBlocks = blocks.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          quests: block.quests.map(quest => {
            if (quest.id === questId) {
              targetQuest = quest;
              return { ...quest, completed: !quest.completed };
            }
            return quest;
          }),
        };
      }
      return block;
    });

    setBlocks(newBlocks);

    // Persist if checking (not unchecking)
    if (targetQuest !== null && !targetQuest!.completed) {
      await completeQuest(questId, targetQuest!.rewardType, targetQuest!.rewardAmount);
    }
  };

  const totalQuests = blocks.reduce((acc, block) => acc + block.quests.length, 0);
  const completedQuests = blocks.reduce((acc, block) => 
    acc + block.quests.filter(q => q.completed).length, 0);
  const dailyProgress = (completedQuests / totalQuests) * 100;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-secondary glow-gold">Rotina KAIROS</h2>
          <p className="text-muted-foreground">Sistema RPG (Pareto Cubed v3.0)</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 glass-card px-4 py-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-mono text-lg">{localStreak} dias</span>
          </div>

          <div className="flex items-center gap-2 glass-card px-4 py-2 border-green-500/30">
            <span className="font-bold text-green-400">{xp} XP</span>
          </div>
          
          <div className="w-48">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progresso Diário</span>
              <span className="text-secondary">{completedQuests}/{totalQuests}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill-gold" style={{ width: `${dailyProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Quest Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {blocks.map((block, blockIndex) => (
          <div 
            key={block.id} 
            className="glass-card p-6 animate-fade-in"
            style={{ animationDelay: `${blockIndex * 150}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <block.icon className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-serif text-lg">{block.name}</h3>
                <p className="text-xs text-muted-foreground">{block.time}</p>
              </div>
            </div>

            <div className="space-y-3">
              {block.quests.map((quest) => (
                <button
                  key={quest.id}
                  onClick={() => toggleQuest(block.id, quest.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-all duration-300",
                    quest.completed 
                      ? "bg-green-500/10 border-green-500/30" 
                      : "bg-muted/30 border-border hover:border-secondary/30"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {quest.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-medium",
                        quest.completed && "line-through text-muted-foreground"
                      )}>
                        {quest.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Zap className="w-3 h-3 text-purple-glow" />
                        <span className="text-xs text-purple-glow">+{quest.rewardAmount} {quest.rewardType}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
