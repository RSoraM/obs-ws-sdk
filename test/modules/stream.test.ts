import { beforeEach, describe, expect, it, vi } from "vitest";
import { StreamModule } from "../../src/modules/stream";

const mockObs = { call: vi.fn() };

describe("StreamModule", () => {
  let mod: StreamModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new StreamModule(mockObs as any);
  });

  it("getStreamStatus", async () => {
    mockObs.call.mockResolvedValue({
      outputActive: true,
      outputReconnecting: false,
      outputTimecode: "00:05:00",
      outputDuration: 300000,
      outputCongestion: 0.0,
      outputBytes: 50000,
      outputSkippedFrames: 0,
      outputTotalFrames: 18000,
    });
    const res = await mod.getStreamStatus();
    expect(res.outputActive).toBe(true);
  });

  it("toggleStream", async () => {
    mockObs.call.mockResolvedValue({ outputActive: false });
    const res = await mod.toggleStream();
    expect(res.outputActive).toBe(false);
  });

  it("startStream / stopStream", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.startStream();
    expect(mockObs.call).toHaveBeenCalledWith("StartStream");
    await mod.stopStream();
    expect(mockObs.call).toHaveBeenCalledWith("StopStream");
  });

  it("sendStreamCaption", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.sendStreamCaption({ captionText: "Hello World" });
    expect(mockObs.call).toHaveBeenCalledWith("SendStreamCaption", { captionText: "Hello World" });
  });

  it("rejects invalid response", async () => {
    mockObs.call.mockResolvedValue({ wrong: "data" });
    await expect(mod.getStreamStatus()).rejects.toThrow();
  });
});
