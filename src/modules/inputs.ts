import { z } from "zod/v4";
import { BaseModule, jsonObjectSchema } from "./base";

// ========================
// Request Schemas
// ========================

const GetInputListRequestSchema = z.object({
  inputKind: z.string().optional(),
});

const GetInputKindListRequestSchema = z.object({
  unversioned: z.boolean().optional(),
});

const CreateInputRequestSchema = z.object({
  canvasUuid: z.string().optional(),
  sceneName: z.string().optional(),
  sceneUuid: z.string().optional(),
  inputName: z.string(),
  inputKind: z.string(),
  inputSettings: jsonObjectSchema.optional(),
  sceneItemEnabled: z.boolean().optional(),
});

const RemoveInputRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetInputNameRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  newInputName: z.string(),
});

const GetInputDefaultSettingsRequestSchema = z.object({
  inputKind: z.string(),
});

const GetInputSettingsRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetInputSettingsRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  inputSettings: jsonObjectSchema,
  overlay: z.boolean().optional(),
});

const GetInputMuteRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetInputMuteRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  inputMuted: z.boolean(),
});

const ToggleInputMuteRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const GetInputVolumeRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetInputVolumeRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  inputVolumeMul: z.number().min(0).max(20).optional(),
  inputVolumeDb: z.number().min(-100).max(26).optional(),
});

const GetInputAudioBalanceRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetInputAudioBalanceRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  inputAudioBalance: z.number().min(0).max(1),
});

const GetInputAudioSyncOffsetRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetInputAudioSyncOffsetRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  inputAudioSyncOffset: z.number().min(-950).max(20000),
});

const GetInputAudioMonitorTypeRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetInputAudioMonitorTypeRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  monitorType: z.string(),
});

const GetInputAudioTracksRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetInputAudioTracksRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  inputAudioTracks: jsonObjectSchema,
});

const GetInputDeinterlaceModeRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetInputDeinterlaceModeRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  inputDeinterlaceMode: z.string(),
});

const GetInputDeinterlaceFieldOrderRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetInputDeinterlaceFieldOrderRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  inputDeinterlaceFieldOrder: z.string(),
});

const GetInputPropertiesListPropertyItemsRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  propertyName: z.string(),
});

const PressInputPropertiesButtonRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  propertyName: z.string(),
});

// ========================
// Response Schemas
// ========================

const GetInputListResponseSchema = z.object({
  inputs: jsonObjectSchema.array(),
});

const GetInputKindListResponseSchema = z.object({
  inputKinds: z.string().array(),
});

const GetSpecialInputsResponseSchema = z.object({
  desktop1: z.string().nullable(),
  desktop2: z.string().nullable(),
  mic1: z.string().nullable(),
  mic2: z.string().nullable(),
  mic3: z.string().nullable(),
  mic4: z.string().nullable(),
});

const CreateInputResponseSchema = z.object({
  inputUuid: z.string(),
  sceneItemId: z.number(),
});

const GetInputDefaultSettingsResponseSchema = z.object({
  defaultInputSettings: jsonObjectSchema,
});

const GetInputSettingsResponseSchema = z.object({
  inputSettings: jsonObjectSchema,
  inputKind: z.string(),
});

const GetInputMuteResponseSchema = z.object({
  inputMuted: z.boolean(),
});

const ToggleInputMuteResponseSchema = z.object({
  inputMuted: z.boolean(),
});

const GetInputVolumeResponseSchema = z.object({
  inputVolumeMul: z.number(),
  inputVolumeDb: z.number(),
});

const GetInputAudioBalanceResponseSchema = z.object({
  inputAudioBalance: z.number(),
});

const GetInputAudioSyncOffsetResponseSchema = z.object({
  inputAudioSyncOffset: z.number(),
});

const GetInputAudioMonitorTypeResponseSchema = z.object({
  monitorType: z.string(),
});

const GetInputAudioTracksResponseSchema = z.object({
  inputAudioTracks: jsonObjectSchema,
});

const GetInputDeinterlaceModeResponseSchema = z.object({
  inputDeinterlaceMode: z.string(),
});

const GetInputDeinterlaceFieldOrderResponseSchema = z.object({
  inputDeinterlaceFieldOrder: z.string(),
});

const GetInputPropertiesListPropertyItemsResponseSchema = z.object({
  propertyItems: z.array(jsonObjectSchema),
});

// ========================
// Exported Types
// ========================

export type GetInputListRequest = z.infer<typeof GetInputListRequestSchema>;
export type GetInputListResponse = z.infer<typeof GetInputListResponseSchema>;
export type GetInputKindListRequest = z.infer<typeof GetInputKindListRequestSchema>;
export type GetInputKindListResponse = z.infer<typeof GetInputKindListResponseSchema>;
export type GetSpecialInputsResponse = z.infer<typeof GetSpecialInputsResponseSchema>;
export type CreateInputRequest = z.infer<typeof CreateInputRequestSchema>;
export type CreateInputResponse = z.infer<typeof CreateInputResponseSchema>;
export type RemoveInputRequest = z.infer<typeof RemoveInputRequestSchema>;
export type SetInputNameRequest = z.infer<typeof SetInputNameRequestSchema>;
export type GetInputDefaultSettingsRequest = z.infer<typeof GetInputDefaultSettingsRequestSchema>;
export type GetInputDefaultSettingsResponse = z.infer<typeof GetInputDefaultSettingsResponseSchema>;
export type GetInputSettingsRequest = z.infer<typeof GetInputSettingsRequestSchema>;
export type GetInputSettingsResponse = z.infer<typeof GetInputSettingsResponseSchema>;
export type SetInputSettingsRequest = z.infer<typeof SetInputSettingsRequestSchema>;
export type GetInputMuteRequest = z.infer<typeof GetInputMuteRequestSchema>;
export type GetInputMuteResponse = z.infer<typeof GetInputMuteResponseSchema>;
export type SetInputMuteRequest = z.infer<typeof SetInputMuteRequestSchema>;
export type ToggleInputMuteRequest = z.infer<typeof ToggleInputMuteRequestSchema>;
export type ToggleInputMuteResponse = z.infer<typeof ToggleInputMuteResponseSchema>;
export type GetInputVolumeRequest = z.infer<typeof GetInputVolumeRequestSchema>;
export type GetInputVolumeResponse = z.infer<typeof GetInputVolumeResponseSchema>;
export type SetInputVolumeRequest = z.infer<typeof SetInputVolumeRequestSchema>;
export type GetInputAudioBalanceRequest = z.infer<typeof GetInputAudioBalanceRequestSchema>;
export type GetInputAudioBalanceResponse = z.infer<typeof GetInputAudioBalanceResponseSchema>;
export type SetInputAudioBalanceRequest = z.infer<typeof SetInputAudioBalanceRequestSchema>;
export type GetInputAudioSyncOffsetRequest = z.infer<typeof GetInputAudioSyncOffsetRequestSchema>;
export type GetInputAudioSyncOffsetResponse = z.infer<typeof GetInputAudioSyncOffsetResponseSchema>;
export type SetInputAudioSyncOffsetRequest = z.infer<typeof SetInputAudioSyncOffsetRequestSchema>;
export type GetInputAudioMonitorTypeRequest = z.infer<typeof GetInputAudioMonitorTypeRequestSchema>;
export type GetInputAudioMonitorTypeResponse = z.infer<typeof GetInputAudioMonitorTypeResponseSchema>;
export type SetInputAudioMonitorTypeRequest = z.infer<typeof SetInputAudioMonitorTypeRequestSchema>;
export type GetInputAudioTracksRequest = z.infer<typeof GetInputAudioTracksRequestSchema>;
export type GetInputAudioTracksResponse = z.infer<typeof GetInputAudioTracksResponseSchema>;
export type SetInputAudioTracksRequest = z.infer<typeof SetInputAudioTracksRequestSchema>;
export type GetInputDeinterlaceModeRequest = z.infer<typeof GetInputDeinterlaceModeRequestSchema>;
export type GetInputDeinterlaceModeResponse = z.infer<typeof GetInputDeinterlaceModeResponseSchema>;
export type SetInputDeinterlaceModeRequest = z.infer<typeof SetInputDeinterlaceModeRequestSchema>;
export type GetInputDeinterlaceFieldOrderRequest = z.infer<typeof GetInputDeinterlaceFieldOrderRequestSchema>;
export type GetInputDeinterlaceFieldOrderResponse = z.infer<typeof GetInputDeinterlaceFieldOrderResponseSchema>;
export type SetInputDeinterlaceFieldOrderRequest = z.infer<typeof SetInputDeinterlaceFieldOrderRequestSchema>;
export type GetInputPropertiesListPropertyItemsRequest = z.infer<
  typeof GetInputPropertiesListPropertyItemsRequestSchema
>;
export type GetInputPropertiesListPropertyItemsResponse = z.infer<
  typeof GetInputPropertiesListPropertyItemsResponseSchema
>;
export type PressInputPropertiesButtonRequest = z.infer<typeof PressInputPropertiesButtonRequestSchema>;

// ========================
// Module
// ========================

export class InputsModule extends BaseModule {
  async getInputList(params?: GetInputListRequest): Promise<GetInputListResponse> {
    if (params) GetInputListRequestSchema.parse(params);
    const res = await this.obs.call("GetInputList", params);
    return GetInputListResponseSchema.parse(res);
  }

  async getInputKindList(params?: GetInputKindListRequest): Promise<GetInputKindListResponse> {
    if (params) GetInputKindListRequestSchema.parse(params);
    const res = await this.obs.call("GetInputKindList", params);
    return GetInputKindListResponseSchema.parse(res);
  }

  async getSpecialInputs(): Promise<GetSpecialInputsResponse> {
    const res = await this.obs.call("GetSpecialInputs");
    return GetSpecialInputsResponseSchema.parse(res);
  }

  async createInput(params: CreateInputRequest): Promise<CreateInputResponse> {
    CreateInputRequestSchema.parse(params);
    const res = await this.obs.call("CreateInput", params);
    return CreateInputResponseSchema.parse(res);
  }

  async removeInput(params: RemoveInputRequest): Promise<void> {
    RemoveInputRequestSchema.parse(params);
    await this.obs.call("RemoveInput", params);
  }

  async setInputName(params: SetInputNameRequest): Promise<void> {
    SetInputNameRequestSchema.parse(params);
    await this.obs.call("SetInputName", params);
  }

  async getInputDefaultSettings(params: GetInputDefaultSettingsRequest): Promise<GetInputDefaultSettingsResponse> {
    GetInputDefaultSettingsRequestSchema.parse(params);
    const res = await this.obs.call("GetInputDefaultSettings", params);
    return GetInputDefaultSettingsResponseSchema.parse(res);
  }

  async getInputSettings(params: GetInputSettingsRequest): Promise<GetInputSettingsResponse> {
    GetInputSettingsRequestSchema.parse(params);
    const res = await this.obs.call("GetInputSettings", params);
    return GetInputSettingsResponseSchema.parse(res);
  }

  async setInputSettings(params: SetInputSettingsRequest): Promise<void> {
    SetInputSettingsRequestSchema.parse(params);
    await this.obs.call("SetInputSettings", params);
  }

  async getInputMute(params: GetInputMuteRequest): Promise<GetInputMuteResponse> {
    GetInputMuteRequestSchema.parse(params);
    const res = await this.obs.call("GetInputMute", params);
    return GetInputMuteResponseSchema.parse(res);
  }

  async setInputMute(params: SetInputMuteRequest): Promise<void> {
    SetInputMuteRequestSchema.parse(params);
    await this.obs.call("SetInputMute", params);
  }

  async toggleInputMute(params: ToggleInputMuteRequest): Promise<ToggleInputMuteResponse> {
    ToggleInputMuteRequestSchema.parse(params);
    const res = await this.obs.call("ToggleInputMute", params);
    return ToggleInputMuteResponseSchema.parse(res);
  }

  async getInputVolume(params: GetInputVolumeRequest): Promise<GetInputVolumeResponse> {
    GetInputVolumeRequestSchema.parse(params);
    const res = await this.obs.call("GetInputVolume", params);
    return GetInputVolumeResponseSchema.parse(res);
  }

  async setInputVolume(params: SetInputVolumeRequest): Promise<void> {
    SetInputVolumeRequestSchema.parse(params);
    await this.obs.call("SetInputVolume", params);
  }

  async getInputAudioBalance(params: GetInputAudioBalanceRequest): Promise<GetInputAudioBalanceResponse> {
    GetInputAudioBalanceRequestSchema.parse(params);
    const res = await this.obs.call("GetInputAudioBalance", params);
    return GetInputAudioBalanceResponseSchema.parse(res);
  }

  async setInputAudioBalance(params: SetInputAudioBalanceRequest): Promise<void> {
    SetInputAudioBalanceRequestSchema.parse(params);
    await this.obs.call("SetInputAudioBalance", params);
  }

  async getInputAudioSyncOffset(params: GetInputAudioSyncOffsetRequest): Promise<GetInputAudioSyncOffsetResponse> {
    GetInputAudioSyncOffsetRequestSchema.parse(params);
    const res = await this.obs.call("GetInputAudioSyncOffset", params);
    return GetInputAudioSyncOffsetResponseSchema.parse(res);
  }

  async setInputAudioSyncOffset(params: SetInputAudioSyncOffsetRequest): Promise<void> {
    SetInputAudioSyncOffsetRequestSchema.parse(params);
    await this.obs.call("SetInputAudioSyncOffset", params);
  }

  async getInputAudioMonitorType(params: GetInputAudioMonitorTypeRequest): Promise<GetInputAudioMonitorTypeResponse> {
    GetInputAudioMonitorTypeRequestSchema.parse(params);
    const res = await this.obs.call("GetInputAudioMonitorType", params);
    return GetInputAudioMonitorTypeResponseSchema.parse(res);
  }

  async setInputAudioMonitorType(params: SetInputAudioMonitorTypeRequest): Promise<void> {
    SetInputAudioMonitorTypeRequestSchema.parse(params);
    await this.obs.call("SetInputAudioMonitorType", params);
  }

  async getInputAudioTracks(params: GetInputAudioTracksRequest): Promise<GetInputAudioTracksResponse> {
    GetInputAudioTracksRequestSchema.parse(params);
    const res = await this.obs.call("GetInputAudioTracks", params);
    return GetInputAudioTracksResponseSchema.parse(res);
  }

  async setInputAudioTracks(params: SetInputAudioTracksRequest): Promise<void> {
    SetInputAudioTracksRequestSchema.parse(params);
    await this.obs.call("SetInputAudioTracks", params);
  }

  async getInputDeinterlaceMode(params: GetInputDeinterlaceModeRequest): Promise<GetInputDeinterlaceModeResponse> {
    GetInputDeinterlaceModeRequestSchema.parse(params);
    const res = await this.obs.call("GetInputDeinterlaceMode", params);
    return GetInputDeinterlaceModeResponseSchema.parse(res);
  }

  async setInputDeinterlaceMode(params: SetInputDeinterlaceModeRequest): Promise<void> {
    SetInputDeinterlaceModeRequestSchema.parse(params);
    await this.obs.call("SetInputDeinterlaceMode", params);
  }

  async getInputDeinterlaceFieldOrder(
    params: GetInputDeinterlaceFieldOrderRequest,
  ): Promise<GetInputDeinterlaceFieldOrderResponse> {
    GetInputDeinterlaceFieldOrderRequestSchema.parse(params);
    const res = await this.obs.call("GetInputDeinterlaceFieldOrder", params);
    return GetInputDeinterlaceFieldOrderResponseSchema.parse(res);
  }

  async setInputDeinterlaceFieldOrder(params: SetInputDeinterlaceFieldOrderRequest): Promise<void> {
    SetInputDeinterlaceFieldOrderRequestSchema.parse(params);
    await this.obs.call("SetInputDeinterlaceFieldOrder", params);
  }

  async getInputPropertiesListPropertyItems(
    params: GetInputPropertiesListPropertyItemsRequest,
  ): Promise<GetInputPropertiesListPropertyItemsResponse> {
    GetInputPropertiesListPropertyItemsRequestSchema.parse(params);
    const res = await this.obs.call("GetInputPropertiesListPropertyItems", params);
    return GetInputPropertiesListPropertyItemsResponseSchema.parse(res);
  }

  async pressInputPropertiesButton(params: PressInputPropertiesButtonRequest): Promise<void> {
    PressInputPropertiesButtonRequestSchema.parse(params);
    await this.obs.call("PressInputPropertiesButton", params);
  }
}
