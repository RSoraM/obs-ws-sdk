import { beforeEach, describe, expect, it, vi } from "vitest";
import { RecordModule } from "../../src/modules/record";

const mockObs = { call: vi.fn() };

describe("RecordModule", () => {
  let mod: RecordModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new RecordModule(mockObs as any);
  });

  it("getRecordStatus", async () => {
    mockObs.call.mockResolvedValue({
      outputActive: true,
      outputPaused: false,
      outputTimecode: "00:02:00",
      outputDuration: 120000,
      outputBytes: 30000,
    });
    const res = await mod.getRecordStatus();
    expect(res.outputActive).toBe(true);
  });

  it("toggleRecord", async () => {
    mockObs.call.mockResolvedValue({ outputActive: true, outputState: "OBS_WEBSOCKET_OUTPUT_STARTED" });
    const res = await mod.toggleRecord();
    expect(res.outputActive).toBe(true);
  });

  it("startRecord", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.startRecord();
    expect(mockObs.call).toHaveBeenCalledWith("StartRecord");
  });

  it("stopRecord", async () => {
    mockObs.call.mockResolvedValue({ outputPath: "/home/user/Videos/recording.mp4" });
    const res = await mod.stopRecord();
    expect(res.outputPath).toBe("/home/user/Videos/recording.mp4");
  });

  it("toggleRecordPause / pauseRecord / resumeRecord", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.toggleRecordPause();
    expect(mockObs.call).toHaveBeenCalledWith("ToggleRecordPause");
    await mod.pauseRecord();
    expect(mockObs.call).toHaveBeenCalledWith("PauseRecord");
    await mod.resumeRecord();
    expect(mockObs.call).toHaveBeenCalledWith("ResumeRecord");
  });

  it("splitRecordFile", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.splitRecordFile();
    expect(mockObs.call).toHaveBeenCalledWith("SplitRecordFile");
  });

  it("createRecordChapter", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.createRecordChapter();
    expect(mockObs.call).toHaveBeenCalledWith("CreateRecordChapter", undefined);
  });

  it("createRecordChapter with name", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.createRecordChapter({ chapterName: "Chapter 1" });
    expect(mockObs.call).toHaveBeenCalledWith("CreateRecordChapter", { chapterName: "Chapter 1" });
  });
});
