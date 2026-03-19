import { beforeEach, describe, expect, it, vi } from "vitest";
import { OutputsModule } from "../../src/modules/outputs";

const mockObs = { call: vi.fn() };

describe("OutputsModule", () => {
  let mod: OutputsModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new OutputsModule(mockObs as any);
  });

  it("getVirtualCamStatus", async () => {
    mockObs.call.mockResolvedValue({ outputActive: false });
    const res = await mod.getVirtualCamStatus();
    expect(res.outputActive).toBe(false);
  });

  it("toggleVirtualCam", async () => {
    mockObs.call.mockResolvedValue({ outputActive: true });
    const res = await mod.toggleVirtualCam();
    expect(res.outputActive).toBe(true);
  });

  it("startVirtualCam / stopVirtualCam", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.startVirtualCam();
    expect(mockObs.call).toHaveBeenCalledWith("StartVirtualCam");
    await mod.stopVirtualCam();
    expect(mockObs.call).toHaveBeenCalledWith("StopVirtualCam");
  });

  it("getReplayBufferStatus", async () => {
    mockObs.call.mockResolvedValue({ outputActive: true });
    const res = await mod.getReplayBufferStatus();
    expect(res.outputActive).toBe(true);
  });

  it("toggleReplayBuffer", async () => {
    mockObs.call.mockResolvedValue({ outputActive: false });
    const res = await mod.toggleReplayBuffer();
    expect(res.outputActive).toBe(false);
  });

  it("saveReplayBuffer", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.saveReplayBuffer();
    expect(mockObs.call).toHaveBeenCalledWith("SaveReplayBuffer");
  });

  it("getLastReplayBufferReplay", async () => {
    mockObs.call.mockResolvedValue({ savedReplayPath: "/tmp/replay.mp4" });
    const res = await mod.getLastReplayBufferReplay();
    expect(res.savedReplayPath).toBe("/tmp/replay.mp4");
  });

  it("getOutputList", async () => {
    mockObs.call.mockResolvedValue({ outputs: [] });
    const res = await mod.getOutputList();
    expect(res.outputs).toEqual([]);
  });

  it("getOutputStatus", async () => {
    mockObs.call.mockResolvedValue({
      outputActive: true,
      outputReconnecting: false,
      outputTimecode: "00:10:00",
      outputDuration: 600000,
      outputCongestion: 0.0,
      outputBytes: 100000,
      outputSkippedFrames: 0,
      outputTotalFrames: 36000,
    });
    const res = await mod.getOutputStatus({ outputName: "stream" });
    expect(res.outputActive).toBe(true);
  });

  it("toggleOutput", async () => {
    mockObs.call.mockResolvedValue({ outputActive: true });
    const res = await mod.toggleOutput({ outputName: "stream" });
    expect(res.outputActive).toBe(true);
  });

  it("getOutputSettings / setOutputSettings", async () => {
    mockObs.call.mockResolvedValue({ outputSettings: { key: "value" } });
    const res = await mod.getOutputSettings({ outputName: "stream" });
    expect(res.outputSettings).toBeDefined();

    mockObs.call.mockResolvedValue(undefined);
    await mod.setOutputSettings({ outputName: "stream", outputSettings: { key: "newValue" } });
    expect(mockObs.call).toHaveBeenCalledWith("SetOutputSettings", expect.objectContaining({ outputName: "stream" }));
  });
});
