import { useState } from "react";
import { Moon, Send, Star, CheckSquare, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Grade = "A" | "B" | "C" | "D" | "F" | null;

const gradeConfig: Record<string, { label: string; color: string; description: string }> = {
  A: { label: "A", color: "text-green-400 border-green-400", description: "Missão 🔵 concluída + pelo menos 2 do RAID" },
  B: { label: "B", color: "text-blue-400 border-blue-400", description: "Sem missão 🔵, mas boas entregas" },
  C: { label: "C", color: "text-yellow-400 border-yellow-400", description: "Parcial — mais da metade feito" },
  D: { label: "D", color: "text-orange-400 border-orange-400", description: "Pouco executado — mas apareceu" },
  F: { label: "F", color: "text-red-400 border-red-400", description: "Não entrei no jogo hoje" },
};

interface JournalEntry {
  id: string;
  date: string;
  grade: Grade;
  recap: string;
  blocker: string;
  oneThing: string;
  tomorrowMission: string;
  saved: boolean;
}

export function Sanctuary() {
  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const todayKey = new Date().toISOString().split("T")[0];

  const [grade, setGrade] = useState<Grade>(null);
  const [recap, setRecap] = useState("");
  const [blocker, setBlocker] = useState("");
  const [oneThing, setOneThing] = useState("");
  const [tomorrowMission, setTomorrowMission] = useState("");
  const [saved, setSaved] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<JournalEntry[]>([]);

  const handleSave = async () => {
    if (!grade || !recap || !oneThing || !tomorrowMission) return;

    const entry = {
      event_type: "night_checkin",
      agent_id: "gabriel-os",
      machine: "pgt-ui",
      payload: {
        date: todayKey,
        grade,
        recap,
        blocker,
        oneThing,
        tomorrowMission,
        timestamp: new Date().toISOString(),
      },
    };

    const { error } = await supabase.from("kairos_events").insert(entry);
    if (!error) {
      setSaved(true);
      setHistory(prev => [{
        id: Date.now().toString(),
        date: todayKey,
        grade,
        recap,
        blocker,
        oneThing,
        tomorrowMission,
        saved: true,
      }, ...prev]);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl text-secondary glow-gold flex items-center gap-3">
          <Moon className="w-8 h-8" />
          Santuário
        </h2>
        <p className="text-muted-foreground text-sm">{today} · Recap e planejamento de amanhã</p>
      </div>

      {saved ? (
        <div className="glass-card p-8 text-center animate-fade-in">
          <Star className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="font-serif text-xl text-secondary">Dia registrado.</h3>
          <p className="text-muted-foreground mt-2">Nota do dia: <span className="font-mono text-2xl text-secondary">{grade}</span></p>
          <p className="text-muted-foreground text-sm mt-2">Missão de amanhã: <span className="text-foreground">{tomorrowMission}</span></p>
          <p className="text-xs text-muted-foreground mt-4 font-mono">KAIROS recebeu. Boa noite.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Grade do Dia */}
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="font-serif text-lg mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-secondary" />
              1. Nota do Dia
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {(Object.keys(gradeConfig) as Grade[]).map(g => {
                const cfg = gradeConfig[g as string];
                return (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      grade === g
                        ? cfg.color + " bg-muted/30"
                        : "border-border text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    <div className="text-2xl font-mono font-bold">{cfg.label}</div>
                    <div className="text-xs mt-1 leading-tight">{cfg.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recap do Dia */}
          <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h3 className="font-serif text-lg mb-4">2. Recap do Dia</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  O que aconteceu? O que executei?
                </label>
                <textarea
                  value={recap}
                  onChange={e => setRecap(e.target.value)}
                  placeholder="Resumo honesto do dia — sem filtro..."
                  rows={3}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:border-purple-glow/50 transition-colors resize-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  O que travou? (1 palavra ou frase curta)
                </label>
                <input
                  type="text"
                  value={blocker}
                  onChange={e => setBlocker(e.target.value)}
                  placeholder="Ex: dopamina, cansaço, travei no início..."
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:border-purple-glow/50 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  ⭐ 1 coisa boa do dia (obrigatório — sempre tem uma)
                </label>
                <input
                  type="text"
                  value={oneThing}
                  onChange={e => setOneThing(e.target.value)}
                  placeholder="Pode ser pequena. Mas foi boa."
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:border-yellow-500/50 transition-colors text-sm"
                />
              </div>
            </div>
          </div>

          {/* Missão de Amanhã */}
          <div className="glass-card p-6 animate-fade-in border-blue-500/20" style={{ animationDelay: "200ms" }}>
            <h3 className="font-serif text-lg mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              3. 🔵 Missão de Amanhã (Pareto 0.8%)
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Se você só pudesse fazer UMA coisa amanhã que move o jogo permanentemente — qual seria?
            </p>
            <input
              type="text"
              value={tomorrowMission}
              onChange={e => setTomorrowMission(e.target.value)}
              placeholder="1 frase. Específica. Concreta. Só você pode fazer desse jeito."
              className="w-full px-4 py-3 bg-muted/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-400/70 transition-colors text-sm"
            />
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={!grade || !recap || !oneThing || !tomorrowMission}
            className="w-full py-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 border border-secondary/50 text-secondary font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            Salvar Recap — Fechar o Dia
          </button>
        </div>
      )}

      {/* Histórico */}
      {history.length > 0 && (
        <div className="glass-card p-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 w-full text-left"
          >
            <Moon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-mono text-muted-foreground">Histórico ({history.length})</span>
            {showHistory ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
          </button>

          {showHistory && (
            <div className="mt-4 space-y-3">
              {history.map(entry => (
                <div key={entry.id} className="p-3 bg-muted/20 rounded-lg text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-muted-foreground">{entry.date}</span>
                    <span className={`font-mono font-bold ${gradeConfig[entry.grade as string]?.color ?? ""}`}>
                      {entry.grade}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">{entry.recap}</p>
                  <p className="text-blue-400 text-xs mt-1">→ {entry.tomorrowMission}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
