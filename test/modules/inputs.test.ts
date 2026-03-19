import { beforeEach, describe, expect, it, vi } from "vitest";
import { InputsModule } from "../../src/modules/inputs";

const mockObs = { call: vi.fn() };

describe("InputsModule", () => {
  let mod: InputsModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new InputsModule(mockObs as any);
  });

  it("getInputList", async () => {
    mockObs.call.mockResolvedValue({
      inputs: [{ inputName: "Mic", inputKind: "wasapi_input_capture", inputUuid: "uuid" }],
    });
    const res = await mod.getInputList();
    expect(mockObs.call).toHaveBeenCalledWith("GetInputList", undefined);
    expect(res.inputs).toHaveLength(1);
  });

  it("getInputKindList", async () => {
    mockObs.call.mockResolvedValue({ inputKinds: ["wasapi_input_capture"] });
    const res = await mod.getInputKindList();
    expect(res.inputKinds).toContain("wasapi_input_capture");
  });

  it("getSpecialInputs", async () => {
    mockObs.call.mockResolvedValue({
      desktop1: "Desktop Audio",
      desktop2: null,
      mic1: "Mic",
      mic2: null,
      mic3: null,
      mic4: null,
    });
    const res = await mod.getSpecialInputs();
    expect(res.desktop1).toBe("Desktop Audio");
  });

  it("createInput", async () => {
    mockObs.call.mockResolvedValue({ inputUuid: "new-uuid", sceneItemId: 1 });
    const res = await mod.createInput({ sceneName: "Scene", inputName: "NewMic", inputKind: "wasapi_input_capture" });
    expect(res.inputUuid).toBe("new-uuid");
  });

  it("removeInput", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.removeInput({ inputName: "OldMic" });
    expect(mockObs.call).toHaveBeenCalledWith("RemoveInput", { inputName: "OldMic" });
  });

  it("getInputMute / setInputMute / toggleInputMute", async () => {
    mockObs.call.mockResolvedValue({ inputMuted: false });
    const res = await mod.getInputMute({ inputName: "Mic" });
    expect(res.inputMuted).toBe(false);

    mockObs.call.mockResolvedValue(undefined);
    await mod.setInputMute({ inputName: "Mic", inputMuted: true });
    expect(mockObs.call).toHaveBeenCalledWith("SetInputMute", { inputName: "Mic", inputMuted: true });

    mockObs.call.mockResolvedValue({ inputMuted: true });
    const toggled = await mod.toggleInputMute({ inputName: "Mic" });
    expect(toggled.inputMuted).toBe(true);
  });

  it("getInputVolume / setInputVolume", async () => {
    mockObs.call.mockResolvedValue({ inputVolumeMul: 1.0, inputVolumeDb: 0.0 });
    const res = await mod.getInputVolume({ inputName: "Mic" });
    expect(res.inputVolumeMul).toBe(1.0);

    mockObs.call.mockResolvedValue(undefined);
    await mod.setInputVolume({ inputName: "Mic", inputVolumeDb: -10 });
    expect(mockObs.call).toHaveBeenCalledWith("SetInputVolume", { inputName: "Mic", inputVolumeDb: -10 });
  });

  it("getInputAudioBalance / setInputAudioBalance", async () => {
    mockObs.call.mockResolvedValue({ inputAudioBalance: 0.5 });
    const res = await mod.getInputAudioBalance({ inputName: "Mic" });
    expect(res.inputAudioBalance).toBe(0.5);
  });

  it("getInputSettings", async () => {
    mockObs.call.mockResolvedValue({ inputSettings: {}, inputKind: "wasapi_input_capture" });
    const res = await mod.getInputSettings({ inputName: "Mic" });
    expect(res.inputKind).toBe("wasapi_input_capture");
  });

  it("rejects invalid params", async () => {
    await expect(mod.getInputMute({} as any)).rejects.toThrow();
  });

  it("rejects invalid response", async () => {
    mockObs.call.mockResolvedValue({ wrong: "data" });
    await expect(mod.getInputVolume({ inputName: "Mic" })).rejects.toThrow();
  });
});
