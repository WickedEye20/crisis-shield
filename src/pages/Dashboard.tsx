import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ClaimCard } from "@/components/ClaimCard";
import { AnalyzeDrawer } from "@/components/AnalyzeDrawer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type Claim = Tables<"claims">;

const mockClaims = [
  {
    id: "mock-1",
    riskLevel: "high" as const,
    source: "Twitter/X",
    timestamp: "2 min ago",
    claimText: "Emergency alert: Major earthquake reported in downtown area causing widespread infrastructure collapse",
    claim_text: "Emergency alert: Major earthquake reported in downtown area causing widespread infrastructure collapse",
    verdict: "false" as const,
    confidence: 94,
    evidence: [
      "No seismic activity recorded by national geological survey in the past 24 hours",
      "Local emergency services confirm no earthquake-related calls received",
      "Original post appears to be manipulated footage from 2019 event",
      "USGS real-time monitoring shows no recent earthquake activity in region"
    ],
    created_at: new Date().toISOString(),
    status: "pending" as const,
  },
];

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchClaims();
    }
  }, [user]);

  const fetchClaims = async () => {
    try {
      const { data, error } = await supabase
        .from("claims")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setClaims(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading claims",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-muted-foreground">Loading...</p>
        </main>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayClaims = claims.length > 0 ? claims : mockClaims;

  const handleAnalyze = (claim: Claim) => {
    setSelectedClaim(claim);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Incoming Claims</h1>
          <p className="text-muted-foreground">
            {displayClaims.length} claim{displayClaims.length !== 1 ? 's' : ''} awaiting review
          </p>
        </div>

        {displayClaims.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No claims submitted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayClaims.map((claim) => (
              <ClaimCard
                key={claim.id}
                riskLevel={(claim.risk_level as "high" | "medium" | "low") || "medium"}
                source={claim.source_url || "User Submission"}
                timestamp={new Date(claim.created_at || "").toLocaleString()}
                claimText={claim.claim_text}
                onAnalyze={() => handleAnalyze(claim)}
              />
            ))}
          </div>
        )}
      </main>

      <AnalyzeDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        claim={selectedClaim ? {
          id: selectedClaim.id,
          text: selectedClaim.claim_text,
          riskLevel: (selectedClaim.risk_level as "high" | "medium" | "low") || "medium",
          verdict: (selectedClaim.verdict as "true" | "false" | "unproven") || "unproven",
          confidence: selectedClaim.confidence_score || 0,
          evidence: selectedClaim.evidence || []
        } : null}
        onUpdate={fetchClaims}
      />
    </div>
  );
}
