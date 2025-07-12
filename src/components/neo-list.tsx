"use client";

import { fetchFeed } from "@/app/actions";
import { NEObjectFeedSchema, NEObjectSchema } from "@/lib/schemas/neo";
import { extractDateFromString, formatDateString, nicerDateString, sortObjects } from "@/lib/utils";
import { ArrowDownUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import NEObject from "./neo";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export default function NEObjectList() {
    const [date, setDate] = useState<string>(formatDateString(new Date()));
    const [feed, setFeed] = useState<z.infer<typeof NEObjectFeedSchema>>();
    const [objects, setObjects] = useState<z.infer<typeof NEObjectSchema>[]>();
    const [sort, setSort] = useState<"name" | "size" | "speed" | "time" | "magnitude" | "distance">("time");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!date) return;

        const getFeed = async () => {
            setIsLoading(true);
            try {
                const feed = await fetchFeed(date);
                setFeed(feed);
                setObjects(sortObjects(feed, date, sort));
            } catch (error) {
                console.error("Error fetching NEO data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getFeed();
    }, [date]);

    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            setDate(formatDateString(newDate));
        }
    };

    const handleSortChange = (newSort: "name" | "size" | "speed" | "time" | "magnitude" | "distance") => {
        setSort(newSort);
        if (feed) {
            setObjects(sortObjects(feed, date, newSort));
        }
    };

    return (
        <div className={`grid grid-cols-3 gap-5 p-5 transition-opacity duration-200 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-3 items-center gap-2 mb-10">
                    <Button variant={"ghost"} className="cursor-pointer place-self-end w-1/3" onClick={() => setDate(extractDateFromString(feed?.links.prev))}>
                        <ChevronLeft />
                    </Button>
                    <span className="text-2xl text-center">{nicerDateString(date)}</span>
                    <Button variant={"ghost"} className="cursor-pointer place-self-start w-1/3" onClick={() => setDate(extractDateFromString(feed?.links.next))}>
                        <ChevronRight />
                    </Button>
                </div>
                <label htmlFor="date" className="block text-lg font-medium mb-2">Or choose a date:</label>
                <Calendar
                    id="date"
                    mode="single"
                    selected={new Date(date)}
                    onSelect={handleDateChange}
                    className="w-3/4"
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-5 p-5 col-span-2">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between outline-1 outline-secondary rounded-lg px-10 py-2 w-50 cursor-pointer font-bold">
                        <ArrowDownUp className="inline" />
                        {sort.charAt(0).toUpperCase() + sort.slice(1)}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background">
                        {["name", "size", "speed", "time", "magnitude", "distance"].map((option) => (
                            <DropdownMenuItem key={option} onClick={() => handleSortChange(option as typeof sort)} className="cursor-pointer">
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="h-90 w-3/4" />
                    ))
                ) : (
                    objects?.map((object) => (
                        <NEObject key={object.id} data={object} />
                    ))
                )}
            </div>
        </div>
    );
}