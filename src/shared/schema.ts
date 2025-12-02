import { z } from "zod";

// Measurements schema
export const measurementsSchema = z.object({
  height: z.number(),
  bust: z.number(),
  waist: z.number(),
  hips: z.number(),
  shoulder: z.number(),
  inseam: z.number(),
});

export type Measurements = z.infer<typeof measurementsSchema>;

// Clothing type enum
export const clothingTypeSchema = z.enum(["Top", "Bottom", "Dress"]);
export type ClothingType = z.infer<typeof clothingTypeSchema>;

// Upload model request schema
export const uploadModelRequestSchema = z.object({
  height: z.number().optional(),
});

export const uploadModelResponseSchema = z.object({
  measurements: measurementsSchema,
  previewUrl: z.string(),
});

export const uploadModelErrorSchema = z.object({
  error: z.literal("height_needed"),
});

// Auth schemas
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const loginResponseSchema = z.object({
  token: z.string(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

// Try-on request schema
export const tryOnRequestSchema = z.object({
  modelImage: z.string(),
  clothingImage: z.string(),
  clothingType: clothingTypeSchema,
});

export const tryOnResponseSchema = z.object({
  resultUrl: z.string(),
});

export type TryOnRequest = z.infer<typeof tryOnRequestSchema>;
export type TryOnResponse = z.infer<typeof tryOnResponseSchema>;
