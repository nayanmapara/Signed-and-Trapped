
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import TextAnimation from '@/components/ui/TextAnimation';

const videos = [
  {
    id: 1,
    title: "Contract Law Explained",
    description: "Learn the fundamentals of contract law and key principles.",
    src: "https://www.youtube.com/embed/t2gDUbxq3cY",
  },
  {
    id: 2,
    title: "Understanding Tort Law",
    description: "Essential concepts of tort law explained simply.",
    src: "https://www.youtube.com/embed/iFLrYZPHiN4",
  },
  {
    id: 3,
    title: "Property Law Basics",
    description: "Key principles of property ownership and rights.",
    src: "https://www.youtube.com/embed/-XJH4GlgVMY", 
  },
  {
    id: 4,
    title: "Criminal Law Fundamentals",
    description: "Understanding the basics of criminal law and procedure.",
    src: "https://www.youtube.com/embed/rVSveWMd06A",
  }
];

const VideoLearning = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Handle video navigation
  const nextVideo = () => {
    if (currentVideo < videos.length - 1) {
      setCurrentVideo(current => current + 1);
    } else {
      setCurrentVideo(0); // Loop back to the first video
    }
  };

  const prevVideo = () => {
    if (currentVideo > 0) {
      setCurrentVideo(current => current - 1);
    } else {
      setCurrentVideo(videos.length - 1); // Loop to the last video
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Update iframe source when changing videos or mute state
  useEffect(() => {
    if (videoRef.current) {
      const currentVideoSrc = videos[currentVideo].src;
      // YouTube embed with autoplay and mute parameters
      // For YouTube, mute is controlled by the mute=1 parameter
      const updatedSrc = `${currentVideoSrc}?autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&playlist=${currentVideoSrc.split('/').pop()}`;
      videoRef.current.src = updatedSrc;
    }
  }, [currentVideo, isMuted]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <AnimatedContainer 
        className="container mx-auto px-4 max-w-5xl"
        animation="fadeIn"
      >
        <div className="mb-8">
          <Link to="/learn" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning Options
          </Link>
        </div>

        <div className="text-center mb-12">
          <TextAnimation 
            className="text-3xl md:text-4xl font-bold mb-4"
            text="Video Learning Library"
            type="letters"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn legal concepts through short, informative videos. Swipe through our collection to find the topic you're interested in.
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center mb-8">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevVideo}
              className="rounded-full absolute left-0 z-10 bg-background/80 backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <AnimatedContainer
              className="relative aspect-[9/16] w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
              animation="scale"
              key={currentVideo}
              hover="none"
            >
              <div className="w-full h-full">
                <iframe 
                  ref={videoRef}
                  src={`${videos[currentVideo].src}?autoplay=1&mute=1&loop=1`}
                  className="w-full h-full"
                  title={videos[currentVideo].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">{videos[currentVideo].title}</h3>
                <p className="text-white/80 mb-4">{videos[currentVideo].description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">{videos[currentVideo].duration}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4 text-white" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextVideo}
              className="rounded-full absolute right-0 z-10 bg-background/80 backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {videos.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentVideo ? 'w-8 bg-primary' : 'w-2 bg-primary/30'
                }`}
                onClick={() => setCurrentVideo(index)}
              />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">All Learning Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <AnimatedContainer
                key={video.id}
                className="bg-card rounded-xl overflow-hidden border border-primary/10"
                animation="slideUp"
                delay={0.1 * video.id}
                hover="scale"
                onClick={() => setCurrentVideo(videos.indexOf(video))}
              >
                <div className="relative aspect-video cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </motion.div>
                  </div>
                  <img 
                    src={`https://img.youtube.com/vi/${video.src.split('/').pop()}/0.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold mb-1">{video.title}</h4>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default VideoLearning;
