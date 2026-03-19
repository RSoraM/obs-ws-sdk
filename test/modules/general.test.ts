import { beforeEach, describe, expect, it, vi } from "vitest";
import { GeneralModule } from "../../src/modules/general";

const mockObs = {
  call: vi.fn(),
};

describe("GeneralModule", () => {
  let mod: GeneralModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new GeneralModule(mockObs as any);
  });

  it("getVersion", async () => {
    const response = {
      obsVersion: "30.0.0",
      obsWebSocketVersion: "5.4.0",
      rpcVersion: 1,
      availableRequests: ["GetVersion"],
      supportedImageFormats: ["png"],
      platform: "windows",
      platformDescription: "Windows 11",
    };
    mockObs.call.mockResolvedValue(response);
    const res = await mod.getVersion();
    expect(mockObs.call).toHaveBeenCalledWith("GetVersion");
    expect(res).toEqual(response);
  });

  it("getStats", async () => {
    const response = {
      cpuUsage: 5.0,
      memoryUsage: 200.0,
      availableDiskSpace: 50000.0,
      activeFps: 60.0,
      averageFrameRenderTime: 5.0,
      renderSkippedFrames: 0,
      renderTotalFrames: 10000,
      outputSkippedFrames: 0,
      outputTotalFrames: 10000,
      webSocketSessionIncomingMessages: 100,
      webSocketSessionOutgoingMessages: 100,
    };
    mockObs.call.mockResolvedValue(response);
    const res = await mod.getStats();
    expect(mockObs.call).toHaveBeenCalledWith("GetStats");
    expect(res).toEqual(response);
  });

  it("broadcastCustomEvent", async () => {
    mockObs.call.mockResolvedValue(undefined);
    const params = { eventData: { foo: "bar" } };
    await mod.broadcastCustomEvent(params);
    expect(mockObs.call).toHaveBeenCalledWith("BroadcastCustomEvent", params);
  });

  it("callVendorRequest", async () => {
    const response = { vendorName: "test", requestType: "test", responseData: {} };
    mockObs.call.mockResolvedValue(response);
    const params = { vendorName: "test", requestType: "test" };
    const res = await mod.callVendorRequest(params);
    expect(mockObs.call).toHaveBeenCalledWith("CallVendorRequest", params);
    expect(res).toEqual(response);
  });

  it("getHotkeyList", async () => {
    const response = { hotkeys: ["hotkey1"] };
    mockObs.call.mockResolvedValue(response);
    const res = await mod.getHotkeyList();
    expect(mockObs.call).toHaveBeenCalledWith("GetHotkeyList");
    expect(res).toEqual(response);
  });

  it("triggerHotkeyByName", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.triggerHotkeyByName({ hotkeyName: "test" });
    expect(mockObs.call).toHaveBeenCalledWith("TriggerHotkeyByName", { hotkeyName: "test" });
  });

  it("triggerHotkeyByKeySequence", async () => {
    mockObs.call.mockResolvedValue(undefined);
    const params = { keyId: "OBS_KEY_A" };
    await mod.triggerHotkeyByKeySequence(params);
    expect(mockObs.call).toHaveBeenCalledWith("TriggerHotkeyByKeySequence", params);
  });

  it("rejects invalid request params", async () => {
    await expect(mod.triggerHotkeyByName({} as any)).rejects.toThrow();
  });

  it("rejects invalid response data", async () => {
    mockObs.call.mockResolvedValue({ invalid: true });
    await expect(mod.getVersion()).rejects.toThrow();
  });
});
