import type OBSWebSocket from "obs-websocket-js";
import { z } from "zod/v4";

export abstract class BaseModule {
  constructor(protected obs: OBSWebSocket) {}
}

export const jsonObjectSchema = z.record(z.string(), z.json());
