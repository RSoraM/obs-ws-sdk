import { beforeEach, describe, expect, it, vi } from "vitest";
import { UiModule } from "../../src/modules/ui";

const mockObs = { call: vi.fn() };

describe("UiModule", () => {
  let mod: UiModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new UiModule(mockObs as any);
  });

  it("getStudioModeEnabled", async () => {
    mockObs.call.mockResolvedValue({ studioModeEnabled: true });
    const res = await mod.getStudioModeEnabled();
    expect(res.studioModeEnabled).toBe(true);
  });

  it("setStudioModeEnabled", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setStudioModeEnabled({ studioModeEnabled: false });
    expect(mockObs.call).toHaveBeenCalledWith("SetStudioModeEnabled", { studioModeEnabled: false });
  });

  it("openInputPropertiesDialog", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.openInputPropertiesDialog({ inputName: "Camera" });
    expect(mockObs.call).toHaveBeenCalledWith("OpenInputPropertiesDialog", { inputName: "Camera" });
  });

  it("openInputFiltersDialog", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.openInputFiltersDialog({ inputName: "Mic" });
    expect(mockObs.call).toHaveBeenCalledWith("OpenInputFiltersDialog", { inputName: "Mic" });
  });

  it("openInputInteractDialog", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.openInputInteractDialog({ inputName: "Browser" });
    expect(mockObs.call).toHaveBeenCalledWith("OpenInputInteractDialog", { inputName: "Browser" });
  });

  it("getMonitorList", async () => {
    mockObs.call.mockResolvedValue({ monitors: [{ monitorName: "Primary" }] });
    const res = await mod.getMonitorList();
    expect(res.monitors).toHaveLength(1);
  });

  it("openVideoMixProjector", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.openVideoMixProjector({ videoMixType: "OBS_WEBSOCKET_VIDEO_MIX_TYPE_PREVIEW" });
    expect(mockObs.call).toHaveBeenCalledWith("OpenVideoMixProjector", {
      videoMixType: "OBS_WEBSOCKET_VIDEO_MIX_TYPE_PREVIEW",
    });
  });

  it("openSourceProjector", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.openSourceProjector({ sourceName: "Camera" });
    expect(mockObs.call).toHaveBeenCalledWith("OpenSourceProjector", { sourceName: "Camera" });
  });

  it("rejects invalid params", async () => {
    await expect(mod.setStudioModeEnabled({} as any)).rejects.toThrow();
  });
});
