import { AlertTriangle, Clock, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export type RiskLevel = "high" | "medium" | "low";

interface ClaimCardProps {
  riskLevel: RiskLevel;
  source: string;
  timestamp: string;
  claimText: string;
  onAnalyze: () => void;
}

const getRiskColor = (level: RiskLevel) => {
  switch (level) {
    case "high":
      return "bg-risk-high text-white";
    case "medium":
      return "bg-risk-medium text-white";
    case "low":
      return "bg-risk-low text-white";
  }
};

export const ClaimCard = ({ riskLevel, source, timestamp, claimText, onAnalyze }: ClaimCardProps) => {
  return (
    <Card className="overflow-hidden shadow-soft hover:shadow-medium transition-all border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className={`h-5 w-5 ${riskLevel === "high" ? "text-risk-high" : riskLevel === "medium" ? "text-risk-medium" : "text-risk-low"}`} />
            <Badge className={`${getRiskColor(riskLevel)} font-semibold uppercase text-xs px-3 py-1`}>
              {riskLevel} Risk
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {timestamp}
          </div>
        </div>
        
        <p className="text-foreground text-base leading-relaxed mb-4">
          {claimText}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="font-medium">{source}</span>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              View
            </Button>
            <Button 
              onClick={onAnalyze}
              size="sm"
              className="text-xs font-semibold"
            >
              Analyze
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
