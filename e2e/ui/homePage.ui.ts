export class HomePageUI {
  static readonly WELCOME_HEADER = 'xpath=//h1[text()="Welcome to TourTracks"]';
  static readonly CREATE_ARTIST_BTN = 'xpath=//div[@class="panel-body undefined"]//button[span[text()="Create Artist"]]';
  static readonly ARTIST_NAME_IPT = 'css=#name';
  static readonly CURRENCY_IPT = 'xpath=//div[label[text()="Currency"]]//input';
  static readonly GENRE_IPT = 'xpath=//div[label[text()="Genre"]]//input';
  static readonly LOCATION_IPT = 'xpath=//div[label[text()="Home Town/Country (select from list)"]]//input';
  static readonly START_FREE_TRIAL_BTN = 'xpath=//button[span[text()="Start Trial"]]';
  static readonly FREE_TRIAL_HEADER = 'xpath=//h1[contains(.,"Free Trial")]';
  static readonly ARTIST_HOME_HEADER = 'xpath=//h1[contains(.,"Artist Home")]';
  static readonly DYNAMIC_LOCATION_SUGGESTION = 'xpath=//div[@class="pac-item"]//span[text()="%s"]';
}
