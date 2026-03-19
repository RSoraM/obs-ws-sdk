import { z } from "zod/v4";
import { BaseModule, jsonObjectSchema } from "./base";

// ========================
// Request Schemas
// ========================

const GetSourceFilterListRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
});

const GetSourceFilterDefaultSettingsRequestSchema = z.object({
  filterKind: z.string(),
});

const CreateSourceFilterRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  filterName: z.string(),
  filterKind: z.string(),
  filterSettings: jsonObjectSchema.optional(),
});

const RemoveSourceFilterRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  filterName: z.string(),
});

const SetSourceFilterNameRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  filterName: z.string(),
  newFilterName: z.string(),
});

const GetSourceFilterRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  filterName: z.string(),
});

const SetSourceFilterIndexRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  filterName: z.string(),
  filterIndex: z.number().min(0),
});

const SetSourceFilterSettingsRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  filterName: z.string(),
  filterSettings: jsonObjectSchema,
  overlay: z.boolean().optional(),
});

const SetSourceFilterEnabledRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  filterName: z.string(),
  filterEnabled: z.boolean(),
});

// ========================
// Response Schemas
// ========================

const GetSourceFilterKindListResponseSchema = z.object({
  sourceFilterKinds: z.string().array(),
});

const GetSourceFilterListResponseSchema = z.object({
  filters: jsonObjectSchema.array(),
});

const GetSourceFilterDefaultSettingsResponseSchema = z.object({
  defaultFilterSettings: jsonObjectSchema,
});

const GetSourceFilterResponseSchema = z.object({
  filterEnabled: z.boolean(),
  filterIndex: z.number(),
  filterKind: z.string(),
  filterName: z.string(),
  filterSettings: jsonObjectSchema,
});

// ========================
// Exported Types
// ========================

export type GetSourceFilterKindListResponse = z.infer<typeof GetSourceFilterKindListResponseSchema>;
export type GetSourceFilterListRequest = z.infer<typeof GetSourceFilterListRequestSchema>;
export type GetSourceFilterListResponse = z.infer<typeof GetSourceFilterListResponseSchema>;
export type GetSourceFilterDefaultSettingsRequest = z.infer<typeof GetSourceFilterDefaultSettingsRequestSchema>;
export type GetSourceFilterDefaultSettingsResponse = z.infer<typeof GetSourceFilterDefaultSettingsResponseSchema>;
export type CreateSourceFilterRequest = z.infer<typeof CreateSourceFilterRequestSchema>;
export type RemoveSourceFilterRequest = z.infer<typeof RemoveSourceFilterRequestSchema>;
export type SetSourceFilterNameRequest = z.infer<typeof SetSourceFilterNameRequestSchema>;
export type GetSourceFilterRequest = z.infer<typeof GetSourceFilterRequestSchema>;
export type GetSourceFilterResponse = z.infer<typeof GetSourceFilterResponseSchema>;
export type SetSourceFilterIndexRequest = z.infer<typeof SetSourceFilterIndexRequestSchema>;
export type SetSourceFilterSettingsRequest = z.infer<typeof SetSourceFilterSettingsRequestSchema>;
export type SetSourceFilterEnabledRequest = z.infer<typeof SetSourceFilterEnabledRequestSchema>;

// ========================
// Module
// ========================

export class FiltersModule extends BaseModule {
  async getSourceFilterKindList(): Promise<GetSourceFilterKindListResponse> {
    const res = await this.obs.call("GetSourceFilterKindList");
    return GetSourceFilterKindListResponseSchema.parse(res);
  }

  async getSourceFilterList(params: GetSourceFilterListRequest): Promise<GetSourceFilterListResponse> {
    GetSourceFilterListRequestSchema.parse(params);
    const res = await this.obs.call("GetSourceFilterList", params);
    return GetSourceFilterListResponseSchema.parse(res);
  }

  async getSourceFilterDefaultSettings(
    params: GetSourceFilterDefaultSettingsRequest,
  ): Promise<GetSourceFilterDefaultSettingsResponse> {
    GetSourceFilterDefaultSettingsRequestSchema.parse(params);
    const res = await this.obs.call("GetSourceFilterDefaultSettings", params);
    return GetSourceFilterDefaultSettingsResponseSchema.parse(res);
  }

  async createSourceFilter(params: CreateSourceFilterRequest): Promise<void> {
    CreateSourceFilterRequestSchema.parse(params);
    await this.obs.call("CreateSourceFilter", params);
  }

  async removeSourceFilter(params: RemoveSourceFilterRequest): Promise<void> {
    RemoveSourceFilterRequestSchema.parse(params);
    await this.obs.call("RemoveSourceFilter", params);
  }

  async setSourceFilterName(params: SetSourceFilterNameRequest): Promise<void> {
    SetSourceFilterNameRequestSchema.parse(params);
    await this.obs.call("SetSourceFilterName", params);
  }

  async getSourceFilter(params: GetSourceFilterRequest): Promise<GetSourceFilterResponse> {
    GetSourceFilterRequestSchema.parse(params);
    const res = await this.obs.call("GetSourceFilter", params);
    return GetSourceFilterResponseSchema.parse(res);
  }

  async setSourceFilterIndex(params: SetSourceFilterIndexRequest): Promise<void> {
    SetSourceFilterIndexRequestSchema.parse(params);
    await this.obs.call("SetSourceFilterIndex", params);
  }

  async setSourceFilterSettings(params: SetSourceFilterSettingsRequest): Promise<void> {
    SetSourceFilterSettingsRequestSchema.parse(params);
    await this.obs.call("SetSourceFilterSettings", params);
  }

  async setSourceFilterEnabled(params: SetSourceFilterEnabledRequest): Promise<void> {
    SetSourceFilterEnabledRequestSchema.parse(params);
    await this.obs.call("SetSourceFilterEnabled", params);
  }
}
