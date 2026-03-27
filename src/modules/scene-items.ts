import { z } from "zod/v4";
import { BaseModule, jsonObjectSchema } from "./base";

// ========================
// Request Schemas
// ========================

const SceneRefSchema = z.object({
  canvasUuid: z.string().optional(),
  sceneName: z.string().optional(),
  sceneUuid: z.string().optional(),
});

const SceneItemRefSchema = SceneRefSchema.extend({
  sceneItemId: z.number().min(0),
});

const GetSceneItemListRequestSchema = SceneRefSchema;

const GetGroupSceneItemListRequestSchema = SceneRefSchema;

const GetSceneItemIdRequestSchema = SceneRefSchema.extend({
  sourceName: z.string(),
  searchOffset: z.number().min(-1).optional(),
});

const GetSceneItemSourceRequestSchema = SceneItemRefSchema;

const CreateSceneItemRequestSchema = SceneRefSchema.extend({
  sourceName: z.string().optional(),
  sourceUuid: z.string().optional(),
  sceneItemEnabled: z.boolean().optional(),
});

const RemoveSceneItemRequestSchema = SceneItemRefSchema;

const DuplicateSceneItemRequestSchema = SceneItemRefSchema.extend({
  destinationSceneName: z.string().optional(),
  destinationSceneUuid: z.string().optional(),
});

const GetSceneItemTransformRequestSchema = SceneItemRefSchema;

const SetSceneItemTransformRequestSchema = SceneItemRefSchema.extend({
  sceneItemTransform: jsonObjectSchema,
});

const GetSceneItemEnabledRequestSchema = SceneItemRefSchema;

const SetSceneItemEnabledRequestSchema = SceneItemRefSchema.extend({
  sceneItemEnabled: z.boolean(),
});

const GetSceneItemLockedRequestSchema = SceneItemRefSchema;

const SetSceneItemLockedRequestSchema = SceneItemRefSchema.extend({
  sceneItemLocked: z.boolean(),
});

const GetSceneItemIndexRequestSchema = SceneItemRefSchema;

const SetSceneItemIndexRequestSchema = SceneItemRefSchema.extend({
  sceneItemIndex: z.number().min(0),
});

const GetSceneItemBlendModeRequestSchema = SceneItemRefSchema;

const SetSceneItemBlendModeRequestSchema = SceneItemRefSchema.extend({
  sceneItemBlendMode: z.string(),
});

// ========================
// Response Schemas
// ========================

const GetSceneItemListResponseSchema = z.object({
  sceneItems: jsonObjectSchema.array(),
});

const GetGroupSceneItemListResponseSchema = z.object({
  sceneItems: jsonObjectSchema.array(),
});

const GetSceneItemIdResponseSchema = z.object({
  sceneItemId: z.number(),
});

const GetSceneItemSourceResponseSchema = z.object({
  sourceName: z.string(),
  sourceUuid: z.string(),
});

const CreateSceneItemResponseSchema = z.object({
  sceneItemId: z.number(),
});

const DuplicateSceneItemResponseSchema = z.object({
  sceneItemId: z.number(),
});

const GetSceneItemTransformResponseSchema = z.object({
  sceneItemTransform: jsonObjectSchema,
});

const GetSceneItemEnabledResponseSchema = z.object({
  sceneItemEnabled: z.boolean(),
});

const GetSceneItemLockedResponseSchema = z.object({
  sceneItemLocked: z.boolean(),
});

const GetSceneItemIndexResponseSchema = z.object({
  sceneItemIndex: z.number(),
});

const GetSceneItemBlendModeResponseSchema = z.object({
  sceneItemBlendMode: z.string(),
});

// ========================
// Exported Types
// ========================

export type GetSceneItemListRequest = z.infer<typeof GetSceneItemListRequestSchema>;
export type GetSceneItemListResponse = z.infer<typeof GetSceneItemListResponseSchema>;
export type GetGroupSceneItemListRequest = z.infer<typeof GetGroupSceneItemListRequestSchema>;
export type GetGroupSceneItemListResponse = z.infer<typeof GetGroupSceneItemListResponseSchema>;
export type GetSceneItemIdRequest = z.infer<typeof GetSceneItemIdRequestSchema>;
export type GetSceneItemIdResponse = z.infer<typeof GetSceneItemIdResponseSchema>;
export type GetSceneItemSourceRequest = z.infer<typeof GetSceneItemSourceRequestSchema>;
export type GetSceneItemSourceResponse = z.infer<typeof GetSceneItemSourceResponseSchema>;
export type CreateSceneItemRequest = z.infer<typeof CreateSceneItemRequestSchema>;
export type CreateSceneItemResponse = z.infer<typeof CreateSceneItemResponseSchema>;
export type RemoveSceneItemRequest = z.infer<typeof RemoveSceneItemRequestSchema>;
export type DuplicateSceneItemRequest = z.infer<typeof DuplicateSceneItemRequestSchema>;
export type DuplicateSceneItemResponse = z.infer<typeof DuplicateSceneItemResponseSchema>;
export type GetSceneItemTransformRequest = z.infer<typeof GetSceneItemTransformRequestSchema>;
export type GetSceneItemTransformResponse = z.infer<typeof GetSceneItemTransformResponseSchema>;
export type SetSceneItemTransformRequest = z.infer<typeof SetSceneItemTransformRequestSchema>;
export type GetSceneItemEnabledRequest = z.infer<typeof GetSceneItemEnabledRequestSchema>;
export type GetSceneItemEnabledResponse = z.infer<typeof GetSceneItemEnabledResponseSchema>;
export type SetSceneItemEnabledRequest = z.infer<typeof SetSceneItemEnabledRequestSchema>;
export type GetSceneItemLockedRequest = z.infer<typeof GetSceneItemLockedRequestSchema>;
export type GetSceneItemLockedResponse = z.infer<typeof GetSceneItemLockedResponseSchema>;
export type SetSceneItemLockedRequest = z.infer<typeof SetSceneItemLockedRequestSchema>;
export type GetSceneItemIndexRequest = z.infer<typeof GetSceneItemIndexRequestSchema>;
export type GetSceneItemIndexResponse = z.infer<typeof GetSceneItemIndexResponseSchema>;
export type SetSceneItemIndexRequest = z.infer<typeof SetSceneItemIndexRequestSchema>;
export type GetSceneItemBlendModeRequest = z.infer<typeof GetSceneItemBlendModeRequestSchema>;
export type GetSceneItemBlendModeResponse = z.infer<typeof GetSceneItemBlendModeResponseSchema>;
export type SetSceneItemBlendModeRequest = z.infer<typeof SetSceneItemBlendModeRequestSchema>;

// ========================
// Module
// ========================

export class SceneItemsModule extends BaseModule {
  static schemas = {
    getSceneItemList: {
      request: GetSceneItemListRequestSchema,
      response: GetSceneItemListResponseSchema,
    },
    getGroupSceneItemList: {
      request: GetGroupSceneItemListRequestSchema,
      response: GetGroupSceneItemListResponseSchema,
    },
    getSceneItemId: {
      request: GetSceneItemIdRequestSchema,
      response: GetSceneItemIdResponseSchema,
    },
    getSceneItemSource: {
      request: GetSceneItemSourceRequestSchema,
      response: GetSceneItemSourceResponseSchema,
    },
    createSceneItem: {
      request: CreateSceneItemRequestSchema,
      response: CreateSceneItemResponseSchema,
    },
    removeSceneItem: {
      request: RemoveSceneItemRequestSchema,
      response: z.void(),
    },
    duplicateSceneItem: {
      request: DuplicateSceneItemRequestSchema,
      response: DuplicateSceneItemResponseSchema,
    },
    getSceneItemTransform: {
      request: GetSceneItemTransformRequestSchema,
      response: GetSceneItemTransformResponseSchema,
    },
    setSceneItemTransform: {
      request: SetSceneItemTransformRequestSchema,
      response: z.void(),
    },
    getSceneItemEnabled: {
      request: GetSceneItemEnabledRequestSchema,
      response: GetSceneItemEnabledResponseSchema,
    },
    setSceneItemEnabled: {
      request: SetSceneItemEnabledRequestSchema,
      response: z.void(),
    },
    getSceneItemLocked: {
      request: GetSceneItemLockedRequestSchema,
      response: GetSceneItemLockedResponseSchema,
    },
    setSceneItemLocked: {
      request: SetSceneItemLockedRequestSchema,
      response: z.void(),
    },
    getSceneItemIndex: {
      request: GetSceneItemIndexRequestSchema,
      response: GetSceneItemIndexResponseSchema,
    },
    setSceneItemIndex: {
      request: SetSceneItemIndexRequestSchema,
      response: z.void(),
    },
    getSceneItemBlendMode: {
      request: GetSceneItemBlendModeRequestSchema,
      response: GetSceneItemBlendModeResponseSchema,
    },
    setSceneItemBlendMode: {
      request: SetSceneItemBlendModeRequestSchema,
      response: z.void(),
    },
  } as const;

  async getSceneItemList(params: GetSceneItemListRequest): Promise<GetSceneItemListResponse> {
    GetSceneItemListRequestSchema.parse(params);
    const res = await this.obs.call("GetSceneItemList", params);
    return GetSceneItemListResponseSchema.parse(res);
  }

  async getGroupSceneItemList(params: GetGroupSceneItemListRequest): Promise<GetGroupSceneItemListResponse> {
    GetGroupSceneItemListRequestSchema.parse(params);
    const res = await this.obs.call("GetGroupSceneItemList", params);
    return GetGroupSceneItemListResponseSchema.parse(res);
  }

  async getSceneItemId(params: GetSceneItemIdRequest): Promise<GetSceneItemIdResponse> {
    GetSceneItemIdRequestSchema.parse(params);
    const res = await this.obs.call("GetSceneItemId", params);
    return GetSceneItemIdResponseSchema.parse(res);
  }

  async getSceneItemSource(params: GetSceneItemSourceRequest): Promise<GetSceneItemSourceResponse> {
    GetSceneItemSourceRequestSchema.parse(params);
    const res = await this.obs.call("GetSceneItemSource", params);
    return GetSceneItemSourceResponseSchema.parse(res);
  }

  async createSceneItem(params: CreateSceneItemRequest): Promise<CreateSceneItemResponse> {
    CreateSceneItemRequestSchema.parse(params);
    const res = await this.obs.call("CreateSceneItem", params);
    return CreateSceneItemResponseSchema.parse(res);
  }

  async removeSceneItem(params: RemoveSceneItemRequest): Promise<void> {
    RemoveSceneItemRequestSchema.parse(params);
    await this.obs.call("RemoveSceneItem", params);
  }

  async duplicateSceneItem(params: DuplicateSceneItemRequest): Promise<DuplicateSceneItemResponse> {
    DuplicateSceneItemRequestSchema.parse(params);
    const res = await this.obs.call("DuplicateSceneItem", params);
    return DuplicateSceneItemResponseSchema.parse(res);
  }

  async getSceneItemTransform(params: GetSceneItemTransformRequest): Promise<GetSceneItemTransformResponse> {
    GetSceneItemTransformRequestSchema.parse(params);
    const res = await this.obs.call("GetSceneItemTransform", params);
    return GetSceneItemTransformResponseSchema.parse(res);
  }

  async setSceneItemTransform(params: SetSceneItemTransformRequest): Promise<void> {
    SetSceneItemTransformRequestSchema.parse(params);
    await this.obs.call("SetSceneItemTransform", params);
  }

  async getSceneItemEnabled(params: GetSceneItemEnabledRequest): Promise<GetSceneItemEnabledResponse> {
    GetSceneItemEnabledRequestSchema.parse(params);
    const res = await this.obs.call("GetSceneItemEnabled", params);
    return GetSceneItemEnabledResponseSchema.parse(res);
  }

  async setSceneItemEnabled(params: SetSceneItemEnabledRequest): Promise<void> {
    SetSceneItemEnabledRequestSchema.parse(params);
    await this.obs.call("SetSceneItemEnabled", params);
  }

  async getSceneItemLocked(params: GetSceneItemLockedRequest): Promise<GetSceneItemLockedResponse> {
    GetSceneItemLockedRequestSchema.parse(params);
    const res = await this.obs.call("GetSceneItemLocked", params);
    return GetSceneItemLockedResponseSchema.parse(res);
  }

  async setSceneItemLocked(params: SetSceneItemLockedRequest): Promise<void> {
    SetSceneItemLockedRequestSchema.parse(params);
    await this.obs.call("SetSceneItemLocked", params);
  }

  async getSceneItemIndex(params: GetSceneItemIndexRequest): Promise<GetSceneItemIndexResponse> {
    GetSceneItemIndexRequestSchema.parse(params);
    const res = await this.obs.call("GetSceneItemIndex", params);
    return GetSceneItemIndexResponseSchema.parse(res);
  }

  async setSceneItemIndex(params: SetSceneItemIndexRequest): Promise<void> {
    SetSceneItemIndexRequestSchema.parse(params);
    await this.obs.call("SetSceneItemIndex", params);
  }

  async getSceneItemBlendMode(params: GetSceneItemBlendModeRequest): Promise<GetSceneItemBlendModeResponse> {
    GetSceneItemBlendModeRequestSchema.parse(params);
    const res = await this.obs.call("GetSceneItemBlendMode", params);
    return GetSceneItemBlendModeResponseSchema.parse(res);
  }

  async setSceneItemBlendMode(params: SetSceneItemBlendModeRequest): Promise<void> {
    SetSceneItemBlendModeRequestSchema.parse(params);
    await this.obs.call("SetSceneItemBlendMode", params);
  }
}
