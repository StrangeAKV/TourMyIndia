import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, days, interests } = await req.json();
    
    if (!destination) {
      return new Response(JSON.stringify({ error: "Destination is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Generating travel plan for ${destination}, ${days} days, interests: ${interests}`);

    const systemPrompt = `You are an expert Indian travel planner. Generate detailed, practical travel itineraries for destinations in India. 
Include specific tourist spots with their Google Maps coordinates (latitude, longitude) so users can navigate directly.
Format your response as JSON with this structure:
{
  "destination": "City/Region Name",
  "overview": "Brief overview of the destination",
  "bestTimeToVisit": "Best months to visit",
  "dailyItinerary": [
    {
      "day": 1,
      "title": "Day title",
      "places": [
        {
          "name": "Place name",
          "description": "Brief description",
          "duration": "Recommended time to spend",
          "lat": 28.6139,
          "lng": 77.2090,
          "tips": "Useful tips"
        }
      ]
    }
  ],
  "travelTips": ["tip1", "tip2"],
  "estimatedBudget": "Budget range in INR"
}`;

    const userPrompt = `Create a ${days || 3}-day travel itinerary for ${destination}, India. 
${interests ? `The traveler is interested in: ${interests}.` : 'Include a mix of cultural, historical, and scenic spots.'}
Include real tourist places with accurate coordinates for Google Maps navigation.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI response received successfully");
    
    let travelPlan;
    try {
      travelPlan = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response as JSON");
      travelPlan = { rawContent: content };
    }

    return new Response(JSON.stringify({ travelPlan }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in travel-planner function:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
