import React from 'react'
import { HeroVideoDialog } from './ui/hero-video-dialog'

const MotionGrafisVideo = () => {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <HeroVideoDialog
        className="w-full"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/Y7M15Aw2jRc?si=oCXQ5OsRv69ZfahS"
        thumbnailSrc="/image-lomba/motion-grafis-thumbnail.webp"
        thumbnailAlt="Edukasi Sampah & Motion Grafis CircuLife"
      />
    </div>
  );
};

export default MotionGrafisVideo
