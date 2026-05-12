-- ============================================================
-- GD STORE - Seed Data (Sample Cleats)
-- ============================================================

INSERT INTO products (name, brand, price, description, image_url, category, sizes, stock) VALUES

-- Firm Ground
('Mercurial Superfly 10 Elite FG', 'Nike', 274.99,
 'Speed-focused boot with Aerotrak zone for explosive acceleration on firm ground.',
 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600', 'firm-ground',
 '["6","7","8","9","10","11","12"]', 25),

('Predator Elite FG', 'Adidas', 299.99,
 'Precision-engineered with Facet Frame for controlled strikes on firm ground.',
 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600', 'firm-ground',
 '["6","7","8","9","10","11"]', 20),

('Future Ultimate FG/AG', 'Puma', 249.99,
 'Dynamic Fit collar with FUZIONFIT+ compression band for a locked-in feel.',
 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=600', 'firm-ground',
 '["7","8","9","10","11"]', 15),

('King Ultimate FG', 'Puma', 229.99,
 'K-leather upper with SPEEDPLATE outsole for natural feel on firm ground.',
 'https://images.unsplash.com/photo-1543652437-15ae836b50be?w=600', 'firm-ground',
 '["7","8","9","10","11","12"]', 14),

-- Soft Ground
('Phantom Luna 2 Elite SG-Pro', 'Nike', 284.99,
 'Soft-ground studs with All Conditions Control for wet pitch dominance.',
 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600', 'soft-ground',
 '["7","8","9","10","11","12"]', 10),

('Copa Pure 3 Elite SG', 'Adidas', 259.99,
 'Premium leather upper with Soft Ground screw-in studs for superior traction.',
 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600', 'soft-ground',
 '["6","7","8","9","10"]', 12),

('Future Pro SG', 'Puma', 149.99,
 'Lightweight soft ground boot with removable studs for muddy conditions.',
 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600', 'soft-ground',
 '["7","8","9","10","11"]', 18),

-- Turf
('Morelia Neo IV Elite TF', 'Mizuno', 219.99,
 'Kangaroo leather upper with turf-specific rubber outsole for artificial surfaces.',
 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'turf',
 '["7","8","9","10","11"]', 18),

('Mercurial Vapor 16 Academy TF', 'Nike', 89.99,
 'Lightweight turf boot with textured upper for close control on artificial grass.',
 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600', 'turf',
 '["6","7","8","9","10","11","12"]', 30),

('X Crazyfast League TF', 'Adidas', 109.99,
 'Speed-focused turf shoe with Speedskin upper for quick turns.',
 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600', 'turf',
 '["7","8","9","10","11"]', 22),

-- Indoor
('Top Sala Composit IN', 'Adidas', 109.99,
 'Indoor court shoe with non-marking gum rubber outsole for futsal.',
 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600', 'indoor',
 '["7","8","9","10","11"]', 22),

('Lunar Gato III IC', 'Nike', 134.99,
 'Indoor boot with NikeSkin upper for precise touch on hard courts.',
 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600', 'indoor',
 '["6","7","8","9","10","11"]', 16),

('Future Play IT', 'Puma', 74.99,
 'Affordable indoor boot with cushioned insole for all-day comfort on court.',
 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600', 'indoor',
 '["7","8","9","10","11","12"]', 28);
