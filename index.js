#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const commandModuleMap = new Map();

commandModuleMap.set("redis-channel", "channels/redis-channel");
commandModuleMap.set("simple-channel", "channels/simple-channel");

let componentName = process.argv[2];
if (componentName !== undefined) {
    componentName = componentName.toLowerCase();
    if (commandModuleMap.has(componentName)) {
        const commandModulePath = path.join(process.cwd(),"/node_modules/m.a.c-friends/" ,commandModuleMap.get(componentName));
        console.log(commandModulePath);
        spawn("npm", ["install", commandModulePath], { stdio: 'inherit', shell: true });
    }
    else {
        console.error("Invalid command " + componentName);
    }
}
else {
    console.error("Missing command");
}