import { z } from "zod/v4";
import { BaseModule, jsonObjectSchema } from "./base";

// ========================
// Response Schemas
// ========================

const GetVersionResponseSchema = z.object({
  obsVersion: z.string(),
  obsWebSocketVersion: z.string(),
  rpcVersion: z.number(),
  availableRequests: z.string().array(),
  supportedImageFormats: z.string().array(),
  platform: z.string(),
  platformDescription: z.string(),
});

// OBS 在数据未就绪时可能返回 NaN（如 CPU 使用率刚启动时），z.number() 默认拒绝 NaN，需用 union 兼容
const numOrNaN = z.union([z.number(), z.nan()]);

const GetStatsResponseSchema = z.object({
  cpuUsage: numOrNaN,
  memoryUsage: numOrNaN,
  availableDiskSpace: numOrNaN,
  activeFps: numOrNaN,
  averageFrameRenderTime: numOrNaN,
  renderSkippedFrames: numOrNaN,
  renderTotalFrames: numOrNaN,
  outputSkippedFrames: numOrNaN,
  outputTotalFrames: numOrNaN,
  webSocketSessionIncomingMessages: numOrNaN,
  webSocketSessionOutgoingMessages: numOrNaN,
});

// ========================
// Request Schemas
// ========================

const BroadcastCustomEventRequestSchema = z.object({
  eventData: jsonObjectSchema,
});

const CallVendorRequestRequestSchema = z.object({
  vendorName: z.string(),
  requestType: z.string(),
  requestData: jsonObjectSchema.optional(),
});

const CallVendorRequestResponseSchema = z.object({
  vendorName: z.string(),
  requestType: z.string(),
  responseData: jsonObjectSchema,
});

const GetHotkeyListResponseSchema = z.object({
  hotkeys: z.string().array(),
});

const TriggerHotkeyByNameRequestSchema = z.object({
  hotkeyName: z.string(),
  contextName: z.string().optional(),
});

const TriggerHotkeyByKeySequenceRequestSchema = z.object({
  keyId: z.string().optional(),
  keyModifiers: z
    .object({
      shift: z.boolean().optional(),
      control: z.boolean().optional(),
      alt: z.boolean().optional(),
      command: z.boolean().optional(),
    })
    .optional(),
});

// ========================
// Exported Types
// ========================

export type GetVersionResponse = z.infer<typeof GetVersionResponseSchema>;
export type GetStatsResponse = z.infer<typeof GetStatsResponseSchema>;
export type BroadcastCustomEventRequest = z.infer<typeof BroadcastCustomEventRequestSchema>;
export type CallVendorRequestRequest = z.infer<typeof CallVendorRequestRequestSchema>;
export type CallVendorRequestResponse = z.infer<typeof CallVendorRequestResponseSchema>;
export type GetHotkeyListResponse = z.infer<typeof GetHotkeyListResponseSchema>;
export type TriggerHotkeyByNameRequest = z.infer<typeof TriggerHotkeyByNameRequestSchema>;
export type TriggerHotkeyByKeySequenceRequest = z.infer<typeof TriggerHotkeyByKeySequenceRequestSchema>;

// ========================
// Module
// ========================

export class GeneralModule extends BaseModule {
  static schemas = {
    getVersion: {
      request: z.void(),
      response: GetVersionResponseSchema,
    },
    getStats: {
      request: z.void(),
      response: GetStatsResponseSchema,
    },
    broadcastCustomEvent: {
      request: BroadcastCustomEventRequestSchema,
      response: z.void(),
    },
    callVendorRequest: {
      request: CallVendorRequestRequestSchema,
      response: CallVendorRequestResponseSchema,
    },
    getHotkeyList: {
      request: z.void(),
      response: GetHotkeyListResponseSchema,
    },
    triggerHotkeyByName: {
      request: TriggerHotkeyByNameRequestSchema,
      response: z.void(),
    },
    triggerHotkeyByKeySequence: {
      request: TriggerHotkeyByKeySequenceRequestSchema,
      response: z.void(),
    },
  } as const;

  async getVersion(): Promise<GetVersionResponse> {
    const res = await this.obs.call("GetVersion");
    return GetVersionResponseSchema.parse(res);
  }

  async getStats(): Promise<GetStatsResponse> {
    const res = await this.obs.call("GetStats");
    return GetStatsResponseSchema.parse(res);
  }

  async broadcastCustomEvent(params: BroadcastCustomEventRequest): Promise<void> {
    BroadcastCustomEventRequestSchema.parse(params);
    await this.obs.call("BroadcastCustomEvent", params);
  }

  async callVendorRequest(params: CallVendorRequestRequest): Promise<CallVendorRequestResponse> {
    CallVendorRequestRequestSchema.parse(params);
    const res = await this.obs.call("CallVendorRequest", params);
    return CallVendorRequestResponseSchema.parse(res);
  }

  async getHotkeyList(): Promise<GetHotkeyListResponse> {
    const res = await this.obs.call("GetHotkeyList");
    return GetHotkeyListResponseSchema.parse(res);
  }

  async triggerHotkeyByName(params: TriggerHotkeyByNameRequest): Promise<void> {
    TriggerHotkeyByNameRequestSchema.parse(params);
    await this.obs.call("TriggerHotkeyByName", params);
  }

  async triggerHotkeyByKeySequence(params: TriggerHotkeyByKeySequenceRequest): Promise<void> {
    TriggerHotkeyByKeySequenceRequestSchema.parse(params);
    await this.obs.call("TriggerHotkeyByKeySequence", params);
  }
}
