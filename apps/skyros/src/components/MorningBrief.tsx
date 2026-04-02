import styles from './MorningBrief.module.css';

interface MorningBriefProps {
  mission: string | null;
  secondaryTasks: string[];
  isCompleted: boolean;
  onComplete?: () => void;
}

export default function MorningBrief({
  mission,
  secondaryTasks,
  isCompleted,
  onComplete,
}: MorningBriefProps) {
  if (!mission) {
    return (
      <div className={`${styles.brief} ${styles.empty}`}>
        <div className={styles.emptyIcon}>◈</div>
        <h2>Bom dia, Operador.</h2>
        <p className={styles.emptyText}>
          Nenhum Morning Brief definido para hoje. 
          Vá à <strong>Mesa de Triagem</strong> para criar suas tarefas.
        </p>
      </div>
    );
  }

  return (
    <div className={`${styles.brief} ${isCompleted ? styles.completed : ''}`}>
      <div className={styles.header}>
        <span className={styles.tag}>⚡ MISSÃO PARETO DO DIA</span>
        {isCompleted && <span className={`badge badge-execute`}>✓ Concluída</span>}
      </div>
      <h2 className={styles.mission}>{mission}</h2>
      {secondaryTasks.length > 0 && (
        <div className={styles.secondary}>
          <span className={styles.secondaryLabel}>Tarefas secundárias:</span>
          <ul className={styles.secondaryList}>
            {secondaryTasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </div>
      )}
      {!isCompleted && onComplete && (
        <button className="btn btn-primary" onClick={onComplete}>
          Missão Cumprida ✓
        </button>
      )}
    </div>
  );
}
