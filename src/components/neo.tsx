"use client";

import { NEObjectSchema } from "@/lib/schemas/neo";
import { Diameter, Sun } from "lucide-react";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function NEObject({ data }: { data: z.infer<typeof NEObjectSchema> }) {
    return (
        <Card className="display-flex flex-row items-center">
            <CardHeader className="text-3xl w-[200px] text-nowrap">{data.name}</CardHeader>
            <CardContent className="display-flex flex-col">
                <div className="grid grid-cols-2 items-center gap-4 w-100">
                    <span className="text-left"><Diameter className="inline mr-2 text-primary" />Diameter</span>
                    <span>{data.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} - {data.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m</span>
                </div>
                <div className="grid grid-cols-2 items-center gap-4 w-100">
                    <span className="text-left"><Sun className="inline mr-2 text-primary" />Absolute magnitude</span>
                    <span>{data.absolute_magnitude_h.toFixed(2)}</span>
                </div>
            </CardContent>
        </Card>
    );
}