import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DailyQuestTracker } from "@/components/quests/DailyQuestTracker";
import { BossRoom } from "@/components/bosses/BossRoom";
import { LootShop } from "@/components/loot/LootShop";
import { Sanctuary } from "@/components/sanctuary/Sanctuary";
import { AgendaCalendar } from "@/components/agenda/AgendaCalendar";
import { SkillsPage } from "@/components/skills/SkillsPage";
import { QuestlinesPage } from "@/components/questlines/QuestlinesPage";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedQuestline, setExpandedQuestline] = useState<string | null>(null);

  const handleQuestlineClick = (questlineId: string) => {
    setExpandedQuestline(questlineId);
    setActiveSection("questlines");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onQuestlineClick={handleQuestlineClick} />;
      case "agenda":
        return <AgendaCalendar />;
      case "quests":
        return <DailyQuestTracker />;
      case "questlines":
        return <QuestlinesPage expandedId={expandedQuestline} />;
      case "skills":
        return <SkillsPage />;
      case "bosses":
        return <BossRoom />;
      case "loot":
        return <LootShop />;
      case "sanctuary":
        return <Sanctuary />;
      default:
        return <Dashboard onQuestlineClick={handleQuestlineClick} />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-8 overflow-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Index;
