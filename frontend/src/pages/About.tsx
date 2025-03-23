
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import TextAnimation from '@/components/ui/TextAnimation';
import { Shield, Lightbulb, FileSearch, BarChart } from 'lucide-react';

const About = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <AnimatedContainer animation="slideUp" className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                About <TextAnimation text="LegalLingo" type="gradient" />
              </h1>
              <p className="text-xl text-muted-foreground">
                We're transforming how people understand legal documents through the power of advanced artificial intelligence.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fadeIn" delay={0.2} className="glass-morphism rounded-lg p-8 mb-16">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                Legal documents are often complex and filled with jargon, making them difficult for most people to understand. 
                Our mission is to democratize legal knowledge by providing tools that make these documents accessible to everyone, 
                not just legal professionals.
              </p>
              <p className="text-muted-foreground">
                By combining state-of-the-art AI with user-friendly design, we're building a platform that empowers individuals 
                and businesses to make informed decisions without the need for expensive legal consultations for every document.
              </p>
            </AnimatedContainer>
          </div>
        </section>
        
        {/* Technology Section */}
        <section className="py-20 px-6 bg-secondary/5">
          <div className="container mx-auto max-w-4xl">
            <AnimatedContainer animation="fadeIn" className="text-center mb-16">
              <h2 className="text-3xl font-semibold mb-4">Our Technology</h2>
              <p className="text-muted-foreground text-lg">
                Powered by Google's Gemini Pro, our platform uses advanced natural language processing to analyze legal documents with high precision.
              </p>
            </AnimatedContainer>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <FileSearch className="h-8 w-8 text-primary" />,
                  title: "Document Understanding",
                  description: "Our AI comprehends complex legal structures, references, and dependencies within documents."
                },
                {
                  icon: <Lightbulb className="h-8 w-8 text-primary" />,
                  title: "Smart Insights",
                  description: "Advanced algorithms identify key provisions, unusual clauses, and potential concerns."
                },
                {
                  icon: <BarChart className="h-8 w-8 text-primary" />,
                  title: "Quality Assessment",
                  description: "Documents are evaluated based on clarity, completeness, and legal precision."
                },
                {
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  title: "Privacy & Security",
                  description: "All documents are processed with strict privacy protocols and never stored longer than necessary."
                }
              ].map((tech, index) => (
                <AnimatedContainer 
                  key={index}
                  animation="slideUp" 
                  delay={0.1 * index}
                  className="glass-morphism rounded-lg p-6"
                >
                  <div className="flex">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      {tech.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">{tech.title}</h3>
                      <p className="text-muted-foreground">{tech.description}</p>
                    </div>
                  </div>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <AnimatedContainer animation="fadeIn" className="mb-16">
              <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
              <p className="text-muted-foreground text-lg">
                Built on the principles of accessibility, accuracy, and innovation.
              </p>
            </AnimatedContainer>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Accessibility",
                  description: "We believe legal information should be accessible to everyone, regardless of background or expertise."
                },
                {
                  title: "Accuracy",
                  description: "Our solutions prioritize precision and reliability, ensuring you receive trustworthy information."
                },
                {
                  title: "Innovation",
                  description: "We continuously improve our technology to deliver the most advanced legal document analysis available."
                }
              ].map((value, index) => (
                <AnimatedContainer 
                  key={index}
                  animation="slideUp" 
                  delay={0.1 * index}
                  className="glass-morphism rounded-lg p-6"
                >
                  <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
