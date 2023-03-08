import * as Funcs from './functions/index.js'
import { Client } from './types.js';

type OmitFirst<T extends any[]> = T extends [any, ...infer R] ? R : never

type F = {
   [P in keyof typeof Funcs]: (...args: OmitFirst<Parameters<typeof Funcs[P]>>) => ReturnType<typeof Funcs[P]>
}

const createSpotify = (client: Client): F => {
    const clazz = new class {}

    for (const [name, impl] of Object.entries(Funcs)) {
        Object.defineProperty(clazz, name, (impl as any).bind(null, client))
    }

    return clazz as F
}

const spotify = createSpotify('im client' as Client)

spotify.fetchSongs('321')