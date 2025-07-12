import { z } from 'zod';

export const NEObjectSchema = z.object({
    links: z.object({
        self: z.string(),
    }),
    id: z.string(),
    neo_reference_id: z.string(),
    name: z.string(),
    designation: z.string().optional(),
    nasa_jpl_url: z.string(),
    absolute_magnitude_h: z.number(),
    estimated_diameter: z.object({
        kilometers: z.object({
            estimated_diameter_min: z.number(),
            estimated_diameter_max: z.number(),
        }),
        meters: z.object({
            estimated_diameter_min: z.number(),
            estimated_diameter_max: z.number(),
        }),
        miles: z.object({
            estimated_diameter_min: z.number(),
            estimated_diameter_max: z.number(),
        }),
        feet: z.object({
            estimated_diameter_min: z.number(),
            estimated_diameter_max: z.number(),
        }),
    }),
    is_potentially_hazardous_asteroid: z.boolean(),
    close_approach_data: z.array(z.object({
        close_approach_date: z.string(),
        close_approach_date_full: z.string(),
        epoch_date_close_approach: z.number(),
        relative_velocity: z.object({
            kilometers_per_second: z.string(),
            kilometers_per_hour: z.string(),
            miles_per_hour: z.string(),
        }),
        miss_distance: z.object({
            astronomical: z.string(),
            lunar: z.string(),
            kilometers: z.string(),
            miles: z.string(),
        }),
        orbiting_body: z.string(),
    })),
    orbital_data: z.object({
        orbit_id: z.string(),
        orbit_determination_date: z.string(),
        first_observation_date: z.string(),
        last_observation_date: z.string(),
        data_arc_in_days: z.number(),
        observations_used: z.number(),
        orbit_uncertainty: z.string(),
        minimum_orbit_intersection: z.string(),
        jupiter_tisserand_invariant: z.string(),
        epoch_osculation: z.string(),
        eccentricity: z.string(),
        semi_major_axis: z.string(),
        inclination: z.string(),
        ascending_node_longitude: z.string(),
        orbital_period: z.string(),
        perihelion_distance: z.string(),
        perihelion_argument: z.string(),
        aphelion_distance: z.string(),
        perihelion_time: z.string(),
        mean_anomaly: z.string(),
        mean_motion: z.string(),
        equinox: z.string(),
        orbit_class: z.object({
            orbit_class_type: z.string(),
            orbit_class_range: z.string(),
            orbit_class_description: z.string(),
        }),
    }),
    is_sentry_object: z.boolean(),
});

export const NEObjectFeedSchema = z.object({
    links: z.object({
        next: z.string(),
        prev: z.string(),
        self: z.string(),
    }),
    element_count: z.number(),
    near_earth_objects: z.record(z.string(), z.array(NEObjectSchema)),
});