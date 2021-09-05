#!/usr/bin/env node

// connect device and make sure enabled the adb and wifi 
// adb also before execute the app

const { exec } = require("child_process");
const { setTimeout } = require("timers");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

exec("adb disconnect", (error, data) => console.log(data))
setTimeout(() => {
    exec("adb shell ip route", (error, stdout, stderr) => {
        if (error) {
            console.log(`insert usb`);
            return;
        }
        if (stdout) {
            try {
                const deviceIp = stdout.split('src ')[1]
                console.log(`Connecting:`, deviceIp);
                exec("adb tcpip 5555", (err, data) => {
                    console.log(data)
                    exec(`adb connect  ${deviceIp}:5555`, (error, data) => {
                        if (data) {
                            console.log(data)
                            console.log('Connecting .... ')
                            exec("scrcpy")
                        }
                    })
                })
            } catch (error) {
                console.log('Error try:')
                console.log('1- unplug the cable')
                console.log('1- insert the cable again')
            }
        }
    });
}, 2 * 1000)


