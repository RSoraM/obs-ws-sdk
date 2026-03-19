import { z } from "zod/v4";
import { BaseModule, jsonObjectSchema } from "./base";

// ========================
// Request Schemas
// ========================

const GetPersistentDataRequestSchema = z.object({
  realm: z.string(),
  slotName: z.string(),
});

const SetPersistentDataRequestSchema = z.object({
  realm: z.string(),
  slotName: z.string(),
  slotValue: z.json(),
});

const SetCurrentSceneCollectionRequestSchema = z.object({
  sceneCollectionName: z.string(),
});

const CreateSceneCollectionRequestSchema = z.object({
  sceneCollectionName: z.string(),
});

const SetCurrentProfileRequestSchema = z.object({
  profileName: z.string(),
});

const CreateProfileRequestSchema = z.object({
  profileName: z.string(),
});

const RemoveProfileRequestSchema = z.object({
  profileName: z.string(),
});

const GetProfileParameterRequestSchema = z.object({
  parameterCategory: z.string(),
  parameterName: z.string(),
});

const SetProfileParameterRequestSchema = z.object({
  parameterCategory: z.string(),
  parameterName: z.string(),
  parameterValue: z.string(),
});

const SetVideoSettingsRequestSchema = z.object({
  fpsNumerator: z.number().min(1).optional(),
  fpsDenominator: z.number().min(1).optional(),
  baseWidth: z.number().min(1).max(4096).optional(),
  baseHeight: z.number().min(1).max(4096).optional(),
  outputWidth: z.number().min(1).max(4096).optional(),
  outputHeight: z.number().min(1).max(4096).optional(),
});

const SetStreamServiceSettingsRequestSchema = z.object({
  streamServiceType: z.string(),
  streamServiceSettings: jsonObjectSchema,
});

const SetRecordDirectoryRequestSchema = z.object({
  recordDirectory: z.string(),
});

// ========================
// Response Schemas
// ========================

const GetPersistentDataResponseSchema = z.object({
  slotValue: z.json(),
});

const GetSceneCollectionListResponseSchema = z.object({
  currentSceneCollectionName: z.string(),
  sceneCollections: z.string().array(),
});

const GetProfileListResponseSchema = z.object({
  currentProfileName: z.string(),
  profiles: z.string().array(),
});

const GetProfileParameterResponseSchema = z.object({
  parameterValue: z.string().nullable(),
  defaultParameterValue: z.string().nullable(),
});

const GetVideoSettingsResponseSchema = z.object({
  fpsNumerator: z.number(),
  fpsDenominator: z.number(),
  baseWidth: z.number(),
  baseHeight: z.number(),
  outputWidth: z.number(),
  outputHeight: z.number(),
});

const GetStreamServiceSettingsResponseSchema = z.object({
  streamServiceType: z.string(),
  streamServiceSettings: jsonObjectSchema,
});

const GetRecordDirectoryResponseSchema = z.object({
  recordDirectory: z.string(),
});

// ========================
// Exported Types
// ========================

export type GetPersistentDataRequest = z.infer<typeof GetPersistentDataRequestSchema>;
export type GetPersistentDataResponse = z.infer<typeof GetPersistentDataResponseSchema>;
export type SetPersistentDataRequest = z.infer<typeof SetPersistentDataRequestSchema>;
export type SetCurrentSceneCollectionRequest = z.infer<typeof SetCurrentSceneCollectionRequestSchema>;
export type CreateSceneCollectionRequest = z.infer<typeof CreateSceneCollectionRequestSchema>;
export type GetSceneCollectionListResponse = z.infer<typeof GetSceneCollectionListResponseSchema>;
export type SetCurrentProfileRequest = z.infer<typeof SetCurrentProfileRequestSchema>;
export type CreateProfileRequest = z.infer<typeof CreateProfileRequestSchema>;
export type RemoveProfileRequest = z.infer<typeof RemoveProfileRequestSchema>;
export type GetProfileListResponse = z.infer<typeof GetProfileListResponseSchema>;
export type GetProfileParameterRequest = z.infer<typeof GetProfileParameterRequestSchema>;
export type GetProfileParameterResponse = z.infer<typeof GetProfileParameterResponseSchema>;
export type SetProfileParameterRequest = z.infer<typeof SetProfileParameterRequestSchema>;
export type GetVideoSettingsResponse = z.infer<typeof GetVideoSettingsResponseSchema>;
export type SetVideoSettingsRequest = z.infer<typeof SetVideoSettingsRequestSchema>;
export type GetStreamServiceSettingsResponse = z.infer<typeof GetStreamServiceSettingsResponseSchema>;
export type SetStreamServiceSettingsRequest = z.infer<typeof SetStreamServiceSettingsRequestSchema>;
export type GetRecordDirectoryResponse = z.infer<typeof GetRecordDirectoryResponseSchema>;
export type SetRecordDirectoryRequest = z.infer<typeof SetRecordDirectoryRequestSchema>;

// ========================
// Module
// ========================

export class ConfigModule extends BaseModule {
  async getPersistentData(params: GetPersistentDataRequest): Promise<GetPersistentDataResponse> {
    GetPersistentDataRequestSchema.parse(params);
    const res = await this.obs.call("GetPersistentData", params);
    return GetPersistentDataResponseSchema.parse(res);
  }

  async setPersistentData(params: SetPersistentDataRequest): Promise<void> {
    SetPersistentDataRequestSchema.parse(params);
    await this.obs.call("SetPersistentData", params);
  }

  async getSceneCollectionList(): Promise<GetSceneCollectionListResponse> {
    const res = await this.obs.call("GetSceneCollectionList");
    return GetSceneCollectionListResponseSchema.parse(res);
  }

  async setCurrentSceneCollection(params: SetCurrentSceneCollectionRequest): Promise<void> {
    SetCurrentSceneCollectionRequestSchema.parse(params);
    await this.obs.call("SetCurrentSceneCollection", params);
  }

  async createSceneCollection(params: CreateSceneCollectionRequest): Promise<void> {
    CreateSceneCollectionRequestSchema.parse(params);
    await this.obs.call("CreateSceneCollection", params);
  }

  async getProfileList(): Promise<GetProfileListResponse> {
    const res = await this.obs.call("GetProfileList");
    return GetProfileListResponseSchema.parse(res);
  }

  async setCurrentProfile(params: SetCurrentProfileRequest): Promise<void> {
    SetCurrentProfileRequestSchema.parse(params);
    await this.obs.call("SetCurrentProfile", params);
  }

  async createProfile(params: CreateProfileRequest): Promise<void> {
    CreateProfileRequestSchema.parse(params);
    await this.obs.call("CreateProfile", params);
  }

  async removeProfile(params: RemoveProfileRequest): Promise<void> {
    RemoveProfileRequestSchema.parse(params);
    await this.obs.call("RemoveProfile", params);
  }

  async getProfileParameter(params: GetProfileParameterRequest): Promise<GetProfileParameterResponse> {
    GetProfileParameterRequestSchema.parse(params);
    const res = await this.obs.call("GetProfileParameter", params);
    return GetProfileParameterResponseSchema.parse(res);
  }

  async setProfileParameter(params: SetProfileParameterRequest): Promise<void> {
    SetProfileParameterRequestSchema.parse(params);
    await this.obs.call("SetProfileParameter", params);
  }

  async getVideoSettings(): Promise<GetVideoSettingsResponse> {
    const res = await this.obs.call("GetVideoSettings");
    return GetVideoSettingsResponseSchema.parse(res);
  }

  async setVideoSettings(params: SetVideoSettingsRequest): Promise<void> {
    SetVideoSettingsRequestSchema.parse(params);
    await this.obs.call("SetVideoSettings", params);
  }

  async getStreamServiceSettings(): Promise<GetStreamServiceSettingsResponse> {
    const res = await this.obs.call("GetStreamServiceSettings");
    return GetStreamServiceSettingsResponseSchema.parse(res);
  }

  async setStreamServiceSettings(params: SetStreamServiceSettingsRequest): Promise<void> {
    SetStreamServiceSettingsRequestSchema.parse(params);
    await this.obs.call("SetStreamServiceSettings", params);
  }

  async getRecordDirectory(): Promise<GetRecordDirectoryResponse> {
    const res = await this.obs.call("GetRecordDirectory");
    return GetRecordDirectoryResponseSchema.parse(res);
  }

  async setRecordDirectory(params: SetRecordDirectoryRequest): Promise<void> {
    SetRecordDirectoryRequestSchema.parse(params);
    await this.obs.call("SetRecordDirectory", params);
  }
}
