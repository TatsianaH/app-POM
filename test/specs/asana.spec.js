import { expect } from 'chai';

describe('Asana website', () => {
  it('should go to the main page', () => {
    browser.url('https://asana.com/');
    expect($('//h1').getText()).eq('Make more time for the work that matters most');
  });
});