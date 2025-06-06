-- Base de datos para la plataforma OSINT
CREATE TABLE IF NOT EXISTS wallet_analysis (
    id SERIAL PRIMARY KEY,
    address VARCHAR(42) NOT NULL UNIQUE,
    network VARCHAR(20) NOT NULL,
    balance DECIMAL(20, 8),
    balance_usd DECIMAL(15, 2),
    transaction_count INTEGER DEFAULT 0,
    risk_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) NOT NULL,
    tx_hash VARCHAR(66) NOT NULL UNIQUE,
    from_address VARCHAR(42),
    to_address VARCHAR(42),
    value DECIMAL(30, 8),
    timestamp TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_wallet_analysis_address ON wallet_analysis(address);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_address ON wallet_transactions(wallet_address);
