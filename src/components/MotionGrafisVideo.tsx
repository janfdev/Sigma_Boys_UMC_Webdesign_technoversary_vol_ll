import React from 'react'
import { HeroVideoDialog } from './ui/hero-video-dialog'

const MotionGrafisVideo = () => {
  return (
    <div className='relative'>
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/Y7M15Aw2jRc?si=oCXQ5OsRv69ZfahS"
        thumbnailSrc="/image-lomba/kreasi-daur-ulang.webp"
        thumbnailAlt="Edukasi Sampah"/>
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/Y7M15Aw2jRc?si=oCXQ5OsRv69ZfahS"
        thumbnailSrc="/image-lomba/kreasi-daur-ulang.webp"
        thumbnailAlt="Edukasi Sampah"/>
    </div>
  )
}

export default MotionGrafisVideo
