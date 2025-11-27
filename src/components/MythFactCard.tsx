import { CheckCircle2, XCircle, HelpCircle, Info } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface MythFactCardProps {
  claimText: string;
  verdict: "true" | "false" | "unproven";
  confidence: number;
  explanation: string;
  action: string;
  source: string;
}

const getVerdictIcon = (verdict: "true" | "false" | "unproven") => {
  switch (verdict) {
    case "true":
      return <CheckCircle2 className="h-6 w-6" />;
    case "false":
      return <XCircle className="h-6 w-6" />;
    case "unproven":
      return <HelpCircle className="h-6 w-6" />;
  }
};

const getVerdictColor = (verdict: "true" | "false" | "unproven") => {
  switch (verdict) {
    case "true":
      return "bg-risk-safe text-white border-risk-safe";
    case "false":
      return "bg-risk-high text-white border-risk-high";
    case "unproven":
      return "bg-risk-medium text-white border-risk-medium";
  }
};

const getVerdictLabel = (verdict: "true" | "false" | "unproven") => {
  switch (verdict) {
    case "true":
      return "VERIFIED TRUE";
    case "false":
      return "FALSE CLAIM";
    case "unproven":
      return "UNPROVEN";
  }
};

export const MythFactCard = ({ 
  claimText, 
  verdict, 
  confidence, 
  explanation, 
  action, 
  source 
}: MythFactCardProps) => {
  return (
    <Card className="overflow-hidden shadow-medium hover:shadow-strong transition-all border-2 border-border/50">
      <CardContent className="p-6 sm:p-8">
        {/* Verdict Badge */}
        <div className="mb-5">
          <Badge className={`${getVerdictColor(verdict)} font-bold uppercase text-sm px-4 py-2.5 flex items-center gap-2 w-fit`}>
            {getVerdictIcon(verdict)}
            {getVerdictLabel(verdict)}
          </Badge>
        </div>

        {/* Claim */}
        <div className="mb-5">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed">
            {claimText}
          </h3>
        </div>

        {/* Confidence */}
        <div className="mb-5">
          <span className="text-sm text-muted-foreground font-medium">Confidence: </span>
          <span className="text-base font-semibold text-foreground">{confidence}%</span>
        </div>

        {/* Explanation */}
        <div className="mb-5 p-4 bg-muted/50 rounded-lg">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2 tracking-wide">
            Explanation
          </h4>
          <p className="text-sm text-foreground leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Action */}
        <div className="mb-5 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-primary uppercase mb-1.5 tracking-wide">
                What You Should Know
              </h4>
              <p className="text-sm text-foreground leading-relaxed">
                {action}
              </p>
            </div>
          </div>
        </div>

        {/* Source */}
        <div className="text-xs text-muted-foreground">
          <span className="font-medium">Source: </span>
          <span>{source}</span>
        </div>
      </CardContent>
    </Card>
  );
};
