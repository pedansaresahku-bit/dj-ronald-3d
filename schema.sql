-- ========================================================================
-- RONALD 3D - CLOUDFLARE D1 DATABASE SCHEMA & TOUR DATA (SEPTEMBER & OCTOBER 2026)
-- Database: ronald3d-db
-- Target: SQLite on Cloudflare D1
-- ========================================================================

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  venue TEXT,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'Indonesia',
  stage TEXT DEFAULT 'Headline Performance',
  status TEXT DEFAULT 'Confirmed',
  flyer TEXT DEFAULT '/asset/image-1.JPG',
  maps_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast date ordering
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- ========================================================================
-- SEPTEMBER 2026 TOUR EVENTS SEED (DJ RONALD 3D)
-- ========================================================================

INSERT OR REPLACE INTO events (id, date, title, venue, city, country, stage, status, flyer, maps_url) VALUES
('gig-20260901', '2026-09-01', 'Tembak Langit (Break Dealers)', 'Tembak Langit', 'Jakarta', 'Indonesia', 'Break Dealers Special Set', 'Confirmed', '/asset/image-1.JPG', 'https://maps.google.com/?q=Tembak+Langit+Jakarta'),
('gig-20260902', '2026-09-02', 'W Super Club (Break Dealers)', 'W Super Club', 'Samarinda', 'Indonesia', 'Break Dealers Special Set', 'Confirmed', '/asset/image-2.JPG', 'https://maps.google.com/?q=W+Super+Club+Samarinda'),
('gig-20260903', '2026-09-03', 'Sparta Club', 'Sparta', 'Bandung', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-3.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-20260904', '2026-09-04', 'Ultra Lounge', 'Ultra Lounge', 'Pontianak', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-4.JPG', 'https://maps.google.com/?q=Ultra+Lounge+Pontianak'),
('gig-20260905', '2026-09-05', 'Soci Club', 'Soci', 'Semarang', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-5.JPG', 'https://maps.google.com/?q=Soci+Semarang'),
('gig-20260907', '2026-09-07', 'Sparta Club', 'Sparta', 'Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-6.JPG', 'https://maps.google.com/?q=Sparta+Jakarta'),
('gig-20260908', '2026-09-08', 'Pendekar Club', 'Pendekar', 'Gading Serpong', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-7.JPG', 'https://maps.google.com/?q=Pendekar+Gading+Serpong'),
('gig-20260909', '2026-09-09', 'The Nine Club', 'The Nine', 'Malang', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-8.JPG', 'https://maps.google.com/?q=The+Nine+Malang'),
('gig-20260910', '2026-09-10', 'Sparta Club', 'Sparta', 'Bandung', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-9.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-20260911', '2026-09-11', 'Mantis Club', 'Mantis', 'Surabaya', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-10.JPG', 'https://maps.google.com/?q=Mantis+Surabaya'),
('gig-20260912', '2026-09-12', 'Retro Club', 'Retro', 'Medan', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-11.JPG', 'https://maps.google.com/?q=Retro+Medan'),
('gig-20260914', '2026-09-14', 'Sparta Club', 'Sparta', 'Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-12.JPG', 'https://maps.google.com/?q=Sparta+Jakarta'),
('gig-20260915', '2026-09-15', 'Anak Kemang (Ft Devi Shinta)', 'Anak Kemang', 'Jakarta', 'Indonesia', 'Feat. Devi Shinta Special Set', 'Confirmed', '/asset/image-13.JPG', 'https://maps.google.com/?q=Anak+Kemang+Jakarta'),
('gig-20260916', '2026-09-16', '80 Proof Club', '80 Proof', 'BSD', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-14.JPG', 'https://maps.google.com/?q=80+Proof+BSD'),
('gig-20260917', '2026-09-17', 'Sparta Club', 'Sparta', 'Bandung', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-15.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-20260918', '2026-09-18', 'Gozadera Club', 'Gozadera', 'Surabaya', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-16.JPG', 'https://maps.google.com/?q=Gozadera+Surabaya'),
('gig-20260919', '2026-09-19', 'HBI Club', 'HBI', 'Banjarmasin', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-17.JPG', 'https://maps.google.com/?q=HBI+Banjarmasin'),
('gig-20260921', '2026-09-21', 'Sparta Club', 'Sparta', 'Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-18.JPG', 'https://maps.google.com/?q=Sparta+Jakarta'),
('gig-20260922', '2026-09-22', 'Society Club', 'Society', 'Palangkaraya', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-19.JPG', 'https://maps.google.com/?q=Society+Palangkaraya'),
('gig-20260923', '2026-09-23', 'Maxy Club', 'Maxy', 'Kediri', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-20.JPG', 'https://maps.google.com/?q=Maxy+Kediri'),
('gig-20260924', '2026-09-24', 'Sparta Club', 'Sparta', 'Bandung', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-21.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-20260925', '2026-09-25', 'Pendekar Club', 'Pendekar', 'Alam Sutera', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-22.JPG', 'https://maps.google.com/?q=Pendekar+Alam+Sutera'),
('gig-20260926', '2026-09-26', 'Ultra Club', 'Ultra', 'Makassar', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-23.JPG', 'https://maps.google.com/?q=Ultra+Makassar'),
('gig-20260928', '2026-09-28', 'Sparta Club', 'Sparta', 'Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-24.JPG', 'https://maps.google.com/?q=Sparta+Jakarta'),
('gig-20260929', '2026-09-29', 'Monkey King Club', 'Monkey King', 'Gading Serpong', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-1.JPG', 'https://maps.google.com/?q=Monkey+King+Gading+Serpong'),
('gig-20260930', '2026-09-30', 'Caviar Club', 'Caviar', 'Banjarmasin', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-2.JPG', 'https://maps.google.com/?q=Caviar+Banjarmasin');

-- ========================================================================
-- OCTOBER 2026 TOUR EVENTS SEED (DJ RONALD 3D)
-- ========================================================================

INSERT OR REPLACE INTO events (id, date, title, venue, city, country, stage, status, flyer, maps_url) VALUES
('gig-20261001', '2026-10-01', 'Sparta Club', 'Sparta', 'Bandung', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-3.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-20261002', '2026-10-02', 'Tembak Langit (Break Dealers)', 'Tembak Langit', 'Bandung', 'Indonesia', 'Break Dealers Special Set', 'Confirmed', '/asset/image-4.JPG', 'https://maps.google.com/?q=Tembak+Langit+Bandung'),
('gig-20261004', '2026-10-04', 'Gozadera Club', 'Gozadera', 'Surabaya', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-5.JPG', 'https://maps.google.com/?q=Gozadera+Surabaya'),
('gig-20261005', '2026-10-05', 'Sparta Kemang', 'Sparta', 'Kemang, Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-6.JPG', 'https://maps.google.com/?q=Sparta+Kemang+Jakarta'),
('gig-20261006', '2026-10-06', 'Pendekar Club', 'Pendekar', 'Gading Serpong', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-7.JPG', 'https://maps.google.com/?q=Pendekar+Gading+Serpong'),
('gig-20261007', '2026-10-07', 'The IX Club', 'The IX', 'Malang', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-8.JPG', 'https://maps.google.com/?q=The+IX+Malang'),
('gig-20261008', '2026-10-08', 'Sparta Club', 'Sparta', 'Bandung', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-9.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-20261009', '2026-10-09', 'M Club', 'M Club', 'Mojokerto', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-10.JPG', 'https://maps.google.com/?q=M+Club+Mojokerto'),
('gig-20261010', '2026-10-10', 'Pendekar Club', 'Pendekar', 'Alam Sutera', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-11.JPG', 'https://maps.google.com/?q=Pendekar+Alam+Sutera'),
('gig-20261012', '2026-10-12', 'Sparta Kemang', 'Sparta', 'Kemang, Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-12.JPG', 'https://maps.google.com/?q=Sparta+Kemang+Jakarta'),
('gig-20261013', '2026-10-13', 'Society Club', 'Society', 'Palangkaraya', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-13.JPG', 'https://maps.google.com/?q=Society+Palangkaraya'),
('gig-20261014', '2026-10-14', '80 Proof Ultra', '80 Proof Ultra', 'BSD', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-14.JPG', 'https://maps.google.com/?q=80+Proof+Ultra+BSD'),
('gig-20261015', '2026-10-15', 'Sparta Club', 'Sparta', 'Bandung', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-15.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-20261016', '2026-10-16', 'Alexa Club', 'Alexa', 'PIK 2, Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-16.JPG', 'https://maps.google.com/?q=Alexa+PIK+2+Jakarta'),
('gig-20261017', '2026-10-17', 'Private Party VIP', 'Private Venue', 'Jakarta', 'Indonesia', 'VIP Exclusive Performance', 'Confirmed', '/asset/image-17.JPG', 'https://maps.google.com/?q=Jakarta'),
('gig-20261019', '2026-10-19', 'Sparta Kemang', 'Sparta', 'Kemang, Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-18.JPG', 'https://maps.google.com/?q=Sparta+Kemang+Jakarta'),
('gig-20261021', '2026-10-21', 'Caviar Club', 'Caviar', 'Banjarmasin', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-19.JPG', 'https://maps.google.com/?q=Caviar+Banjarmasin'),
('gig-20261022', '2026-10-22', 'Sparta Club', 'Sparta', 'Bandung', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-20.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-20261023', '2026-10-23', 'Ambyar Live House', 'Ambyar', 'Senopati, Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-21.JPG', 'https://maps.google.com/?q=Ambyar+Senopati+Jakarta'),
('gig-20261024', '2026-10-24', 'Lava Club', 'Lava', 'Solo', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-22.JPG', 'https://maps.google.com/?q=Lava+Solo'),
('gig-20261026', '2026-10-26', 'Sparta Kemang', 'Sparta', 'Kemang, Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-23.JPG', 'https://maps.google.com/?q=Sparta+Kemang+Jakarta'),
('gig-20261027', '2026-10-27', 'Monkey King Club', 'Monkey King', 'Gading Serpong', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-24.JPG', 'https://maps.google.com/?q=Monkey+King+Gading+Serpong'),
('gig-20261028', '2026-10-28', 'L2C Club', 'L2C', 'Balikpapan', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-1.JPG', 'https://maps.google.com/?q=L2C+Balikpapan'),
('gig-20261029', '2026-10-29', 'Sparta Club', 'Sparta', 'Bandung', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-2.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-20261030', '2026-10-30', 'Amethyst Club', 'Amethyst', 'Jakarta', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-3.JPG', 'https://maps.google.com/?q=Amethyst+Jakarta'),
('gig-20261031', '2026-10-31', 'Kizz Club', 'Kizz', 'Surabaya', 'Indonesia', 'Headline Performance', 'Confirmed', '/asset/image-4.JPG', 'https://maps.google.com/?q=Kizz+Surabaya');
