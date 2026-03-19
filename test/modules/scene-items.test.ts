import { beforeEach, describe, expect, it, vi } from "vitest";
import { SceneItemsModule } from "../../src/modules/scene-items";

const mockObs = { call: vi.fn() };

describe("SceneItemsModule", () => {
  let mod: SceneItemsModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new SceneItemsModule(mockObs as any);
  });

  it("getSceneItemList", async () => {
    mockObs.call.mockResolvedValue({ sceneItems: [{ sceneItemId: 1, sourceName: "Camera", sourceUuid: "uuid" }] });
    const res = await mod.getSceneItemList({ sceneName: "Scene" });
    expect(res.sceneItems).toHaveLength(1);
  });

  it("getSceneItemId", async () => {
    mockObs.call.mockResolvedValue({ sceneItemId: 42 });
    const res = await mod.getSceneItemId({ sceneName: "Scene", sourceName: "Camera" });
    expect(res.sceneItemId).toBe(42);
  });

  it("createSceneItem", async () => {
    mockObs.call.mockResolvedValue({ sceneItemId: 5 });
    const res = await mod.createSceneItem({ sceneName: "Scene", sourceName: "Camera" });
    expect(res.sceneItemId).toBe(5);
  });

  it("removeSceneItem", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.removeSceneItem({ sceneName: "Scene", sceneItemId: 1 });
    expect(mockObs.call).toHaveBeenCalledWith("RemoveSceneItem", expect.objectContaining({ sceneItemId: 1 }));
  });

  it("duplicateSceneItem", async () => {
    mockObs.call.mockResolvedValue({ sceneItemId: 6 });
    const res = await mod.duplicateSceneItem({ sceneName: "Scene", sceneItemId: 1 });
    expect(res.sceneItemId).toBe(6);
  });

  it("getSceneItemTransform", async () => {
    mockObs.call.mockResolvedValue({ sceneItemTransform: { positionX: 0, positionY: 0 } });
    const res = await mod.getSceneItemTransform({ sceneName: "Scene", sceneItemId: 1 });
    expect(res.sceneItemTransform).toBeDefined();
  });

  it("setSceneItemTransform", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setSceneItemTransform({ sceneName: "Scene", sceneItemId: 1, sceneItemTransform: { positionX: 100 } });
    expect(mockObs.call).toHaveBeenCalledWith("SetSceneItemTransform", expect.objectContaining({ sceneItemId: 1 }));
  });

  it("getSceneItemEnabled / setSceneItemEnabled", async () => {
    mockObs.call.mockResolvedValue({ sceneItemEnabled: true });
    const res = await mod.getSceneItemEnabled({ sceneName: "Scene", sceneItemId: 1 });
    expect(res.sceneItemEnabled).toBe(true);

    mockObs.call.mockResolvedValue(undefined);
    await mod.setSceneItemEnabled({ sceneName: "Scene", sceneItemId: 1, sceneItemEnabled: false });
    expect(mockObs.call).toHaveBeenCalledWith(
      "SetSceneItemEnabled",
      expect.objectContaining({ sceneItemEnabled: false }),
    );
  });

  it("getSceneItemLocked / setSceneItemLocked", async () => {
    mockObs.call.mockResolvedValue({ sceneItemLocked: false });
    const res = await mod.getSceneItemLocked({ sceneName: "Scene", sceneItemId: 1 });
    expect(res.sceneItemLocked).toBe(false);
  });

  it("getSceneItemIndex / setSceneItemIndex", async () => {
    mockObs.call.mockResolvedValue({ sceneItemIndex: 2 });
    const res = await mod.getSceneItemIndex({ sceneName: "Scene", sceneItemId: 1 });
    expect(res.sceneItemIndex).toBe(2);
  });

  it("getSceneItemBlendMode / setSceneItemBlendMode", async () => {
    mockObs.call.mockResolvedValue({ sceneItemBlendMode: "OBS_BLEND_NORMAL" });
    const res = await mod.getSceneItemBlendMode({ sceneName: "Scene", sceneItemId: 1 });
    expect(res.sceneItemBlendMode).toBe("OBS_BLEND_NORMAL");
  });

  it("rejects invalid params", async () => {
    await expect(mod.getSceneItemId({} as any)).rejects.toThrow();
  });
});
