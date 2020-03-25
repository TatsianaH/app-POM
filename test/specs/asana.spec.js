import { expect } from 'chai';
import checkUrl from '../../getAction';

const sel = {
  header: '//h1',
  mainMenu: '//ul[@role="group"]',
  menuItem: '//ul[@role="group"]/li',
  whyAsanaDropDownMenu: '//button[@id="navigation__dropdown-toggle-why-asana"]',
  solutionsDropDownMenu: '//button[@id="navigation__dropdown-toggle-solutions"]',
  resourcesDropDownMenu:'',
  pricing: '',
  whyAsanaAllUrls: '//div[@id="navigation__dropdown-why-asana"]//a',
  arrSolutionsLinks: '//div[@id="navigation__dropdown-solutions"]//a',
};

const data = {
  headerText: ['Keep your team organized and connected', 'Make more time for the work that matters most'],
  url: 'https://asana.com',

};

const urls = {
  asanaOverview: 'https://asana.com/product',

};

let mainMenuItem = null;
let arrWhyAsanaLinks = null;
let arrSolutionsLinks = null;

describe('Asana website', () => {
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

  it('should check `why Asana?` is clickable', () => {
    mainMenuItem[0].click();
    expect($(sel.whyAsanaDropDownMenu).isDisplayed());
  });

  it('should get all links in `Why Asana?`',  () => {
    const arr = $$(sel.whyAsanaAllUrls).map(el => el.getAttribute('href'));
    arrWhyAsanaLinks = [...new Set(arr)];
    expect(arrWhyAsanaLinks.length).eq(13);
  });

  it('should check all links in `Why Asana?` redirect to proper page', async () => {
    const actual = await checkUrl(...arrWhyAsanaLinks);
    expect(actual).eq(200);
  });

  it('should click `Solutions` button', () => {
    mainMenuItem[1].click();
    expect($(sel.solutionsDropDownMenu).isDisplayed());
  });

  it('should check all links in `Solutions` are redirect to proper page',  () => {
    arrSolutionsLinks = $$(sel.arrSolutionsLinks).map(el => el.getAttribute('href'));
    expect(arrSolutionsLinks.length).eq(18);
  });

  it('should check all links in `Why Asana?` redirect to proper page', async () => {
    const actual = await checkUrl(...arrSolutionsLinks);
    expect(actual).eq(200);
  });

  // it('should click `Solutions` button', () => {
  //   mainMenuItem[2].click();
  //   expect($(sel.solutionsDropDownMenu).isDisplayed());
  // });
  //
  // it('should check all links in `Solutions` are redirect to proper page',  () => {
  //   arrSolutionsLinks = $$(sel.arrSolutionsLinks).map(el => el.getAttribute('href'));
  //   expect(arrSolutionsLinks.length).eq(18);
  // });
  //
  // it('should check all links in `Why Asana?` redirect to proper page', async () => {
  //   const actual = await checkUrl(...arrSolutionsLinks);
  //   expect(actual).eq(200);
  // });
});