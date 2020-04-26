#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const commandModuleMap = new Map();

commandModuleMap.set("redis-channel", "channels/redis-channel");
commandModuleMap.set("simple-channel", "channels/simple-channel");
commandModuleMap.set("rest-module", "modules/rest-module");
commandModuleMap.set("keyvalue-module", "modules/keyvalue-module")
let commandName = process.argv[2];
let args = process.argv.splice(2, (process.argv.length - 3));

for (let idx = 0; idx < commandModuleMap.keys; idx++) {
    const key = commandModuleMap.keys[idx];
    console.log("Running " + commandName + " for " + key);
    //let cwdpath=path.join()
    spawn(commandName, args, { stdio: 'inherit', shell: true, cwd: commandModuleMap.get(key) });
    await waitForProcessExit();
}

async function waitForProcessExit(child_process)
{
    child_process.on
}