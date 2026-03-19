/**
 * Schema 覆盖率检查：对比 OBS 原始响应和 Zod schema 输出，找出被静默丢弃的字段
 * 运行方式: npx tsx scripts/schema-coverage.ts
 *
 * Zod 默认 strip 模式：原始响应中存在但 schema 未定义的字段会被丢弃且不报错。
 * 本脚本通过比较 raw obs.call() 和 SDK method() 的键集合来暴露这些缺口。
 */

import OBSWebSocket from "obs-websocket-js";
import { OBSDK } from "../src/client";

const OBS_URL = "ws://10.0.0.10:4455";
const OBS_PASSWORD = "myYMONzL8Lgnw26B";

// ========================
// 递归键路径对比
// ========================

/**
 * 找出存在于 raw 但不在 parsed 中的键路径
 * 对 z.record(z.unknown()) 的情况（即 parsed 值是 object 且 raw/parsed 键集完全相同）不深入递归
 */
function findMissingPaths(raw: unknown, parsed: unknown, path = ""): string[] {
  if (raw === null || raw === undefined) return [];
  if (typeof raw !== "object") return [];
  if (typeof parsed !== "object" || parsed === null) {
    return path ? [`${path} (整个对象被丢弃)`] : [];
  }

  const rawObj = raw as Record<string, unknown>;
  const parsedObj = parsed as Record<string, unknown>;
  const missing: string[] = [];

  for (const key of Object.keys(rawObj)) {
    const fullPath = path ? `${path}.${key}` : key;
    if (!(key in parsedObj)) {
      missing.push(fullPath);
    } else {
      const rv = rawObj[key];
      const pv = parsedObj[key];
      // 递归对象（排除 null）
      if (rv !== null && typeof rv === "object" && !Array.isArray(rv)) {
        missing.push(...findMissingPaths(rv, pv, fullPath));
      }
      // 递归数组第一个元素（代表性检查）
      if (Array.isArray(rv) && Array.isArray(pv) && rv.length > 0 && pv.length > 0) {
        missing.push(...findMissingPaths(rv[0], pv[0], `${fullPath}[0]`));
      }
    }
  }

  return missing;
}

// ========================
// 报告工具
// ========================

type CoverageResult = {
  name: string;
  status: "OK" | "GAP" | "SKIP" | "ERROR";
  gaps?: string[];
  detail?: string;
};
const results: CoverageResult[] = [];

async function check(name: string, rawFn: () => Promise<unknown>, sdkFn: () => Promise<unknown>) {
  try {
    const [raw, parsed] = await Promise.all([rawFn(), sdkFn()]);
    const gaps = findMissingPaths(raw, parsed);
    if (gaps.length === 0) {
      console.log(`  ✅ OK    ${name}`);
      results.push({ name, status: "OK" });
    } else {
      console.warn(`  ⚠️  GAP   ${name}`);
      for (const g of gaps) console.warn(`           └─ 缺失字段: ${g}`);
      results.push({ name, status: "GAP", gaps });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log(`  ⏭️  SKIP  ${name} — ${msg}`);
    results.push({ name, status: "SKIP", detail: msg });
  }
}

// ========================
// 主流程
// ========================

async function main() {
  // 建立两个连接：raw 用于直接调用，sdk 用于获取 schema 处理后的输出
  const raw = new OBSWebSocket();
  const sdk = new OBSDK();

  console.log("\n=== OBS WebSocket SDK — Schema 覆盖率检查 ===");
  console.log(`目标: ${OBS_URL}\n`);

  await raw.connect(OBS_URL, OBS_PASSWORD);
  await sdk.connect(OBS_URL, OBS_PASSWORD);
  console.log("  已连接（raw + sdk 双连接）\n");

  // ── general ──
  console.log("── general ──");
  await check(
    "GetVersion",
    () => raw.call("GetVersion"),
    () => sdk.general.getVersion(),
  );
  await check(
    "GetStats",
    () => raw.call("GetStats"),
    () => sdk.general.getStats(),
  );
  await check(
    "GetHotkeyList",
    () => raw.call("GetHotkeyList"),
    () => sdk.general.getHotkeyList(),
  );

  // ── config ──
  console.log("\n── config ──");
  await check(
    "GetSceneCollectionList",
    () => raw.call("GetSceneCollectionList"),
    () => sdk.config.getSceneCollectionList(),
  );
  await check(
    "GetProfileList",
    () => raw.call("GetProfileList"),
    () => sdk.config.getProfileList(),
  );
  await check(
    "GetVideoSettings",
    () => raw.call("GetVideoSettings"),
    () => sdk.config.getVideoSettings(),
  );
  await check(
    "GetStreamServiceSettings",
    () => raw.call("GetStreamServiceSettings"),
    () => sdk.config.getStreamServiceSettings(),
  );
  await check(
    "GetRecordDirectory",
    () => raw.call("GetRecordDirectory"),
    () => sdk.config.getRecordDirectory(),
  );
  await check(
    "GetPersistentData",
    () => raw.call("GetPersistentData", { realm: "OBS_WEBSOCKET_DATA_REALM_PROFILE", slotName: "test" }),
    () => sdk.config.getPersistentData({ realm: "OBS_WEBSOCKET_DATA_REALM_PROFILE", slotName: "test" }),
  );
  await check(
    "GetProfileParameter",
    () => raw.call("GetProfileParameter", { parameterCategory: "General", parameterName: "Name" }),
    () => sdk.config.getProfileParameter({ parameterCategory: "General", parameterName: "Name" }),
  );

  // ── sources ──
  console.log("\n── sources ──");
  await check(
    "GetCanvasList",
    () => raw.call("GetCanvasList"),
    () => sdk.sources.getCanvasList(),
  );

  // ── scenes ──
  console.log("\n── scenes ──");
  await check(
    "GetSceneList",
    () => raw.call("GetSceneList"),
    () => sdk.scenes.getSceneList(),
  );
  await check(
    "GetGroupList",
    () => raw.call("GetGroupList"),
    () => sdk.scenes.getGroupList(),
  );
  const programScene = (await raw.call("GetCurrentProgramScene")) as { currentProgramSceneName: string };
  await check(
    "GetCurrentProgramScene",
    () => raw.call("GetCurrentProgramScene"),
    () => sdk.scenes.getCurrentProgramScene(),
  );
  await check(
    "GetSceneSceneTransitionOverride",
    () => raw.call("GetSceneSceneTransitionOverride", { sceneName: programScene.currentProgramSceneName }),
    () => sdk.scenes.getSceneSceneTransitionOverride({ sceneName: programScene.currentProgramSceneName }),
  );

  // ── inputs ──
  console.log("\n── inputs ──");
  await check(
    "GetInputList",
    () => raw.call("GetInputList"),
    () => sdk.inputs.getInputList(),
  );
  await check(
    "GetInputKindList",
    () => raw.call("GetInputKindList"),
    () => sdk.inputs.getInputKindList({}),
  );
  await check(
    "GetSpecialInputs",
    () => raw.call("GetSpecialInputs"),
    () => sdk.inputs.getSpecialInputs(),
  );

  const inputListRes = (await raw.call("GetInputList")) as { inputs: Array<Record<string, unknown>> };
  const firstInput = inputListRes.inputs[0] as Record<string, unknown> | undefined;
  const inputName = firstInput?.["inputName"] as string | undefined;

  if (inputName) {
    await check(
      `GetInputSettings(${inputName})`,
      () => raw.call("GetInputSettings", { inputName }),
      () => sdk.inputs.getInputSettings({ inputName }),
    );
    await check(
      `GetInputMute(${inputName})`,
      () => raw.call("GetInputMute", { inputName }),
      () => sdk.inputs.getInputMute({ inputName }),
    );
    await check(
      `GetInputVolume(${inputName})`,
      () => raw.call("GetInputVolume", { inputName }),
      () => sdk.inputs.getInputVolume({ inputName }),
    );
    await check(
      `GetInputAudioBalance(${inputName})`,
      () => raw.call("GetInputAudioBalance", { inputName }),
      () => sdk.inputs.getInputAudioBalance({ inputName }),
    );
    await check(
      `GetInputAudioSyncOffset(${inputName})`,
      () => raw.call("GetInputAudioSyncOffset", { inputName }),
      () => sdk.inputs.getInputAudioSyncOffset({ inputName }),
    );
    await check(
      `GetInputAudioMonitorType(${inputName})`,
      () => raw.call("GetInputAudioMonitorType", { inputName }),
      () => sdk.inputs.getInputAudioMonitorType({ inputName }),
    );
    await check(
      `GetInputAudioTracks(${inputName})`,
      () => raw.call("GetInputAudioTracks", { inputName }),
      () => sdk.inputs.getInputAudioTracks({ inputName }),
    );
  }

  // ── transitions ──
  console.log("\n── transitions ──");
  await check(
    "GetTransitionKindList",
    () => raw.call("GetTransitionKindList"),
    () => sdk.transitions.getTransitionKindList(),
  );
  await check(
    "GetSceneTransitionList",
    () => raw.call("GetSceneTransitionList"),
    () => sdk.transitions.getSceneTransitionList(),
  );
  await check(
    "GetCurrentSceneTransition",
    () => raw.call("GetCurrentSceneTransition"),
    () => sdk.transitions.getCurrentSceneTransition(),
  );
  await check(
    "GetCurrentSceneTransitionCursor",
    () => raw.call("GetCurrentSceneTransitionCursor"),
    () => sdk.transitions.getCurrentSceneTransitionCursor(),
  );

  // ── filters ──
  console.log("\n── filters ──");
  await check(
    "GetSourceFilterKindList",
    () => raw.call("GetSourceFilterKindList"),
    () => sdk.filters.getSourceFilterKindList(),
  );
  if (inputName) {
    await check(
      `GetSourceFilterList(${inputName})`,
      () => raw.call("GetSourceFilterList", { sourceName: inputName }),
      () => sdk.filters.getSourceFilterList({ sourceName: inputName }),
    );
  }

  // ── scene-items ──
  console.log("\n── scene-items ──");
  const sceneName = programScene.currentProgramSceneName;
  await check(
    `GetSceneItemList(${sceneName})`,
    () => raw.call("GetSceneItemList", { sceneName }),
    () => sdk.sceneItems.getSceneItemList({ sceneName }),
  );

  const rawItems = (await raw.call("GetSceneItemList", { sceneName })) as {
    sceneItems: Array<Record<string, unknown>>;
  };
  const firstItem = rawItems.sceneItems[0] as Record<string, unknown> | undefined;
  const sceneItemId = firstItem?.["sceneItemId"] as number | undefined;

  if (sceneItemId !== undefined) {
    await check(
      `GetSceneItemTransform(item ${sceneItemId})`,
      () => raw.call("GetSceneItemTransform", { sceneName, sceneItemId }),
      () => sdk.sceneItems.getSceneItemTransform({ sceneName, sceneItemId }),
    );
    await check(
      `GetSceneItemEnabled(item ${sceneItemId})`,
      () => raw.call("GetSceneItemEnabled", { sceneName, sceneItemId }),
      () => sdk.sceneItems.getSceneItemEnabled({ sceneName, sceneItemId }),
    );
    await check(
      `GetSceneItemLocked(item ${sceneItemId})`,
      () => raw.call("GetSceneItemLocked", { sceneName, sceneItemId }),
      () => sdk.sceneItems.getSceneItemLocked({ sceneName, sceneItemId }),
    );
    await check(
      `GetSceneItemIndex(item ${sceneItemId})`,
      () => raw.call("GetSceneItemIndex", { sceneName, sceneItemId }),
      () => sdk.sceneItems.getSceneItemIndex({ sceneName, sceneItemId }),
    );
    await check(
      `GetSceneItemBlendMode(item ${sceneItemId})`,
      () => raw.call("GetSceneItemBlendMode", { sceneName, sceneItemId }),
      () => sdk.sceneItems.getSceneItemBlendMode({ sceneName, sceneItemId }),
    );
  }

  // ── outputs ──
  console.log("\n── outputs ──");
  await check(
    "GetVirtualCamStatus",
    () => raw.call("GetVirtualCamStatus"),
    () => sdk.outputs.getVirtualCamStatus(),
  );
  await check(
    "GetOutputList",
    () => raw.call("GetOutputList"),
    () => sdk.outputs.getOutputList(),
  );

  const outputListRes = (await raw.call("GetOutputList")) as { outputs: Array<Record<string, unknown>> };
  const firstOutput = outputListRes.outputs[0] as Record<string, unknown> | undefined;
  const outputName = firstOutput?.["outputName"] as string | undefined;

  if (outputName) {
    await check(
      `GetOutputStatus(${outputName})`,
      () => raw.call("GetOutputStatus", { outputName }),
      () => sdk.outputs.getOutputStatus({ outputName }),
    );
    await check(
      `GetOutputSettings(${outputName})`,
      () => raw.call("GetOutputSettings", { outputName }),
      () => sdk.outputs.getOutputSettings({ outputName }),
    );
  }

  // ── stream ──
  console.log("\n── stream ──");
  await check(
    "GetStreamStatus",
    () => raw.call("GetStreamStatus"),
    () => sdk.stream.getStreamStatus(),
  );

  // ── record ──
  console.log("\n── record ──");
  await check(
    "GetRecordStatus",
    () => raw.call("GetRecordStatus"),
    () => sdk.record.getRecordStatus(),
  );

  // ── ui ──
  console.log("\n── ui ──");
  await check(
    "GetStudioModeEnabled",
    () => raw.call("GetStudioModeEnabled"),
    () => sdk.ui.getStudioModeEnabled(),
  );
  await check(
    "GetMonitorList",
    () => raw.call("GetMonitorList"),
    () => sdk.ui.getMonitorList(),
  );

  // ── 断开 ──
  await raw.disconnect();
  await sdk.disconnect();

  // ========================
  // 汇总报表
  // ========================
  const ok = results.filter((r) => r.status === "OK").length;
  const gap = results.filter((r) => r.status === "GAP").length;
  const skip = results.filter((r) => r.status === "SKIP").length;

  console.log("\n══════════════════════════════════════════════");
  console.log(`Schema 覆盖率检查: ${ok} 完整 / ${gap} 有缺口 / ${skip} 跳过`);
  console.log(`覆盖率: ${Math.round((ok / (ok + gap)) * 100)}%  (${ok}/${ok + gap} 已检查的接口)`);
  console.log("══════════════════════════════════════════════");

  if (gap > 0) {
    console.log("\n⚠️  有缺口的 schema（OBS 返回了但 schema 未捕获的字段）:");
    for (const r of results.filter((r) => r.status === "GAP")) {
      console.log(`\n  ${r.name}:`);
      for (const g of r.gaps ?? []) console.log(`    - ${g}`);
    }
    console.log("\n修复方式: 在对应模块的 ResponseSchema 中添加缺失字段");
  } else {
    console.log("\n所有已检查的接口 schema 覆盖完整 ✅");
  }

  process.exit(gap > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("未捕获的错误:", err);
  process.exit(1);
});
