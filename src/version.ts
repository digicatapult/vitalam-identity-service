import { readFile } from 'node:fs/promises'

const packageBuffer = await readFile(new URL('../package.json', import.meta.url))
const packageJson = await JSON.parse(packageBuffer.toString())

export const version = packageJson.version
