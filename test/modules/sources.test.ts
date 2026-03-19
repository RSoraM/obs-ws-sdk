import { beforeEach, describe, expect, it, vi } from "vitest";
import { SourcesModule } from "../../src/modules/sources";

const mockObs = { call: vi.fn() };

describe("SourcesModule", () => {
  let mod: SourcesModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new SourcesModule(mockObs as any);
  });

  it("getSourceActive", async () => {
    mockObs.call.mockResolvedValue({ videoActive: true, videoShowing: true });
    const res = await mod.getSourceActive({ sourceName: "cam" });
    expect(mockObs.call).toHaveBeenCalledWith("GetSourceActive", { sourceName: "cam" });
    expect(res.videoActive).toBe(true);
  });

  it("getSourceScreenshot", async () => {
    mockObs.call.mockResolvedValue({ imageData: "base64data" });
    const res = await mod.getSourceScreenshot({ sourceName: "cam", imageFormat: "png" });
    expect(res.imageData).toBe("base64data");
  });

  it("saveSourceScreenshot", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.saveSourceScreenshot({ sourceName: "cam", imageFormat: "png", imageFilePath: "/tmp/shot.png" });
    expect(mockObs.call).toHaveBeenCalledWith("SaveSourceScreenshot", expect.objectContaining({ sourceName: "cam" }));
  });

  it("getCanvasList", async () => {
    mockObs.call.mockResolvedValue({ canvases: [] });
    const res = await mod.getCanvasList();
    expect(mockObs.call).toHaveBeenCalledWith("GetCanvasList");
    expect(res.canvases).toEqual([]);
  });

  it("rejects invalid params", async () => {
    await expect(mod.getSourceActive({} as any)).rejects.toThrow();
  });
});
