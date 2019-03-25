import { BasePage } from '../common/base-page';
import { HomePage } from '../page/homePage.po';
import { browser } from 'protractor';
import { AccountPage } from '../page/accountPage.po';
import { Constants } from '../common/constant';

const homePage = new HomePage();
const accountPage = new AccountPage();

const FIRST_NAME = 'Sang';
const LAST_NAME = 'Mai';
const COMPANY = 'MTB';
const EMAIL = 'qa' + BasePage.getUniqueId(5) + '@gmail.com';

describe('Account page test', () => {
    beforeAll(async () => {
        await homePage.goToHomePage();
    });

    afterAll(async () => {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });


    it('Account Page - Verify Sign up succesfully', async () => {
        console.log('Step 1. Click Sign up button');
        await accountPage.clickSignUpTab();

        console.log('Step 2. Sign up with correct credentials');
        await accountPage.register(EMAIL, Constants.PASSWORD);

        console.log('VP 1. Verify that Welcome header is displayed');
        expect(await homePage.isWelcomeHeaderDisplayed());

        console.log('Step 3. Logout');
        await homePage.signOutAccountWithoutAvatar();
    });

    it('Account Page - Verify Sign in succesfully', async () => {
        console.log('Pre-condition. Click Not my account button');
        await homePage.goToHomePage();
        await accountPage.clickNotYourAccountButton();

        console.log('Step 1. Login with correct credentials');
        await accountPage.login(EMAIL, Constants.PASSWORD);

        console.log('VP 1. Verify that Welcome header is displayed');
        expect(await homePage.isWelcomeHeaderDisplayed());
    });

    it('Account Page - Verify Create Artist successfully', async () => {

        console.log('Step 1. Login with correct credentials');
        console.log('Step 2. Click Create Artist button');
        await homePage.clickCreateArtistButton();

        console.log('Step 3. Input valid Artist info');
        await homePage.inputValidArtistInfo('Sang Mai', 'GBP - British Pound', 'Rock', 'Ballwin');

        console.log('Step 4. Click Start free trial button');
        await homePage.clickStartTrialButton();

        console.log('VP 1. Verify that Free trial plan is displayed');
        expect(await homePage.isFreeTrialPlanActivated());
    });
});
