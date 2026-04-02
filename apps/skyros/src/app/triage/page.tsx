'use client';

import { useState, useEffect } from 'react';
import ParetoCard from '@/components/ParetoCard';
import styles from './triage.module.css';

interface Task {
  id: string;
  title: string;
  score: number;
  decision: 'EXECUTE' | 'DELEGATE_TO_SKYDRA' | 'CUT_ELIMINATE';
  impacto: number;
  vontade: number;
  esforco: number;
  category: string;
}

export default function TriagePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [impacto, setImpacto] = useState(5);
  const [vontade, setVontade] = useState(5);
  const [esforco, setEsforco] = useState(5);
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || []);
      }
    } catch (err) {
      console.error('Failed to load tasks', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          impacto,
          vontade,
          esforco,
          category: category || 'geral'
        })
      });
      
      if (res.ok) {
        // Reset form
        setTitle('');
        setDescription('');
        setImpacto(5);
        setVontade(5);
        setEsforco(5);
        setCategory('');
        
        // Reload
        loadTasks();
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCompleteTask(id: string) {
    try {
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      loadTasks();
    } catch (err) {
      console.error('Complete error:', err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="page-title">Mesa de Triagem</h1>
        <p className="subtitle">Motor Pareto³ de Decisão. (Impacto × Vontade) / Esforço.</p>
      </div>

      <div className={styles.splitLayout}>
        {/* Form Panel */}
        <div className={`${styles.formPanel} glass-card animate-in`}>
          <div className="section-header">
            <h3>Nova Ingestão</h3>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Tarefa / Missão</label>
              <input 
                type="text" 
                placeholder="O que precisa ser feito?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Categoria (opcional)</label>
                <input 
                  type="text" 
                  placeholder="ex: experia, saude"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.sliders}>
              <div className={styles.sliderGroup}>
                <div className={styles.sliderHeader}>
                  <label>Impacto</label>
                  <span className="mono">{impacto}</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={impacto} 
                  onChange={(e) => setImpacto(parseInt(e.target.value))}
                  className={styles.rangeCyan}
                />
              </div>

              <div className={styles.sliderGroup}>
                <div className={styles.sliderHeader}>
                  <label>Vontade</label>
                  <span className="mono">{vontade}</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={vontade} 
                  onChange={(e) => setVontade(parseInt(e.target.value))}
                  className={styles.rangeViolet}
                />
              </div>

              <div className={styles.sliderGroup}>
                <div className={styles.sliderHeader}>
                  <label>Esforço</label>
                  <span className="mono">{esforco}</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={esforco} 
                  onChange={(e) => setEsforco(parseInt(e.target.value))}
                  className={styles.rangeRose}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting || !title.trim()}>
              {isSubmitting ? 'Processando...' : 'Realizar Triagem Pareto'}
            </button>
          </form>
        </div>

        {/* Backlog Panel */}
        <div className={`${styles.backlogPanel} animate-in`} style={{ animationDelay: '0.1s' }}>
          <div className="section-header">
            <h3>Backlog Triado</h3>
          </div>
          
          <div className={styles.taskList}>
            {loading ? (
              <p className={styles.loading}>Sincronizando banco de dados...</p>
            ) : tasks.length === 0 ? (
              <div className={styles.empty}>
                <p>Nenhuma tarefa pendente no sistema.</p>
              </div>
            ) : (
              tasks.map(task => (
                <div key={task.id} className={styles.taskItem}>
                  <ParetoCard {...task} onComplete={() => handleCompleteTask(task.id)} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
