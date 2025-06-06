-- Crear tablas principales para la plataforma OSINT
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

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_wallet_analysis_address ON wallet_analysis(address);
CREATE INDEX IF NOT EXISTS idx_wallet_analysis_network ON wallet_analysis(network);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_address ON wallet_transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_timestamp ON wallet_transactions(timestamp);
CREATE INDEX IF NOT EXISTS idx_wallet_tokens_address ON wallet_tokens(wallet_address);

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_wallet_analysis_updated_at ON wallet_analysis;
CREATE TRIGGER update_wallet_analysis_updated_at 
    BEFORE UPDATE ON wallet_analysis 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE wallet_analysis IS 'Análisis principal de wallets con datos OSINT';
COMMENT ON TABLE wallet_transactions IS 'Historial de transacciones de wallets';
COMMENT ON TABLE wallet_tokens IS 'Tokens ERC-20 y otros activos por wallet';
