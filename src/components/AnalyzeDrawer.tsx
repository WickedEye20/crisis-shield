import { X, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { RiskLevel } from "./ClaimCard";

interface AnalyzeDrawerProps {
  open: boolean;
  onClose: () => void;
  claim: {
    text: string;
    riskLevel: RiskLevel;
    verdict: "true" | "false" | "unproven";
    confidence: number;
    evidence: string[];
  } | null;
}

const getVerdictIcon = (verdict: "true" | "false" | "unproven") => {
  switch (verdict) {
    case "true":
      return <CheckCircle2 className="h-5 w-5" />;
    case "false":
      return <XCircle className="h-5 w-5" />;
    case "unproven":
      return <HelpCircle className="h-5 w-5" />;
  }
};

const getVerdictColor = (verdict: "true" | "false" | "unproven") => {
  switch (verdict) {
    case "true":
      return "bg-risk-safe text-white";
    case "false":
      return "bg-risk-high text-white";
    case "unproven":
      return "bg-risk-medium text-white";
  }
};

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

export const AnalyzeDrawer = ({ open, onClose, claim }: AnalyzeDrawerProps) => {
  if (!claim) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="space-y-4 pb-6 border-b border-border">
          <div className="flex items-start justify-between">
            <SheetTitle className="text-xl font-semibold">Analysis Details</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-6 pt-6">
          {/* Claim Text */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">CLAIM</h3>
            <p className="text-base leading-relaxed text-foreground">
              {claim.text}
            </p>
          </div>

          {/* Risk Level */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">RISK LEVEL</h3>
            <Badge className={`${getRiskColor(claim.riskLevel)} font-semibold uppercase text-xs px-3 py-1`}>
              {claim.riskLevel} Risk
            </Badge>
          </div>

          {/* AI Verdict */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">AI SUGGESTED VERDICT</h3>
            <div className="flex items-center gap-3 mb-2">
              <Badge className={`${getVerdictColor(claim.verdict)} font-semibold uppercase text-sm px-4 py-2 flex items-center gap-2`}>
                {getVerdictIcon(claim.verdict)}
                {claim.verdict}
              </Badge>
            </div>
            <div className="mt-3">
              <span className="text-sm text-muted-foreground">Confidence: </span>
              <span className="text-base font-semibold text-foreground">{claim.confidence}%</span>
            </div>
          </div>

          {/* Evidence */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">EVIDENCE</h3>
            <ul className="space-y-2">
              {claim.evidence.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-primary font-semibold">•</span>
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <Button className="w-full font-semibold" size="lg">
              Publish Update
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Mark Unproven
            </Button>
            <Button variant="ghost" className="w-full" size="lg" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
