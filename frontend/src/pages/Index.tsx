import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DocumentUploader from '@/components/ui/DocumentUploader';
import AnalysisResult from '@/components/ui/AnalysisResult';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import TextAnimation from '@/components/ui/TextAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText, BarChart, Brain, Shield, Check, Star, ArrowRight, Lock } from 'lucide-react';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  
  const handleFileUpload = (file: File, data: any) => {
    // Set analysis data from API
    setIsAnalyzing(false);
    setShowResult(true);
    setAnalysisData(data);
  };
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full">
            <motion.div 
              className="w-96 h-96 bg-primary/10 rounded-full absolute -top-20 -right-20 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.2, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="w-80 h-80 bg-accent/10 rounded-full absolute top-40 -right-10 blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </div>
          
          <div className="container mx-auto text-center max-w-5xl relative z-10">
            <AnimatedContainer animation="fadeIn" className="relative mb-6">
              <div className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-6">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>AI-Powered Legal Analysis</span>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slideUp" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-tight">
                <TextAnimation 
                  text="Understand Legal Documents" 
                  type="letters" 
                  delay={0.2}
                />
                <br className="hidden md:block" />
                <TextAnimation 
                  text="in Seconds with AI" 
                  type="highlight" 
                  delay={1.2}
                  className="mt-2 inline-block"
                />
              </h1>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slideUp" delay={0.2}>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
                Upload any legal document and get a clear explanation, key insights, and quality assessment powered by advanced AI.
              </p>
            </AnimatedContainer>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative z-10"
            >
              <DocumentUploader onFileUpload={handleFileUpload} />
            </motion.div>
          </div>
        </section>
        
        {/* Analysis Section */}
        <section className="py-20 px-6 bg-secondary/5">
          <div className="container mx-auto">
            {isAnalyzing ? (
              <div className="text-center mb-10">
                <AnimatedContainer animation="fadeIn" className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Analyzing Your Document</h3>
                  <p className="text-muted-foreground">Please wait while our AI processes your document...</p>
                </AnimatedContainer>
                <AnalysisResult isLoading={true} />
              </div>
            ) : showResult ? (
              <AnalysisResult analysisData={analysisData} />
            ) : null}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <AnimatedContainer animation="fadeIn">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">How It Works</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Our AI-powered system breaks down complex legal documents into clear, understandable insights.
                </p>
              </AnimatedContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FileText className="h-10 w-10 text-primary" />,
                  title: "Upload Document",
                  description: "Simply upload any legal document in PDF format to get started."
                },
                {
                  icon: <Brain className="h-10 w-10 text-primary" />,
                  title: "AI Analysis",
                  description: "Our advanced AI reads and analyzes the entire document in seconds."
                },
                {
                  icon: <BarChart className="h-10 w-10 text-primary" />,
                  title: "Detailed Report",
                  description: "Get a comprehensive breakdown with key insights and quality score."
                }
              ].map((feature, index) => (
                <AnimatedContainer 
                  key={index}
                  animation="slideUp" 
                  delay={0.1 * index}
                  hover="float"
                  className="glass-morphism rounded-lg p-6 text-center"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div 
              className="w-[500px] h-[500px] bg-primary/5 rounded-full absolute -top-96 -left-96 blur-3xl"
              animate={{ 
                x: [0, 40, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <AnimatedContainer animation="fadeIn" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                <TextAnimation text="What Our Users Say" type="gradient" />
              </h2>
              <p className="text-muted-foreground text-lg">
                Professionals across different industries trust our platform to help them understand legal documents.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="staggered" staggerChildren={0.15}>
              {[
                {
                  quote: "I used to spend hours trying to understand contract terms. This tool has cut that time down to minutes while improving my understanding.",
                  author: "Deep",
                  role: "Small Business Owner"
                },
                {
                  quote: "As a non-lawyer, legal documents were always intimidating. This AI tool explains everything clearly and highlights what I should pay attention to.",
                  author: "Nayan",
                  role: "Real Estate Agent"
                },
                {
                  quote: "The quality scoring feature helps me quickly assess if a document requires more detailed review from our legal team.",
                  author: "Meet",
                  role: "HR Director"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="glass-morphism rounded-lg p-6 mb-6 border border-white/5"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary mr-1" />
                    ))}
                  </div>
                  <p className="mb-4 text-lg italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </AnimatedContainer>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-3xl">
            <AnimatedContainer animation="fadeIn" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">
                Find answers to common questions about our legal document analysis tool.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slideUp" delay={0.2} className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "What types of documents can I analyze?",
                    answer: "Our AI can analyze a wide range of legal documents including contracts, agreements, terms of service, privacy policies, and more. The platform supports PDF, DOCX, and TXT file formats."
                  },
                  {
                    question: "How secure is my document data?",
                    answer: "Your privacy is our priority. All uploaded documents are encrypted and securely processed. We do not store the content of your documents after analysis is complete, and our systems comply with industry-standard security protocols."
                  },
                  {
                    question: "How accurate is the AI analysis?",
                    answer: "Our AI has been trained on millions of legal documents and provides high-quality analysis. However, it's designed to assist understanding, not replace professional legal advice. For critical legal matters, we recommend consulting with a qualified attorney."
                  },
                  {
                    question: "Do you offer plans for teams or businesses?",
                    answer: "Yes, we offer team and enterprise plans with additional features like shared document libraries, customized analysis templates, and integration capabilities. Contact our sales team for more information."
                  },
                  {
                    question: "Can I try before subscribing?",
                    answer: "Absolutely! We offer a free trial that allows you to analyze up to 3 documents. This gives you a chance to experience the platform's capabilities before committing to a subscription."
                  }
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4 mb-4 border-white/10">
                    <AccordionTrigger className="text-left text-lg py-5 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedContainer>
          </div>
        </section>
        
        {/* Trust Signals Section */}
        <section className="py-20 px-6 bg-secondary/10">
          <div className="container mx-auto">
            <AnimatedContainer animation="fadeIn" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why Trust Us</h2>
            </AnimatedContainer>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  title: "Bank-Level Security",
                  description: "Your documents and data are protected with enterprise-grade encryption and security protocols."
                },
                {
                  icon: <Lock className="h-8 w-8 text-primary" />,
                  title: "Privacy First",
                  description: "We never store your document content after analysis and respect your data privacy rights."
                },
                {
                  icon: <Check className="h-8 w-8 text-primary" />,
                  title: "Expert-Backed Technology",
                  description: "Our AI algorithms are developed in partnership with legal professionals and data scientists."
                }
              ].map((item, index) => (
                <AnimatedContainer 
                  key={index}
                  animation="fadeIn" 
                  delay={0.2 * index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary/10">
          <div className="container mx-auto text-center max-w-4xl relative">
            <AnimatedContainer animation="fadeIn" className="glass-morphism rounded-xl p-10 border border-white/5 relative overflow-hidden">
              <motion.div 
                className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.2, 0.3]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 relative z-10">
                Ready to Simplify Legal Documents?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 relative z-10">
                Start analyzing your documents today and get clear insights within seconds.
              </p>
              <Button className="text-lg px-8 py-6 h-auto rounded-full relative z-10 group" size="lg">
                Get Started Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </AnimatedContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
