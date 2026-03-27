import { z } from "zod/v4";
import { BaseModule } from "./base";

// ========================
// Request Schemas
// ========================

const GetMediaInputStatusRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
});

const SetMediaInputCursorRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  mediaCursor: z.number().min(0),
});

const OffsetMediaInputCursorRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  mediaCursorOffset: z.number(),
});

const TriggerMediaInputActionRequestSchema = z.object({
  inputName: z.string().optional(),
  inputUuid: z.string().optional(),
  mediaAction: z.string(),
});

// ========================
// Response Schemas
// ========================

const GetMediaInputStatusResponseSchema = z.object({
  mediaState: z.string(),
  mediaDuration: z.number().nullable(),
  mediaCursor: z.number().nullable(),
});

// ========================
// Exported Types
// ========================

export type GetMediaInputStatusRequest = z.infer<typeof GetMediaInputStatusRequestSchema>;
export type GetMediaInputStatusResponse = z.infer<typeof GetMediaInputStatusResponseSchema>;
export type SetMediaInputCursorRequest = z.infer<typeof SetMediaInputCursorRequestSchema>;
export type OffsetMediaInputCursorRequest = z.infer<typeof OffsetMediaInputCursorRequestSchema>;
export type TriggerMediaInputActionRequest = z.infer<typeof TriggerMediaInputActionRequestSchema>;

// ========================
// Module
// ========================

export class MediaInputsModule extends BaseModule {
  static schemas = {
    getMediaInputStatus: {
      request: GetMediaInputStatusRequestSchema,
      response: GetMediaInputStatusResponseSchema,
    },
    setMediaInputCursor: {
      request: SetMediaInputCursorRequestSchema,
      response: z.void(),
    },
    offsetMediaInputCursor: {
      request: OffsetMediaInputCursorRequestSchema,
      response: z.void(),
    },
    triggerMediaInputAction: {
      request: TriggerMediaInputActionRequestSchema,
      response: z.void(),
    },
  } as const;

  async getMediaInputStatus(params: GetMediaInputStatusRequest): Promise<GetMediaInputStatusResponse> {
    GetMediaInputStatusRequestSchema.parse(params);
    const res = await this.obs.call("GetMediaInputStatus", params);
    return GetMediaInputStatusResponseSchema.parse(res);
  }

  async setMediaInputCursor(params: SetMediaInputCursorRequest): Promise<void> {
    SetMediaInputCursorRequestSchema.parse(params);
    await this.obs.call("SetMediaInputCursor", params);
  }

  async offsetMediaInputCursor(params: OffsetMediaInputCursorRequest): Promise<void> {
    OffsetMediaInputCursorRequestSchema.parse(params);
    await this.obs.call("OffsetMediaInputCursor", params);
  }

  async triggerMediaInputAction(params: TriggerMediaInputActionRequest): Promise<void> {
    TriggerMediaInputActionRequestSchema.parse(params);
    await this.obs.call("TriggerMediaInputAction", params);
  }
}
