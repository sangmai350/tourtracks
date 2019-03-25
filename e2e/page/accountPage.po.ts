import { AccountPageUI } from '../ui/accountPage.ui';
import { AbtractPage } from './abtractPage.po';

export class AccountPage extends AbtractPage {

    async goToLoginPage() {
        await this.goToUrl('https://tourtracksproduction-staging.azurewebsites.net/');
    }

    async clickSignUpTab() {
        await this.waitForElementVisible(AccountPageUI.SIGN_UP_TAB);
        await this.click(AccountPageUI.SIGN_UP_TAB);
    }

    async clickSignInTab() {
        await this.waitForElementVisible(AccountPageUI.LOG_IN_TAB);
        await this.click(AccountPageUI.LOG_IN_TAB);
    }

    async clickNotYourAccountButton() {
        await this.waitForElementVisible(AccountPageUI.NOT_YOUR_ACCOUNT_BTN);
        await this.click(AccountPageUI.NOT_YOUR_ACCOUNT_BTN);
    }

    async login(email: string, password: string) {
        await this.waitForElementVisible(AccountPageUI.EMAIL_IPT);
        await this.type(AccountPageUI.EMAIL_IPT, email);
        await this.type(AccountPageUI.PWD_IPT, password);
        await this.click(AccountPageUI.SUBMIT_BTN);
    }

    async register(email: string, password: string) {
        await this.waitForElementVisible(AccountPageUI.EMAIL_IPT);
        await this.type(AccountPageUI.EMAIL_IPT, email);
        await this.type(AccountPageUI.PWD_IPT, password);
        await this.click(AccountPageUI.SUBMIT_BTN);
    }

    constructor() {
        super();
    }
}
