import { SubscriptionPageUI } from '../ui/subscriptionPage.ui';
import { AbtractPage } from './abtractPage.po';

export class SubscriptionPage extends AbtractPage {

    async clickStartPlanNowButton() {
        await this.clickButtonByItsText('Start Plan Now');
    }

    async clickArtistHomeButton() {
        await this.clickButtonByItsText('Artist Home');
    }

    async clickCancelTutorialButton() {
        await this.clickButtonByItsText('Cancel Tutorial');
    }

    async clickSubscriptionButton() {
        await this.clickButtonByItsText('Subscription');
    }

    async isSubscriptionPageDisplayed() {
        return await this.isH1HeaderIsDisplayed('Subscription');
    }

    async selectAnnualPlan() {
        await this.waitForElementVisible(SubscriptionPageUI.ANUALLY_PLAN_CBX);
        await this.click(SubscriptionPageUI.ANUALLY_PLAN_CBX);
    }

    async selectMonthPlan() {
        await this.waitForElementVisible(SubscriptionPageUI.MONTHLY_PLAN_CBX);
        await this.click(SubscriptionPageUI.MONTHLY_PLAN_CBX);
    }

    async checkTermAndConditionCheckbox() {
        await this.waitForElementVisible(SubscriptionPageUI.TERM_AND_CONDITION_CBX);
        await this.click(SubscriptionPageUI.TERM_AND_CONDITION_CBX);
    }

    async enterCreditCardCredentials(cardNumber: string, exp_date: string, cvc_number: string, zipcode?: string) {
        await this.switchToIframe(0);
        await this.waitForElementVisible(SubscriptionPageUI.STRIPE_IPT_CARD_NUMBER);
        await this.type(SubscriptionPageUI.STRIPE_IPT_CARD_NUMBER, cardNumber);
        await this.type(SubscriptionPageUI.STRIPE_IPT_EXP_DATE, exp_date);
        await this.type(SubscriptionPageUI.STRIPE_IPT_CVC_NUMBER, cvc_number);
        if (zipcode) {
            await this.type(SubscriptionPageUI.STRIPE_IPT_CVC_ZIPCODE, zipcode);
        }
        await this.switchToDefaultContent();
    }

    async clickStartPlanButton() {
        await this.waitForElementVisible(SubscriptionPageUI.START_PLAN_BTN);
        await this.click(SubscriptionPageUI.START_PLAN_BTN);
    }

    async isPlanDisplayedCorrectly(planDuration: string) {
        await this.waitForElementVisible(SubscriptionPageUI.AMOUT_TXT);
        const amount_text = await this.getTextElement(SubscriptionPageUI.AMOUT_TXT);
        return amount_text.indexOf(planDuration) !== -1;
    }

    async isBillingInformationDisplayed() {
        return await this.isH1HeaderIsDisplayed('Billing Information');
    }

    async isInvoiceDisplayed() {
        return await this.isH1HeaderIsDisplayed('Invoices');
    }

    async clickDiscountButton() {
        await this.waitForElementVisible(SubscriptionPageUI.DISCOUNT_BTN);
        await this.click(SubscriptionPageUI.DISCOUNT_BTN);
    }

    async enterDiscountCode(code: string) {
        await this.waitForElementVisible(SubscriptionPageUI.DISCOUNT_CODE_IPT);
        await this.type(SubscriptionPageUI.DISCOUNT_CODE_IPT, code);
    }

    async clickUpdateDiscountCodeButton() {
        await this.waitForElementVisible(SubscriptionPageUI.UPDATE_DISCOUNT_CODE_BTN);
        await this.click(SubscriptionPageUI.UPDATE_DISCOUNT_CODE_BTN);
    }

    async getCodeType() {
        await this.waitForElementVisible(SubscriptionPageUI.DISCOUNT_CODE_TYPE);
        return await this.getTextElement(SubscriptionPageUI.DISCOUNT_CODE_TYPE);
    }

    async getDiscountButtonName() {
        await this.waitForElementVisible(SubscriptionPageUI.DISCOUNT_BTN);
        return await this.getTextElement(SubscriptionPageUI.DISCOUNT_BTN);
    }

    async clickUpdateBillingButton() {
        await this.waitForElementVisible(SubscriptionPageUI.BILLING_EMAIL_BTN);
        await this.click(SubscriptionPageUI.BILLING_EMAIL_BTN);
    }

    async enterBillingEmail(email: string) {
        await this.waitForElementVisible(SubscriptionPageUI.BILLING_EMAIL_IPT);
        await this.type(SubscriptionPageUI.BILLING_EMAIL_IPT, email);
    }

    async getBillingEmail() {
        await this.waitForElementVisible(SubscriptionPageUI.BILLING_EMAIL_TEXT);
        return await this.getTextElement(SubscriptionPageUI.BILLING_EMAIL_TEXT);
    }

    async clickChangePlanButton() {
        await this.clickButtonByItsText('Change Plan');
    }

    async clickUpdateEmailButton() {
        await this.waitForElementVisible(SubscriptionPageUI.UPDATE_EMAIL_BTN);
        await this.click(SubscriptionPageUI.UPDATE_EMAIL_BTN);
    }

    async clickSubscribeToNewPlanButton() {
        await this.waitForElementVisible(SubscriptionPageUI.SUBSCRIBE_TO_NEW_PLAN);
        await this.click(SubscriptionPageUI.SUBSCRIBE_TO_NEW_PLAN);
    }

    async clickAddDiscountCodeButton() {
        await this.waitForElementVisible(SubscriptionPageUI.ADD_DISCOUNT_CODE_BTN);
        await this.click(SubscriptionPageUI.ADD_DISCOUNT_CODE_BTN);
    }

    async clickCancelPlanButton() {
        await this.clickButtonByItsText('Cancel Subscription');
    }

    async confirmCancelSubscription() {
        await this.waitForElementVisible(SubscriptionPageUI.CANCEL_SUBSCRIPTION_BTN);
        await this.click(SubscriptionPageUI.CANCEL_SUBSCRIPTION_BTN);
    }

    async waitUntilAlertDisappears() {
        await this.waitForElementVisible(SubscriptionPageUI.ALERT_LBL);
        await this.waitForElementInvisibility(SubscriptionPageUI.ALERT_LBL);
    }

    async getAlertMessage() {
        await this.waitForElementVisible(SubscriptionPageUI.ALERT_LBL);
        return await this.getTextElement(SubscriptionPageUI.ALERT_LBL);
    }

    async clickResubscribeButton() {
        await this.clickButtonByItsText('Re-subscribe');
    }

    async clickUpdateCardButton() {
        await this.clickButtonByItsText('Update Card');
    }

    async clickAddCardButton() {
        await this.waitForElementVisible(SubscriptionPageUI.ADD_CARD_BTN);
        await this.click(SubscriptionPageUI.ADD_CARD_BTN);
    }

    async isCreditCardDisplayedCorrectly(cardNumber: string) {
        const last_four_numbers = cardNumber.slice(-4);
        await this.waitForElementVisible(SubscriptionPageUI.CARD_LATEST_FOUR_NUMBERS, last_four_numbers);
        return await this.isElementDisplayed(SubscriptionPageUI.CARD_LATEST_FOUR_NUMBERS, last_four_numbers);
    }

    async clickDownloadInvoiceButton() {
        this.removeAllFilesInFolder('/tmp/downloads');
        await this.waitForElementVisible(SubscriptionPageUI.LATEST_DOWNLOAD_LINK);
        await this.click(SubscriptionPageUI.LATEST_DOWNLOAD_LINK);
    }

    async isInvoiceDownloadedCorrectly() {
        await this.waitForElementVisible(SubscriptionPageUI.LATEST_FILENAME);
        const fileName = await this.getTextElement(SubscriptionPageUI.LATEST_FILENAME);
        const result = this.checkIfFileIsDownloaded(`Invoice-${fileName}.pdf`);
        this.removeAllFilesInFolder('/tmp/downloads');
        return result;
    }

    constructor() {
        super();
    }
}
