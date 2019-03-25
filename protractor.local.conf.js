'use strict';
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
exports.config = {
  seleniumAddress: 'http://localhost:9999/wd/hub',
  directConnect: true,
  allScriptsTimeout: 360000,
  // seleniumServerJar :'./node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.6.0.jar',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['incognito', 'disable-extensions', 'ignore-certificate-errors', 'ignore-ssl-errors', 'start-maximized'],
    },
  },
  // {
  //   browserName: 'firefox',
  // }
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 500000,
    print: function () {},
  },
  SELENIUM_PROMISE_MANAGER: false,
  specs: [
    './e2e/specs/smoketests.e2e-spec.ts',
  ],
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      },
      summary: {
        displayDuration: false
      }
    }));
    require('ts-node')
      .register({
        compilerOptions: {
          module: 'commonjs'
        },
        disableWarnings: true,
        fast: true
      });
    browser.ignoreSynchronization = true;
  },
};