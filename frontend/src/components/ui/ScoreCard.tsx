
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScoreCardProps {
  score: number;
}

const ScoreCard = ({ score }: ScoreCardProps) => {
  // Calculate score color
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 5) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Format score to one decimal place
  const formattedScore = score.toFixed(1);
  
  return (
    <div className="glass-morphism rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Document Quality Score</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-muted-foreground mb-3 text-sm">
            Based on clarity, comprehensiveness, and legal precision
          </p>
          
          <div className="flex items-center mt-2">
            <div 
              className="score-ring w-20 h-20 mr-4"
              style={{ '--score': score * 10 } as React.CSSProperties}
            >
              <div className="absolute inset-[3px] rounded-full bg-background flex items-center justify-center">
                <span className={cn("text-2xl font-bold", getScoreColor(score))}>
                  {formattedScore}
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="h-2 w-64 bg-secondary/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score * 10}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full",
                    score >= 8 ? "bg-green-500" :
                    score >= 5 ? "bg-yellow-500" : "bg-red-500"
                  )}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
