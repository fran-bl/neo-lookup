import { NEObjectSchema } from "@/lib/schemas/neo";
import { diameterRangeM, formatDate, formatMissDistanceKm, formatSpeedKms } from "@/lib/utils";
import { Clock, ExternalLink, Rocket, Ruler, Sun, Target } from "lucide-react";
import { z } from "zod";
import { Stat } from "./stat-wrapper";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export default function NEObject({ data }: { data: z.infer<typeof NEObjectSchema> }) {
    return (
        <Card className="p-4 rounded-2xl shadow-md border bg-background w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    {data.name}
                </h1>
                <Badge variant={data.is_potentially_hazardous_asteroid ? "destructive" : "secondary"} className="text-lg">
                    {data.is_potentially_hazardous_asteroid ? "Hazardous" : "Safe"}
                </Badge>
            </div>

            <p className="text-sm text-gray-500 mt-1">
                <a
                    href={data.nasa_jpl_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center underline"
                >
                    View in JPL Small-Body Database
                    <ExternalLink className="w-4 h-4 ml-1" />
                </a>
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4 text-lg">
                <Stat icon={Sun} label="Magnitude" value={data.absolute_magnitude_h} />
                <Stat icon={Ruler} label="Estimated Diameter" value={diameterRangeM(data)} />
                <Stat icon={Rocket} label="Speed" value={formatSpeedKms(data.close_approach_data[0].relative_velocity.kilometers_per_second)} />
                <Stat icon={Target} label="Miss Distance" value={formatMissDistanceKm(data.close_approach_data[0].miss_distance.kilometers)} />
            </div>

            <div className="mt-4 text-md text-gray-500">
                <Stat icon={Clock} label="Close Approach" value={formatDate(data.close_approach_data[0].close_approach_date_full)} />
            </div>
        </Card>
    );
}