import { CheckCircle2, ExternalLink, Shield } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Extension() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Chrome Extension</h1>
          <p className="text-muted-foreground mb-12">
            Verify claims directly from your browser
          </p>

          {/* Extension Preview */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">Extension Popup Preview</h2>
            
            <div className="flex justify-center">
              {/* Mock Extension Popup */}
              <Card className="w-[360px] shadow-strong border-2 border-border">
                <CardContent className="p-0">
                  {/* Extension Header */}
                  <div className="bg-primary p-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary-foreground" />
                    <span className="font-semibold text-primary-foreground">CrisisShield</span>
                  </div>

                  {/* Extension Content */}
                  <div className="p-5 space-y-4">
                    {/* Selected Claim */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 tracking-wide">
                        Selected Claim
                      </h3>
                      <p className="text-sm text-foreground leading-relaxed">
                        Emergency alert: Major earthquake reported in downtown area causing widespread infrastructure collapse
                      </p>
                    </div>

                    {/* Verdict */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 tracking-wide">
                        Verdict
                      </h3>
                      <Badge className="bg-risk-high text-white font-semibold uppercase text-xs px-3 py-1.5 flex items-center gap-2 w-fit">
                        <CheckCircle2 className="h-4 w-4" />
                        FALSE CLAIM
                      </Badge>
                      <div className="mt-2">
                        <span className="text-xs text-muted-foreground">Confidence: </span>
                        <span className="text-sm font-semibold text-foreground">94%</span>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2 tracking-wide">
                        Explanation
                      </h4>
                      <p className="text-xs text-foreground leading-relaxed">
                        No seismic activity detected by monitoring systems. Footage appears to be from a 2019 event. Local emergency services confirm no incidents.
                      </p>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full text-sm font-semibold" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Full Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-foreground mb-4">Installation</h2>
            <ol className="space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="font-semibold text-primary">1.</span>
                <span>Download the CrisisShield Chrome Extension</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">2.</span>
                <span>Navigate to chrome://extensions in your browser</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">3.</span>
                <span>Enable "Developer mode" in the top right corner</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">4.</span>
                <span>Click "Load unpacked" and select the extension folder</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">5.</span>
                <span>Pin the extension to your toolbar for quick access</span>
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
