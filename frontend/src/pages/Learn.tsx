
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import TextAnimation from '@/components/ui/TextAnimation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Learn = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <AnimatedContainer 
        className="container mx-auto px-4 max-w-6xl"
        animation="fadeIn"
      >
        <div className="text-center mb-16">
          <TextAnimation 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            text="Choose Your Learning Style"
            type="letters"
            delay={0.2}
          />
          <TextAnimation 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            text="Select the method that works best for you. Learn through interactive games or video content."
            delay={0.5}
          />
        </div>

        <Tabs defaultValue="options" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="options">Learning Options</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="options" className="mt-4">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <AnimatedContainer
                className="bg-card p-8 rounded-2xl border border-primary/10 flex flex-col items-center text-center"
                animation="revealLeft"
                delay={0.3}
                hover="scale"
              >
                <div className="mb-6 p-4 rounded-full bg-primary/10">
                  <Video className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Video-Based Learning</h3>
                <p className="text-muted-foreground mb-6">
                  Watch concise, informative videos explaining legal concepts. Perfect for visual and auditory learners.
                </p>
                <div className="mt-auto pt-4">
                  <Button asChild className="rounded-full px-8" size="lg">
                    <Link to="/learn/videos">Watch Videos</Link>
                  </Button>
                </div>
              </AnimatedContainer>

              <AnimatedContainer
                className="bg-card p-8 rounded-2xl border border-primary/10 flex flex-col items-center text-center"
                animation="revealRight"
                delay={0.4}
                hover="scale"
              >
                <div className="mb-6 p-4 rounded-full bg-primary/10">
                  <Gamepad2 className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Game-Based Learning</h3>
                <p className="text-muted-foreground mb-6">
                  Learn legal concepts through interactive games. Engaging, memorable, and fun way to understand complex legal topics.
                </p>
                <div className="mt-auto pt-4">
                  <Button asChild className="rounded-full px-8" size="lg">
                    <Link to="/learn/games">Start Playing</Link>
                  </Button>
                </div>
              </AnimatedContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <div className="overflow-hidden rounded-lg border border-primary/10 bg-card">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/10">
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-left">Game-Based</th>
                    <th className="px-6 py-4 text-left">Video-Based</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary/10">
                    <td className="px-6 py-4 font-medium">Learning Style</td>
                    <td className="px-6 py-4">Interactive & Hands-on</td>
                    <td className="px-6 py-4">Visual & Auditory</td>
                  </tr>
                  <tr className="border-b border-primary/10">
                    <td className="px-6 py-4 font-medium">Time Commitment</td>
                    <td className="px-6 py-4">10-15 minutes per game</td>
                    <td className="px-6 py-4">3-5 minutes per video</td>
                  </tr>
                  <tr className="border-b border-primary/10">
                    <td className="px-6 py-4 font-medium">Engagement Level</td>
                    <td className="px-6 py-4">High</td>
                    <td className="px-6 py-4">Medium</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Best For</td>
                    <td className="px-6 py-4">Active learners</td>
                    <td className="px-6 py-4">Passive learners</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Not sure which to choose?</h3>
              <p className="text-muted-foreground">
                We recommend trying both learning methods and sticking with the one that feels most effective for you. Different concepts might be easier to learn with different approaches.
              </p>
            </div>
            <Button size="lg" className="rounded-full px-8">
              Take Learning Style Quiz
            </Button>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default Learn;
