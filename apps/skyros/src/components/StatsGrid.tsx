import styles from './StatsGrid.module.css';

interface StatsGridProps {
  stats: {
    totalTasks: number;
    pendingTasks: number;
    doneTasks: number;
    avgScore: number;
    level: number;
    xp: number;
    streak: number;
    rank: string;
  };
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    { label: 'Tarefas Ativas', value: stats.pendingTasks, icon: '⚡', color: 'cyan' },
    { label: 'Concluídas', value: stats.doneTasks, icon: '✓', color: 'emerald' },
    { label: 'Score Médio', value: stats.avgScore.toFixed(1), icon: '◈', color: 'violet' },
    { label: 'Nível', value: `${stats.level}`, icon: '★', color: 'amber', sub: stats.rank },
    { label: 'XP Total', value: stats.xp, icon: '⬆', color: 'cyan' },
    { label: 'Streak', value: `${stats.streak}d`, icon: '🔥', color: 'amber' },
  ];

  return (
    <div className={`${styles.grid} stagger`}>
      {statItems.map((item) => (
        <div key={item.label} className={`${styles.card} ${styles[item.color]}`}>
          <div className={styles.cardHeader}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
          <div className={styles.value}>{item.value}</div>
          {item.sub && <div className={styles.sub}>{item.sub}</div>}
        </div>
      ))}
    </div>
  );
}
