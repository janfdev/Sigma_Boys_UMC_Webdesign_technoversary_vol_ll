import React from 'react'
import { HeroVideoDialog } from './ui/hero-video-dialog'

const MotionGrafisVideo = () => {
  return (
    <div className="relative mx-auto w-full">
      <HeroVideoDialog
        className="w-full"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/w9_TWY8A6is?si=WGTX0y_GNhOcRQIn"
        thumbnailSrc="/image-lomba/thumbnail-motion-grafis.webp"
        thumbnailAlt="Edukasi Sampah & Motion Grafis CircuLife"
      />
    </div>
  );
};

export default MotionGrafisVideo
