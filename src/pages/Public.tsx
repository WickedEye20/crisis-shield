import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MythFactCard } from "@/components/MythFactCard";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const verifiedUpdates = [
  {
    id: 1,
    claimText: "Emergency alert: Major earthquake reported in downtown area causing widespread infrastructure collapse",
    verdict: "false" as const,
    confidence: 94,
    explanation: "This claim is FALSE. No seismic activity has been detected by national monitoring systems. The footage being shared appears to be from a 2019 earthquake in another region. Local emergency services have confirmed no earthquake-related incidents.",
    action: "This is misinformation. Do not evacuate or panic. Follow only official emergency channels for accurate information.",
    source: "National Geological Survey, Local Emergency Services",
    category: "disaster"
  },
  {
    id: 2,
    claimText: "Local hospital confirms capacity to handle emergency patients during current situation",
    verdict: "true" as const,
    confidence: 91,
    explanation: "This claim is TRUE. Hospital administration has officially confirmed adequate capacity, staffing, and resources to handle emergency cases. Emergency department is fully operational.",
    action: "You can safely seek medical care at this facility if needed. Emergency services are available and operational.",
    source: "Hospital Official Statement, Regional Healthcare Authority",
    category: "health"
  },
  {
    id: 3,
    claimText: "Water supply contaminated, do not drink tap water until further notice",
    verdict: "false" as const,
    confidence: 88,
    explanation: "This claim is FALSE. Municipal water authority confirms all systems are functioning normally. Latest quality tests show no contamination. No official health alerts have been issued.",
    action: "Tap water is safe to drink. This is misinformation. Continue normal water usage as directed by official sources.",
    source: "Municipal Water Authority, Health Department",
    category: "health"
  },
  {
    id: 4,
    claimText: "Government announces mandatory evacuation of coastal areas due to incoming hurricane",
    verdict: "unproven" as const,
    confidence: 67,
    explanation: "This claim is PARTIALLY VERIFIED. While a storm system is being tracked and some local authorities have issued voluntary advisories, no official mandatory evacuation order has been issued at the federal or state level.",
    action: "Monitor official weather services and local authorities. Voluntary evacuation may be recommended in some areas. Stay informed through verified channels.",
    source: "National Hurricane Center, Local Emergency Management",
    category: "weather"
  }
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
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredUpdates = activeFilter === "all" || activeFilter === "trending"
    ? verifiedUpdates
    : verifiedUpdates.filter(update => update.category === activeFilter);

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
            CrisisShield | Live Verified Updates
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
              className="font-semibold text-white "
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Verified Updates Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredUpdates.map((update) => (
            <MythFactCard
              key={update.id}
              claimText={update.claimText}
              verdict={update.verdict}
              confidence={update.confidence}
              explanation={update.explanation}
              action={update.action}
              source={update.source}
            />
          ))}
        </div>

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
