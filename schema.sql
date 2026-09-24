-- ========================================================================
-- RONALD 3D - CLOUDFLARE D1 DATABASE SCHEMA
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
  status TEXT DEFAULT 'Available',
  flyer TEXT DEFAULT '/asset/image-1.JPG',
  maps_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast date ordering
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
