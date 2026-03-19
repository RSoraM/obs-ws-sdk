# obs-ws-sdk

A high-level TypeScript SDK for [OBS WebSocket](https://github.com/obsproject/obs-websocket), built on top of [`obs-websocket-js`](https://github.com/obs-websocket-community-projects/obs-websocket-js) with [`zod`](https://zod.dev) runtime validation.

## Features

- **Full Type Safety** — Precise TypeScript types for all requests and responses
- **Semantic API** — Namespace-style method calls instead of raw string-based requests
- **Runtime Validation** — Zod schemas validate both request parameters and responses
- **IDE Support** — Complete IntelliSense and auto-completion

## Install

```bash
pnpm add obs-ws-sdk
```

## Usage

```ts
import { OBSDK } from 'obs-ws-sdk'

const sdk = new OBSDK()
await sdk.connect('ws://localhost:4455', 'your-password')

// Namespace-style API with full type safety
const version = await sdk.general.getVersion()
console.log(version.obsVersion)

const scenes = await sdk.scenes.getSceneList()
console.log(scenes.scenes)

await sdk.scenes.setCurrentProgramScene({ sceneName: 'Scene 1' })

// Event handling (transparent passthrough from obs-websocket-js)
sdk.on('CurrentProgramSceneChanged', (event) => {
  console.log('Scene changed to:', event.sceneName)
})

await sdk.disconnect()
```

## Modules

| Module | Description |
|--------|-------------|
| `sdk.general` | Version info, stats, hotkeys, custom events |
| `sdk.config` | Scene collections, profiles, video/stream settings |
| `sdk.sources` | Source active state, screenshots |
| `sdk.scenes` | Scene list, program/preview scene, create/remove |
| `sdk.inputs` | Input management, settings, audio controls |
| `sdk.transitions` | Transition kinds, current transition, T-Bar |
| `sdk.filters` | Filter management, settings, enable state |
| `sdk.sceneItems` | Scene item list, transform, enable/lock state |
| `sdk.outputs` | Virtual cam, replay buffer, output management |
| `sdk.stream` | Stream status, start/stop/toggle |
| `sdk.record` | Record status, start/stop/pause/resume |
| `sdk.mediaInputs` | Media input status, cursor, playback actions |
| `sdk.ui` | Studio mode, dialogs, projectors |

## License

[MIT](./LICENSE)
