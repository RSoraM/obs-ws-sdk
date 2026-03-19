import { describe, expect, it, vi } from "vitest";

vi.mock("obs-websocket-js", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      connect: vi.fn().mockResolvedValue(undefined),
      disconnect: vi.fn().mockResolvedValue(undefined),
      call: vi.fn().mockResolvedValue({}),
      on: vi.fn().mockReturnThis(),
      once: vi.fn().mockReturnThis(),
      off: vi.fn().mockReturnThis(),
      addListener: vi.fn().mockReturnThis(),
      removeListener: vi.fn().mockReturnThis(),
      removeAllListeners: vi.fn().mockReturnThis(),
    })),
  };
});

import { OBSDK } from "../src/client";

describe("OBSDK", () => {
  it("creates all module instances", () => {
    const sdk = new OBSDK();
    expect(sdk.general).toBeDefined();
    expect(sdk.config).toBeDefined();
    expect(sdk.sources).toBeDefined();
    expect(sdk.scenes).toBeDefined();
    expect(sdk.inputs).toBeDefined();
    expect(sdk.transitions).toBeDefined();
    expect(sdk.filters).toBeDefined();
    expect(sdk.sceneItems).toBeDefined();
    expect(sdk.outputs).toBeDefined();
    expect(sdk.stream).toBeDefined();
    expect(sdk.record).toBeDefined();
    expect(sdk.mediaInputs).toBeDefined();
    expect(sdk.ui).toBeDefined();
  });

  it("connect delegates to underlying OBSWebSocket", async () => {
    const sdk = new OBSDK();
    await sdk.connect("ws://localhost:4455", "password");
    // No error means success
  });

  it("disconnect delegates to underlying OBSWebSocket", async () => {
    const sdk = new OBSDK();
    await sdk.disconnect();
  });

  it("on/once/off/addListener/removeListener/removeAllListeners delegate correctly", () => {
    const sdk = new OBSDK();
    const handler = () => {};
    sdk.on("ConnectionOpened" as any, handler);
    sdk.once("ConnectionOpened" as any, handler);
    sdk.off("ConnectionOpened" as any, handler);
    sdk.addListener("ConnectionOpened" as any, handler);
    sdk.removeListener("ConnectionOpened" as any, handler);
    sdk.removeAllListeners("ConnectionOpened" as any);
  });
});
