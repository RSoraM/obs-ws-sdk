import { z } from "zod/v4";
import { BaseModule, jsonObjectSchema } from "./base";

// ========================
// Request Schemas
// ========================

const GetSceneListRequestSchema = z.object({
  canvasUuid: z.string().optional(),
});

const SetCurrentProgramSceneRequestSchema = z.object({
  sceneName: z.string().optional(),
  sceneUuid: z.string().optional(),
});

const SetCurrentPreviewSceneRequestSchema = z.object({
  sceneName: z.string().optional(),
  sceneUuid: z.string().optional(),
});

const CreateSceneRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sceneName: z.string(),
});

const RemoveSceneRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sceneName: z.string().optional(),
  sceneUuid: z.string().optional(),
});

const SetSceneNameRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sceneName: z.string().optional(),
  sceneUuid: z.string().optional(),
  newSceneName: z.string(),
});

const GetSceneSceneTransitionOverrideRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sceneName: z.string().optional(),
  sceneUuid: z.string().optional(),
});

const SetSceneSceneTransitionOverrideRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sceneName: z.string().optional(),
  sceneUuid: z.string().optional(),
  transitionName: z.string().optional(),
  transitionDuration: z.number().min(50).max(20000).optional(),
});

// ========================
// Response Schemas
// ========================

const GetSceneListResponseSchema = z.object({
  currentProgramSceneName: z.string().nullable(),
  currentProgramSceneUuid: z.string().nullable(),
  currentPreviewSceneName: z.string().nullable(),
  currentPreviewSceneUuid: z.string().nullable(),
  scenes: jsonObjectSchema.array(),
});

const GetGroupListResponseSchema = z.object({
  groups: z.string().array(),
});

const GetCurrentProgramSceneResponseSchema = z.object({
  sceneName: z.string(),
  sceneUuid: z.string(),
  currentProgramSceneName: z.string(),
  currentProgramSceneUuid: z.string(),
});

const GetCurrentPreviewSceneResponseSchema = z.object({
  sceneName: z.string(),
  sceneUuid: z.string(),
  currentPreviewSceneName: z.string(),
  currentPreviewSceneUuid: z.string(),
});

const CreateSceneResponseSchema = z.object({
  sceneUuid: z.string(),
});

const GetSceneSceneTransitionOverrideResponseSchema = z.object({
  transitionName: z.string().nullable(),
  transitionDuration: z.number().nullable(),
});

// ========================
// Exported Types
// ========================

export type GetSceneListRequest = z.infer<typeof GetSceneListRequestSchema>;
export type GetSceneListResponse = z.infer<typeof GetSceneListResponseSchema>;
export type GetGroupListResponse = z.infer<typeof GetGroupListResponseSchema>;
export type GetCurrentProgramSceneResponse = z.infer<typeof GetCurrentProgramSceneResponseSchema>;
export type SetCurrentProgramSceneRequest = z.infer<typeof SetCurrentProgramSceneRequestSchema>;
export type GetCurrentPreviewSceneResponse = z.infer<typeof GetCurrentPreviewSceneResponseSchema>;
export type SetCurrentPreviewSceneRequest = z.infer<typeof SetCurrentPreviewSceneRequestSchema>;
export type CreateSceneRequest = z.infer<typeof CreateSceneRequestSchema>;
export type CreateSceneResponse = z.infer<typeof CreateSceneResponseSchema>;
export type RemoveSceneRequest = z.infer<typeof RemoveSceneRequestSchema>;
export type SetSceneNameRequest = z.infer<typeof SetSceneNameRequestSchema>;
export type GetSceneSceneTransitionOverrideRequest = z.infer<typeof GetSceneSceneTransitionOverrideRequestSchema>;
export type GetSceneSceneTransitionOverrideResponse = z.infer<typeof GetSceneSceneTransitionOverrideResponseSchema>;
export type SetSceneSceneTransitionOverrideRequest = z.infer<typeof SetSceneSceneTransitionOverrideRequestSchema>;

// ========================
// Module
// ========================

export class ScenesModule extends BaseModule {
  static schemas = {
    getSceneList: {
      request: GetSceneListRequestSchema,
      response: GetSceneListResponseSchema,
    },
    getGroupList: {
      request: z.void(),
      response: GetGroupListResponseSchema,
    },
    getCurrentProgramScene: {
      request: z.void(),
      response: GetCurrentProgramSceneResponseSchema,
    },
    setCurrentProgramScene: {
      request: SetCurrentProgramSceneRequestSchema,
      response: z.void(),
    },
    getCurrentPreviewScene: {
      request: z.void(),
      response: GetCurrentPreviewSceneResponseSchema,
    },
    setCurrentPreviewScene: {
      request: SetCurrentPreviewSceneRequestSchema,
      response: z.void(),
    },
    createScene: {
      request: CreateSceneRequestSchema,
      response: CreateSceneResponseSchema,
    },
    removeScene: {
      request: RemoveSceneRequestSchema,
      response: z.void(),
    },
    setSceneName: {
      request: SetSceneNameRequestSchema,
      response: z.void(),
    },
  } as const;

  async getSceneList(params?: GetSceneListRequest): Promise<GetSceneListResponse> {
    if (params) GetSceneListRequestSchema.parse(params);
    const res = await this.obs.call("GetSceneList", params);
    return GetSceneListResponseSchema.parse(res);
  }

  async getGroupList(): Promise<GetGroupListResponse> {
    const res = await this.obs.call("GetGroupList");
    return GetGroupListResponseSchema.parse(res);
  }

  async getCurrentProgramScene(): Promise<GetCurrentProgramSceneResponse> {
    const res = await this.obs.call("GetCurrentProgramScene");
    return GetCurrentProgramSceneResponseSchema.parse(res);
  }

  async setCurrentProgramScene(params: SetCurrentProgramSceneRequest): Promise<void> {
    SetCurrentProgramSceneRequestSchema.parse(params);
    await this.obs.call("SetCurrentProgramScene", params);
  }

  async getCurrentPreviewScene(): Promise<GetCurrentPreviewSceneResponse> {
    const res = await this.obs.call("GetCurrentPreviewScene");
    return GetCurrentPreviewSceneResponseSchema.parse(res);
  }

  async setCurrentPreviewScene(params: SetCurrentPreviewSceneRequest): Promise<void> {
    SetCurrentPreviewSceneRequestSchema.parse(params);
    await this.obs.call("SetCurrentPreviewScene", params);
  }

  async createScene(params: CreateSceneRequest): Promise<CreateSceneResponse> {
    CreateSceneRequestSchema.parse(params);
    const res = await this.obs.call("CreateScene", params);
    return CreateSceneResponseSchema.parse(res);
  }

  async removeScene(params: RemoveSceneRequest): Promise<void> {
    RemoveSceneRequestSchema.parse(params);
    await this.obs.call("RemoveScene", params);
  }

  async setSceneName(params: SetSceneNameRequest): Promise<void> {
    SetSceneNameRequestSchema.parse(params);
    await this.obs.call("SetSceneName", params);
  }

  async getSceneSceneTransitionOverride(
    params: GetSceneSceneTransitionOverrideRequest,
  ): Promise<GetSceneSceneTransitionOverrideResponse> {
    GetSceneSceneTransitionOverrideRequestSchema.parse(params);
    const res = await this.obs.call("GetSceneSceneTransitionOverride", params);
    return GetSceneSceneTransitionOverrideResponseSchema.parse(res);
  }

  async setSceneSceneTransitionOverride(params: SetSceneSceneTransitionOverrideRequest): Promise<void> {
    SetSceneSceneTransitionOverrideRequestSchema.parse(params);
    await this.obs.call("SetSceneSceneTransitionOverride", params);
  }
}
