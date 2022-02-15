$.verbose = false

import { setTimeout } from 'timers/promises'
import isSafe from 'safe-regex'

await $`docker run -p "8082:80" -d nginx`
await setTimeout(500)
const req = await $`curl --silent localhost:8082`
console.log(`req\n`, req.stdout)

const containers = await $`docker ps`

const expression = /(?<containerId>\w+)\W+(?=nginx)/
if (!isSafe(expression)) {
  throw new Error('unsafe regex')
}

const { groups: { containerId } } = containers.toString().match(expression)
console.log(containerId)

const logs = await $`docker logs ${containerId}`
console.log('logs\n', logs)

const rm = await $`docker rm -f ${containerId}`
console.log('rm -f\n', rm)
