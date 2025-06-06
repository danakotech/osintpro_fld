-- Crear tablas para la plataforma OSINT en Supabase
CREATE TABLE IF NOT EXISTS wallet_analysis (
    id SERIAL PRIMARY KEY,
    address VARCHAR(42) NOT NULL,
    network VARCHAR(20) NOT NULL,
    balance DECIMAL(20, 8) DEFAULT 0,
    balance_usd DECIMAL(15, 2) DEFAULT 0,
    total_value_usd DECIMAL(15, 2) DEFAULT 0,
    transaction_count INTEGER DEFAULT 0,
    first_activity TIMESTAMP,
    last_activity TIMESTAMP,
    risk_score INTEGER DEFAULT 0,
    security_flags JSONB DEFAULT '{}',
    osint_data JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(address, network)
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) NOT NULL,
    tx_hash VARCHAR(66) NOT NULL UNIQUE,
    block_number BIGINT,
    from_address VARCHAR(42),
    to_address VARCHAR(42),
    value DECIMAL(30, 8) DEFAULT 0,
    gas_used INTEGER,
    gas_price BIGINT,
    transaction_fee DECIMAL(20, 8),
    timestamp TIMESTAMP NOT NULL,
    transaction_type VARCHAR(20),
    method_id VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallet_tokens (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) NOT NULL,
    token_address VARCHAR(42) NOT NULL,
    token_name VARCHAR(100),
    token_symbol VARCHAR(20),
    token_decimals INTEGER DEFAULT 18,
    balance DECIMAL(30, 8) DEFAULT 0,
    balance_usd DECIMAL(15, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(wallet_address, token_address)
);

CREATE TABLE IF NOT EXISTS wallet_connections (
    id SERIAL PRIMARY KEY,
    wallet1 VARCHAR(42) NOT NULL,
    wallet2 VARCHAR(42) NOT NULL,
    interaction_count INTEGER DEFAULT 0,
    total_value_exchanged DECIMAL(20, 8) DEFAULT 0,
    first_interaction TIMESTAMP,
    last_interaction TIMESTAMP,
    relationship_type VARCHAR(20),
    confidence_score DECIMAL(3, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallet_comparisons (
    id SERIAL PRIMARY KEY,
    wallet1 VARCHAR(42) NOT NULL,
    wallet2 VARCHAR(42) NOT NULL,
    common_wallets INTEGER DEFAULT 0,
    similarity_score INTEGER DEFAULT 0,
    risk_level VARCHAR(20),
    comparison_data JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contract_interactions (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    contract_name VARCHAR(100),
    interaction_count INTEGER DEFAULT 0,
    total_gas_used BIGINT DEFAULT 0,
    first_interaction TIMESTAMP,
    last_interaction TIMESTAMP,
    contract_type VARCHAR(50),
    risk_level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS osint_social_data (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    username VARCHAR(100),
    profile_url TEXT,
    verification_status VARCHAR(20),
    follower_count INTEGER,
    account_created TIMESTAMP,
    confidence_score DECIMAL(3, 2),
    data_source VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS risk_assessments (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) NOT NULL,
    risk_category VARCHAR(50) NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    risk_score INTEGER NOT NULL,
    description TEXT,
    evidence JSONB DEFAULT '{}',
    auto_detected BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS monitoring_alerts (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) NOT NULL,
    alert_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    alert_data JSONB DEFAULT '{}',
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_wallet_analysis_address ON wallet_analysis(address);
CREATE INDEX IF NOT EXISTS idx_wallet_analysis_network ON wallet_analysis(network);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_address ON wallet_transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_timestamp ON wallet_transactions(timestamp);
CREATE INDEX IF NOT EXISTS idx_wallet_tokens_address ON wallet_tokens(wallet_address);
CREATE INDEX IF NOT EXISTS idx_wallet_connections_wallet1 ON wallet_connections(wallet1);
CREATE INDEX IF NOT EXISTS idx_wallet_connections_wallet2 ON wallet_connections(wallet2);
CREATE INDEX IF NOT EXISTS idx_contract_interactions_wallet ON contract_interactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_osint_social_wallet ON osint_social_data(wallet_address);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_wallet ON risk_assessments(wallet_address);
CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_wallet ON monitoring_alerts(wallet_address);

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_wallet_analysis_updated_at 
    BEFORE UPDATE ON wallet_analysis 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
