import { beforeEach, describe, expect, it, vi } from "vitest";
import { MediaInputsModule } from "../../src/modules/media-inputs";

const mockObs = { call: vi.fn() };

describe("MediaInputsModule", () => {
  let mod: MediaInputsModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new MediaInputsModule(mockObs as any);
  });

  it("getMediaInputStatus", async () => {
    mockObs.call.mockResolvedValue({ mediaState: "OBS_MEDIA_STATE_PLAYING", mediaDuration: 60000, mediaCursor: 5000 });
    const res = await mod.getMediaInputStatus({ inputName: "Media" });
    expect(res.mediaState).toBe("OBS_MEDIA_STATE_PLAYING");
  });

  it("setMediaInputCursor", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setMediaInputCursor({ inputName: "Media", mediaCursor: 10000 });
    expect(mockObs.call).toHaveBeenCalledWith("SetMediaInputCursor", { inputName: "Media", mediaCursor: 10000 });
  });

  it("offsetMediaInputCursor", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.offsetMediaInputCursor({ inputName: "Media", mediaCursorOffset: 5000 });
    expect(mockObs.call).toHaveBeenCalledWith("OffsetMediaInputCursor", {
      inputName: "Media",
      mediaCursorOffset: 5000,
    });
  });

  it("triggerMediaInputAction", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.triggerMediaInputAction({ inputName: "Media", mediaAction: "OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY" });
    expect(mockObs.call).toHaveBeenCalledWith(
      "TriggerMediaInputAction",
      expect.objectContaining({ mediaAction: "OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY" }),
    );
  });

  it("rejects invalid params", async () => {
    await expect(mod.getMediaInputStatus({} as any)).rejects.toThrow();
  });
});
