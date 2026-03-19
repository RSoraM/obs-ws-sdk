import OBSWebSocket from "obs-websocket-js";
import { ConfigModule } from "./modules/config";
import { FiltersModule } from "./modules/filters";
import { GeneralModule } from "./modules/general";
import { InputsModule } from "./modules/inputs";
import { MediaInputsModule } from "./modules/media-inputs";
import { OutputsModule } from "./modules/outputs";
import { RecordModule } from "./modules/record";
import { SceneItemsModule } from "./modules/scene-items";
import { ScenesModule } from "./modules/scenes";
import { SourcesModule } from "./modules/sources";
import { StreamModule } from "./modules/stream";
import { TransitionsModule } from "./modules/transitions";
import { UiModule } from "./modules/ui";

export class OBSDK {
  private obs: OBSWebSocket;

  readonly general: GeneralModule;
  readonly config: ConfigModule;
  readonly sources: SourcesModule;
  readonly scenes: ScenesModule;
  readonly inputs: InputsModule;
  readonly transitions: TransitionsModule;
  readonly filters: FiltersModule;
  readonly sceneItems: SceneItemsModule;
  readonly outputs: OutputsModule;
  readonly stream: StreamModule;
  readonly record: RecordModule;
  readonly mediaInputs: MediaInputsModule;
  readonly ui: UiModule;

  constructor() {
    this.obs = new OBSWebSocket();

    this.general = new GeneralModule(this.obs);
    this.config = new ConfigModule(this.obs);
    this.sources = new SourcesModule(this.obs);
    this.scenes = new ScenesModule(this.obs);
    this.inputs = new InputsModule(this.obs);
    this.transitions = new TransitionsModule(this.obs);
    this.filters = new FiltersModule(this.obs);
    this.sceneItems = new SceneItemsModule(this.obs);
    this.outputs = new OutputsModule(this.obs);
    this.stream = new StreamModule(this.obs);
    this.record = new RecordModule(this.obs);
    this.mediaInputs = new MediaInputsModule(this.obs);
    this.ui = new UiModule(this.obs);
  }

  async connect(url?: string, password?: string, identificationParams?: object): Promise<void> {
    await this.obs.connect(url, password, identificationParams);
  }

  async disconnect(): Promise<void> {
    await this.obs.disconnect();
  }

  callBatch: OBSWebSocket["callBatch"] = (...args: Parameters<OBSWebSocket["callBatch"]>) => {
    return this.obs.callBatch(...args);
  };

  on: OBSWebSocket["on"] = (...args: Parameters<OBSWebSocket["on"]>) => {
    return this.obs.on(...args);
  };

  once: OBSWebSocket["once"] = (...args: Parameters<OBSWebSocket["once"]>) => {
    return this.obs.once(...args);
  };

  off: OBSWebSocket["off"] = (...args: Parameters<OBSWebSocket["off"]>) => {
    return this.obs.off(...args);
  };

  addListener: OBSWebSocket["addListener"] = (...args: Parameters<OBSWebSocket["addListener"]>) => {
    return this.obs.addListener(...args);
  };

  removeListener: OBSWebSocket["removeListener"] = (...args: Parameters<OBSWebSocket["removeListener"]>) => {
    return this.obs.removeListener(...args);
  };

  removeAllListeners: OBSWebSocket["removeAllListeners"] = (
    ...args: Parameters<OBSWebSocket["removeAllListeners"]>
  ) => {
    return this.obs.removeAllListeners(...args);
  };
}
