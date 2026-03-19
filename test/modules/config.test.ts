import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConfigModule } from "../../src/modules/config";

const mockObs = { call: vi.fn() };

describe("ConfigModule", () => {
  let mod: ConfigModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new ConfigModule(mockObs as any);
  });

  it("getPersistentData", async () => {
    mockObs.call.mockResolvedValue({ slotValue: "val" });
    const res = await mod.getPersistentData({ realm: "OBS_WEBSOCKET_DATA_REALM_GLOBAL", slotName: "test" });
    expect(mockObs.call).toHaveBeenCalledWith("GetPersistentData", {
      realm: "OBS_WEBSOCKET_DATA_REALM_GLOBAL",
      slotName: "test",
    });
    expect(res.slotValue).toBe("val");
  });

  it("setPersistentData", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setPersistentData({ realm: "OBS_WEBSOCKET_DATA_REALM_GLOBAL", slotName: "test", slotValue: "val" });
    expect(mockObs.call).toHaveBeenCalledWith(
      "SetPersistentData",
      expect.objectContaining({ realm: "OBS_WEBSOCKET_DATA_REALM_GLOBAL" }),
    );
  });

  it("getSceneCollectionList", async () => {
    mockObs.call.mockResolvedValue({ currentSceneCollectionName: "Default", sceneCollections: ["Default"] });
    const res = await mod.getSceneCollectionList();
    expect(mockObs.call).toHaveBeenCalledWith("GetSceneCollectionList");
    expect(res.currentSceneCollectionName).toBe("Default");
  });

  it("setCurrentSceneCollection", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setCurrentSceneCollection({ sceneCollectionName: "New" });
    expect(mockObs.call).toHaveBeenCalledWith("SetCurrentSceneCollection", { sceneCollectionName: "New" });
  });

  it("getProfileList", async () => {
    mockObs.call.mockResolvedValue({ currentProfileName: "Default", profiles: ["Default"] });
    const res = await mod.getProfileList();
    expect(res.currentProfileName).toBe("Default");
  });

  it("getVideoSettings", async () => {
    const response = {
      fpsNumerator: 60,
      fpsDenominator: 1,
      baseWidth: 1920,
      baseHeight: 1080,
      outputWidth: 1920,
      outputHeight: 1080,
    };
    mockObs.call.mockResolvedValue(response);
    const res = await mod.getVideoSettings();
    expect(res.baseWidth).toBe(1920);
  });

  it("setVideoSettings", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setVideoSettings({ baseWidth: 1280, baseHeight: 720 });
    expect(mockObs.call).toHaveBeenCalledWith("SetVideoSettings", { baseWidth: 1280, baseHeight: 720 });
  });

  it("getStreamServiceSettings", async () => {
    mockObs.call.mockResolvedValue({ streamServiceType: "rtmp_custom", streamServiceSettings: {} });
    const res = await mod.getStreamServiceSettings();
    expect(res.streamServiceType).toBe("rtmp_custom");
  });

  it("getRecordDirectory", async () => {
    mockObs.call.mockResolvedValue({ recordDirectory: "/home/user/Videos" });
    const res = await mod.getRecordDirectory();
    expect(res.recordDirectory).toBe("/home/user/Videos");
  });

  it("rejects invalid params", async () => {
    await expect(mod.getPersistentData({} as any)).rejects.toThrow();
  });
});
