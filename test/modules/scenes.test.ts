import { beforeEach, describe, expect, it, vi } from "vitest";
import { ScenesModule } from "../../src/modules/scenes";

const mockObs = { call: vi.fn() };

describe("ScenesModule", () => {
  let mod: ScenesModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new ScenesModule(mockObs as any);
  });

  it("getSceneList", async () => {
    const response = {
      currentProgramSceneName: "Scene",
      currentProgramSceneUuid: "uuid",
      currentPreviewSceneName: null,
      currentPreviewSceneUuid: null,
      scenes: [],
    };
    mockObs.call.mockResolvedValue(response);
    const res = await mod.getSceneList();
    expect(mockObs.call).toHaveBeenCalledWith("GetSceneList", undefined);
    expect(res.currentProgramSceneName).toBe("Scene");
  });

  it("getGroupList", async () => {
    mockObs.call.mockResolvedValue({ groups: ["Group1"] });
    const res = await mod.getGroupList();
    expect(res.groups).toEqual(["Group1"]);
  });

  it("getCurrentProgramScene/setCurrentProgramScene", async () => {
    mockObs.call.mockResolvedValue({
      sceneName: "Scene",
      sceneUuid: "uuid",
      currentProgramSceneName: "Scene",
      currentProgramSceneUuid: "uuid",
    });
    const res = await mod.getCurrentProgramScene();
    expect(res.currentProgramSceneName).toBe("Scene");

    mockObs.call.mockResolvedValue(undefined);
    await mod.setCurrentProgramScene({ sceneName: "Scene2" });
    expect(mockObs.call).toHaveBeenCalledWith("SetCurrentProgramScene", { sceneName: "Scene2" });
  });

  it("createScene", async () => {
    mockObs.call.mockResolvedValue({ sceneUuid: "new-uuid" });
    const res = await mod.createScene({ sceneName: "NewScene" });
    expect(res.sceneUuid).toBe("new-uuid");
  });

  it("removeScene", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.removeScene({ sceneName: "OldScene" });
    expect(mockObs.call).toHaveBeenCalledWith("RemoveScene", { sceneName: "OldScene" });
  });

  it("setSceneName", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setSceneName({ sceneName: "Old", newSceneName: "New" });
    expect(mockObs.call).toHaveBeenCalledWith("SetSceneName", { sceneName: "Old", newSceneName: "New" });
  });

  it("rejects invalid params", async () => {
    await expect(mod.createScene({} as any)).rejects.toThrow();
  });
});
