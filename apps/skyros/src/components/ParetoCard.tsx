import styles from './ParetoCard.module.css';

interface ParetoCardProps {
  title: string;
  score: number;
  decision: 'EXECUTE' | 'DELEGATE_TO_SKYDRA' | 'CUT_ELIMINATE';
  impacto: number;
  vontade: number;
  esforco: number;
  category?: string;
  onComplete?: () => void;
}

const decisionLabels: Record<string, { label: string; class: string }> = {
  EXECUTE: { label: 'Executar', class: 'execute' },
  DELEGATE_TO_SKYDRA: { label: 'Delegar', class: 'delegate' },
  CUT_ELIMINATE: { label: 'Cortar', class: 'cut' },
};

export default function ParetoCard({
  title,
  score,
  decision,
  impacto,
  vontade,
  esforco,
  category,
  onComplete,
}: ParetoCardProps) {
  const info = decisionLabels[decision] || decisionLabels.EXECUTE;
  const scorePercent = Math.min((score / 10) * 100, 100);

  return (
    <div className={`${styles.card} ${styles[info.class]}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={`badge badge-${info.class}`}>{info.label}</span>
      </div>

      <div className={styles.scoreBar}>
        <div className={styles.scoreTrack}>
          <div
            className={styles.scoreFill}
            style={{ width: `${scorePercent}%` }}
          />
        </div>
        <span className={`${styles.scoreValue} mono`}>{score}</span>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Impacto</span>
          <span className={styles.metricValue}>{impacto}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Vontade</span>
          <span className={styles.metricValue}>{vontade}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Esforço</span>
          <span className={styles.metricValue}>{esforco}</span>
        </div>
      </div>

      {category && (
        <span className={styles.category}>{category}</span>
      )}

      {decision === 'EXECUTE' && onComplete && (
        <button className={`btn btn-primary ${styles.completeBtn}`} onClick={onComplete}>
          ✓ Concluir
        </button>
      )}
    </div>
  );
}
