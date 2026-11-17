const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeFile(filePath, maxWidth, quality, format = null) {
  if (!fs.existsSync(filePath)) {
    console.log('Skipping (not found):', filePath);
    return;
  }
  const originalSize = fs.statSync(filePath).size;
  const inputBuffer = fs.readFileSync(filePath);

  let pipeline = sharp(inputBuffer).resize({ width: maxWidth, withoutEnlargement: true });

  const ext = format ? format : path.extname(filePath).toLowerCase().replace('.', '');
  if (ext === 'webp') {
    pipeline = pipeline.webp({ quality, effort: 6 });
  } else if (ext === 'jpg' || ext === 'jpeg') {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true });
  } else if (ext === 'png') {
    pipeline = pipeline.png({ quality, compressionLevel: 9 });
  }

  const outputBuffer = await pipeline.toBuffer();
  const newSize = outputBuffer.length;

  fs.writeFileSync(filePath, outputBuffer);

  const savedPct = Math.round(((originalSize - newSize) / originalSize) * 100);
  console.log(`Optimized ${path.basename(filePath)}: ${(originalSize/1024).toFixed(1)}KB -> ${(newSize/1024).toFixed(1)}KB (${savedPct}% saved)`);
}

async function run() {
  console.log('--- Optimizing Hero & PageSpeed Heavyweight Images ---');

  // 1. Gunung Ciremai: optimize JPG and generate WebP
  const ciremaiJpg = path.join('public', 'image-lomba', 'Gunung Ciremai.jpg');
  const ciremaiWebp = path.join('public', 'image-lomba', 'Gunung Ciremai.webp');

  if (fs.existsSync(ciremaiJpg)) {
    const ciremaiBuffer = fs.readFileSync(ciremaiJpg);
    const webpBuffer = await sharp(ciremaiBuffer)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 75, effort: 6 })
      .toBuffer();
    fs.writeFileSync(ciremaiWebp, webpBuffer);
    console.log(`Generated Gunung Ciremai.webp: ${(webpBuffer.length / 1024).toFixed(1)}KB`);

    // Optimize JPG fallback
    await optimizeFile(ciremaiJpg, 1280, 75, 'jpg');
  }

  // 2. Carousel Cards (Hero Section) - displayed at max 520x500
  const carouselImages = [
    'bibit-pupuk-kasgot.webp',
    'Kolase Daur Ulang Plastik Menjadi Paving.webp',
    'pemasangan-paving.webp',
    'Organizer Alat Tulis Botol Daur Ulang.webp',
    'Lentera Bunga PET di Senja Hari.webp'
  ];
  for (const name of carouselImages) {
    await optimizeFile(path.join('public', 'image-lomba', name), 560, 75, 'webp');
  }

  // 3. Insight & Lomba Section Images
  const insightImages = [
    'mesin-press-paving.webp',
    'kreasi-daur-ulang.webp',
    'tumpukan-botol-plastik.webp',
    'penimbangan-sampah.webp',
    'larva-bsf.webp',
    'kaleng-daur-ulang.webp'
  ];
  for (const name of insightImages) {
    await optimizeFile(path.join('public', 'image-lomba', name), 640, 75, 'webp');
  }

  // 4. Large Gallery & Articles Images
  const galleryImages = [
    path.join('public', 'images', 'gallery', 'kasgot-harvest.jpg'),
    path.join('public', 'images', 'gallery', 'maggot-bio.jpg'),
    path.join('public', 'images', 'articles', 'maggot-biokonversi.jpg'),
    path.join('public', 'images', 'products', 'kompos-bio-kasgot.jpg'),
    path.join('public', 'images', 'gallery', 'paving-pathway.jpg'),
    path.join('public', 'images', 'products', 'paving-block-pet.jpg'),
    path.join('public', 'images', 'gallery', 'trail-after-restored.jpg'),
    path.join('public', 'images', 'gallery', 'trail-before-litter.jpg'),
    path.join('public', 'images', 'articles', 'kaleng-upcycling.jpg')
  ];
  for (const p of galleryImages) {
    await optimizeFile(p, 800, 75, 'jpg');
  }

  // Remove any leftover .tmp files
  const tmpFiles = [
    path.join('public', 'image-lomba', 'Gunung Ciremai.jpg.tmp')
  ];
  for (const tmp of tmpFiles) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }

  console.log('--- Image Optimization Completed Successfully ---');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
