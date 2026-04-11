import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Quest {
  id: string;
  title: string;
  xpReward: number;
  completed: boolean;
}

export interface QuestBlock {
  id: string;
  name: string;
  time: string;
  icon: any;
  quests: Quest[];
}

export function useSharedBrain() {
  const [xp, setXp] = useState(0);
  const [focoGems, setFocoGems] = useState(0);
  const [streak, setStreak] = useState(0);
  const [realCoins, setRealCoins] = useState(0); // R$ faturado real
  const [growSeeds, setGrowSeeds] = useState(0);
  const [skillPoints, setSkillPoints] = useState<Record<string, number>>({}); // skill_id -> level
  const [availableAttributePoints, setAvailableAttributePoints] = useState(0);

  const level = Math.floor(xp / 100);

  // Calculate used attribute points from skill levels
  const usedPoints = Object.values(skillPoints).reduce((a, b) => a + b, 0);

  useEffect(() => {
    async function loadState() {
      // Load quest completions
      const { data: questEvents } = await supabase
        .from("kairos_events")
        .select("*")
        .eq("event_type", "quest_completed");

      if (questEvents) {
        let totalXp = 0;
        let totalFoco = 0;
        let totalSeeds = 0;

        questEvents.forEach((evt) => {
          const { rewardType, amount } = evt.payload ?? {};
          if (rewardType === "XP") totalXp += amount;
          if (rewardType === "GEMS") totalFoco += amount;
          if (rewardType === "SEEDS") totalSeeds += amount;
        });

        setXp(totalXp);
        setFocoGems(totalFoco);
        setGrowSeeds(totalSeeds);

        // Available attribute points = level - usedPoints (calculated after state updates)
        const currentLevel = Math.floor(totalXp / 100);
        const currentUsed = Object.values(skillPoints).reduce((a, b) => a + b, 0);
        setAvailableAttributePoints(Math.max(0, currentLevel - currentUsed));
      }

      // Load real coins (R$ faturado)
      const { data: coinEvents } = await supabase
        .from("kairos_events")
        .select("*")
        .eq("event_type", "real_coin_earned");

      if (coinEvents) {
        const total = coinEvents.reduce((acc, e) => acc + (e.payload?.amount ?? 0), 0);
        setRealCoins(total);
      }

      // Load skill allocations
      const { data: skillEvents } = await supabase
        .from("kairos_events")
        .select("*")
        .eq("event_type", "skill_point_allocated");

      if (skillEvents) {
        const points: Record<string, number> = {};
        skillEvents.forEach((e) => {
          const sid = e.payload?.skillId;
          if (sid) points[sid] = (points[sid] ?? 0) + 1;
        });
        setSkillPoints(points);
      }

      // Load streak from last consecutive days
      const { data: streakEvents } = await supabase
        .from("kairos_events")
        .select("*")
        .eq("event_type", "night_checkin")
        .order("created_at", { ascending: false })
        .limit(30);

      if (streakEvents && streakEvents.length > 0) {
        let s = 0;
        const today = new Date();
        for (let i = 0; i < streakEvents.length; i++) {
          const d = new Date(streakEvents[i].created_at);
          const diff = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
          if (diff === i) s++;
          else break;
        }
        setStreak(s);
      }
    }

    loadState();
  }, []);

  const completeQuest = async (questId: string, rewardType: string, amount: number) => {
    if (rewardType === "XP") setXp((prev) => prev + amount);
    if (rewardType === "GEMS") setFocoGems((prev) => prev + amount);
    if (rewardType === "SEEDS") setGrowSeeds((prev) => prev + amount);

    await supabase.from("kairos_events").insert({
      event_type: "quest_completed",
      agent_id: "gabriel-os",
      machine: "pgt-ui",
      payload: { questId, rewardType, amount, timestamp: new Date().toISOString() },
    });
  };

  const addRealCoin = async (amount: number, source: string) => {
    setRealCoins((prev) => prev + amount);
    await supabase.from("kairos_events").insert({
      event_type: "real_coin_earned",
      agent_id: "gabriel-os",
      machine: "pgt-ui",
      payload: { amount, source, timestamp: new Date().toISOString() },
    });
  };

  const allocateSkillPoint = async (skillId: string) => {
    const currentLevel = Math.floor(xp / 100);
    const currentUsed = Object.values(skillPoints).reduce((a, b) => a + b, 0);
    if (currentUsed >= currentLevel) return; // no points available

    setSkillPoints((prev) => ({ ...prev, [skillId]: (prev[skillId] ?? 0) + 1 }));
    setAvailableAttributePoints((prev) => Math.max(0, prev - 1));

    await supabase.from("kairos_events").insert({
      event_type: "skill_point_allocated",
      agent_id: "gabriel-os",
      machine: "pgt-ui",
      payload: { skillId, timestamp: new Date().toISOString() },
    });
  };

  return {
    xp,
    level,
    focoGems,
    streak,
    realCoins,
    growSeeds,
    skillPoints,
    availableAttributePoints: Math.max(0, level - usedPoints),
    paretoDecisions: { genialidade: 0, excelencia: 0, impacto: 0, vortex: 0 },
    completeQuest,
    addRealCoin,
    allocateSkillPoint,
  };
}
