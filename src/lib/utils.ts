import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
import { NEObjectFeedSchema, NEObjectSchema } from "./schemas/neo"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function diameterRangeM(data: z.infer<typeof NEObjectSchema>) {
  const min = data.estimated_diameter.meters.estimated_diameter_min.toFixed(2)
  const max = data.estimated_diameter.meters.estimated_diameter_max.toFixed(2)

  return `${min} - ${max} m`
}

export const formatSpeedKms = (speed: string) => {
  return parseFloat(speed).toFixed(2) + ' km/s'
}

export function formatMissDistanceKm(missDistance: string) {
  const roundedDistance = parseFloat(missDistance).toFixed(2)

  return new Intl.NumberFormat('ses').format(parseFloat(roundedDistance)) + ' km'
}

export function formatDate(dateStr: string) {
  const months = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  }

  const [datePart, timePart] = dateStr.split(" ")
  const [year, monStr, day] = datePart.split("-")
  const [hour, minute] = timePart.split(":")

  const month = months[monStr as keyof typeof months]
  const date = new Date(Date.UTC(+year, month, +day, +hour, +minute))

  const utc = new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
    timeZone: "UTC"
  }).format(date) + " UTC"

  const local = new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
  }).format(date) + " local"

  return `${utc} (${local})`
}

export function formatDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function nicerDateString(date: string): string {
  const [year, month, day] = date.split("-");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}

export function extractDateFromString(str: string | undefined): string {
  if (!str) return "";

  const re = /(\d{4})-(\d{2})-(\d{2})/;
  const match = str.match(re);

  return match ? match[0] : "";
}

export function sortObjects(data: z.infer<typeof NEObjectFeedSchema>, date: string, sortBy: "name" | "size" | "speed" | "time" | "magnitude" | "distance") {
  return data.near_earth_objects[date].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "size":
        return (b.estimated_diameter.meters.estimated_diameter_min - a.estimated_diameter.meters.estimated_diameter_min);
      case "speed":
        return parseFloat(b.close_approach_data[0].relative_velocity.kilometers_per_second) - parseFloat(a.close_approach_data[0].relative_velocity.kilometers_per_second);
      case "time":
        return new Date(a.close_approach_data[0].close_approach_date_full).getTime() - new Date(b.close_approach_data[0].close_approach_date_full).getTime();
      case "magnitude":
        return a.absolute_magnitude_h - b.absolute_magnitude_h;
      case "distance":
        return parseFloat(a.close_approach_data[0].miss_distance.kilometers) - parseFloat(b.close_approach_data[0].miss_distance.kilometers);
      default:
        return 0;
    }
  });
}
