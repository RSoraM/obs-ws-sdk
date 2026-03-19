import { z } from "zod/v4";
import { BaseModule, jsonObjectSchema } from "./base";

// ========================
// Request Schemas
// ========================

const GetSourceActiveRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
});

const GetSourceScreenshotRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  imageFormat: z.string(),
  imageWidth: z.number().min(8).max(4096).optional(),
  imageHeight: z.number().min(8).max(4096).optional(),
  imageCompressionQuality: z.number().min(-1).max(100).optional(),
});

const SaveSourceScreenshotRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  imageFormat: z.string(),
  imageFilePath: z.string(),
  imageWidth: z.number().min(8).max(4096).optional(),
  imageHeight: z.number().min(8).max(4096).optional(),
  imageCompressionQuality: z.number().min(-1).max(100).optional(),
});

// ========================
// Response Schemas
// ========================

const GetSourceActiveResponseSchema = z.object({
  videoActive: z.boolean(),
  videoShowing: z.boolean(),
});

const GetSourceScreenshotResponseSchema = z.object({
  imageData: z.string(),
});

const GetCanvasListResponseSchema = z.object({
  canvases: jsonObjectSchema.array(),
});

// ========================
// Exported Types
// ========================

export type GetSourceActiveRequest = z.infer<typeof GetSourceActiveRequestSchema>;
export type GetSourceActiveResponse = z.infer<typeof GetSourceActiveResponseSchema>;
export type GetSourceScreenshotRequest = z.infer<typeof GetSourceScreenshotRequestSchema>;
export type GetSourceScreenshotResponse = z.infer<typeof GetSourceScreenshotResponseSchema>;
export type SaveSourceScreenshotRequest = z.infer<typeof SaveSourceScreenshotRequestSchema>;
export type GetCanvasListResponse = z.infer<typeof GetCanvasListResponseSchema>;

// ========================
// Module
// ========================

export class SourcesModule extends BaseModule {
  async getSourceActive(params: GetSourceActiveRequest): Promise<GetSourceActiveResponse> {
    GetSourceActiveRequestSchema.parse(params);
    const res = await this.obs.call("GetSourceActive", params);
    return GetSourceActiveResponseSchema.parse(res);
  }

  async getSourceScreenshot(params: GetSourceScreenshotRequest): Promise<GetSourceScreenshotResponse> {
    GetSourceScreenshotRequestSchema.parse(params);
    const res = await this.obs.call("GetSourceScreenshot", params);
    return GetSourceScreenshotResponseSchema.parse(res);
  }

  async saveSourceScreenshot(params: SaveSourceScreenshotRequest): Promise<void> {
    SaveSourceScreenshotRequestSchema.parse(params);
    await this.obs.call("SaveSourceScreenshot", params);
  }

  async getCanvasList(): Promise<GetCanvasListResponse> {
    const res = await this.obs.call("GetCanvasList");
    return GetCanvasListResponseSchema.parse(res);
  }
}
