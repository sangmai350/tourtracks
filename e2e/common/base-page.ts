import * as moment from 'moment';
import { format } from 'util';
import {
  browser,
  by,
  element,
  // ElementArrayFinder,
  // ElementFinder,
  ProtractorExpectedConditions
} from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { Constants } from './constant';
// import { BasePageUI } from '../ui/base-page.ui';
import { BaseElement } from './base-element';

const condition: ProtractorExpectedConditions = protractor.ExpectedConditions;
const timeout = Constants.TIMEOUT;

export class BasePage extends BaseElement {

  static getUniqueId(characters: number) {
    return '_' + Math.random().toString(36).substr(2, characters);
  }
  async goToUrl(url: string) {
    await browser.get(url);
    await this.sleep(5);
  }

  async getCurrentUrl() {
    return await browser.getCurrentUrl();
  }

  async waitElementReady(locator: string) {
    const _element = await this.findElement(locator);
    let driverWaitIterations = 0;
    let lastWebdriverError: any;
    return await browser.driver
      .wait(async () => {
        driverWaitIterations++;
        return await _element.isPresent().then(async present => {
          if (present) {
            return await _element.isDisplayed().then(async visible => {
              lastWebdriverError = 'visible:' + visible;
              return await visible;
            });
          } else {
            lastWebdriverError = 'present:' + present;
            return false;
          }
        });
      }, timeout)
      .then(waitResult => {
        return waitResult;
      });
  }
  async type(locator: string, value: string, param?: string) {
    try {
      const _element = param
        ? this.findElement(locator, param)
        : this.findElement(locator);
      await this.waitElementReady(locator);
      await _element.clear();
      await this.sleep(0.5);
      await _element.sendKeys(value);
      await this.sleep(0.5);
    } catch (er) {
      console.error('There is error: ' + er);
    }
  }

  async typeByExecuteJS(locator: string, value: string, param: string) {
    try {
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      return await browser.executeScript('arguments[0].value=\'' + value + '\';', el);
    } catch (er) {
      console.error('There is error: ' + er);
    }
  }

  async click(locator: string, param?: string) {
    try {
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      await this.sleep(0.5);
      await el.click();
    } catch (er) {
      console.error('There is error: ' + er);
    }
  }

  async selectCombobox(locator: string, value: string) {
    const valueEl = 'cssText=mat-option containsText=' + value;
    await this.waitForElementVisible(locator);
    await this.click(locator);
    await this.waitForElementVisible(valueEl);
    await this.click(valueEl);
  }

  async isElementDisplayed(locator: string, param?: string) {
    try {
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      return el.isDisplayed();
    } catch (e) {
      return false;
    }
  }

  async isCheckboxSelected(locator: string) {
    try {
      const el = this.findElement(locator);
      return await el.isSelected();
    } catch (e) {
      return false;
    }
  }

  async isElementPresent(locator: string) {
    try {
      const el = this.findElement(locator);
      return await browser.isElementPresent(el);
    } catch (e) {
      console.error('Control is not presented.', e);
    }
  }

  async isElementSelected(locator: string) {
    try {
      const el = this.findElement(locator);
      return await el.isSelected();
    } catch (e) {
      return false;
    }
  }

  async isElementEnabled(locator: string) {
    try {
      const el = this.findElement(locator);
      return await el.isEnabled();
    } catch (e) {
      return false;
    }
  }
  async getTextElement(locator: string, param?: string): Promise<string> {
    try {
      await this.sleep(1);
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      return await el.getText();
    } catch (er) {
      console.error('There is error: ' + er);
    }
  }

  async getAttributeElement(locator: string, attribute: string) {
    try {
      const el = this.findElement(locator);
      return await el.getAttribute(attribute);
    } catch (er) {
      console.error('There is error: ' + er);
    }
  }

  async waitForElementInvisibility(locator: string) {
    try {
      const el = this.findElement(locator);
      await browser.wait(
        condition.invisibilityOf(el),
        timeout,
        `Control at: ${locator} can not be invisible`
      );
    } catch (e) { }
  }

  async waitForElementVisible(locator: string, param?: string, timewait?: number) {
    const time = timewait ? timewait : timeout;
    try {
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      await browser.wait(condition.visibilityOf(el), time);
    } catch (e) { }
  }

  async waitForPageLoad(pageUrl: string) {
    try {
      await browser.wait(condition.urlContains(pageUrl));
    } catch (e) { }
  }

  async waitForLoading() {
    const loading = 'css=.spinner';
    await this.waitForElementInvisibility(loading);
  }

  async waitForControlPresence(locator: string, timeWait: number) {
    try {
      const el = this.findElement(locator);
      await browser.wait(condition.presenceOf(el), timeWait);
    } catch (e) { }
  }

  async getDay(dateTime: string) {
    return await moment(dateTime, 'MM-DD-YYYY')
      .date()
      .toString();
  }

  async getMonth(dateTime: string) {
    return await moment(dateTime, 'MM-DD-YYYY')
      .month()
      .toString();
  }

  async getMonthInString(dateTime: string) {
    return await moment(dateTime, 'MM-DD-YYYY')
      .format('MMM')
      .toString();
  }

  async getYear(dateTime: string) {
    return await moment(dateTime, 'MM-DD-YYYY')
      .year()
      .toString();
  }

  // async sleep(time: number) {
  //   await browser.sleep(time * 1000);
  // }

  async convertDate(date: string) {
    const dateObj = new Date(date);
    const momentObj = moment(dateObj);
    return momentObj.format('MM/DD/YYYY');
  }

  async convertDateToMonthInStringFormat(date: string) {
    const dateObj = new Date(date);
    const momentObj = moment(dateObj);
    return momentObj.format('MMM D, YYYY').toUpperCase();
  }

  async convertTime(time: string) {
    let hour = parseInt(time.split(':')[0], 10);
    const min = parseInt(time.split(':')[1], 10);
    let minute = min.toString();
    if (min === 0) {
      minute = '0' + min;
    }
    if (hour > 12) {
      hour = hour - 12;
      return '' + hour + ':' + minute + ' PM';
    }
    return '' + hour + ':' + minute + ' AM';
  }

  /**
   * TODO Need update
   * @param id
   */
  async switchToIframe(id: number) {
    await this.sleep(1);
    await browser.switchTo().frame(id);
  }

  async switchToDefaultContent() {
    await this.sleep(1);
    await browser.switchTo().defaultContent();
  }

  async selectDropdownByCssTextJS(locator: string, item: string, timeOut?: number, param?: string) {
    try {
      await this.waitForElementVisible(locator);
      await this.clickByExecuteJS(locator);
      await this.sleep(2);
      const dropdownValueLocator = ' select > option';
      if (item != null || item !== undefined) {
        for (const itemValue of item.split(';')) {
          await element(by.cssContainingText(dropdownValueLocator, itemValue)).click();
          await this.sleep(2);
        }
        await this.pressEscKey();
      }
    } catch (e) { }
  }

  async selectDropdownByCssText(locator: string, item: string, timeOut?: number, param?: string) {
    try {
      const _dropdownLocator = param ? this.findElement(locator, param) : this.findElement(locator);
      await _dropdownLocator.click();
      await this.sleep(2);
      const dropdownValueLocator = 'select option';
      if (item != null || item !== undefined) {
        for (const itemValue of item.split(';')) {
          await element(by.cssContainingText(dropdownValueLocator, itemValue)).click();
          await this.sleep(2);
        }
        await this.pressEscKey();
      }
    } catch (e) { }
  }

  async selectValueFromDropDown(dropdownName: string, item: string) {
    try {
      const _dropdownXpath = format('xpath=//div[@ngbdropdown]/button[contains(.,"%s")]', dropdownName);
      this.waitForElementVisible(_dropdownXpath);
      const dropdownLocator = this.findElement(_dropdownXpath);
      await dropdownLocator.click();
      await this.sleep(2);
      const dropdownValueLocator = '.dropdown-item';
      if (item != null || item !== undefined) {
        await element(by.cssContainingText(dropdownValueLocator, item)).click();
        await this.sleep(2);
      }
    } catch (e) { }
  }

  async pressEscKey() {
    try {
      browser
        .actions()
        .sendKeys(protractor.Key.ESCAPE)
        .perform();
    } catch (e) {
      return false;
    }
  }

  async selectDropdownByText(
    locator: string,
    item: string,
    timeOut?: number,
    param?: string
  ) {
    try {
      let desiredOption;
      const _dropdownLocator = param
        ? this.findElement(locator, param)
        : this.findElement(locator);
      await _dropdownLocator.click();
      await this.sleep(1);
      const dropdownValueLocator = 'select option';
      await element.all(by.css(dropdownValueLocator)).each(async elem => {
        await elem.getText().then(text => {
          console.log(text + ' - ' + item);
          if (text === item) {
            console.log('Found it!');
            desiredOption = elem;
            return true;
          }
        });
      });
      if (desiredOption) {
        console.log('Click it!');
        desiredOption.click();
      }
      if (timeOut !== null) {
        this.sleep(timeOut);
      }
    } catch (e) { }
  }
  async checkToCheckbox(locator: string, checked: boolean, param?: string) {
    try {
      const _element = param
        ? this.findElement(locator, param)
        : this.findElement(locator);
      const state = await this.isElementSelected(locator);
      if (state !== checked) {
        return _element.click();
      }
    } catch (e) {
      console.error('Can not check to checkbox. ' + e);
    }
  }
  async clickByExecuteJS(locator: string, param?: string) {
    try {
      const _element = param
        ? this.findElement(locator, param)
        : this.findElement(locator);
      return await browser.executeScript('arguments[0].click();', _element);
    } catch (er) {
      console.error('There is error: ' + er);
    }
  }

  async scrollToBottom() {
    await browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');
  }

  sleep(s: number) {
    return browser.driver.sleep(s * 1000);
  }

  async refreshPage() {
    await browser.refresh();
  }

  async moveMouseToElement(locator: string) {
    try {
      const el = this.findElement(locator);
      await browser
        .actions()
        .mouseMove(el)
        .perform();
      browser.sleep(5000);
    } catch (e) {
      return false;
    }
  }

  async pressEnterKey() {
    try {
      browser
        .actions()
        .sendKeys(protractor.Key.ENTER)
        .perform();
    } catch (e) {
      return false;
    }
  }

  async moveMouseToDynamicElement(locator: string, value: string) {
    try {
      const el = this.findElement(locator, value);
      await browser
        .actions()
        .mouseMove(el)
        .perform();
      browser.sleep(5000);
    } catch (e) {
      return false;
    }
  }

  async getLatestDownloadedFile() {
    if ((await browser.getCapabilities()).get('browserName') === 'chrome') {
      await browser.driver.get('chrome://downloads/');
      const items =
        await browser.executeScript('return downloads.Manager.get().items_') as any[];
      return items[0].file_name;
    }
  }

  removeAllFilesInFolder(folderPath: string) {
    const fs = require('fs');
    const path = require('path');

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        throw err;
      }

      for (const file of files) {
        fs.unlink(path.join(folderPath, file), err => {
          if (err) {
            throw err;
          }
        });
      }
    });
  }

  checkIfFileIsDownloaded(fileName: string) {
    const filepath = `/tmp/downloads/${fileName}`;
    const fs = require('fs');
    browser.driver.wait(function() {
        return fs.existsSync(filepath);
    }, 30000);
  }
}
