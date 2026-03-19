import { z } from "zod/v4";
import { BaseModule, jsonObjectSchema } from "./base";

// ========================
// Request Schemas
// ========================

const GetOutputStatusRequestSchema = z.object({
  outputName: z.string(),
});

const ToggleOutputRequestSchema = z.object({
  outputName: z.string(),
});

const StartOutputRequestSchema = z.object({
  outputName: z.string(),
});

const StopOutputRequestSchema = z.object({
  outputName: z.string(),
});

const GetOutputSettingsRequestSchema = z.object({
  outputName: z.string(),
});

const SetOutputSettingsRequestSchema = z.object({
  outputName: z.string(),
  outputSettings: jsonObjectSchema,
});

// ========================
// Response Schemas
// ========================

const GetVirtualCamStatusResponseSchema = z.object({
  outputActive: z.boolean(),
});

const ToggleVirtualCamResponseSchema = z.object({
  outputActive: z.boolean(),
});

const GetReplayBufferStatusResponseSchema = z.object({
  outputActive: z.boolean(),
});

const ToggleReplayBufferResponseSchema = z.object({
  outputActive: z.boolean(),
});

const GetLastReplayBufferReplayResponseSchema = z.object({
  savedReplayPath: z.string(),
});

const GetOutputListResponseSchema = z.object({
  outputs: jsonObjectSchema.array(),
});

const GetOutputStatusResponseSchema = z.object({
  outputActive: z.boolean(),
  outputReconnecting: z.boolean(),
  outputTimecode: z.string(),
  outputDuration: z.number(),
  outputCongestion: z.number(),
  outputBytes: z.number(),
  outputSkippedFrames: z.number(),
  outputTotalFrames: z.number(),
});

const ToggleOutputResponseSchema = z.object({
  outputActive: z.boolean(),
});

const GetOutputSettingsResponseSchema = z.object({
  outputSettings: jsonObjectSchema,
});

// ========================
// Exported Types
// ========================

export type GetVirtualCamStatusResponse = z.infer<typeof GetVirtualCamStatusResponseSchema>;
export type ToggleVirtualCamResponse = z.infer<typeof ToggleVirtualCamResponseSchema>;
export type GetReplayBufferStatusResponse = z.infer<typeof GetReplayBufferStatusResponseSchema>;
export type ToggleReplayBufferResponse = z.infer<typeof ToggleReplayBufferResponseSchema>;
export type GetLastReplayBufferReplayResponse = z.infer<typeof GetLastReplayBufferReplayResponseSchema>;
export type GetOutputListResponse = z.infer<typeof GetOutputListResponseSchema>;
export type GetOutputStatusRequest = z.infer<typeof GetOutputStatusRequestSchema>;
export type GetOutputStatusResponse = z.infer<typeof GetOutputStatusResponseSchema>;
export type ToggleOutputRequest = z.infer<typeof ToggleOutputRequestSchema>;
export type ToggleOutputResponse = z.infer<typeof ToggleOutputResponseSchema>;
export type StartOutputRequest = z.infer<typeof StartOutputRequestSchema>;
export type StopOutputRequest = z.infer<typeof StopOutputRequestSchema>;
export type GetOutputSettingsRequest = z.infer<typeof GetOutputSettingsRequestSchema>;
export type GetOutputSettingsResponse = z.infer<typeof GetOutputSettingsResponseSchema>;
export type SetOutputSettingsRequest = z.infer<typeof SetOutputSettingsRequestSchema>;

// ========================
// Module
// ========================

export class OutputsModule extends BaseModule {
  async getVirtualCamStatus(): Promise<GetVirtualCamStatusResponse> {
    const res = await this.obs.call("GetVirtualCamStatus");
    return GetVirtualCamStatusResponseSchema.parse(res);
  }

  async toggleVirtualCam(): Promise<ToggleVirtualCamResponse> {
    const res = await this.obs.call("ToggleVirtualCam");
    return ToggleVirtualCamResponseSchema.parse(res);
  }

  async startVirtualCam(): Promise<void> {
    await this.obs.call("StartVirtualCam");
  }

  async stopVirtualCam(): Promise<void> {
    await this.obs.call("StopVirtualCam");
  }

  async getReplayBufferStatus(): Promise<GetReplayBufferStatusResponse> {
    const res = await this.obs.call("GetReplayBufferStatus");
    return GetReplayBufferStatusResponseSchema.parse(res);
  }

  async toggleReplayBuffer(): Promise<ToggleReplayBufferResponse> {
    const res = await this.obs.call("ToggleReplayBuffer");
    return ToggleReplayBufferResponseSchema.parse(res);
  }

  async startReplayBuffer(): Promise<void> {
    await this.obs.call("StartReplayBuffer");
  }

  async stopReplayBuffer(): Promise<void> {
    await this.obs.call("StopReplayBuffer");
  }

  async saveReplayBuffer(): Promise<void> {
    await this.obs.call("SaveReplayBuffer");
  }

  async getLastReplayBufferReplay(): Promise<GetLastReplayBufferReplayResponse> {
    const res = await this.obs.call("GetLastReplayBufferReplay");
    return GetLastReplayBufferReplayResponseSchema.parse(res);
  }

  async getOutputList(): Promise<GetOutputListResponse> {
    const res = await this.obs.call("GetOutputList");
    return GetOutputListResponseSchema.parse(res);
  }

  async getOutputStatus(params: GetOutputStatusRequest): Promise<GetOutputStatusResponse> {
    GetOutputStatusRequestSchema.parse(params);
    const res = await this.obs.call("GetOutputStatus", params);
    return GetOutputStatusResponseSchema.parse(res);
  }

  async toggleOutput(params: ToggleOutputRequest): Promise<ToggleOutputResponse> {
    ToggleOutputRequestSchema.parse(params);
    const res = await this.obs.call("ToggleOutput", params);
    return ToggleOutputResponseSchema.parse(res);
  }

  async startOutput(params: StartOutputRequest): Promise<void> {
    StartOutputRequestSchema.parse(params);
    await this.obs.call("StartOutput", params);
  }

  async stopOutput(params: StopOutputRequest): Promise<void> {
    StopOutputRequestSchema.parse(params);
    await this.obs.call("StopOutput", params);
  }

  async getOutputSettings(params: GetOutputSettingsRequest): Promise<GetOutputSettingsResponse> {
    GetOutputSettingsRequestSchema.parse(params);
    const res = await this.obs.call("GetOutputSettings", params);
    return GetOutputSettingsResponseSchema.parse(res);
  }

  async setOutputSettings(params: SetOutputSettingsRequest): Promise<void> {
    SetOutputSettingsRequestSchema.parse(params);
    await this.obs.call("SetOutputSettings", params);
  }
}
