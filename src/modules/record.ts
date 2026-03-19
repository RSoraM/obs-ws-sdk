import { z } from "zod/v4";
import { BaseModule } from "./base";

// ========================
// Request Schemas
// ========================

const CreateRecordChapterRequestSchema = z.object({
  chapterName: z.string().optional(),
});

// ========================
// Response Schemas
// ========================

const GetRecordStatusResponseSchema = z.object({
  outputActive: z.boolean(),
  outputPaused: z.boolean(),
  outputTimecode: z.string(),
  outputDuration: z.number(),
  outputBytes: z.number(),
});

const ToggleRecordResponseSchema = z.object({
  outputActive: z.boolean(),
});

const StopRecordResponseSchema = z.object({
  outputPath: z.string(),
});

// ========================
// Exported Types
// ========================

export type GetRecordStatusResponse = z.infer<typeof GetRecordStatusResponseSchema>;
export type ToggleRecordResponse = z.infer<typeof ToggleRecordResponseSchema>;
export type StopRecordResponse = z.infer<typeof StopRecordResponseSchema>;
export type CreateRecordChapterRequest = z.infer<typeof CreateRecordChapterRequestSchema>;

// ========================
// Module
// ========================

export class RecordModule extends BaseModule {
  async getRecordStatus(): Promise<GetRecordStatusResponse> {
    const res = await this.obs.call("GetRecordStatus");
    return GetRecordStatusResponseSchema.parse(res);
  }

  async toggleRecord(): Promise<ToggleRecordResponse> {
    const res = await this.obs.call("ToggleRecord");
    return ToggleRecordResponseSchema.parse(res);
  }

  async startRecord(): Promise<void> {
    await this.obs.call("StartRecord");
  }

  async stopRecord(): Promise<StopRecordResponse> {
    const res = await this.obs.call("StopRecord");
    return StopRecordResponseSchema.parse(res);
  }

  async toggleRecordPause(): Promise<void> {
    await this.obs.call("ToggleRecordPause");
  }

  async pauseRecord(): Promise<void> {
    await this.obs.call("PauseRecord");
  }

  async resumeRecord(): Promise<void> {
    await this.obs.call("ResumeRecord");
  }

  async splitRecordFile(): Promise<void> {
    await this.obs.call("SplitRecordFile");
  }

  async createRecordChapter(params?: CreateRecordChapterRequest): Promise<void> {
    if (params) CreateRecordChapterRequestSchema.parse(params);
    await this.obs.call("CreateRecordChapter", params);
  }
}
