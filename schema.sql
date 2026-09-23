-- ========================================================================
-- RONALD 3D - CLOUDFLARE D1 DATABASE SCHEMA
-- Database: ronald3d-db
-- Target: SQLite on Cloudflare D1
-- ========================================================================

DROP TABLE IF EXISTS events;

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  venue TEXT,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'Indonesia',
  stage TEXT DEFAULT 'Headline Performance',
  status TEXT DEFAULT 'Available',
  flyer TEXT DEFAULT '/asset/image-1.JPG',
  maps_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast date ordering
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- ========================================================================
-- SEED DATA: September 2026 Official Tour Schedule
-- ========================================================================

INSERT INTO events (id, date, title, venue, city, country, stage, status, flyer, maps_url) VALUES 
('gig-sep-01', '2026-09-01', 'TEMBAK LANGIT', 'Tembak Langit Club', 'JAKARTA', 'Indonesia', 'Main Stage • 01:00 AM', 'Available', '/asset/image-1.JPG', 'https://maps.google.com/?q=Jakarta'),
('gig-sep-02', '2026-09-02', 'W SUPERCLUB', 'W Superclub Samarinda', 'SAMARINDA', 'Indonesia', 'Headline Performance', 'Available', '/asset/image-2.JPG', 'https://maps.google.com/?q=Samarinda'),
('gig-sep-03', '2026-09-03', 'SPARTA', 'Sparta Club Jakarta', 'JAKARTA', 'Indonesia', 'Midnight Set', 'Available', '/asset/image-3.JPG', 'https://maps.google.com/?q=Sparta+Jakarta'),
('gig-sep-04', '2026-09-04', 'TERRACE', 'Terrace Lounge & Club', 'YOGYAKARTA', 'Indonesia', 'Headline Live', 'Available', '/asset/image-4.JPG', 'https://maps.google.com/?q=Yogyakarta'),
('gig-sep-05', '2026-09-05', 'SPARTA', 'Sparta Bandung', 'BANDUNG', 'Indonesia', 'Weekend Rave Set', 'Available', '/asset/image-1.JPG', 'https://maps.google.com/?q=Bandung'),
('gig-sep-09', '2026-09-09', '126 CLUB', '126 Club Tangerang', 'TANGERANG', 'Indonesia', 'Special Guest Set', 'Available', '/asset/image-2.JPG', 'https://maps.google.com/?q=Tangerang'),
('gig-sep-10', '2026-09-10', 'SPARTA', 'Sparta Club Jakarta', 'JAKARTA', 'Indonesia', 'Electronic Night', 'Available', '/asset/image-3.JPG', 'https://maps.google.com/?q=Sparta+Jakarta'),
('gig-sep-11', '2026-09-11', 'ZENTRUM', 'Zentrum Club Bekasi', 'BEKASI', 'Indonesia', 'Headline Showcase', 'Available', '/asset/image-4.JPG', 'https://maps.google.com/?q=Bekasi'),
('gig-sep-12', '2026-09-12', 'SPARTA', 'Sparta Bandung', 'BANDUNG', 'Indonesia', 'Saturday Massive', 'Available', '/asset/image-1.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-sep-14', '2026-09-14', 'DLUX', 'DLUX Club Samarinda', 'SAMARINDA', 'Indonesia', 'Afterhours Session', 'Available', '/asset/image-2.JPG', 'https://maps.google.com/?q=DLUX+Samarinda'),
('gig-sep-16', '2026-09-16', 'HEXAGON', 'Hexagon Club Banjarmasin', 'BANJARMASIN', 'Indonesia', 'Borneo Electro Tour', 'Available', '/asset/image-3.JPG', 'https://maps.google.com/?q=Banjarmasin'),
('gig-sep-17', '2026-09-17', 'SPARTA', 'Sparta Club Jakarta', 'JAKARTA', 'Indonesia', 'Midweek Madness', 'Available', '/asset/image-4.JPG', 'https://maps.google.com/?q=Sparta+Jakarta'),
('gig-sep-18', '2026-09-18', 'THE NINE', 'The Nine Club & KTV', 'MALANG', 'Indonesia', 'East Java Headline', 'Available', '/asset/image-1.JPG', 'https://maps.google.com/?q=Malang'),
('gig-sep-19', '2026-09-19', 'SPARTA', 'Sparta Bandung', 'BANDUNG', 'Indonesia', 'Weekend Headline', 'Available', '/asset/image-2.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-sep-22', '2026-09-22', 'GRANDSELYN', 'Grand Selyn Club Palembang', 'PALEMBANG', 'Indonesia', 'Sumatera Tour', 'Available', '/asset/image-3.JPG', 'https://maps.google.com/?q=Palembang'),
('gig-sep-23', '2026-09-23', 'GRANDMC', 'Grand MC Club Baturaja', 'BATURAJA', 'Indonesia', 'Live Tonight', 'Available', '/asset/image-4.JPG', 'https://maps.google.com/?q=Baturaja'),
('gig-sep-24', '2026-09-24', 'SPARTA', 'Sparta Club Jakarta', 'JAKARTA', 'Indonesia', 'Capital Electro Night', 'Available', '/asset/image-1.JPG', 'https://maps.google.com/?q=Sparta+Jakarta'),
('gig-sep-25', '2026-09-25', 'ULTRA', 'Ultra Club Makassar', 'MAKASSAR', 'Indonesia', 'Sulawesi Special Show', 'Available', '/asset/image-2.JPG', 'https://maps.google.com/?q=Makassar'),
('gig-sep-26', '2026-09-26', 'SPARTA', 'Sparta Bandung', 'BANDUNG', 'Indonesia', 'Saturday Mega Headline', 'Available', '/asset/image-3.JPG', 'https://maps.google.com/?q=Sparta+Bandung'),
('gig-sep-27', '2026-09-27', 'GOZADERA', 'Gozadera Bar & Club Surabaya', 'SURABAYA', 'Indonesia', 'Sunday Exclusive Set', 'Available', '/asset/image-4.JPG', 'https://maps.google.com/?q=Surabaya');
