-- Crear tablas específicas para OSINT
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

-- Crear índices adicionales
CREATE INDEX IF NOT EXISTS idx_wallet_connections_wallet1 ON wallet_connections(wallet1);
CREATE INDEX IF NOT EXISTS idx_wallet_connections_wallet2 ON wallet_connections(wallet2);
CREATE INDEX IF NOT EXISTS idx_contract_interactions_wallet ON contract_interactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_osint_social_wallet ON osint_social_data(wallet_address);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_wallet ON risk_assessments(wallet_address);
CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_wallet ON monitoring_alerts(wallet_address);

COMMENT ON TABLE wallet_connections IS 'Conexiones y relaciones entre wallets';
COMMENT ON TABLE wallet_comparisons IS 'Resultados de comparaciones entre wallets';
COMMENT ON TABLE contract_interactions IS 'Interacciones con contratos inteligentes';
COMMENT ON TABLE osint_social_data IS 'Datos de redes sociales y OSINT';
COMMENT ON TABLE risk_assessments IS 'Evaluaciones de riesgo automatizadas';
COMMENT ON TABLE monitoring_alerts IS 'Alertas y notificaciones del sistema';
