import {expect} from 'chai';

const sel = {
  inputSearch: '//input[@id="searchval"]',
  inputSearchFilled: '//div[@class="result"]/strong',
  btnSearch: '//button[@value="Search"]',
  inH1SelText: '//h1/span',
  listResultsFromTitles: '//div[@class="ag-item"]/a',
  pageNext: '//div[@id="paging"]//li[@class="active"]/span',
  listResultsWithoutTitles: '//div[@class="details"]/a[@class="description"]',
  addToCartBtnList: '//input[@name="addToCartButton"]',
  modalWindow: '//div[@class="modal-scrollable"]/div[@id="ag-sub-grid"]',
  addToCartButtonModal: '//div[@class="modal-scrollable"]//button[@name="addToCartButton"]',
  message: '//div[@id[contains(text(), "notification")]]',
  cartBtn: '//a[@href="/viewcart.cfm"]',
  itemInCartCode: '//p[contains(@class,"itemNumber")]',
  deleteSign: '//a[@class="deleteCartItemButton close"]',
  messageEmptyCard: '//p[@class="header-1"]',
  pageNums: '//div[@id="paging"]//ul/li',
  selNextPage: '//div[@id="paging"]//a[text()="',
  listCodeResults: '//div[@class="details"]/p/input',
  addToCartBtnLast: null,
  activePage: '//li[@class="active"]/span',
  h3Title: '//div[@class="modal-scrollable"]//h3[@id="myModalLabel"]',
};

const data = {
  homePageUrl: 'https://www.webstaurantstore.com/',
  homePageTitle: 'WebstaurantStore: Restaurant Supplies & Foodservice Equipment',
  searchValue: 'stainless work table',
  searchPageUrl: 'https://www.webstaurantstore.com/search/stainless-work-table.html',
  textInH1: 'Stainless Work Table',
  lastPageNum: null,
  lestItemLength: null,
  lastPageUrl: null,
};

let lastItem;

describe('WebstaurantStore_FIND_LAST_ITEM_ON_THE_LAST_PAGE', () => {
  it('should open home page', () => {
    browser.url(data.homePageUrl);
    const title = browser.getTitle();
    expect(title).eq(data.homePageTitle);
  });

  it('should insert value in search field and check it is correct', () => {
    $(sel.inputSearch).setValue(data.searchValue);
    browser.waitUntil(() => {
      const textFromSearchInput = $(sel.inputSearchFilled).getText();
      return textFromSearchInput === data.searchValue;
    }, 2000, 'WRONG SEARCH TEXT');

  });

  it('should redirect user to the 1st page with results', () => {
    $(sel.btnSearch).click();
    const text = $(sel.inH1SelText).getText();
    expect(browser.getUrl()).eq(data.searchPageUrl);
    expect(text).eq(data.textInH1);
  });

  it('should check a list of search results with titles', () => {
    const listResults = $$(sel.listResultsFromTitles).map(el => el.getAttribute('title')).every(el => el.includes('Table'));
    expect(listResults).true;
  });

  it('should get the last page number', () => {
    const pageNumList = $$(sel.pageNums).map(el => +el.getText()).filter(el => !Number.isNaN(el));
    data.lastPageNum = Math.max(...pageNumList);
    expect(data.lastPageNum).to.be.a('number');
  });
  
  it('should get to the next page and check all description for searching item on all pages', () => {
    for (let i = 1; i <= data.lastPageNum; i++) {
      if(i > 1) {
        const selNextPage = `//div[@id="paging"]//a[text()="${i}"]`;
        $(selNextPage).click();
      }
      browser.waitUntil(
        () => {
          const activePageNum = $(sel.pageNext).getText();
          return +activePageNum === i;
        },
        2000,
        'WRONG Page',
      );
      
      const listResults = $$(sel.listResultsWithoutTitles);
      expect(listResults.map(el => el.getText()).every(el => el.includes('Table')));
    }
  });

  //add different selector to get #number of the item
  it('should get last item on the last page', () => {
    if(browser.getUrl() === 'https://www.webstaurantstore.com/search/stainless-work-table.html?page=9'){
      const listCodeResults = $$(sel.listCodeResults);
      lastItem = listCodeResults[listCodeResults.length - 1].getValue();
      data.lastItemLength = lastItem.length;
      expect(lastItem).to.be.a('string');
    }
  });

  //get list of 'AddToCart' buttons on the last page
  it('should get last item with `table` from search results list and click its `Add To Cart` button', () => {
    const btnList = $$(sel.addToCartBtnList);
    sel.addToCartBtnLast = btnList[btnList.length - 1];
    sel.addToCartBtnLast.click();
    browser.pause(500);
  });

  //equality of #number of the item
  it('should check equality of modal window title', () => {
    if ($(sel.addToCartButtonModal).isExisting()) {
      const textInModalWindowTitle = $(sel.h3Title).getText();
      $(sel.addToCartButtonModal).click();
      expect(lastItem).eq(textInModalWindowTitle.slice(-data.lastItemLength));
    }
  });

  // counldn't catch notification message and interact with it

  it('should redirect user to Cart Page', () => {
    browser.waitUntil(
      () => {
        return  $(sel.cartBtn).isClickable();
      },
      2000,
      'CARD BTN IS NOT CLICKABLE',
    );
    $(sel.cartBtn).click();
    expect($('//h1').getText()).eq('Cart');
  });

  //equality according to #number of the item
  it('should check that the item is in the cart', () => {
    const itemInCartProductCode = $(sel.itemInCartCode).getText();
    expect(itemInCartProductCode).includes(lastItem);
  });

  it('should check delete item from the cart', () => {
    $(sel.deleteSign).click();
    $(sel.messageEmptyCard).waitForDisplayed();
    expect($(sel.messageEmptyCard).getText()).eq('Your cart is empty.');
  });
});