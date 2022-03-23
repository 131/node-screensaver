'use strict';

const expect  = require('expect.js');

const sleep = require('nyks/function/sleep');

const ScreenSaver = require('../');

var tick = 100;

const getIdleTime = async () => tick ;

setInterval(() => tick = tick + 50, 50)
const move = async () => tick = 0;


describe('basic screen saver', function() {
    this.timeout(10000); 

  it('should pass screensaver => move mouse => screen saver again ', async () => {
    const screenSaver = new ScreenSaver(1000, getIdleTime);
    var history = [];
    screenSaver.on('open',() => {
      history.push(1);
    });

    screenSaver.on('close',() => {
      history.push(0);
    });

    screenSaver.start();
    screenSaver.start();

    await sleep(300);
    expect(history).to.eql([1]);
    await move();
    await sleep(200);
    expect(history).to.eql([1,0]);

    await sleep(1400);
    expect(history).to.eql([1,0, 1]);
  });

  it('should pass screensaver => simuleTouch => screen saver again ', async () => {
    const screenSaver = new ScreenSaver(1000, getIdleTime);

    var history = [];
    screenSaver.on('open',() => {
      history.push(1);
    });

    screenSaver.on('close',() => {
      history.push(0);
    });


    screenSaver.start();
    await sleep(200);
    expect(history).to.eql([1]);

    screenSaver.forceActiveMode();
    await sleep(200);
    expect(history).to.eql([1, 0]);
    await sleep(1100);
    expect(history).to.eql([1, 0, 1]);
  });


  it('move mouse => reset screen Saver => screen saver again ', async () => {
    const screenSaver = new ScreenSaver(1000, getIdleTime);

    var history = [];
    screenSaver.on('open',() => {
      history.push(1);
    });

    screenSaver.on('close',() => {
      history.push(0);
    });

    screenSaver.start();
    await sleep(200);
    expect(history).to.eql([1]);
    move();
    await sleep(200);
    expect(history).to.eql([1, 0]);
    screenSaver.forceIdleMode();
    await sleep(200);
    screenSaver.forceIdleMode();
    await sleep(200);
    expect(history).to.eql([1, 0, 1]);
  });

  it('should start to false ', async () => {
    const shouldStart = false;

    const screenSaver = new ScreenSaver(1000, getIdleTime, shouldStart);

    var history = [];
    screenSaver.on('open',() => {
      history.push(1);
    });

    screenSaver.on('close',() => {
      history.push(0);
    });

    screenSaver.start();
    await sleep(300);
    expect(history).to.eql([0]);
  });

  it('shouldstart to true ', async () => {
    const shouldStart = true;

    const screenSaver = new ScreenSaver(1000, getIdleTime, shouldStart);
    var history = [];
    screenSaver.on('open',() => {
      history.push(1);
    });

    screenSaver.on('close',() => {
      history.push(0);
    });


    screenSaver.start();
    await sleep(300);
    expect(history).to.eql([1]);
  });

  it('test stop screen saver ', async () => {
    const shouldStart = true;

    const screenSaver = new ScreenSaver(1000, getIdleTime, shouldStart);

    var history = [];
    screenSaver.on('open',() => {
      history.push(1);
    });

    screenSaver.on('close',() => {
      history.push(0);
    });

    screenSaver.start();
    await sleep(300);
    expect(history).to.eql([1]);

    screenSaver.stop();
    move();
    await sleep(200);

    expect(history).to.eql([1]);

  });




});

