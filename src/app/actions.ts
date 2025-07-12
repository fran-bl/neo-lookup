"use server";

import { NEObjectFeedSchema } from "@/lib/schemas/neo";

export const fetchFeed = async (date: string) => {
    const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&detailed=true&api_key=${process.env.NASA_API_KEY}`);
    
    if (!response.ok) {
        throw new Error("Failed to fetch NEO data");
    }

    const data = await response.json();
    return NEObjectFeedSchema.parse(data);
}