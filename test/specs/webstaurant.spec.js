import {expect} from 'chai';

const searchValue = 'stainless work table';
let lastItem = null;

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

  it('should check a list of search results with titles', () => {
    const listResultsFromTitles = $$('//div[@class="ag-item"]//a');
    expect(listResultsFromTitles.map(el => el.getAttribute('title')).every(el => el.includes('Table') || el.includes('Tables')));
  });

  //div[@class="details"]//a
  it('should check a list of search results without titles', () => {
    const listResultsFromTitles = $$('//div[@class="details"]//a');
    //console.log(listResultsFromTitles.map(el => el.getText()), '========');
    expect(listResultsFromTitles.map(el => el.getText()).every(el => el.includes('Table') || el.includes('Tables')));
  });

  for (let i = 2; i <= 9; i++) {
    it(`should get to the next page num ${i}`, () => {
      //div[@id="paging"]/div/ul/li
      const selNextPage = $(`//div[@id="paging"]//a[text()="${i}"]`);
      selNextPage.click();
      const pageNext = $('//div[@id="paging"]//li[@class="active"]');
      pageNext.waitForDisplayed();
      expect(pageNext.getText()).eq(`${i}`);
      //browser.pause(2000);
    });

    it('should check a list of search results without titles', () => {
      const listResultsFromTitles = $$('//div[@class="details"]/a[@class="description"]');
      //console.log(listResultsFromTitles.map(el => el.getText()), '========');
      expect(listResultsFromTitles.map(el => el.getText()).every(el => el.includes('Table') || el.includes('Tables')));
    });
  }

  it('should get last item with `table` from search results list and click `Add To Cart` button', () => {
    const listResultsFromTitles = $$('//div[@class="details"]/a[@class="description"]');
    lastItem = listResultsFromTitles[listResultsFromTitles.length - 1].getText();

    //how check that it is the last item
    const addToCartBtnList = $$('//input[@name="addToCartButton"]');
    const addToCartBtnLast = addToCartBtnList[addToCartBtnList.length - 1];
    addToCartBtnLast.click();
    // const modalWindow = $('//div[@class="modal-scrollable"]');
    // modalWindow.isDisplayed();
    // const h3Title = $('//h3[@id="myModalLabel"]').getText();
    // expect(lastItem).includes(h3Title);
  });

  // it('should fill all options for the item in modal window', () => {
  //   const field1 = $('//select[@title="Countertop Edge"]');
  //
  //   const field2 = $('//select[@title="Finish Upgrade"]');
  //   const field3 = $('//select[@title="Sink Bowl"]');
  //   field1.click();
  //   field1.selectByVisibleText('Advance Tabco TA-12 Countertop Edge');
  //   field2.click();
  //   field2.selectByVisibleText('Advance Tabco K-350 Upgraded Finish');
  //   field3.click();
  //   field3.selectByVisibleText('Advance Tabco TA-11B 16" x 20" Sink Bowl with Faucet, Welded into Tabletop');
  //   const addToCartButton = $('//button[@name="addToCartButton"]');
  //   addToCartButton.click();
  // });

  it('should redirect user to Cart Page', () => {
    const cartBtn = $('//a[@class="menu-btn"]//span[text()="Cart"]');
    cartBtn.click();
    expect($('//h1').getText()).eq('Cart');
  });

  it('should check that the item is in the cart', () => {
    const itemInCart = $('//div[@class="details"]/span/a').getAttribute('title');
    console.log(itemInCart, lastItem);
    expect(itemInCart.replace(/inch/g,'"')).eq(lastItem);
  });

  it('should check delete item from the cart', () => {
    const deleteSign = $('//a[@class="deleteCartItemButton close"]');
    deleteSign.click();
    const messageEmptyCard = $('//p[@class="header-1"]');
    messageEmptyCard.waitForDisplayed();
    expect(messageEmptyCard.getText()).eq('Your cart is empty.');
  });



  // it('should get to the next page', () => {
  //   //div[@id="paging"]/div/ul/li
  //   const selNextPage = $('//div[@id="paging"]//a[text()="2"]');
  //   selNextPage.click();
  //   const page2 = $('//div[@id="paging"]//li[@class="active"]');
  //   page2.waitForDisplayed();
  //   expect(page2.getText()).eq('2');
  // });

  // it('should check a list of search results without titles', () => {
  //   const listResultsFromTitles = $$('//div[@class="details"]//a');
  //   //console.log(listResultsFromTitles.map(el => el.getText()), '========');
  //   expect(listResultsFromTitles.map(el => el.getText()).every(el => el.includes('Table') || el.includes('Tables')));
  // });
});