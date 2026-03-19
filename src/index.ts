// Re-export OBSWebSocket for advanced usage
export { default as OBSWebSocket } from "obs-websocket-js";

// OBSDK
export { OBSDK } from "./client";

// Types — Config
export type {
  CreateProfileRequest,
  CreateSceneCollectionRequest,
  GetPersistentDataRequest,
  GetPersistentDataResponse,
  GetProfileListResponse,
  GetProfileParameterRequest,
  GetProfileParameterResponse,
  GetRecordDirectoryResponse,
  GetSceneCollectionListResponse,
  GetStreamServiceSettingsResponse,
  GetVideoSettingsResponse,
  RemoveProfileRequest,
  SetCurrentProfileRequest,
  SetCurrentSceneCollectionRequest,
  SetPersistentDataRequest,
  SetProfileParameterRequest,
  SetRecordDirectoryRequest,
  SetStreamServiceSettingsRequest,
  SetVideoSettingsRequest,
} from "./modules/config";
export { ConfigModule } from "./modules/config";

// Types — Filters
export type {
  CreateSourceFilterRequest,
  GetSourceFilterDefaultSettingsRequest,
  GetSourceFilterDefaultSettingsResponse,
  GetSourceFilterKindListResponse,
  GetSourceFilterListRequest,
  GetSourceFilterListResponse,
  GetSourceFilterRequest,
  GetSourceFilterResponse,
  RemoveSourceFilterRequest,
  SetSourceFilterEnabledRequest,
  SetSourceFilterIndexRequest,
  SetSourceFilterNameRequest,
  SetSourceFilterSettingsRequest,
} from "./modules/filters";
export { FiltersModule } from "./modules/filters";

// Types — General
export type {
  BroadcastCustomEventRequest,
  CallVendorRequestRequest,
  CallVendorRequestResponse,
  GetHotkeyListResponse,
  GetStatsResponse,
  GetVersionResponse,
  TriggerHotkeyByKeySequenceRequest,
  TriggerHotkeyByNameRequest,
} from "./modules/general";

// Module classes
export { GeneralModule } from "./modules/general";

// Types — Inputs
export type {
  CreateInputRequest,
  CreateInputResponse,
  GetInputAudioBalanceRequest,
  GetInputAudioBalanceResponse,
  GetInputAudioMonitorTypeRequest,
  GetInputAudioMonitorTypeResponse,
  GetInputAudioSyncOffsetRequest,
  GetInputAudioSyncOffsetResponse,
  GetInputAudioTracksRequest,
  GetInputAudioTracksResponse,
  GetInputDefaultSettingsRequest,
  GetInputDefaultSettingsResponse,
  GetInputDeinterlaceFieldOrderRequest,
  GetInputDeinterlaceFieldOrderResponse,
  GetInputDeinterlaceModeRequest,
  GetInputDeinterlaceModeResponse,
  GetInputKindListRequest,
  GetInputKindListResponse,
  GetInputListRequest,
  GetInputListResponse,
  GetInputMuteRequest,
  GetInputMuteResponse,
  GetInputPropertiesListPropertyItemsRequest,
  GetInputPropertiesListPropertyItemsResponse,
  GetInputSettingsRequest,
  GetInputSettingsResponse,
  GetInputVolumeRequest,
  GetInputVolumeResponse,
  GetSpecialInputsResponse,
  PressInputPropertiesButtonRequest,
  RemoveInputRequest,
  SetInputAudioBalanceRequest,
  SetInputAudioMonitorTypeRequest,
  SetInputAudioSyncOffsetRequest,
  SetInputAudioTracksRequest,
  SetInputDeinterlaceFieldOrderRequest,
  SetInputDeinterlaceModeRequest,
  SetInputMuteRequest,
  SetInputNameRequest,
  SetInputSettingsRequest,
  SetInputVolumeRequest,
  ToggleInputMuteRequest,
  ToggleInputMuteResponse,
} from "./modules/inputs";
export { InputsModule } from "./modules/inputs";

// Types — Media Inputs
export type {
  GetMediaInputStatusRequest,
  GetMediaInputStatusResponse,
  OffsetMediaInputCursorRequest,
  SetMediaInputCursorRequest,
  TriggerMediaInputActionRequest,
} from "./modules/media-inputs";
export { MediaInputsModule } from "./modules/media-inputs";

// Types — Outputs
export type {
  GetLastReplayBufferReplayResponse,
  GetOutputListResponse,
  GetOutputSettingsRequest,
  GetOutputSettingsResponse,
  GetOutputStatusRequest,
  GetOutputStatusResponse,
  GetReplayBufferStatusResponse,
  GetVirtualCamStatusResponse,
  SetOutputSettingsRequest,
  StartOutputRequest,
  StopOutputRequest,
  ToggleOutputRequest,
  ToggleOutputResponse,
  ToggleReplayBufferResponse,
  ToggleVirtualCamResponse,
} from "./modules/outputs";
export { OutputsModule } from "./modules/outputs";

// Types — Record
export type {
  CreateRecordChapterRequest,
  GetRecordStatusResponse,
  StopRecordResponse,
  ToggleRecordResponse,
} from "./modules/record";
export { RecordModule } from "./modules/record";

// Types — Scene Items
export type {
  CreateSceneItemRequest,
  CreateSceneItemResponse,
  DuplicateSceneItemRequest,
  DuplicateSceneItemResponse,
  GetGroupSceneItemListRequest,
  GetGroupSceneItemListResponse,
  GetSceneItemBlendModeRequest,
  GetSceneItemBlendModeResponse,
  GetSceneItemEnabledRequest,
  GetSceneItemEnabledResponse,
  GetSceneItemIdRequest,
  GetSceneItemIdResponse,
  GetSceneItemIndexRequest,
  GetSceneItemIndexResponse,
  GetSceneItemListRequest,
  GetSceneItemListResponse,
  GetSceneItemLockedRequest,
  GetSceneItemLockedResponse,
  GetSceneItemSourceRequest,
  GetSceneItemSourceResponse,
  GetSceneItemTransformRequest,
  GetSceneItemTransformResponse,
  RemoveSceneItemRequest,
  SetSceneItemBlendModeRequest,
  SetSceneItemEnabledRequest,
  SetSceneItemIndexRequest,
  SetSceneItemLockedRequest,
  SetSceneItemTransformRequest,
} from "./modules/scene-items";
export { SceneItemsModule } from "./modules/scene-items";

// Types — Scenes
export type {
  CreateSceneRequest,
  CreateSceneResponse,
  GetCurrentPreviewSceneResponse,
  GetCurrentProgramSceneResponse,
  GetGroupListResponse,
  GetSceneListRequest,
  GetSceneListResponse,
  GetSceneSceneTransitionOverrideRequest,
  GetSceneSceneTransitionOverrideResponse,
  RemoveSceneRequest,
  SetCurrentPreviewSceneRequest,
  SetCurrentProgramSceneRequest,
  SetSceneNameRequest,
  SetSceneSceneTransitionOverrideRequest,
} from "./modules/scenes";
export { ScenesModule } from "./modules/scenes";

// Types — Sources
export type {
  GetCanvasListResponse,
  GetSourceActiveRequest,
  GetSourceActiveResponse,
  GetSourceScreenshotRequest,
  GetSourceScreenshotResponse,
  SaveSourceScreenshotRequest,
} from "./modules/sources";
export { SourcesModule } from "./modules/sources";

// Types — Stream
export type { GetStreamStatusResponse, SendStreamCaptionRequest, ToggleStreamResponse } from "./modules/stream";
export { StreamModule } from "./modules/stream";

// Types — Transitions
export type {
  GetCurrentSceneTransitionCursorResponse,
  GetCurrentSceneTransitionResponse,
  GetSceneTransitionListResponse,
  GetTransitionKindListResponse,
  SetCurrentSceneTransitionDurationRequest,
  SetCurrentSceneTransitionRequest,
  SetCurrentSceneTransitionSettingsRequest,
  SetTBarPositionRequest,
} from "./modules/transitions";
export { TransitionsModule } from "./modules/transitions";

// Types — UI
export type {
  GetMonitorListResponse,
  GetStudioModeEnabledResponse,
  OpenInputFiltersDialogRequest,
  OpenInputInteractDialogRequest,
  OpenInputPropertiesDialogRequest,
  OpenSourceProjectorRequest,
  OpenVideoMixProjectorRequest,
  SetStudioModeEnabledRequest,
} from "./modules/ui";
export { UiModule } from "./modules/ui";
