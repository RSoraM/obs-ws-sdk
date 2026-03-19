/**
 * 实时集成测试：连接到真实 OBS 实例，逐个检查函数是否正确实现
 * 运行方式: npx tsx scripts/integration-test.ts
 * 需在项目根目录创建 .env 文件并填写 OBS_URL 和 OBS_PASSWORD（参考 .env.example）
 */

import "dotenv/config";
import { OBSDK } from "../src/client";

const OBS_URL = process.env.OBS_URL;
const OBS_PASSWORD = process.env.OBS_PASSWORD;

if (!OBS_URL) {
  console.error("❌ 缺少环境变量 OBS_URL，请在 .env 文件中配置。");
  process.exit(1);
}

// ========================
// 测试辅助工具
// ========================

type Result = { name: string; status: "PASS" | "FAIL" | "SKIP"; detail?: string };
const results: Result[] = [];

function pass(name: string, detail?: string) {
  results.push({ name, status: "PASS", detail });
  console.log(`  ✅ PASS  ${name}${detail ? ` → ${detail}` : ""}`);
}

function fail(name: string, err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  results.push({ name, status: "FAIL", detail: msg });
  console.error(`  ❌ FAIL  ${name}\n          ${msg}`);
}

function skip(name: string, reason: string) {
  results.push({ name, status: "SKIP", detail: reason });
  console.log(`  ⏭️  SKIP  ${name} — ${reason}`);
}

async function test(name: string, fn: () => Promise<unknown>) {
  try {
    const res = await fn();
    const preview =
      res === undefined ? "(void)" : typeof res === "object" ? JSON.stringify(res).slice(0, 120) : String(res);
    pass(name, preview);
    return res;
  } catch (err) {
    fail(name, err);
    return undefined;
  }
}

// ========================
// 主测试流程
// ========================

async function main() {
  const sdk = new OBSDK();

  console.log("\n=== OBS WebSocket SDK 集成测试 ===");
  console.log(`目标: ${OBS_URL}\n`);

  // —— 连接 ——
  try {
    await sdk.connect(OBS_URL, OBS_PASSWORD);
    pass("connect", `已连接到 ${OBS_URL}`);
  } catch (err) {
    fail("connect", err);
    console.error("\n无法连接到 OBS，测试中止。");
    process.exit(1);
  }

  // ====================================================
  // general 模块
  // ====================================================
  console.log("\n── general ──");

  const version = await test("general.getVersion", () => sdk.general.getVersion());
  await test("general.getStats", () => sdk.general.getStats());
  await test("general.getHotkeyList", () => sdk.general.getHotkeyList());
  await test("general.broadcastCustomEvent", () =>
    sdk.general.broadcastCustomEvent({ eventData: { test: "integration" } }));
  // NOTE: Sleep is a batch-only request (OBS error 206 if called standalone).
  // Use sdk.callBatch([{ requestType: 'Sleep', requestData: { sleepMillis: 100 } }]) instead.
  skip("general.sleep", "协议规定 Sleep 仅可在 callBatch (SERIAL_REALTIME/SERIAL_FRAME) 中使用");

  // ====================================================
  // config 模块
  // ====================================================
  console.log("\n── config ──");

  await test("config.getSceneCollectionList", () => sdk.config.getSceneCollectionList());
  await test("config.getProfileList", () => sdk.config.getProfileList());
  await test("config.getVideoSettings", () => sdk.config.getVideoSettings());
  await test("config.getStreamServiceSettings", () => sdk.config.getStreamServiceSettings());
  await test("config.getRecordDirectory", () => sdk.config.getRecordDirectory());
  await test("config.getPersistentData", () =>
    sdk.config.getPersistentData({ realm: "OBS_WEBSOCKET_DATA_REALM_PROFILE", slotName: "test_slot" }));
  // 写入可安全逆转的 persistent data
  await test("config.setPersistentData", () =>
    sdk.config.setPersistentData({
      realm: "OBS_WEBSOCKET_DATA_REALM_PROFILE",
      slotName: "test_slot",
      slotValue: "integration_test",
    }));
  await test("config.getProfileParameter", () =>
    sdk.config.getProfileParameter({ parameterCategory: "General", parameterName: "Name" }));

  // ====================================================
  // sources 模块 (需要真实 source 名称)
  // ====================================================
  console.log("\n── sources ──");

  await test("sources.getCanvasList", () => sdk.sources.getCanvasList());

  // ====================================================
  // scenes 模块
  // ====================================================
  console.log("\n── scenes ──");

  const sceneList = (await test("scenes.getSceneList", () => sdk.scenes.getSceneList())) as
    | Awaited<ReturnType<typeof sdk.scenes.getSceneList>>
    | undefined;

  await test("scenes.getGroupList", () => sdk.scenes.getGroupList());
  const programScene = (await test("scenes.getCurrentProgramScene", () => sdk.scenes.getCurrentProgramScene())) as
    | Awaited<ReturnType<typeof sdk.scenes.getCurrentProgramScene>>
    | undefined;

  // Studio mode for preview test
  const studioModeRes = (await test("ui.getStudioModeEnabled (预读)", () => sdk.ui.getStudioModeEnabled())) as
    | Awaited<ReturnType<typeof sdk.ui.getStudioModeEnabled>>
    | undefined;

  if (studioModeRes?.studioModeEnabled && programScene) {
    await test("scenes.getCurrentPreviewScene", () => sdk.scenes.getCurrentPreviewScene());
  } else {
    skip("scenes.getCurrentPreviewScene", "Studio Mode 未开启，跳过 Preview 查询");
  }

  if (sceneList?.scenes?.length && programScene) {
    const sceneName = programScene.currentProgramSceneName;
    await test("scenes.getSceneSceneTransitionOverride", () =>
      sdk.scenes.getSceneSceneTransitionOverride({ sceneName }));

    // 创建 → 改名 → 删除  (可安全操作)
    const tmpName = `__sdk_integration_test_${Date.now()}`;
    const created = (await test("scenes.createScene", () => sdk.scenes.createScene({ sceneName: tmpName }))) as
      | Awaited<ReturnType<typeof sdk.scenes.createScene>>
      | undefined;

    if (created) {
      const renamedName = `${tmpName}_renamed`;
      await test("scenes.setSceneName", () =>
        sdk.scenes.setSceneName({ sceneName: tmpName, newSceneName: renamedName }));
      await test("scenes.removeScene", () => sdk.scenes.removeScene({ sceneName: renamedName }));
    }
  }

  // ====================================================
  // inputs 模块
  // ====================================================
  console.log("\n── inputs ──");

  const inputList = (await test("inputs.getInputList", () => sdk.inputs.getInputList())) as
    | Awaited<ReturnType<typeof sdk.inputs.getInputList>>
    | undefined;
  await test("inputs.getInputKindList", () => sdk.inputs.getInputKindList({}));
  await test("inputs.getSpecialInputs", () => sdk.inputs.getSpecialInputs());

  // 使用第一个 input 测试详细信息
  const firstInput = inputList?.inputs?.[0] as Record<string, unknown> | undefined;
  const inputName = firstInput?.inputName as string | undefined;
  if (inputName) {
    await test(`inputs.getInputSettings(${inputName})`, () => sdk.inputs.getInputSettings({ inputName }));
    await test(`inputs.getInputMute(${inputName})`, () => sdk.inputs.getInputMute({ inputName }));
    await test(`inputs.getInputVolume(${inputName})`, () => sdk.inputs.getInputVolume({ inputName }));
    await test(`inputs.getInputAudioBalance(${inputName})`, () => sdk.inputs.getInputAudioBalance({ inputName }));
    await test(`inputs.getInputAudioSyncOffset(${inputName})`, () => sdk.inputs.getInputAudioSyncOffset({ inputName }));
    await test(`inputs.getInputAudioMonitorType(${inputName})`, () =>
      sdk.inputs.getInputAudioMonitorType({ inputName }));
    await test(`inputs.getInputAudioTracks(${inputName})`, () => sdk.inputs.getInputAudioTracks({ inputName }));
    await test(`inputs.getSourceActive(${inputName}) [via sources]`, () =>
      sdk.sources.getSourceActive({ sourceName: inputName }));
  } else {
    skip("inputs.getInputSettings", "没有可用的 input");
    skip("inputs.getInputMute", "没有可用的 input");
    skip("inputs.getInputVolume", "没有可用的 input");
    skip("inputs.getInputAudioBalance", "没有可用的 input");
    skip("inputs.getInputAudioSyncOffset", "没有可用的 input");
    skip("inputs.getInputAudioMonitorType", "没有可用的 input");
    skip("inputs.getInputAudioTracks", "没有可用的 input");
  }

  // ====================================================
  // transitions 模块
  // ====================================================
  console.log("\n── transitions ──");

  await test("transitions.getTransitionKindList", () => sdk.transitions.getTransitionKindList());
  const transitionList = (await test("transitions.getSceneTransitionList", () =>
    sdk.transitions.getSceneTransitionList())) as
    | Awaited<ReturnType<typeof sdk.transitions.getSceneTransitionList>>
    | undefined;

  await test("transitions.getCurrentSceneTransition", () => sdk.transitions.getCurrentSceneTransition());
  await test("transitions.getCurrentSceneTransitionCursor", () => sdk.transitions.getCurrentSceneTransitionCursor());

  // ====================================================
  // filters 模块
  // ====================================================
  console.log("\n── filters ──");

  await test("filters.getSourceFilterKindList", () => sdk.filters.getSourceFilterKindList());

  if (inputName) {
    await test(`filters.getSourceFilterList(${inputName})`, () =>
      sdk.filters.getSourceFilterList({ sourceName: inputName }));
  } else {
    skip("filters.getSourceFilterList", "没有可用的 input");
  }

  // ====================================================
  // scene-items 模块
  // ====================================================
  console.log("\n── scene-items ──");

  if (programScene) {
    const sceneName = programScene.currentProgramSceneName;
    const sceneItemsRes = (await test(`sceneItems.getSceneItemList(${sceneName})`, () =>
      sdk.sceneItems.getSceneItemList({ sceneName }))) as
      | Awaited<ReturnType<typeof sdk.sceneItems.getSceneItemList>>
      | undefined;

    const firstItem = sceneItemsRes?.sceneItems?.[0] as Record<string, unknown> | undefined;
    const sceneItemId = firstItem?.sceneItemId as number | undefined;
    if (sceneItemId !== undefined) {
      await test(`sceneItems.getSceneItemTransform(item ${sceneItemId})`, () =>
        sdk.sceneItems.getSceneItemTransform({ sceneName, sceneItemId }));
      await test(`sceneItems.getSceneItemEnabled(item ${sceneItemId})`, () =>
        sdk.sceneItems.getSceneItemEnabled({ sceneName, sceneItemId }));
      await test(`sceneItems.getSceneItemLocked(item ${sceneItemId})`, () =>
        sdk.sceneItems.getSceneItemLocked({ sceneName, sceneItemId }));
      await test(`sceneItems.getSceneItemIndex(item ${sceneItemId})`, () =>
        sdk.sceneItems.getSceneItemIndex({ sceneName, sceneItemId }));
      await test(`sceneItems.getSceneItemBlendMode(item ${sceneItemId})`, () =>
        sdk.sceneItems.getSceneItemBlendMode({ sceneName, sceneItemId }));
    } else {
      skip("sceneItems.getSceneItemTransform", "当前 Scene 没有条目");
    }
  } else {
    skip("sceneItems.getSceneItemList", "获取 Program Scene 失败");
  }

  // ====================================================
  // outputs 模块
  // ====================================================
  console.log("\n── outputs ──");

  await test("outputs.getVirtualCamStatus", () => sdk.outputs.getVirtualCamStatus());
  // getReplayBufferStatus 仅在 OBS 已配置重播缓冲区时可用，否则 OBS 返回错误，这是预期行为
  try {
    const rbs = await sdk.outputs.getReplayBufferStatus();
    pass("outputs.getReplayBufferStatus", JSON.stringify(rbs));
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    skip("outputs.getReplayBufferStatus", `OBS 未启用重播缓冲区: ${msg}`);
  }
  const outputList = (await test("outputs.getOutputList", () => sdk.outputs.getOutputList())) as
    | Awaited<ReturnType<typeof sdk.outputs.getOutputList>>
    | undefined;

  const firstOutput = outputList?.outputs?.[0] as Record<string, unknown> | undefined;
  const outputName = firstOutput?.outputName as string | undefined;
  if (outputName) {
    await test(`outputs.getOutputStatus(${outputName})`, () => sdk.outputs.getOutputStatus({ outputName }));
    await test(`outputs.getOutputSettings(${outputName})`, () => sdk.outputs.getOutputSettings({ outputName }));
  } else {
    skip("outputs.getOutputStatus", "没有可用的 output");
  }

  // ====================================================
  // stream 模块
  // ====================================================
  console.log("\n── stream ──");

  await test("stream.getStreamStatus", () => sdk.stream.getStreamStatus());

  // ====================================================
  // record 模块
  // ====================================================
  console.log("\n── record ──");

  await test("record.getRecordStatus", () => sdk.record.getRecordStatus());

  // ====================================================
  // media-inputs 模块
  // ====================================================
  console.log("\n── media-inputs ──");

  // 查找 media input
  const mediaInput = inputList?.inputs?.find((i: unknown) => {
    const item = i as Record<string, unknown>;
    return typeof item.inputKind === "string" && item.inputKind.includes("ffmpeg_source");
  }) as Record<string, unknown> | undefined;

  if (mediaInput?.inputName) {
    await test(`mediaInputs.getMediaInputStatus(${mediaInput.inputName})`, () =>
      sdk.mediaInputs.getMediaInputStatus({ inputName: mediaInput.inputName as string }));
  } else {
    skip("mediaInputs.getMediaInputStatus", "没有找到 ffmpeg_source (media input)");
  }

  // ====================================================
  // ui 模块
  // ====================================================
  console.log("\n── ui ──");

  // studioModeEnabled 已在 scenes 测试中预读，再正式测一次
  const currentStudioMode = (await test("ui.getStudioModeEnabled", () => sdk.ui.getStudioModeEnabled())) as
    | { studioModeEnabled: boolean }
    | undefined;

  await test("ui.getMonitorList", () => sdk.ui.getMonitorList());

  // 开关 Studio Mode 测试（会自动恢复原值）
  if (currentStudioMode !== undefined) {
    await test("ui.setStudioModeEnabled (toggle)", () =>
      sdk.ui.setStudioModeEnabled({ studioModeEnabled: !currentStudioMode.studioModeEnabled }));
    await test("ui.setStudioModeEnabled (restore)", () =>
      sdk.ui.setStudioModeEnabled({ studioModeEnabled: currentStudioMode.studioModeEnabled }));
  }

  // ====================================================
  // 断开连接
  // ====================================================
  try {
    await sdk.disconnect();
    pass("disconnect");
  } catch (err) {
    fail("disconnect", err);
  }

  // ====================================================
  // 汇总
  // ====================================================
  const passing = results.filter((r) => r.status === "PASS").length;
  const failing = results.filter((r) => r.status === "FAIL").length;
  const skipping = results.filter((r) => r.status === "SKIP").length;

  console.log("\n══════════════════════════════════════");
  console.log(`测试结果: ${passing} 通过 / ${failing} 失败 / ${skipping} 跳过`);
  console.log("══════════════════════════════════════");

  if (failing > 0) {
    console.log("\n失败项:");
    for (const r of results.filter((r) => r.status === "FAIL")) {
      console.log(`  ❌ ${r.name}\n     ${r.detail}`);
    }
  }

  process.exit(failing > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("未捕获的错误:", err);
  process.exit(1);
});
