-- ========================================================================
-- RONALD 3D - CLOUDFLARE D1 DATABASE SCHEMA & SEPTEMBER 2026 TOUR DATA
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
