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
  modalWindow: '//div[@id="ag-sub-grid"]',
  addToCartButtonModal: '//div[@id="ag-sub-grid"]//button[@name="addToCartButton"]',
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
  //modalWindowShowed: '//div[@aria-hidden="false"]',
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

describe('WebstrauntStore_FIND_LAST_ITEM', () => {
  it('should open home page', () => {
    browser.url(data.homePageUrl);
    const title = browser.getTitle();
    expect(title).eq(data.homePageTitle);
  });

  it('should insert value in search field and check that it is correct', () => {
    $(sel.inputSearch).setValue(data.searchValue);
    browser.waitUntil(() => {
      const textFromSearchInput = $(sel.inputSearchFilled).getText();
      console.log(textFromSearchInput, 'TEXTTEXTTEXT----------------------');
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

  it('should check all search results on the 1st page without titles', () => {
    const listResults = $$(sel.listResultsWithoutTitles);
    console.log(listResults.length, 'LENGTH!!!!!!');
    expect(listResults.map(el => el.getText()).every(el => el.includes('Table')));
  });

  // different selector to get #number
  it('should get last item on the last page', () => {
    const listCodeResults = $$(sel.listCodeResults);
    lastItem = listCodeResults[listCodeResults.length - 1].getValue();
    data.lastItemLength = lastItem.length;
    console.log(lastItem, listCodeResults.length, 'LENGTH');
    expect(lastItem).to.be.a('string');
  });

  it('should get last item with `table` from search results list and click its `Add To Cart` button', () => {
    const btnList = $$(sel.addToCartBtnList);
    sel.addToCartBtnLast = btnList[btnList.length - 1];
    console.log(btnList.length, 'BTN LENGTH=======');
    sel.addToCartBtnLast.click();
    browser.pause(2000);
  });

  it('should check equality of modal window title if it appears', () => {
    if ($(sel.modalWindow).isDisplayed()) {
      const h3Title = $('//h3[@id="myModalLabel"]').getText();
      console.log(h3Title, '========');
      $(sel.addToCartButtonModal).click();
      expect(lastItem).eq(h3Title.slice(-data.lastItemLength));
    }
  });

  // don't check and interact with notification message

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

  it('should check that the last item is in the cart', () => {
    const itemInCartProductCode = $(sel.itemInCartCode).getText();
    expect(itemInCartProductCode).includes(lastItem);
  });

  it('should delete the item from the cart', () => {
    $(sel.deleteSign).click();
    $(sel.messageEmptyCard).waitForDisplayed();
    expect($(sel.messageEmptyCard).getText()).eq('Your cart is empty.');
  });
});