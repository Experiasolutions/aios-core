'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './checkin.module.css';

export default function CheckinPage() {
  const router = useRouter();
  const [energy, setEnergy] = useState(5);
  const [paretoScore, setParetoScore] = useState(50);
  const [victories, setVictories] = useState('');
  const [bottlenecks, setBottlenecks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const parentDate = new Date().toISOString().split('T')[0];
      const res = await fetch('/api/night-checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetDate: parentDate,
          energyLevel: energy,
          paretoScore,
          victories,
          bottlenecks
        })
      });

      if (res.ok) {
        router.push('/');
      }
    } catch (err) {
      console.error('Checkin erro:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="page-title">Night Check-in</h1>
        <p className="subtitle">Conclua o dia, preserve o momentum e identifique gargalos.</p>
      </div>

      <div className={`${styles.card} animate-in glass-card`}>
        <form onSubmit={handleSubmit} className={styles.form}>
          
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <div className={styles.sliderHeader}>
                <label>Nível de Energia Final</label>
                <span className="mono">{energy}/10</span>
              </div>
              <input 
                type="range" min="1" max="10" 
                value={energy} 
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className={styles.rangeEner}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.sliderHeader}>
                <label>Pareto Score Diário (%)</label>
                <span className="mono">{paretoScore}%</span>
              </div>
              <input 
                type="range" min="0" max="100" step="5"
                value={paretoScore} 
                onChange={(e) => setParetoScore(parseInt(e.target.value))}
                className={styles.rangePareto}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Vitórias do Dia (Ganhos 20/80)</label>
            <textarea 
              rows={4}
              placeholder="O que deu muito certo com pouco esforço hoje?"
              value={victories}
              onChange={(e) => setVictories(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Gargalos / Alertas de Entropia</label>
            <textarea 
              rows={4}
              placeholder="Onde o sistema falhou ou causou atrito exagerado?"
              value={bottlenecks}
              onChange={(e) => setBottlenecks(e.target.value)}
            />
          </div>

          <div className={styles.footer}>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Encerrando...' : 'Completar Fechamento Noturno'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
