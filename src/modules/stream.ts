import { z } from "zod/v4";
import { BaseModule } from "./base";

// ========================
// Request Schemas
// ========================

const SendStreamCaptionRequestSchema = z.object({
  captionText: z.string(),
});

// ========================
// Response Schemas
// ========================

const GetStreamStatusResponseSchema = z.object({
  outputActive: z.boolean(),
  outputReconnecting: z.boolean(),
  outputTimecode: z.string(),
  outputDuration: z.number(),
  outputCongestion: z.number(),
  outputBytes: z.number(),
  outputSkippedFrames: z.number(),
  outputTotalFrames: z.number(),
});

const ToggleStreamResponseSchema = z.object({
  outputActive: z.boolean(),
});

// ========================
// Exported Types
// ========================

export type GetStreamStatusResponse = z.infer<typeof GetStreamStatusResponseSchema>;
export type ToggleStreamResponse = z.infer<typeof ToggleStreamResponseSchema>;
export type SendStreamCaptionRequest = z.infer<typeof SendStreamCaptionRequestSchema>;

// ========================
// Module
// ========================

export class StreamModule extends BaseModule {
  static schemas = {
    getStreamStatus: {
      request: z.void(),
      response: GetStreamStatusResponseSchema,
    },
    toggleStream: {
      request: z.void(),
      response: ToggleStreamResponseSchema,
    },
    startStream: {
      request: z.void(),
      response: z.void(),
    },
    stopStream: {
      request: z.void(),
      response: z.void(),
    },
    sendStreamCaption: {
      request: SendStreamCaptionRequestSchema,
      response: z.void(),
    },
  } as const;

  async getStreamStatus(): Promise<GetStreamStatusResponse> {
    const res = await this.obs.call("GetStreamStatus");
    return GetStreamStatusResponseSchema.parse(res);
  }

  async toggleStream(): Promise<ToggleStreamResponse> {
    const res = await this.obs.call("ToggleStream");
    return ToggleStreamResponseSchema.parse(res);
  }

  async startStream(): Promise<void> {
    await this.obs.call("StartStream");
  }

  async stopStream(): Promise<void> {
    await this.obs.call("StopStream");
  }

  async sendStreamCaption(params: SendStreamCaptionRequest): Promise<void> {
    SendStreamCaptionRequestSchema.parse(params);
    await this.obs.call("SendStreamCaption", params);
  }
}
