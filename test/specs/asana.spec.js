import { expect } from 'chai';
import axios  from 'axios';

const sel = {
  h1: '//h1',
  mainMenu: '//ul[@role="group"]',
  menuItem: '//ul[@role="group"]/li',
  whyAsanaDropDownMenu: '//div[@id="navigation__dropdown-why-asana"]',
  solutionsDropDownMenu: 'div[@id="navigation__dropdown-solutions]',
  resourcesDropDownMenu:'',
  pricing: '',
};


const data = {
  h1Text: 'Keep your team organized and connected',
  url: 'https://asana.com/',

};

let mainMenuItem = null;

describe('Asana website', () => {
  it('should go to the main page', () => {
    browser.url(data.url);
    expect($(sel.h1).getText()).eq(data.h1Text);
  });

  it('should check main menu presents on the page', () => {
    expect($(sel.mainMenu).isDisplayed());
  });

  it('should check the main menu has length equals 4', () => {
    console.log($$(sel.menuItem).length, '============');
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

  it('should check all links in `Why Asana?` are redirect to proper page', async () => {
    async function checkUrl() {
      return axios({
        method: 'GET',
        url: 'https://asana.com/product',
      })
        .then(res => {
          return res.status;
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    }
    const actual = await checkUrl();
    expect(actual).eq(200);
  });

});