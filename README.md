# Screensaver API (for nodejs)

[![Version](https://img.shields.io/npm/v/@131/screensaver.svg)](https://www.npmjs.com/package/@131/screensaver)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

[![Coverage Status](https://coveralls.io/repos/github/131/node-screensaver/badge.svg?branch=master)](https://coveralls.io/github/131/node-screensaver?branch=master)

[![Build Status](https://github.com/131/ubk/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/131/ubk/actions/workflows/test.yml)
![Available platform](https://img.shields.io/badge/platform-win32-blue.svg) ![Available platform](https://img.shields.io/badge/platform-linux-blue.svg)

# Motivation
A simple screensaver API that enable you to wait for a configured idle time. And stop over user interaction.
Detecting user interaction (mostly a system wide API call, is delegated to an external closure). See below for details


# API

```
const ScreenSaver = require('@131/screensaver');

const {getIdleTime} = os.platform() == 'linux' ? require('screensaver-trigger/idle_time_linux') : require('winapi');


const timeout = 60 * 1000; //1min

const screenSaver = new ScreenSaver(timeout, getIdleTime);

screenSaver.on('open', () => {
  console.log('screen saver start');
})

screenSaver.on('close', () => {
  console.log('screen saver close');
})


```



# Credits 
* [131](https://github.com/131)
* [idjem](https://github.com/idjem)
