import {expect} from 'chai';

const sel = {
  inputSearch: '//input[@id="searchval"]',
  btnSearch: '//button[@value="Search"]',
  inH1SelText: '//h1/span[text()="Stainless Work Table"]',
  listResultsFromTitles: '//div[@class="ag-item"]//a',
  pageNext: '//div[@id="paging"]//li[@class="active"]',
  listResultsWithoutTitles: '//div[@class="details"]/a[@class="description"]',
  addToCartBtnList: '//input[@name="addToCartButton"]',
  modalWindow: '//div[@id="ag-sub-grid"]',
  addToCartButtonModal: '//button[@name="addToCartButton"]',
  message: '//div[@id="notification12010707"]',
  cartBtn: '//a[@aria-label="Your cart has 0 items. View your cart."]',
  itemInCart: '//div[@class="details"]/span/a',
  deleteSign: '//a[@class="deleteCartItemButton close"]',
  messageEmptyCard: '//p[@class="header-1"]',
};

const data = {
  homePageUrl: 'https://www.webstaurantstore.com/',
  homePageTitle: 'WebstaurantStore: Restaurant Supplies & Foodservice Equipment',
  searchValue: 'stainless work table',
  searchPageUrl: 'https://www.webstaurantstore.com/search/stainless-work-table.html',
  textInH1: 'Stainless Work Table',
  
};

let lastItem = null;

describe('WebstrauntStore_FIND_LAST_ITEM', () => {
  it('should open home page', () => {
    browser.url(data.homePageUrl);
    const title = browser.getTitle();
    expect(title).eq(data.homePageTitle);
  });

  it('should insert value and get redirected to Search Page', () => {
    $(sel.inputSearch).setValue(data.searchValue);
    $(sel.btnSearch).click();
    const text = $(sel.inH1SelText).getText();
    expect(browser.getUrl()).eq(data.searchPageUrl);
    expect(text).eq(data.textInH1);
  });

  it('should check a list of search results with titles', () => {
    const listResults = $$(sel.listResultsFromTitles); 
    expect(listResults.map(el => el.getAttribute('title')).every(el => el.includes('Table')));
  });

  for (let i = 1; i <= 9; i++) {
    it(`should get to the next page num ${i}`, () => {
      if(i > 1){
        const selNextPage = $(`//div[@id="paging"]//a[text()="${i}"]`);
        selNextPage.click();
        $(sel.pageNext).waitForDisplayed();
        expect($(sel.pageNext).getText()).eq(`${i}`);
      }
    });

    it('should check a list of search results without titles', () => {
      const listResults = $$(sel.listResultsWithoutTitles);
      lastItem = listResults[listResults.length - 1].getText();
      expect(listResults.map(el => el.getText()).every(el => el.includes('Table')));
    });
  }

  it('should get last item with `table` from search results list and click `Add To Cart` button', () => {
    const btnList = $$(sel.addToCartBtnList);
    const addToCartBtnLast = btnList[btnList.length - 1];
    addToCartBtnLast.click();
  });

  //if (modalWindow) {
  it('should check equality of modal window title', () => {
    $(sel.modalWindow).isDisplayed();
    // const h3Title = $('//h3[@id="myModalLabel"]').getText();
    // expect(lastItem).includes(h3Title);
  });

  it('should fill all options for the item in modal window', () => {
    $(sel.addToCartButtonModal).click();
  });
  //  }

  it('should check that the pop-up message appears', () => {
    $(sel.message).isDisplayed();
    //const closeBtn = $('//div[@class="notification-center"]/button[@class="close"]');
    $(sel.cartBtn).waitForDisplayed();
    // const viewCartBtn = $('//div[@id="notification12010707"]/div/a[text()="View Cart"]');
    // viewCartBtn.click();
    // expect($('//h1').getText()).eq('Cart');
  });

  it('should redirect user to Cart Page', () => {
    $(sel.cartBtn).click();
    expect($('//h1').getText()).eq('Cart');
  });

  it('should check that the item is in the cart', () => {
    const itemInCartTitle = $(sel.itemInCart).getAttribute('title');
    expect(itemInCartTitle).eq(lastItem);
  });

  it('should check delete item from the cart', () => {
    $(sel.deleteSign).click();
    $(sel.messageEmptyCard).waitForDisplayed();
    expect($(sel.messageEmptyCard).getText()).eq('Your cart is empty.');
  });
});