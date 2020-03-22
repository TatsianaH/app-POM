import { expect } from 'chai';

const sel = {
  h1: '//h1',
  mainMenu: '//ul[@role="group"]',
  menuItem: '//ul[@role="group"]/li',
};

const data = {
  h1Text: 'Make more time for the work that matters most',
  url: 'https://asana.com/',
};

describe('Asana website', () => {
  it('should go to the main page', () => {
    browser.url(data.url);
    expect($(sel.h1).getText()).eq(data.h1Text);
  });

  it('should check main menu presents on the page', () => {
    expect($(sel.mainMenu).isDisplayed());
  });

  it('should check main menu has length equals 4', () => {
    console.log($$(sel.menuItem).length, '============');
    expect($$(sel.menuItem)).to.have.lengthOf(4);
  });

  it('should check main menu has length equals 4', () => {
    console.log($$(sel.menuItem).length, '============');
    expect($$(sel.menuItem)).to.have.lengthOf(4);
  });

});