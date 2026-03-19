import { z } from "zod/v4";
import { BaseModule, jsonObjectSchema } from "./base";

// ========================
// Request Schemas
// ========================

const SetCurrentSceneTransitionRequestSchema = z.object({
  transitionName: z.string(),
});

const SetCurrentSceneTransitionDurationRequestSchema = z.object({
  transitionDuration: z.number().min(50).max(20000),
});

const SetCurrentSceneTransitionSettingsRequestSchema = z.object({
  transitionSettings: jsonObjectSchema,
  overlay: z.boolean().optional(),
});

const SetTBarPositionRequestSchema = z.object({
  position: z.number().min(0).max(1),
  release: z.boolean().optional(),
});

// ========================
// Response Schemas
// ========================

const GetTransitionKindListResponseSchema = z.object({
  transitionKinds: z.string().array(),
});

const GetSceneTransitionListResponseSchema = z.object({
  currentSceneTransitionName: z.string().nullable(),
  currentSceneTransitionUuid: z.string().nullable(),
  currentSceneTransitionKind: z.string().nullable(),
  transitions: jsonObjectSchema.array(),
});

const GetCurrentSceneTransitionResponseSchema = z.object({
  transitionName: z.string(),
  transitionUuid: z.string(),
  transitionKind: z.string(),
  transitionFixed: z.boolean(),
  transitionDuration: z.number().nullable(),
  transitionConfigurable: z.boolean(),
  transitionSettings: jsonObjectSchema.nullable(),
});

const GetCurrentSceneTransitionCursorResponseSchema = z.object({
  transitionCursor: z.number(),
});

// ========================
// Exported Types
// ========================

export type GetTransitionKindListResponse = z.infer<typeof GetTransitionKindListResponseSchema>;
export type GetSceneTransitionListResponse = z.infer<typeof GetSceneTransitionListResponseSchema>;
export type GetCurrentSceneTransitionResponse = z.infer<typeof GetCurrentSceneTransitionResponseSchema>;
export type SetCurrentSceneTransitionRequest = z.infer<typeof SetCurrentSceneTransitionRequestSchema>;
export type SetCurrentSceneTransitionDurationRequest = z.infer<typeof SetCurrentSceneTransitionDurationRequestSchema>;
export type SetCurrentSceneTransitionSettingsRequest = z.infer<typeof SetCurrentSceneTransitionSettingsRequestSchema>;
export type GetCurrentSceneTransitionCursorResponse = z.infer<typeof GetCurrentSceneTransitionCursorResponseSchema>;
export type SetTBarPositionRequest = z.infer<typeof SetTBarPositionRequestSchema>;

// ========================
// Module
// ========================

export class TransitionsModule extends BaseModule {
  async getTransitionKindList(): Promise<GetTransitionKindListResponse> {
    const res = await this.obs.call("GetTransitionKindList");
    return GetTransitionKindListResponseSchema.parse(res);
  }

  async getSceneTransitionList(): Promise<GetSceneTransitionListResponse> {
    const res = await this.obs.call("GetSceneTransitionList");
    return GetSceneTransitionListResponseSchema.parse(res);
  }

  async getCurrentSceneTransition(): Promise<GetCurrentSceneTransitionResponse> {
    const res = await this.obs.call("GetCurrentSceneTransition");
    return GetCurrentSceneTransitionResponseSchema.parse(res);
  }

  async setCurrentSceneTransition(params: SetCurrentSceneTransitionRequest): Promise<void> {
    SetCurrentSceneTransitionRequestSchema.parse(params);
    await this.obs.call("SetCurrentSceneTransition", params);
  }

  async setCurrentSceneTransitionDuration(params: SetCurrentSceneTransitionDurationRequest): Promise<void> {
    SetCurrentSceneTransitionDurationRequestSchema.parse(params);
    await this.obs.call("SetCurrentSceneTransitionDuration", params);
  }

  async setCurrentSceneTransitionSettings(params: SetCurrentSceneTransitionSettingsRequest): Promise<void> {
    SetCurrentSceneTransitionSettingsRequestSchema.parse(params);
    await this.obs.call("SetCurrentSceneTransitionSettings", params);
  }

  async getCurrentSceneTransitionCursor(): Promise<GetCurrentSceneTransitionCursorResponse> {
    const res = await this.obs.call("GetCurrentSceneTransitionCursor");
    return GetCurrentSceneTransitionCursorResponseSchema.parse(res);
  }

  async triggerStudioModeTransition(): Promise<void> {
    await this.obs.call("TriggerStudioModeTransition");
  }

  async setTBarPosition(params: SetTBarPositionRequest): Promise<void> {
    SetTBarPositionRequestSchema.parse(params);
    await this.obs.call("SetTBarPosition", params);
  }
}
