import { BasePage } from '../common/base-page';
import { HomePage } from '../page/homePage.po';
import { SubscriptionPage } from '../page/subscriptionPage.po';
import { browser } from 'protractor';
import { AccountPage } from '../page/accountPage.po';
import { Constants } from '../common/constant';

const homePage = new HomePage();
const accountPage = new AccountPage();
const subscriptionPage = new SubscriptionPage();

const EMAIL_FIRST = 'qa' + BasePage.getUniqueId(5) + '@gmail.com';
const EMAIL_SECOND = 'qanew' + BasePage.getUniqueId(5) + '@gmail.com';
const CREDIT_CARD_US = '4242424242424242';
const CREDIT_CARD_AU = '4000000360000006';
const EXP_DATE = '09/23';
const CVC = '123';
const ZIPCODE = '90001';
const DISCOUNT_CODE_100_PERCENT = 'QZbCUt49';
const DISCOUNT_CODE_90_PERCENT = 'R34CaT7r';

describe('Account page test', () => {
    beforeAll(async () => {
        await homePage.goToHomePage();
        console.log('Prep. 1. Click Sign up button');
        await accountPage.clickSignUpTab();

        console.log('Prep. 2. Sign up with correct credentials');
        await accountPage.register(EMAIL_FIRST, Constants.PASSWORD);

        console.log('Prep. 3. Click Create Artist button');
        await homePage.clickCreateArtistButton();

        console.log('Prep. 4. Input valid Artist info');
        await homePage.inputValidArtistInfo('Sang Mai', 'GBP - British Pound', 'Rock', 'Ballwin');

        console.log('Prep. 5. Click Start free trial button');
        await homePage.clickStartTrialButton();

        console.log('Prep. 6. Click Artist home button');
        await subscriptionPage.clickArtistHomeButton();

        console.log('Prep. 7. Click Cancel Tutorial button');
        await subscriptionPage.clickCancelTutorialButton();
    });

    afterAll(async () => {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });


    it('SC-01 - Verify that Subscription page is displayed after button "Subscription" is clicked', async () => {
        console.log('Step 1. Click Subscription button');
        await subscriptionPage.clickSubscriptionButton();

        console.log('VP 1. Verify that Subscription page is displayed');
        expect(await subscriptionPage.isSubscriptionPageDisplayed());
    });

    it('SC-02 - Verify that user start a plan for an artist successfully', async () => {
        console.log('Step 1. Click Start Plan Now button');
        await subscriptionPage.clickStartPlanNowButton();

        console.log('Step 2. Select Annual Plan');
        await subscriptionPage.selectAnnualPlan();

        console.log('Step 3. Check Terms and conditions checkbox');
        await subscriptionPage.checkTermAndConditionCheckbox();

        console.log('Step 4. Enter Credit card credentials');
        await subscriptionPage.enterCreditCardCredentials(CREDIT_CARD_US, EXP_DATE, CVC, ZIPCODE);

        console.log('Step 5. Enter Credit card credentials');
        await subscriptionPage.clickStartPlanButton();

        console.log('VP 1. Verify that Plan started correctly');
        expect(await subscriptionPage.isPlanDisplayedCorrectly('/year'));
        expect(await subscriptionPage.isBillingInformationDisplayed());
        // TODO: re-comment if bug fixed
        // expect(await subscriptionPage.isInvoiceDisplayed());
    });

    it('SC-03 - Verify that user can add discount code for plan of artist after plan is started without discount code', async () => {
        console.log('Step 1. Click button Add (next to Discount)');
        await subscriptionPage.clickDiscountButton();

        console.log('Step 2. Input Discount code');
        await subscriptionPage.enterDiscountCode(DISCOUNT_CODE_100_PERCENT);

        console.log('Step 3. Click button "Update Discount Code"');
        await subscriptionPage.clickUpdateDiscountCodeButton();

        console.log('VP 1. Verify that Discount code added correctly');
        expect(await subscriptionPage.getCodeType()).toEqual('freeeeeeeeeee');
        expect(await subscriptionPage.getDiscountButtonName()).toEqual('update');
    });

    it('SC-04 - Verify that user can add discount code for plan of artist after plan is started with discount code', async () => {
        console.log('Step 1. Click button Update (next to Discount)');
        await subscriptionPage.clickDiscountButton();

        console.log('Step 2. Input Discount code');
        await subscriptionPage.enterDiscountCode(DISCOUNT_CODE_90_PERCENT);

        console.log('Step 3. Click button "Update Discount Code"');
        await subscriptionPage.clickUpdateDiscountCodeButton();

        console.log('VP 1. Verify that Discount code added correctly');
        expect(await subscriptionPage.getCodeType()).toEqual('some discount test');
        expect(await subscriptionPage.getDiscountButtonName()).toEqual('update');
    });

    it('SC-05 - Verify that user can update billing email for plan of artist after plan is started', async () => {
        console.log('Step 1. Click button Update (next to Billing Email)');
        await subscriptionPage.clickUpdateBillingButton();

        console.log('Step 2. Input new email');
        await subscriptionPage.enterBillingEmail(EMAIL_SECOND);

        console.log('Step 3. Click button "Update"');
        await subscriptionPage.clickUpdateEmailButton();

        console.log('VP 1. Verify that Discount code added correctly');
        expect(await subscriptionPage.getBillingEmail()).toEqual(EMAIL_SECOND);
    });

    it('SC-06 - Verify that user can change plan of artist successfully', async () => {
        console.log('Step 1. Click button "Change Plan"');
        await subscriptionPage.clickChangePlanButton();

        console.log('Step 2. Select new plan');
        await subscriptionPage.selectMonthPlan();

        console.log('Step 3. Click button "Subscribe To New Plan"');
        await subscriptionPage.clickSubscribeToNewPlanButton();

        console.log('VP 1. Verify that Discount code added correctly');
        expect(await subscriptionPage.isPlanDisplayedCorrectly('/month'));
    });

    it('SC-07 - Verify that user can change discount code from change plan form', async () => {
        console.log('Step 1. Click button "Change Plan"');
        await subscriptionPage.clickChangePlanButton();

        console.log('Step 2. Input discount code');
        await subscriptionPage.enterDiscountCode(DISCOUNT_CODE_100_PERCENT);

        console.log('Step 3. Click button "Add Discount Code"');
        await subscriptionPage.clickAddDiscountCodeButton();

        console.log('VP 1. Verify that Discount code updated correctly');
        expect(await subscriptionPage.getCodeType()).toEqual('freeeeeeeeeee');
        await subscriptionPage.waitUntilAlertDisappears();
    });

    it('SC-08 - Verify that user can cancel subscription successfully', async () => {
        console.log('Step 1. Click button "Cancel Subscription"');
        await subscriptionPage.clickCancelPlanButton();

        console.log('Step 2. Click button "OK, Cancel my subscription"');
        await subscriptionPage.confirmCancelSubscription();

        console.log('VP 1. Verify Cancel subscription successfully');
        // TODO: re-comment if bug fixed
        // expect(await subscriptionPage.getAlertMessage()).toEqual('Subscription Cancelled');
        expect(await homePage.isArtistHomePageDisplayed());
    });

    it('SC-09 - Verify that user can re-subscribe successfully', async () => {
        console.log('Step 1. Click Subscription button');
        await subscriptionPage.clickSubscriptionButton();

        console.log('Step 2. Click button "Re-subscribe"');
        await subscriptionPage.clickResubscribeButton();

        console.log('Step 3. Select a plan');
        await subscriptionPage.selectAnnualPlan();

        console.log('Step 4. Click button "Subscribe To New Plan"');
        await subscriptionPage.clickSubscribeToNewPlanButton();

        console.log('VP 1. Verify that Plan started correctly');
        expect(await subscriptionPage.isPlanDisplayedCorrectly('/year'));
        expect(await subscriptionPage.isBillingInformationDisplayed());
        expect(await subscriptionPage.isInvoiceDisplayed());
        await subscriptionPage.waitUntilAlertDisappears();
    });

    it('SC-10 - Verify that user can update billing card information successfully', async () => {
        console.log('Step 1. Click button "Update Card"');
        await subscriptionPage.clickUpdateCardButton();

        console.log('Step 2. Input card information');
        await subscriptionPage.enterCreditCardCredentials(CREDIT_CARD_AU, EXP_DATE, CVC);

        console.log('Step 3. Click button "Add Card"');
        await subscriptionPage.clickAddCardButton();

        console.log('VP 1. Verify that Plan started correctly');
        expect(await subscriptionPage.getAlertMessage()).toEqual('Credit Card Updated');
        expect(await subscriptionPage.isCreditCardDisplayedCorrectly(CREDIT_CARD_AU));
    });

    it('SC-11 - Verify that user can download invoice successfully', async () => {
        console.log('Step 1. Click button "Download"');
        await subscriptionPage.clickDownloadInvoiceButton();

        console.log('VP 1. Verify that File is downloaded correctly');
        expect(await subscriptionPage.isInvoiceDownloadedCorrectly());
    });
});
