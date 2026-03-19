import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransitionsModule } from "../../src/modules/transitions";

const mockObs = { call: vi.fn() };

describe("TransitionsModule", () => {
  let mod: TransitionsModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new TransitionsModule(mockObs as any);
  });

  it("getTransitionKindList", async () => {
    mockObs.call.mockResolvedValue({ transitionKinds: ["fade", "cut"] });
    const res = await mod.getTransitionKindList();
    expect(res.transitionKinds).toContain("fade");
  });

  it("getSceneTransitionList", async () => {
    mockObs.call.mockResolvedValue({
      currentSceneTransitionName: "Fade",
      currentSceneTransitionUuid: "uuid",
      currentSceneTransitionKind: "fade",
      transitions: [],
    });
    const res = await mod.getSceneTransitionList();
    expect(res.currentSceneTransitionName).toBe("Fade");
  });

  it("getCurrentSceneTransition", async () => {
    mockObs.call.mockResolvedValue({
      transitionName: "Fade",
      transitionUuid: "uuid",
      transitionKind: "fade",
      transitionFixed: false,
      transitionDuration: 300,
      transitionConfigurable: true,
      transitionSettings: {},
    });
    const res = await mod.getCurrentSceneTransition();
    expect(res.transitionName).toBe("Fade");
  });

  it("setCurrentSceneTransition", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setCurrentSceneTransition({ transitionName: "Cut" });
    expect(mockObs.call).toHaveBeenCalledWith("SetCurrentSceneTransition", { transitionName: "Cut" });
  });

  it("setCurrentSceneTransitionDuration", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setCurrentSceneTransitionDuration({ transitionDuration: 500 });
    expect(mockObs.call).toHaveBeenCalledWith("SetCurrentSceneTransitionDuration", { transitionDuration: 500 });
  });

  it("getCurrentSceneTransitionCursor", async () => {
    mockObs.call.mockResolvedValue({ transitionCursor: 0.5 });
    const res = await mod.getCurrentSceneTransitionCursor();
    expect(res.transitionCursor).toBe(0.5);
  });

  it("triggerStudioModeTransition", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.triggerStudioModeTransition();
    expect(mockObs.call).toHaveBeenCalledWith("TriggerStudioModeTransition");
  });

  it("setTBarPosition", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setTBarPosition({ position: 0.5 });
    expect(mockObs.call).toHaveBeenCalledWith("SetTBarPosition", { position: 0.5 });
  });
});
