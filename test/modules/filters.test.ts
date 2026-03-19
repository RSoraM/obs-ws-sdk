import { beforeEach, describe, expect, it, vi } from "vitest";
import { FiltersModule } from "../../src/modules/filters";

const mockObs = { call: vi.fn() };

describe("FiltersModule", () => {
  let mod: FiltersModule;

  beforeEach(() => {
    vi.clearAllMocks();
    mod = new FiltersModule(mockObs as any);
  });

  it("getSourceFilterKindList", async () => {
    mockObs.call.mockResolvedValue({ sourceFilterKinds: ["noise_suppress"] });
    const res = await mod.getSourceFilterKindList();
    expect(res.sourceFilterKinds).toContain("noise_suppress");
  });

  it("getSourceFilterList", async () => {
    mockObs.call.mockResolvedValue({
      filters: [
        { filterEnabled: true, filterIndex: 0, filterKind: "noise_suppress", filterName: "NS", filterSettings: {} },
      ],
    });
    const res = await mod.getSourceFilterList({ sourceName: "Mic" });
    expect(res.filters).toHaveLength(1);
  });

  it("getSourceFilterDefaultSettings", async () => {
    mockObs.call.mockResolvedValue({ defaultFilterSettings: { suppress_level: -30 } });
    const res = await mod.getSourceFilterDefaultSettings({ filterKind: "noise_suppress" });
    expect(res.defaultFilterSettings).toBeDefined();
  });

  it("createSourceFilter", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.createSourceFilter({ sourceName: "Mic", filterName: "NS", filterKind: "noise_suppress" });
    expect(mockObs.call).toHaveBeenCalledWith("CreateSourceFilter", expect.objectContaining({ filterName: "NS" }));
  });

  it("removeSourceFilter", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.removeSourceFilter({ sourceName: "Mic", filterName: "NS" });
    expect(mockObs.call).toHaveBeenCalledWith("RemoveSourceFilter", expect.objectContaining({ filterName: "NS" }));
  });

  it("getSourceFilter", async () => {
    mockObs.call.mockResolvedValue({
      filterEnabled: true,
      filterIndex: 0,
      filterKind: "noise_suppress",
      filterName: "NS",
      filterSettings: {},
    });
    const res = await mod.getSourceFilter({ sourceName: "Mic", filterName: "NS" });
    expect(res.filterName).toBe("NS");
  });

  it("setSourceFilterEnabled", async () => {
    mockObs.call.mockResolvedValue(undefined);
    await mod.setSourceFilterEnabled({ sourceName: "Mic", filterName: "NS", filterEnabled: false });
    expect(mockObs.call).toHaveBeenCalledWith(
      "SetSourceFilterEnabled",
      expect.objectContaining({ filterEnabled: false }),
    );
  });

  it("rejects invalid params", async () => {
    await expect(mod.getSourceFilter({} as any)).rejects.toThrow();
  });
});
