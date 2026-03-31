-- ==========================================
-- KAIROS SKYDRA: SUPABASE VECTOR & EVENT BUS
-- ==========================================
-- Executar no Painel SQL do Supabase.

-- 1. Habilitar a extensão Vector (RAG)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Tabela Base: SKYDRA KNOWLEDGE (Memória Longo Prazo)
CREATE TABLE IF NOT EXISTS kairos_knowledge_chunks (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    embedding vector(768) -- Ajustável via Gemini/OpenAI
);

-- 3. Função de Similaridade Cosine (Busca RAG)
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    kairos_knowledge_chunks.id,
    kairos_knowledge_chunks.content,
    kairos_knowledge_chunks.metadata,
    1 - (kairos_knowledge_chunks.embedding <=> query_embedding) AS similarity
  FROM kairos_knowledge_chunks
  WHERE 1 - (kairos_knowledge_chunks.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;


-- ==========================================
-- EVENT BUS MULTI-TERMINAL (TELEGRAM QUEUE)
-- ==========================================

-- 4. Tabela de Trabalhos do Telegram (Routing)
CREATE TABLE IF NOT EXISTS telegram_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    sender_id BIGINT NOT NULL,
    payload_text TEXT NOT NULL,
    complexity_score SMALLINT, -- 1 a 5 (Inferido pelo Telegram Bot)
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
    assigned_to TEXT -- Preenchido por 'PC_OPUS' ou 'NOTEBOOK_GEMINI'
);

-- 5. Habilitar o Realtime (Pub/Sub para o KAIROS Node.js ouvir 24/7)
ALTER PUBLICATION supabase_realtime ADD TABLE telegram_jobs;

-- 6. Politica RLS de Segurança BÁSICA (Apenas chave de Serviço)
ALTER TABLE kairos_knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE telegram_jobs ENABLE ROW LEVEL SECURITY;

-- Note: Usuários anônimos e chaves públicas NÃO conseguirão ler/escrever. 
-- Apenas a service_role_key do `.env` do KAIROS tem total permissão Bypassing RLS.
