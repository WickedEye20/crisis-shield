import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { MythFactCard } from "@/components/MythFactCard";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type Claim = Tables<"claims">;

const mockData = [
  {
    id: "mock-1",
    claimText: "Emergency alert: Major earthquake reported in downtown area causing widespread infrastructure collapse",
    claim_text: "Emergency alert: Major earthquake reported in downtown area causing widespread infrastructure collapse",
    verdict: "false" as const,
    confidence: 94,
    confidence_score: 94,
    explanation: "This claim is FALSE. No seismic activity has been detected by national monitoring systems. The footage being shared appears to be from a 2019 earthquake in another region. Local emergency services have confirmed no earthquake-related incidents.",
    action: "This is misinformation. Do not evacuate or panic. Follow only official emergency channels for accurate information.",
    recommended_action: "This is misinformation. Do not evacuate or panic. Follow only official emergency channels for accurate information.",
    source: "National Geological Survey, Local Emergency Services",
    source_url: "National Geological Survey, Local Emergency Services",
    category: "disaster"
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "health", label: "Health" },
  { id: "disaster", label: "Disaster" },
  { id: "weather", label: "Weather" },
  { id: "trending", label: "Trending" }
];

export default function Public() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("all");
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedClaims();
  }, []);

  const fetchPublishedClaims = async () => {
    try {
      const { data, error } = await supabase
        .from("claims")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      setClaims(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading updates",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const displayClaims = claims.length > 0 ? claims : mockData;

  const filteredUpdates = activeFilter === "all" || activeFilter === "trending"
    ? displayClaims
    : displayClaims.filter(claim => claim.category === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark">
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-muted-foreground">Loading updates...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-2xl shadow-medium">
              <Shield className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
            CrisisLens | Live Verified Updates
          </h1>
          <p className="text-xl text-muted-foreground">
            Trusted facts during emergencies
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className="font-semibold"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Verified Updates Grid */}
        {filteredUpdates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No verified updates available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredUpdates.map((claim) => (
              <MythFactCard
                key={claim.id}
                claimText={claim.claim_text}
                verdict={(claim.verdict as "true" | "false" | "unproven") || "unproven"}
                confidence={claim.confidence_score || 0}
                explanation={claim.explanation || ""}
                action={claim.recommended_action || ""}
                source={claim.source_url || "CrisisLens Analysis"}
              />
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-12 text-center md:hidden">
          <Button 
            size="lg" 
            className="w-full max-w-sm font-semibold"
            onClick={() => navigate("/submit-news")}
          >
            Submit a Claim
          </Button>
        </div>
      </main>
    </div>
  );
}
