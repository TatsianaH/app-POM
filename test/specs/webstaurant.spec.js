import {expect} from 'chai';

const sel = {
  inputSearch: '//input[@id="searchval"]',
  btnSearch: '//button[@value="Search"]',
  inH1SelText: '//h1/span',
  listResultsFromTitles: '//div[@class="ag-item"]/a',
  pageNext: '//div[@id="paging"]//li[@class="active"]/span',
  listResultsWithoutTitles: '//div[@class="details"]/a[@class="description"]',
  addToCartBtnList: '//input[@name="addToCartButton"]',
  modalWindow: '//div[@id="ag-sub-grid"]',
  addToCartButtonModal: '//button[@name="addToCartButton"]',
  message: '//div[@id="notification12010707"]',
  cartBtn: '//a[@aria-label="Your cart has 0 items. View your cart."]',
  itemInCart: '//div[@class="details"]/span/a',
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
  
};

let lastItem;

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
    const listResults = $$(sel.listResultsFromTitles).map(el => el.getAttribute('title')).every(el => el.includes('Table'));
    expect(listResults).true;
  });

  it('should get the last page number', () => {
    const pageNumList = $$(sel.pageNums).map(el => +el.getText()).filter(el => !Number.isNaN(el));
    data.lastPageNum = Math.max(...pageNumList);
    //console.log(data.lastPageNum, '========');
    expect(data.lastPageNum).to.be.a('number');
  });
  
  
  it('should get to the next page and check all description for searching item', () => {
    for (let i = 2; i <= data.lastPageNum; i++) {
      if(i > 1){
        const selNextPage = `//div[@id="paging"]//a[text()="${i}"]`;
        $(selNextPage).click();
        browser.waitUntil(
          () => {
            return $(sel.pageNext).getText() == i;
          },
          2000,
          'WRONG Page',
        );
      }
      // const activePage = $(sel.activePage).getText();
      // expect(activePage).eq(`${i}`);

      const listResults = $$(sel.listResultsWithoutTitles);
      //console.log(listResults.length, '==================');
      expect(listResults.map(el => el.getText()).every(el => el.includes('Table')));
    }
  });

  //add different selector to get #number
  it('should get last item on the last page', () => {
    const listCodeResults = $$(sel.listCodeResults);

    lastItem = listCodeResults[listCodeResults.length - 1].getValue();
    data.lastItemLength = lastItem.length;
    //console.log(lastItem, '==========');
    expect(lastItem).to.be.a('string');
  });

  it('should get last item with `table` from search results list and click `Add To Cart` button', () => {
    const btnList = $$(sel.addToCartBtnList);
    sel.addToCartBtnLast = btnList[btnList.length - 1];
    //console.log(sel.addToCartBtnLast.isClickable(), '===============');
    sel.addToCartBtnLast.click();
    //console.log(sel.addToCartBtnLast.isClickable(), '===============');
  });
  
  //if (sel.addToCartBtnLast.isClickable() === false) {
  it('should check equality of modal window title', () => {
    $(sel.modalWindow).isDisplayed();
    const h3Title = $('//h3[@id="myModalLabel"]').getText();
    console.log(h3Title, '========');
    expect(lastItem).eq(h3Title.slice(data.lastItemLength - h3Title));
  });

  it('should click `add to cart` for the item in modal window', () => {
    $(sel.addToCartButtonModal).click();
  });
  // }
  //
  // it('should check that the pop-up message appears', () => {
  //   $(sel.message).isDisplayed();
  //   //const closeBtn = $('//div[@class="notification-center"]/button[@class="close"]');
  //   $(sel.cartBtn).waitForDisplayed();
  //   // const viewCartBtn = $('//div[@id="notification12010707"]/div/a[text()="View Cart"]');
  //   // viewCartBtn.click();
  //   // expect($('//h1').getText()).eq('Cart');
  // });

  // it('should redirect user to Cart Page', () => {
  //   $(sel.cartBtn).click();
  //   expect($('//h1').getText()).eq('Cart');
  // });
  //
  // it('should check that the item is in the cart', () => {
  //   const itemInCartTitle = $(sel.itemInCart).getAttribute('title');
  //   expect(itemInCartTitle).eq(lastItem);
  // });
  //
  // it('should check delete item from the cart', () => {
  //   $(sel.deleteSign).click();
  //   $(sel.messageEmptyCard).waitForDisplayed();
  //   expect($(sel.messageEmptyCard).getText()).eq('Your cart is empty.');
  // });
});