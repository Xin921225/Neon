const { Client, FlatfileVirtualMachine } = require('@flatfile/listener')
const mount = require('../typescript/index.ts')
const client = Client.create(mount.default)

client.mount(new FlatfileVirtualMachine())
module.exports = client
