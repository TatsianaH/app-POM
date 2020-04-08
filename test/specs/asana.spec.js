import { expect } from 'chai';
import checkUrl from '../../getAction';
import faker from 'faker';

const sel = {
    header: '//h1',
    mainMenu: '//ul[@role="group"]',
    menuItem: '//ul[@role="group"]/li',
    whyAsanaDropDownMenu: '//button[@id="navigation__dropdown-toggle-why-asana"]',
    solutionsDropDownMenu: '//button[@id="navigation__dropdown-toggle-solutions"]',
    resourcesDropDownMenu:'//button[@id="navigation__dropdown-toggle-resources"]',
    pricing: '',
    whyAsanaAllUrls: '//div[@id="navigation__dropdown-why-asana"]//a',
    arrSolutionsLinks: '//div[@id="navigation__dropdown-solutions"]//a',
    resourcesLinks: '//div[@id="navigation__dropdown-resources"]//a',
    logo: '//a[contains(@class,"siteHeader__logo")]',
    contactSalesLink: '//a[contains(@class, "contact-sales")]',
    logInLink: '//a/span[text()="Log In"]',
    logInModalWindow: '//div[@id="login"]',
    tryForFreeBtnSideMenu: '//div[contains(@class, "siteHeader-buttons")]/a[text()="Try for free"]',
    tryForFreeBtnContainer: '//div[@class="container"]//a[@title="Try for free"][1]',
    tryForFreeBtnBottom: '//div[@class="textStack"]//a[@title="Try for free"][1]',
    contactSalesFrame: '//iframe[@id="71355782499168"]',
    contactSalesHeader: '//h2[@id="header_1"]',
    nameContactSalesInput: '//input[@id="input_3"]',
    companyEmailContactSalesInput: '//input[@id="input_4"]',
    phoneNumberContactSalesInput: '//input[@id="input_10"]',
    companySizeSelectBox:'//select[@id="input_15"]',
    evaluationSizeSelectBox: '//select[@id="input_16"]',
    discussTextArea: '//textarea[@id="input_8"]',
    submitBtnContactSalesPage: '//button[@id="input_2"]',
    useGoogleAccBtn: '//button[@title="useGoogleAccBtn"]',
    emailLogInModalWindow: '//input[@id="login-form-modal-login"]',
    passwordLogInModalWindow: '//input[@id="login-password-modal-login"]',
    logInBtnModalWindow: '//input[@id="login-submit-modal-login"]',
};

const data = {
    headerText: ['Keep your team organized and connected', 'Make more time for the work that matters most'],
    url: 'https://asana.com',
    discussText: faker.random.words(5),
    contactSalesUrl: 'https://asana.com/sales?language=en',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    password: faker.random.words(1),
};

const urls = {
    pricingUrl: 'https://asana.com/pricing',
    asanaLogo: 'https://asana.com/?noredirect',
    contactSalesUrl: 'https://asana.com/sales?language=en',
    logInUrl: 'https://asana.com/?noredirect#login',
    freeAccountCreate: 'https://asana.com/create-account',
};

let mainMenuItem = null;
let arrWhyAsanaLinks = null;
let arrSolutionsLinks = null;
let arrResourcesLinks = null;

describe('Asana website', () => {
    before('should maximize window', () => {
        browser.setWindowSize(1400, 800);
    });

    it('should go to the main page', () => {
        browser.url(data.url);
        expect($(sel.header).getText()).to.be.oneOf(data.headerText);
    });

    it('should check main menu presents on the page', () => {
        expect($(sel.mainMenu).isDisplayed());
    });

    it('should check the main menu has length equals 4', () => {
        mainMenuItem = $$(sel.menuItem);
        expect($$(sel.menuItem)).to.have.lengthOf(4);
    });

    it('should check the main menu items are clickable', () => {
        for(let i = 0; i < mainMenuItem.length; i++){
            expect(mainMenuItem[i].isClickable());
        }
    });

    it('should check `why Asana?` dropDownMenu is displayed after click on it', () => {
        mainMenuItem[0].click();
        expect($(sel.whyAsanaDropDownMenu).isDisplayed());
    });

    it('should get all links in `Why Asana?`',  () => {
        const arr = $$(sel.whyAsanaAllUrls).map(el => el.getAttribute('href'));
        arrWhyAsanaLinks = [...new Set(arr)];
        expect(arrWhyAsanaLinks.length).eq(13);
    });

    it('should check all links in `Why Asana?` redirect to proper pages', async () => {
        const actual = await checkUrl(...arrWhyAsanaLinks);
        expect(actual).eq(200);
    });

    it('should check `Solutions`dropDownMenu is displayed after click on it', () => {
        mainMenuItem[1].click();
        expect($(sel.solutionsDropDownMenu).isDisplayed());
    });

    it('should get all links from `Solutions` dropDownMenu',  () => {
        arrSolutionsLinks = $$(sel.arrSolutionsLinks).map(el => el.getAttribute('href'));
        expect(arrSolutionsLinks.length).eq(19);
    });

    it('should check all links in `Solutions` are redirect to proper pages', async () => {
        const actual = await checkUrl(...arrSolutionsLinks);
        expect(actual).eq(200);
    });

    it('should check `Resources` dropDownMenu is displayed after click on it', () => {
        mainMenuItem[2].click();
        expect($(sel.resourcesDropDownMenu).isDisplayed());
    });

    it('should get all links from `Resources` dropDownMenu',  () => {
        arrResourcesLinks = $$(sel.resourcesLinks).map(el => el.getAttribute('href'));
        expect(arrResourcesLinks.length).eq(11);
    });

    it('should check all links in `Resources` are redirect to proper page', async () => {
        const actual = await checkUrl(...arrResourcesLinks);
        expect(actual).eq(200);
    });

    it('should check the `Pricing` in the main menu redirects to proper page', async () => {
        mainMenuItem[3].click();
        const actual = await checkUrl(urls.pricingUrl);
        expect(actual).eq(200);
    });

    it('should redirect to home page', () => {
        browser.pause(300);
        $(sel.logo).click();
        expect(browser.getUrl()).eq(urls.asanaLogo);
    });

    it('should check the `asana` logo redirects to home page', async () => {
        const actual = await checkUrl(urls.asanaLogo);
        expect(actual).eq(200);
    });

    it('should check that `Contact Sales` is clickable', () => {
        expect($(sel.contactSalesLink).isClickable()).true;
    });

    it('should check the `Contact Sales` link redirects to proper page', async () => {
        const actual = await checkUrl(urls.contactSalesUrl);
        expect(actual).eq(200);
    });

    it('should click `Contact Sales`', () => {
        $(sel.contactSalesLink).click();
    
    });

    it('should switch to iframe', () =>{
        browser.switchToFrame($(sel.contactSalesFrame));
        console.log($(sel.contactSalesHeader).getText());
        expect($(sel.contactSalesHeader).getText()).eq('Talk with our sales team');
    });

    it('should check that `Submit` button does not redirect to the another page', () => {
        $(sel.submitBtnContactSalesPage).click();
        expect(browser.getUrl()).eq(data.contactSalesUrl);
    });

    it('should add value to `Name` field', () => {
        $(sel.nameContactSalesInput).addValue(`${data.firstName} ${data.lastName}`);
    });

    it('should add value to `Company Email`field', () => {
        $(sel.companyEmailContactSalesInput).addValue(data.email);
    });

    it('should add value to `Phone number`field', () => {
        $(sel.phoneNumberContactSalesInput).addValue(`+${data.phoneNumber}`);
    });

    it('should select `Company Size`', () => {
        $(sel.companySizeSelectBox).selectByIndex(2);
    });

    it('should select `Evaluation Size`', () => {
        $(sel.evaluationSizeSelectBox).selectByIndex(2);
    });

    it('should add value to `discuss`field', () => {
        $(sel.discussTextArea).addValue(data.discussText);
        browser.keys('Tab');
    });

    it('should check that `Submit` button is clickable', () => {
        expect($(sel.submitBtnContactSalesPage).isClickable());
    });

    it('should switch to page level', () => {
        browser.switchToParentFrame();
        browser.pause(2000);
    });
    // check the chart

    ///html//iframe[@id="drift-widget"]
    it('should return to main page', () => {
        browser.switchToFrame('drift-widget');

    });

    it('should check that chart - button is displayed', () => {
        expect($('//button[@id="widgetButton"]').isClickable());
    });

    it('should click to chart icon', () => {
        $('//button[@id="widgetButton"]').click();
        expect($('//div[@class="messenger-content"]').isDisplayed());
    });

    it('should switch to main frame', () => {
        browser.switchToFrame(null);
    });

    // it('should redirect to home page', () => {
    //     $(sel.logo).click();
    //     expect(browser.getUrl()).eq(urls.asanaLogo);
    // });

    // it('should redirect to home page', () => {
    //   $(sel.logo).click();
    //   expect(browser.getUrl()).eq(urls.asanaLogo);
    // });







    // it('should check that `Login` link redirects to `Login in Modal Window`', () => {
    //     $(sel.logInLink).click();
    //     browser.pause(300);
    //     expect($(sel.logInModalWindow).isDisplayed()).true;
    // });
    //
    // it('should check that the button `Use Google Account` is clickable', () => {
    //     expect($(sel.useGoogleAccBtn).isClickable());
    // });
    //
    // it('should fill the `email` filed in `LogIn` modal window', () => {
    //     $(sel.emailLogInModalWindow).addValue(data.email);
    // });
    //
    // it('should fill the `password` filed in `LogIn` modal window', () => {
    //     $(sel.passwordLogInModalWindow).addValue(data.password);
    // });
    //
    // it('should check that `Log In` button in `LogIn` modal window is clickable', () => {
    //     expect($(sel.logInBtnModalWindow).isClickable());
    // });




    // it('should check that `Try for free` button in the main menu is clickable', () => {
    //   expect ($(sel.tryForFreeBtnSideMenu).isClickable()).true;
    // });
    //
    // it('should check the `Try for free` button in the main menu redirects to proper page', async () => {
    //   //$(sel.tryForFreeBtnSideMenu).click();
    //   const text = $(sel.tryForFreeBtnSideMenu).getAttribute('href')
    //   console.log();
    //   const actual = await checkUrl(urls.freeAccountCreate);
    //   expect(actual).eq(200);
    // });
    //
    // it('should redirect to home page', () => {
    //   $(sel.logo).click();
    //   expect(browser.getUrl()).eq(urls.asanaLogo);
    // });
    //
    // it('should check that `Try for free` button in the middle of the page is clickable', () => {
    //   expect ($(sel.tryForFreeBtnContainer).isClickable()).true;
    // });
    //
    // it('should check the `Try for free` button in the middle of the page redirects to proper page', async () => {
    //   //$(sel.tryForFreeBtnContainer).click();
    //   const actual = await checkUrl(urls.freeAccountCreate);
    //   expect(actual).eq(200);
    // });
    //
    // it('should redirect to home page', () => {
    //   $(sel.logo).click();
    //   expect(browser.getUrl()).eq(urls.asanaLogo);
    // });
    //
    // it('should check that `Try for free` button in the bottom of the page is clickable', () => {
    //   expect ($(sel.tryForFreeBtnBottom).isClickable()).true;
    // });
    //
    // it('should check the `Try for free` button in the bottom of the page redirects to proper page', async () => {
    //   //$(sel.tryForFreeBtnBottom).click();
    //   const actual = await checkUrl(urls.tryForFreeBtnBottom);
    //   expect(actual).eq(200);
    // });
    //
    // it('should redirect to home page', () => {
    //   $(sel.logo).click();
    //   expect(browser.getUrl()).eq(urls.asanaLogo);
    // });
});