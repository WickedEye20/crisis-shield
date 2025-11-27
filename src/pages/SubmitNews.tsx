import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SubmitNews() {
  const [submitted, setSubmitted] = useState(false);
  const [claim, setClaim] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!claim.trim()) {
      toast({
        title: "Claim required",
        description: "Please enter the claim or rumor you want to verify.",
        variant: "destructive",
      });
      return;
    }

    // Simulate submission
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setClaim("");
      setUrl("");
      setCategory("");
      setName("");
      setEmail("");
      setFile(null);
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Submit a Claim for Verification
          </h1>
          <p className="text-muted-foreground text-lg">
            Help combat misinformation. Report rumors or news for fact-checking.
          </p>
        </div>

        {submitted ? (
          <Card className="border-2 border-risk-safe shadow-medium">
            <CardContent className="p-12 text-center">
              <CheckCircle2 className="h-16 w-16 text-risk-safe mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Claim Sent for Review
              </h2>
              <p className="text-muted-foreground">
                Our fact-checking team will analyze this claim and publish verified updates soon.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-medium border-2 border-border/50">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Claim Text */}
                <div className="space-y-2">
                  <Label htmlFor="claim" className="text-sm font-semibold text-foreground">
                    Claim or Rumor <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="claim"
                    placeholder="Enter the claim, rumor, or statement you want fact-checked..."
                    value={claim}
                    onChange={(e) => setClaim(e.target.value)}
                    className="min-h-[120px] resize-none"
                    required
                  />
                </div>

                {/* URL */}
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-sm font-semibold text-foreground">
                    News Link / URL (Optional)
                  </Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/article"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file" className="text-sm font-semibold text-foreground">
                    Upload Screenshot or Image (Optional)
                  </Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file")?.click()}
                      className="w-full sm:w-auto"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {file ? file.name : "Choose File"}
                    </Button>
                    <input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-semibold text-foreground">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="disaster">Disaster</SelectItem>
                      <SelectItem value="weather">Weather</SelectItem>
                      <SelectItem value="crime">Crime</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Optional User Details */}
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Optional Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full font-semibold">
                  Submit for Verification
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
