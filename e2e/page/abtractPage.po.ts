import { $$, browser, element, by, promise, ElementFinder, ElementArrayFinder, ProtractorExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { BaseElement } from '../common/base-element';
import { Constants } from '../common/constant';
import { BasePage } from '../common/base-page';
import { BasePageUI } from '../ui/base-page.ui';

export class AbtractPage extends BasePage {

    async goToUrl(url: string) {
        await browser.driver.manage().window().maximize();
        await browser.driver.navigate().to(url);
    }

    async signOutAccountWithoutAvatar() {
        await this.waitForElementVisible(BasePageUI.NO_IMAGE_AVATAR);
        await this.click(BasePageUI.NO_IMAGE_AVATAR);
        await this.waitForElementVisible(BasePageUI.SIGN_OUT_LINK);
        await this.click(BasePageUI.SIGN_OUT_LINK);
    }

    async clickLinkByItsText(label: string) {
        await this.waitForElementVisible(BasePageUI.DYNAMIC_LINK_BY_TEXT, label);
        await this.click(BasePageUI.DYNAMIC_LINK_BY_TEXT, label);
    }

    async clickButtonByItsText(label: string) {
        await this.waitForElementVisible(BasePageUI.DYNAMIC_BUTTON_BY_TEXT, label);
        await this.click(BasePageUI.DYNAMIC_BUTTON_BY_TEXT, label);
    }

    async isH1HeaderIsDisplayed(text: string) {
        await this.waitForElementVisible(BasePageUI.DYNAMIC_H1_HEADER, text);
        return await this.isElementDisplayed(BasePageUI.DYNAMIC_H1_HEADER, text);
    }
}
