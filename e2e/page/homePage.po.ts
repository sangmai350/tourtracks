import { HomePageUI } from '../ui/homePage.ui';
import { AbtractPage } from './abtractPage.po';

export class HomePage extends AbtractPage {

    async goToHomePage() {
        await this.goToUrl('https://tourtracksproduction-staging.azurewebsites.net/');
    }

    async isWelcomeHeaderDisplayed() {
        await this.waitForElementVisible(HomePageUI.WELCOME_HEADER);
        return await this.isElementDisplayed(HomePageUI.WELCOME_HEADER);
    }

    async clickCreateArtistButton() {
        await this.waitForElementVisible(HomePageUI.CREATE_ARTIST_BTN);
        await this.click(HomePageUI.CREATE_ARTIST_BTN);
    }

    async inputValidArtistInfo(name: string, currency: string, genre: string, hometown: string) {
        await this.waitForElementVisible(HomePageUI.ARTIST_NAME_IPT);
        await this.type(HomePageUI.ARTIST_NAME_IPT, name);
        await this.type(HomePageUI.CURRENCY_IPT, currency);
        await this.type(HomePageUI.GENRE_IPT, genre);
        await this.type(HomePageUI.LOCATION_IPT, hometown);
        this.sleep(2);
        await this.click(HomePageUI.DYNAMIC_LOCATION_SUGGESTION, hometown);
    }

    async clickStartTrialButton() {
        await this.waitForElementVisible(HomePageUI.START_FREE_TRIAL_BTN);
        await this.click(HomePageUI.START_FREE_TRIAL_BTN);
    }

    async isFreeTrialPlanActivated() {
        await this.waitForElementVisible(HomePageUI.FREE_TRIAL_HEADER);
        return await this.isElementDisplayed(HomePageUI.FREE_TRIAL_HEADER);
    }

    constructor() {
        super();
    }
}
