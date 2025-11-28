import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ClaimCard } from "@/components/ClaimCard";
import { AnalyzeDrawer } from "@/components/AnalyzeDrawer";

const mockClaims = [
  {
    id: 1,
    riskLevel: "high" as const,
    source: "Twitter/X",
    timestamp: "2 min ago",
    claimText: "Emergency alert: Major earthquake reported in downtown area causing widespread infrastructure collapse",
    verdict: "false" as const,
    confidence: 94,
    evidence: [
      "No seismic activity recorded by national geological survey in the past 24 hours",
      "Local emergency services confirm no earthquake-related calls received",
      "Original post appears to be manipulated footage from 2019 event",
      "USGS real-time monitoring shows no recent earthquake activity in region"
    ]
  },
  {
    id: 2,
    riskLevel: "medium" as const,
    source: "Facebook",
    timestamp: "15 min ago",
    claimText: "Government announces mandatory evacuation of coastal areas due to incoming hurricane",
    verdict: "unproven" as const,
    confidence: 67,
    evidence: [
      "National Hurricane Center tracking system active but no mandatory evacuation issued",
      "Some local authorities have issued voluntary evacuation advisories",
      "Weather patterns show storm system approaching but severity uncertain",
      "Official government channels have not confirmed mandatory evacuation order"
    ]
  },
  {
    id: 3,
    riskLevel: "low" as const,
    source: "News Site",
    timestamp: "1 hour ago",
    claimText: "Local hospital confirms capacity to handle emergency patients during current situation",
    verdict: "true" as const,
    confidence: 91,
    evidence: [
      "Hospital spokesperson confirmed statement in press release",
      "Facility records show adequate staffing and supplies",
      "Emergency department operational status verified through official channels",
      "Consistent with regional healthcare capacity assessments"
    ]
  },
  {
    id: 4,
    riskLevel: "high" as const,
    source: "WhatsApp",
    timestamp: "3 hours ago",
    claimText: "Water supply contaminated, do not drink tap water until further notice",
    verdict: "false" as const,
    confidence: 88,
    evidence: [
      "Municipal water authority reports all systems functioning normally",
      "Latest water quality tests show no contamination",
      "No official alerts issued by health department or water utility",
      "Message traced to unverified source with history of spreading misinformation"
    ]
  }
];

export default function Dashboard() {
  const [selectedClaim, setSelectedClaim] = useState<typeof mockClaims[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAnalyze = (claim: typeof mockClaims[0]) => {
    setSelectedClaim(claim);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Incoming Claims</h1>
          <p className="text-muted-foreground">Review and verify crisis-related information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockClaims.map((claim) => (
            <ClaimCard
              key={claim.id}
              riskLevel={claim.riskLevel}
              source={claim.source}
              timestamp={claim.timestamp}
              claimText={claim.claimText}
              onAnalyze={() => handleAnalyze(claim)}
            />
          ))}
        </div>
      </main>

      <AnalyzeDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        claim={selectedClaim ? {
          text: selectedClaim.claimText,
          riskLevel: selectedClaim.riskLevel,
          verdict: selectedClaim.verdict,
          confidence: selectedClaim.confidence,
          evidence: selectedClaim.evidence
        } : null}
      />
    </div>
  );
}
