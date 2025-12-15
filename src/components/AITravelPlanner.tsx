import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Sparkles, Navigation, Clock, Lightbulb, Loader2, Save, BookmarkCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Place {
  name: string;
  description: string;
  duration: string;
  lat: number;
  lng: number;
  tips?: string;
}

interface DayItinerary {
  day: number;
  title: string;
  places: Place[];
}

interface TravelPlan {
  destination: string;
  overview: string;
  bestTimeToVisit: string;
  dailyItinerary: DayItinerary[];
  travelTips: string[];
  estimatedBudget: string;
}

export function AITravelPlanner() {
  const { user } = useAuth();
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("3");
  const [interests, setInterests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);

  const handleGeneratePlan = async () => {
    if (!destination.trim()) {
      toast({
        title: "Destination Required",
        description: "Please enter a destination to generate a travel plan.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTravelPlan(null);
    setIsSaved(false);

    try {
      const { data, error } = await supabase.functions.invoke("travel-planner", {
        body: { destination, days: parseInt(days), interests },
      });

      if (error) throw error;

      if (data?.travelPlan) {
        setTravelPlan(data.travelPlan);
        toast({
          title: "Travel Plan Generated!",
          description: `Your ${days}-day itinerary for ${destination} is ready.`,
        });
      }
    } catch (error) {
      console.error("Error generating travel plan:", error);
      toast({
        title: "Error",
        description: "Failed to generate travel plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlan = async () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to save your travel plans.",
        variant: "destructive",
      });
      return;
    }

    if (!travelPlan) return;

    setIsSaving(true);
    try {
      const { error } = await supabase.from("saved_travel_plans").insert([{
        user_id: user.id,
        destination,
        days: parseInt(days),
        interests: interests || null,
        plan_data: JSON.parse(JSON.stringify(travelPlan)),
      }]);

      if (error) throw error;

      setIsSaved(true);
      toast({
        title: "Plan Saved!",
        description: "Your travel plan has been saved. View it in My Saved Plans.",
      });
    } catch (error) {
      console.error("Error saving plan:", error);
      toast({
        title: "Error",
        description: "Failed to save plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const openInMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="travel-planner" className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            AI Travel Planner
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let our AI create a personalized travel itinerary for you. Get detailed day-by-day plans with tourist spots, 
            timings, and direct Google Maps navigation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Input Form */}
          <Card className="mb-8 shadow-card">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Destination
                  </label>
                  <Input
                    placeholder="e.g., Rajasthan, Kerala, Ladakh"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Number of Days
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="14"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Lightbulb className="w-4 h-4 inline mr-1" />
                    Interests (Optional)
                  </label>
                  <Input
                    placeholder="e.g., temples, beaches, adventure"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              <Button
                onClick={handleGeneratePlan}
                disabled={isLoading}
                className="w-full"
                variant="hero"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Travel Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Travel Plan Results */}
          {travelPlan && (
            <div className="space-y-6 animate-fade-in">
              {/* Overview Card with Save Button */}
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      {travelPlan.destination}
                    </h3>
                    {user ? (
                      <Button
                        onClick={handleSavePlan}
                        disabled={isSaving || isSaved}
                        variant={isSaved ? "outline" : "default"}
                        className="gap-2"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : isSaved ? (
                          <>
                            <BookmarkCheck className="w-4 h-4" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Plan
                          </>
                        )}
                      </Button>
                    ) : (
                      <Link to="/auth">
                        <Button variant="outline" className="gap-2">
                          <Save className="w-4 h-4" />
                          Sign In to Save
                        </Button>
                      </Link>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">{travelPlan.overview}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-1 text-primary">
                      <Calendar className="w-4 h-4" />
                      Best Time: {travelPlan.bestTimeToVisit}
                    </span>
                    <span className="inline-flex items-center gap-1 text-secondary">
                      💰 Budget: {travelPlan.estimatedBudget}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Itinerary */}
              {travelPlan.dailyItinerary?.map((day) => (
                <Card key={day.day} className="shadow-card overflow-hidden">
                  <div className="bg-primary/10 px-6 py-3">
                    <h4 className="font-display font-bold text-foreground">
                      Day {day.day}: {day.title}
                    </h4>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {day.places?.map((place, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h5 className="font-semibold text-foreground">{place.name}</h5>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {place.description}
                                </p>
                                {place.tips && (
                                  <p className="text-xs text-primary mt-2 italic">
                                    💡 {place.tips}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {place.duration}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openInMaps(place.lat, place.lng, place.name)}
                                  className="gap-1"
                                >
                                  <Navigation className="w-4 h-4" />
                                  Navigate
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Travel Tips */}
              {travelPlan.travelTips && travelPlan.travelTips.length > 0 && (
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <h4 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      Travel Tips
                    </h4>
                    <ul className="space-y-2">
                      {travelPlan.travelTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
