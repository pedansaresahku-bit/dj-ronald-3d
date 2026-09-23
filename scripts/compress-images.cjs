const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'asset');
const BACKUP_DIR = path.join(__dirname, '..', 'asset_original');

async function compressAll() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_DIR);
  console.log(`Found ${files.length} items in ${SOURCE_DIR}`);

  let totalOldSize = 0;
  let totalNewSize = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(SOURCE_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);

    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    // Skip video
    if (ext === '.mp4') {
      console.log(`[SKIP] Video: ${file}`);
      continue;
    }

    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      totalOldSize += stat.size;

      // Backup original if not already backed up
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
      }

      const originalSizeMB = (stat.size / (1024 * 1024)).toFixed(2);

      // Temporary output path
      const tempPath = path.join(SOURCE_DIR, `temp_${file}`);

      try {
        let pipeline = sharp(backupPath).rotate(); // auto-orient by EXIF

        if (ext === '.png') {
          await pipeline
            .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
            .png({ quality: 85, compressionLevel: 9 })
            .toFile(tempPath);
        } else {
          await pipeline
            .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 80, progressive: true, mozjpeg: true })
            .toFile(tempPath);
        }

        // Overwrite file with compressed version
        fs.renameSync(tempPath, filePath);

        const newStat = fs.statSync(filePath);
        totalNewSize += newStat.size;
        const newSizeKB = (newStat.size / 1024).toFixed(1);
        const reduction = (((stat.size - newStat.size) / stat.size) * 100).toFixed(1);

        console.log(`✓ Compressed ${file}: ${originalSizeMB} MB -> ${newSizeKB} KB (-${reduction}%)`);
      } catch (err) {
        console.error(`Error compressing ${file}:`, err.message);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }

  const oldTotalMB = (totalOldSize / (1024 * 1024)).toFixed(2);
  const newTotalMB = (totalNewSize / (1024 * 1024)).toFixed(2);
  const savedPercent = (((totalOldSize - totalNewSize) / totalOldSize) * 100).toFixed(1);

  console.log('====================================');
  console.log(`TOTAL RAW SIZE : ${oldTotalMB} MB`);
  console.log(`TOTAL COMPRESSED: ${newTotalMB} MB`);
  console.log(`SAVED           : ${savedPercent}% (${(oldTotalMB - newTotalMB).toFixed(2)} MB saved!)`);
  console.log('====================================');
}

compressAll();
