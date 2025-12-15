import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Trash2, Navigation, Clock, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

interface SavedPlan {
  id: string;
  destination: string;
  days: number;
  interests: string | null;
  plan_data: TravelPlan;
  created_at: string;
}

export default function SavedPlans() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSavedPlans();
    }
  }, [user]);

  const fetchSavedPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("saved_travel_plans")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSavedPlans((data as unknown as SavedPlan[]) || []);
    } catch (error) {
      console.error("Error fetching saved plans:", error);
      toast({
        title: "Error",
        description: "Failed to load saved plans.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deletePlan = async (id: string) => {
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from("saved_travel_plans")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSavedPlans((prev) => prev.filter((plan) => plan.id !== id));
      toast({
        title: "Plan Deleted",
        description: "Your travel plan has been deleted.",
      });
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast({
        title: "Error",
        description: "Failed to delete plan.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const openInMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                My Saved Travel Plans
              </h1>
              <p className="text-muted-foreground">
                View and manage your AI-generated itineraries
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : savedPlans.length === 0 ? (
            <Card className="max-w-md mx-auto text-center py-12">
              <CardContent>
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Saved Plans Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Use our AI Travel Planner to create and save your first itinerary.
                </p>
                <Link to="/#travel-planner">
                  <Button variant="hero">Create Travel Plan</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {savedPlans.map((plan) => (
                <Card key={plan.id} className="shadow-card overflow-hidden">
                  <div 
                    className="bg-primary/10 px-6 py-4 cursor-pointer hover:bg-primary/15 transition-colors"
                    onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-display font-bold text-foreground">
                          {plan.plan_data.destination || plan.destination}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {plan.days} Days
                          </span>
                          {plan.interests && (
                            <span>• {plan.interests}</span>
                          )}
                          <span>
                            • Saved on {new Date(plan.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePlan(plan.id);
                        }}
                        disabled={deletingId === plan.id}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        {deletingId === plan.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {expandedPlan === plan.id && (
                    <CardContent className="p-6 animate-fade-in">
                      <p className="text-muted-foreground mb-4">{plan.plan_data.overview}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm mb-6">
                        <span className="inline-flex items-center gap-1 text-primary">
                          <Calendar className="w-4 h-4" />
                          Best Time: {plan.plan_data.bestTimeToVisit}
                        </span>
                        <span className="inline-flex items-center gap-1 text-secondary">
                          💰 Budget: {plan.plan_data.estimatedBudget}
                        </span>
                      </div>

                      {plan.plan_data.dailyItinerary?.map((day) => (
                        <div key={day.day} className="mb-6 last:mb-0">
                          <h4 className="font-semibold text-foreground mb-3">
                            Day {day.day}: {day.title}
                          </h4>
                          <div className="space-y-3">
                            {day.places?.map((place, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                              >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                  {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <h5 className="font-medium text-foreground text-sm">{place.name}</h5>
                                      <p className="text-xs text-muted-foreground mt-0.5">{place.description}</p>
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
                                        className="gap-1 h-7 text-xs"
                                      >
                                        <Navigation className="w-3 h-3" />
                                        Map
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
