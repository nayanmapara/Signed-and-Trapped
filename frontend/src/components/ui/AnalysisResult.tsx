
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info, Check, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ScoreCard from './ScoreCard';

interface AnalysisResultProps {
  analysisData?: {
    analysis?: {
      summary: string;
      fine_print: string[];
      overall_score: number;
      scores: {
        complexity: number;
        flexibility: number;
        legal_protection: number;
        risk_level: number;
        transparency: number;
      };
    };
  };
  isLoading?: boolean;
}

const AnalysisResult = ({ analysisData, isLoading = false }: AnalysisResultProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  // Skeleton loading state
  if (isLoading) {
    return (
      <div className="max-w-2xl w-full mx-auto p-6 glass-morphism rounded-lg space-y-6 animate-pulse">
        <div className="h-6 bg-secondary/50 rounded w-3/4 mb-8"></div>
        <div className="space-y-3">
          <div className="h-4 bg-secondary/50 rounded w-full"></div>
          <div className="h-4 bg-secondary/50 rounded w-full"></div>
          <div className="h-4 bg-secondary/50 rounded w-5/6"></div>
        </div>
        <div className="h-32 bg-secondary/50 rounded w-full mt-6"></div>
      </div>
    );
  }

  // Return a message if no analysis data is available
  if (!analysisData || !analysisData.analysis) {
    return (
      <div className="max-w-2xl w-full mx-auto p-6 glass-morphism rounded-lg">
        <p className="text-center text-muted-foreground">No analysis data available. Upload a document to see results.</p>
      </div>
    );
  }
  
  const { summary, fine_print, overall_score, scores } = analysisData.analysis;
  
  // Convert fine print into key findings with appropriate types
  const keyFindings = fine_print.map(text => {
    // Determine the type based on content analysis
    // Simple heuristic: negative words indicate negative, positive words indicate positive
    const negativeWords = ['must', 'not', 'cannot', 'risk', 'violation'];
    const positiveWords = ['can', 'allow', 'good', 'multiple', 'protection'];
    
    let type: 'positive' | 'neutral' | 'negative' = 'neutral';
    
    if (negativeWords.some(word => text.toLowerCase().includes(word))) {
      type = 'negative';
    } else if (positiveWords.some(word => text.toLowerCase().includes(word))) {
      type = 'positive';
    }
    
    return { text, type };
  });
  
  // Create a detailed analysis from scores
  const details = `
    This document scores ${overall_score}/10 overall. 
    Complexity: ${scores.complexity}/10 - ${scores.complexity > 5 ? 'The document uses complex language that may be difficult to understand.' : 'The document uses straightforward language that is relatively easy to understand.'}
    Flexibility: ${scores.flexibility}/10 - ${scores.flexibility > 5 ? 'The document offers good flexibility in interpretation and application.' : 'The document is somewhat rigid in its terms and conditions.'}
    Legal Protection: ${scores.legal_protection}/10 - ${scores.legal_protection > 5 ? 'The document provides strong legal protection.' : 'The document offers limited legal protection.'}
    Risk Level: ${scores.risk_level}/10 - ${scores.risk_level > 5 ? 'The document carries significant risk factors.' : 'The document has relatively low risk factors.'}
    Transparency: ${scores.transparency}/10 - ${scores.transparency > 5 ? 'The document is transparent about its terms and conditions.' : 'The document could be more transparent about its terms and conditions.'}
  `.trim();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl w-full mx-auto"
    >
      <div className="glass-morphism rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Document Analysis</h3>
        <p className="text-muted-foreground mb-6">{summary}</p>
        
        <div className="space-y-4 mb-6">
          {keyFindings.map((finding, index) => (
            <div 
              key={index}
              className={cn(
                "p-3 rounded-md flex items-start",
                finding.type === "positive" ? "bg-green-500/10 border border-green-500/20" :
                finding.type === "negative" ? "bg-red-500/10 border border-red-500/20" :
                "bg-secondary/30 border border-secondary/20"
              )}
            >
              <div className="mr-3 mt-0.5">
                {finding.type === "positive" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : finding.type === "negative" ? (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                ) : (
                  <Info className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <p className="text-sm">{finding.text}</p>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => toggleSection('details')}
          className="flex items-center justify-between w-full py-2 px-4 bg-secondary/30 rounded-md hover:bg-secondary/50 transition-colors"
        >
          <span className="text-sm font-medium">View Detailed Analysis</span>
          <ChevronDown 
            className={cn(
              "w-4 h-4 transition-transform",
              expandedSection === 'details' && "transform rotate-180"
            )} 
          />
        </button>
        
        <AnimatePresence>
          {expandedSection === 'details' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 px-4">
                <p className="text-sm text-muted-foreground whitespace-pre-line">{details}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {Object.entries(scores).map(([key, value]) => (
                    <div key={key} className="bg-secondary/20 p-3 rounded-md">
                      <p className="text-xs text-muted-foreground uppercase mb-1">
                        {key.replace('_', ' ')}
                      </p>
                      <div className="flex items-center">
                        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden mr-2">
                          <div 
                            className={`h-full rounded-full ${value > 6 ? 'bg-green-500' : value > 3 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${value * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{value}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <ScoreCard score={overall_score} />
    </motion.div>
  );
};

export default AnalysisResult;
