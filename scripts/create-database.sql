-- Crear base de datos para almacenar análisis de wallets
CREATE TABLE IF NOT EXISTS wallet_analysis (
    id SERIAL PRIMARY KEY,
    address VARCHAR(42) NOT NULL,
    network VARCHAR(20) NOT NULL,
    balance DECIMAL(20, 8),
    balance_usd DECIMAL(15, 2),
    transaction_count INTEGER,
    first_activity TIMESTAMP,
    risk_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) NOT NULL,
    tx_hash VARCHAR(66) NOT NULL,
    from_address VARCHAR(42),
    to_address VARCHAR(42),
    value DECIMAL(20, 8),
    gas_used INTEGER,
    gas_price BIGINT,
    timestamp TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallet_tokens (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) NOT NULL,
    token_address VARCHAR(42) NOT NULL,
    token_name VARCHAR(100),
    token_symbol VARCHAR(20),
    balance DECIMAL(30, 8),
    balance_usd DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallet_comparisons (
    id SERIAL PRIMARY KEY,
    wallet1 VARCHAR(42) NOT NULL,
    wallet2 VARCHAR(42) NOT NULL,
    common_wallets INTEGER,
    similarity_score INTEGER,
    risk_level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_wallet_analysis_address ON wallet_analysis(address);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_address ON wallet_transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_wallet_tokens_address ON wallet_tokens(wallet_address);
CREATE INDEX IF NOT EXISTS idx_wallet_comparisons_wallets ON wallet_comparisons(wallet1, wallet2);
