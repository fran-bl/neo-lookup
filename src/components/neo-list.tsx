"use client";

import { fetchFeed } from "@/app/actions";
import { NEObjectFeedSchema, NEObjectSchema } from "@/lib/schemas/neo";
import { useEffect, useState } from "react";
import { z } from "zod";
import NEObject from "./neo";

export default function NEObjectList() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [feed, setFeed] = useState<z.infer<typeof NEObjectFeedSchema>>();
    const [objects, setObjects] = useState<z.infer<typeof NEObjectSchema>[]>();

    useEffect(() => {
        const getFeed = async () => {
            try {
                const feed = await fetchFeed(date);
                setFeed(feed);
                setObjects(feed.near_earth_objects[date] || []);
            } catch (error) {
                console.error("Error fetching NEO data:", error);
            }
        };
        getFeed();
    }, [date]);

    return (
        <div>
            {objects?.map((object) => (
                <NEObject key={object.id} data={object} />
            ))}
        </div>
    );
}