import {expect} from 'chai';

const searchValue = 'stainless work table';

describe('Steel table', () => {
  it('should open home page', () => {
    browser.url('https://www.webstaurantstore.com/');
    const title = browser.getTitle();
    expect(title).eq('WebstaurantStore: Restaurant Supplies & Foodservice Equipment');
  });

  it('should insert value and get redirected to Search Page', () => {
    const inputSearch = $('//input[@id="searchval"]');
    inputSearch.setValue(searchValue);
    const btnSearch = $('//button[@value="Search"]');
    btnSearch.click();
    const searchPageUrl = 'https://www.webstaurantstore.com/search/stainless-work-table.html';
    const textInH1 = 'Stainless Work Table';
    const inH1SelText = $('//h1/span[text()="Stainless Work Table"]').getText();
    expect(browser.getUrl()).eq(searchPageUrl);
    expect(textInH1).eq(inH1SelText);
  });

  it('should get list of search results from titles', () => {
    const listResultesFromTitles = $$('//div[@class="ag-item"]//a');
    expect(listResultesFromTitles.map(el => el.getAttribute('title')).every(el => el.includes('Table') || el.includes('Tables')));
  });

});