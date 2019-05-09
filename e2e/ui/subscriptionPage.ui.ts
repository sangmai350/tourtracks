export class SubscriptionPageUI {
  static readonly ANUALLY_PLAN_CBX = 'xpath=//div[@class="plan-tile"]/label[span[text()="annually"]]//span[@class="control__indicator"]';
  static readonly MONTHLY_PLAN_CBX = 'xpath=//div[@class="plan-tile"]/label[span[text()="monthly"]]//span[@class="control__indicator"]';
  static readonly TERM_AND_CONDITION_CBX = 'xpath=//label[a[text()="Terms and Conditions"]]//span[@class="control__indicator"]';
  static readonly STRIPE_IPT_CARD_NUMBER = 'xpath=//input[@name="cardnumber"]';
  static readonly STRIPE_IPT_EXP_DATE = 'xpath=//input[@name="exp-date"]';
  static readonly STRIPE_IPT_CVC_NUMBER = 'xpath=//input[@name="cvc"]';
  static readonly STRIPE_IPT_CVC_ZIPCODE = 'xpath=//input[@name="postal"]';
  static readonly DISCOUNT_CODE_IPT = 'css=#couponcode';
  static readonly START_PLAN_BTN = 'xpath=//button[span[text()="Start Plan"]]';
  static readonly ALERT_LBL = 'xpath=//div[@role="alert"]';
  static readonly SUBSCRIBE_TO_NEW_PLAN = 'xpath=//button[span[text()="Subscribe To New Plan"]]';
  static readonly CANCEL_SUBSCRIPTION_BTN = 'xpath=//button[span[text()="OK, CANCEL MY SUBSCRIPTION"]]';
  static readonly AMOUT_TXT = 'xpath=//tr[td[text()="Amount"]]/td[2]';
  static readonly DISCOUNT_BTN = 'xpath=//tr/td[text()="Discount ("]/a';
  static readonly DISCOUNT_CODE_TYPE = 'xpath=//tr[td[text()="Discount ("]]/td[2]';
  static readonly BILLING_EMAIL_BTN = 'xpath=//tr/td[text()="Billing Email ("]/a';
  static readonly BILLING_EMAIL_TEXT = 'xpath=//tr[td[text()="Billing Email ("]]/td[2]';
  static readonly CARD_LATEST_FOUR_NUMBERS = '//tr[td[text()="Card"]]/td[text()="%s"]';
  static readonly UPDATE_DISCOUNT_CODE_BTN = 'xpath=//button[span[text()="Update Discount Code"]]';
  static readonly ADD_DISCOUNT_CODE_BTN = 'xpath=//button[span[text()="Add Discount Code"]]';
  static readonly ADD_CARD_BTN = 'xpath=//button[span[text()="Add Card"]]';
  static readonly BILLING_EMAIL_IPT = 'css=#changeEmail';
  static readonly UPDATE_EMAIL_BTN = 'xpath=//button[span[text()="Update"]]';
  static readonly LATEST_DOWNLOAD_LINK = 'xpath=//tr/td/a[text()="Download"]';
  static readonly LATEST_FILENAME = 'xpath=//tr[td/a[text()="Download"]]/td';
}
