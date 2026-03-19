import { z } from "zod/v4";
import { BaseModule, jsonObjectSchema } from "./base";

// ========================
// Request Schemas
// ========================

const SetStudioModeEnabledRequestSchema = z.object({
  studioModeEnabled: z.boolean(),
});

const OpenInputPropertiesDialogRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const OpenInputFiltersDialogRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const OpenInputInteractDialogRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const OpenVideoMixProjectorRequestSchema = z.object({
  videoMixType: z.string(),
  monitorIndex: z.number().optional(),
  projectorGeometry: z.string().optional(),
});

const OpenSourceProjectorRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  monitorIndex: z.number().optional(),
  projectorGeometry: z.string().optional(),
});

// ========================
// Response Schemas
// ========================

const GetStudioModeEnabledResponseSchema = z.object({
  studioModeEnabled: z.boolean(),
});

const GetMonitorListResponseSchema = z.object({
  monitors: jsonObjectSchema.array(),
});

// ========================
// Exported Types
// ========================

export type GetStudioModeEnabledResponse = z.infer<typeof GetStudioModeEnabledResponseSchema>;
export type SetStudioModeEnabledRequest = z.infer<typeof SetStudioModeEnabledRequestSchema>;
export type OpenInputPropertiesDialogRequest = z.infer<typeof OpenInputPropertiesDialogRequestSchema>;
export type OpenInputFiltersDialogRequest = z.infer<typeof OpenInputFiltersDialogRequestSchema>;
export type OpenInputInteractDialogRequest = z.infer<typeof OpenInputInteractDialogRequestSchema>;
export type GetMonitorListResponse = z.infer<typeof GetMonitorListResponseSchema>;
export type OpenVideoMixProjectorRequest = z.infer<typeof OpenVideoMixProjectorRequestSchema>;
export type OpenSourceProjectorRequest = z.infer<typeof OpenSourceProjectorRequestSchema>;

// ========================
// Module
// ========================

export class UiModule extends BaseModule {
  async getStudioModeEnabled(): Promise<GetStudioModeEnabledResponse> {
    const res = await this.obs.call("GetStudioModeEnabled");
    return GetStudioModeEnabledResponseSchema.parse(res);
  }

  async setStudioModeEnabled(params: SetStudioModeEnabledRequest): Promise<void> {
    SetStudioModeEnabledRequestSchema.parse(params);
    await this.obs.call("SetStudioModeEnabled", params);
  }

  async openInputPropertiesDialog(params: OpenInputPropertiesDialogRequest): Promise<void> {
    OpenInputPropertiesDialogRequestSchema.parse(params);
    await this.obs.call("OpenInputPropertiesDialog", params);
  }

  async openInputFiltersDialog(params: OpenInputFiltersDialogRequest): Promise<void> {
    OpenInputFiltersDialogRequestSchema.parse(params);
    await this.obs.call("OpenInputFiltersDialog", params);
  }

  async openInputInteractDialog(params: OpenInputInteractDialogRequest): Promise<void> {
    OpenInputInteractDialogRequestSchema.parse(params);
    await this.obs.call("OpenInputInteractDialog", params);
  }

  async getMonitorList(): Promise<GetMonitorListResponse> {
    const res = await this.obs.call("GetMonitorList");
    return GetMonitorListResponseSchema.parse(res);
  }

  async openVideoMixProjector(params: OpenVideoMixProjectorRequest): Promise<void> {
    OpenVideoMixProjectorRequestSchema.parse(params);
    await this.obs.call("OpenVideoMixProjector", params);
  }

  async openSourceProjector(params: OpenSourceProjectorRequest): Promise<void> {
    OpenSourceProjectorRequestSchema.parse(params);
    await this.obs.call("OpenSourceProjector", params);
  }
}
