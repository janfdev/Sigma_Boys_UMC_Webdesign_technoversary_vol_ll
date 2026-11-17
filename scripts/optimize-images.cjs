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
  }

  const outputBuffer = await pipeline.toBuffer();
  const newSize = outputBuffer.length;

  fs.writeFileSync(filePath, outputBuffer);

  const savedPct = Math.round(((originalSize - newSize) / originalSize) * 100);
  console.log(`Optimized ${path.basename(filePath)}: ${(originalSize/1024).toFixed(1)}KB -> ${(newSize/1024).toFixed(1)}KB (${savedPct}% saved)`);
}

async function run() {
  console.log('--- Tier-2 Precision Image Compression for 95+ PageSpeed ---');

  // 1. Gunung Ciremai: desktop (1080w) & mobile (720w)
  const ciremaiJpg = path.join('public', 'image-lomba', 'Gunung Ciremai.jpg');
  const ciremaiWebp = path.join('public', 'image-lomba', 'Gunung Ciremai.webp');
  const ciremaiMobile = path.join('public', 'image-lomba', 'Gunung Ciremai-mobile.webp');
  const ciremaiAvif = path.join('public', 'image-lomba', 'Gunung Ciremai.avif');

  if (fs.existsSync(ciremaiAvif)) {
    fs.unlinkSync(ciremaiAvif);
    console.log('Removed heavy Gunung Ciremai.avif');
  }

  if (fs.existsSync(ciremaiJpg)) {
    const rawBuffer = fs.readFileSync(ciremaiJpg);

    // Desktop WebP (1080w)
    const desktopBuffer = await sharp(rawBuffer)
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 66, effort: 6 })
      .toBuffer();
    fs.writeFileSync(ciremaiWebp, desktopBuffer);
    console.log(`Updated Gunung Ciremai.webp: ${(desktopBuffer.length / 1024).toFixed(1)}KB`);

    // Mobile WebP (720w)
    const mobileBuffer = await sharp(rawBuffer)
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 64, effort: 6 })
      .toBuffer();
    fs.writeFileSync(ciremaiMobile, mobileBuffer);
    console.log(`Created Gunung Ciremai-mobile.webp: ${(mobileBuffer.length / 1024).toFixed(1)}KB`);
  }

  // 2. Carousel Cards (Hero Section) - displayed at max 256px wide!
  const carouselImages = [
    'bibit-pupuk-kasgot.webp',
    'Kolase Daur Ulang Plastik Menjadi Paving.webp',
    'pemasangan-paving.webp',
    'Organizer Alat Tulis Botol Daur Ulang.webp',
    'Lentera Bunga PET di Senja Hari.webp'
  ];
  for (const name of carouselImages) {
    await optimizeFile(path.join('public', 'image-lomba', name), 440, 68, 'webp');
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
    await optimizeFile(path.join('public', 'image-lomba', name), 480, 68, 'webp');
  }

  console.log('--- Tier-2 Image Optimization Completed ---');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
