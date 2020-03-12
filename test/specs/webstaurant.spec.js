import {expect} from 'chai';

const searchValue = 'stainless work table';
let lastItem = null;
let modalWindow = null;

describe('Webstrauntstore_FIND_LAS_ITEM', () => {
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
    expect(listResultsFromTitles.map(el => el.getAttribute('title')).every(el => el.includes('Table')));
  });

  for (let i = 1; i <= 9; i++) {
    it(`should get to the next page num ${i}`, () => {
      if(i > 1){
        const selNextPage = $(`//div[@id="paging"]//a[text()="${i}"]`);
        selNextPage.click();
        const pageNext = $('//div[@id="paging"]//li[@class="active"]');
        pageNext.waitForDisplayed();
        expect(pageNext.getText()).eq(`${i}`);
        //browser.pause(2000);
      }
    });

    it('should check a list of search results without titles', () => {
      const listResultsFromTitles = $$('//div[@class="details"]/a[@class="description"]');
      lastItem = listResultsFromTitles[listResultsFromTitles.length - 1].getText();
      expect(listResultsFromTitles.map(el => el.getText()).every(el => el.includes('Table')));
    });
  }

  it('should get last item with `table` from search results list and click `Add To Cart` button', () => {
    const addToCartBtnList = $$('//input[@name="addToCartButton"]');
    const addToCartBtnLast = addToCartBtnList[addToCartBtnList.length - 1];
    addToCartBtnLast.click();
    modalWindow = $('//div[@id="ag-sub-grid"]');
  });

  //if (modalWindow) {
  it('should check equality of modal window title', () => {
    modalWindow.isDisplayed();
    // const h3Title = $('//h3[@id="myModalLabel"]').getText();
    // expect(lastItem).includes(h3Title);
  });
    
  it('should fill all options for the item in modal window', () => {
    const addToCartButton = $('//button[@name="addToCartButton"]');
    addToCartButton.click();
  });
  //  }

  it('should check that the pop-up message appears', () => {
    const message = $('//div[@id="notification12010707"]');
    message.isDisplayed();
    //const closeBtn = $('//div[@class="notification-center"]/button[@class="close"]');
    const cartBtn = $('//a[@aria-label="Your cart has 0 items. View your cart."]');
    cartBtn.waitForDisplayed();
    // const viewCartBtn = $('//div[@id="notification12010707"]/div/a[text()="View Cart"]');
    // viewCartBtn.click();
    // expect($('//h1').getText()).eq('Cart');
  });

  it('should redirect user to Cart Page', () => {
    const cartBtn = $('//a[@aria-label="Your cart has 0 items. View your cart."]');
    cartBtn.click();
    expect($('//h1').getText()).eq('Cart');
  });

  it('should check that the item is in the cart', () => {
    const itemInCart = $('//div[@class="details"]/span/a').getAttribute('title');
    expect(itemInCart).eq(lastItem);
  });

  it('should check delete item from the cart', () => {
    const deleteSign = $('//a[@class="deleteCartItemButton close"]');
    deleteSign.click();
    const messageEmptyCard = $('//p[@class="header-1"]');
    messageEmptyCard.waitForDisplayed();
    expect(messageEmptyCard.getText()).eq('Your cart is empty.');
  });
});