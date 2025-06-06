-- Datos de ejemplo para la plataforma OSINT
INSERT INTO wallet_analysis (address, network, balance, balance_usd, total_value_usd, transaction_count, first_activity, last_activity, risk_score, security_flags, osint_data) VALUES
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', 'ethereum', 15.5432, 38858.00, 45230.50, 1247, '2021-03-15 10:30:00', '2024-01-15 15:30:00', 2, 
 '{"mixer_interactions": 0, "sanctioned_addresses": 0, "phishing_flags": 0, "verified_contracts": 998}',
 '{"social_media": {"twitter": null, "reddit": null}, "databases": {"github": null, "ens": null, "opensea": "active"}}'),

('0x8ba1f109551bD432803012645Hac136c22C57B', 'ethereum', 0.8921, 2230.25, 8750.75, 89, '2023-08-22 14:15:00', '2024-01-14 09:20:00', 7,
 '{"mixer_interactions": 1, "sanctioned_addresses": 0, "phishing_flags": 2, "verified_contracts": 67}',
 '{"social_media": {"twitter": "@crypto_trader_x", "reddit": "u/blockchain_analyst"}, "databases": {"github": "crypto-dev-2023", "ens": null}}'),

('0x1234567890123456789012345678901234567890', 'polygon', 2500.75, 1250.38, 3200.50, 2156, '2022-01-10 09:45:00', '2024-01-13 16:45:00', 1,
 '{"mixer_interactions": 0, "sanctioned_addresses": 0, "phishing_flags": 0, "verified_contracts": 2100}',
 '{"social_media": {"twitter": null, "reddit": null}, "databases": {"github": null, "ens": "defi-master.eth"}}');

INSERT INTO wallet_transactions (wallet_address, tx_hash, block_number, from_address, to_address, value, gas_used, gas_price, transaction_fee, timestamp, transaction_type, method_id) VALUES
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', '0xabc123def456789012345678901234567890abcdef123456789012345678901234', 18500000, '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', '0x1234567890123456789012345678901234567890', 1.5, 21000, 20000000000, 0.00042, '2024-01-15 15:30:00', 'transfer', '0xa9059cbb'),
('0x8ba1f109551bD432803012645Hac136c22C57B', '0xdef456abc789012345678901234567890abcdef456789012345678901234567', 18499950, '0x1234567890123456789012345678901234567890', '0x8ba1f109551bD432803012645Hac136c22C57B', 0.25, 21000, 18000000000, 0.000378, '2024-01-15 15:45:00', 'transfer', '0xa9059cbb'),
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', '0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01', 18499900, '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', 2.0, 150000, 25000000000, 0.00375, '2024-01-14 14:20:00', 'swap', '0x38ed1739');

INSERT INTO wallet_tokens (wallet_address, token_address, token_name, token_symbol, token_decimals, balance, balance_usd) VALUES
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', 'Uniswap', 'UNI', 18, 1250.50, 6252.50),
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', '0x514910771AF9Ca656af840dff83E8264EcF986CA', 'Chainlink', 'LINK', 18, 850.25, 12753.75),
('0x8ba1f109551bD432803012645Hac136c22C57B', '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', 'Aave', 'AAVE', 18, 45.75, 4575.00);

INSERT INTO wallet_connections (wallet1, wallet2, interaction_count, total_value_exchanged, first_interaction, last_interaction, relationship_type, confidence_score) VALUES
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', '0x1234567890123456789012345678901234567890', 15, 25.75, '2023-06-15 10:30:00', '2024-01-15 15:30:00', 'frequent', 0.85),
('0x8ba1f109551bD432803012645Hac136c22C57B', '0x1234567890123456789012345678901234567890', 8, 12.50, '2023-09-20 14:15:00', '2024-01-15 15:45:00', 'regular', 0.72),
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', '0x8ba1f109551bD432803012645Hac136c22C57B', 3, 5.25, '2023-12-01 16:20:00', '2024-01-10 11:15:00', 'occasional', 0.45);

INSERT INTO contract_interactions (wallet_address, contract_address, contract_name, interaction_count, total_gas_used, first_interaction, last_interaction, contract_type, risk_level) VALUES
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', 'Uniswap V2 Router', 45, 6750000, '2021-05-10 12:00:00', '2024-01-14 14:20:00', 'DEX', 'LOW'),
('0x8ba1f109551bD432803012645Hac136c22C57B', '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', 'Uniswap V2 Router', 23, 3450000, '2023-08-25 16:30:00', '2024-01-12 10:45:00', 'DEX', 'LOW'),
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', '0xE592427A0AEce92De3Edee1F18E0157C05861564', 'Uniswap V3 Router', 32, 4800000, '2022-03-15 09:15:00', '2024-01-13 18:30:00', 'DEX', 'LOW');

INSERT INTO osint_social_data (wallet_address, platform, username, profile_url, verification_status, follower_count, account_created, confidence_score, data_source) VALUES
('0x8ba1f109551bD432803012645Hac136c22C57B', 'twitter', 'crypto_trader_x', 'https://twitter.com/crypto_trader_x', 'unverified', 1250, '2023-07-15 10:30:00', 0.78, 'social_scan'),
('0x8ba1f109551bD432803012645Hac136c22C57B', 'reddit', 'blockchain_analyst', 'https://reddit.com/u/blockchain_analyst', 'verified', 890, '2023-06-20 14:45:00', 0.82, 'reddit_api'),
('0x8ba1f109551bD432803012645Hac136c22C57B', 'github', 'crypto-dev-2023', 'https://github.com/crypto-dev-2023', 'verified', 45, '2023-08-01 09:20:00', 0.91, 'github_api');

INSERT INTO risk_assessments (wallet_address, risk_category, risk_level, risk_score, description, evidence, auto_detected) VALUES
('0x8ba1f109551bD432803012645Hac136c22C57B', 'mixer_interaction', 'MEDIUM', 6, 'Interacción detectada con servicio de mixing', '{"mixer_address": "0x...", "amount": "0.5 ETH", "timestamp": "2023-11-15"}', true),
('0x8ba1f109551bD432803012645Hac136c22C57B', 'phishing_flag', 'LOW', 3, 'Posible interacción con contrato reportado como phishing', '{"contract": "0x...", "report_source": "community"}', true),
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', 'clean_wallet', 'LOW', 1, 'Wallet con historial limpio y actividad normal', '{"verified_contracts": 998, "clean_interactions": true}', true);

INSERT INTO monitoring_alerts (wallet_address, alert_type, severity, title, description, alert_data) VALUES
('0x8ba1f109551bD432803012645Hac136c22C57B', 'suspicious_activity', 'MEDIUM', 'Actividad sospechosa detectada', 'Múltiples transacciones en horarios inusuales', '{"transaction_count": 15, "time_window": "02:00-04:00", "date": "2024-01-10"}'),
('0x742d35Cc6634C0532925a3b8D4C9db96590c6C87', 'large_transaction', 'LOW', 'Transacción de alto valor', 'Transferencia superior a 10 ETH detectada', '{"amount": "15.5 ETH", "recipient": "0x1234...", "timestamp": "2024-01-15 15:30:00"}');
