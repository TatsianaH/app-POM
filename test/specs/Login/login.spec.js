import {expect} from 'chai';
import LoginPage from './LoginPage';
import {data} from './data';

describe('Login', () => {
  it('should open Login Page', function () {
    LoginPage.open();
    (LoginPage.h1).isDisplayed();
    const actual = LoginPage.h1.getText();
    expect(actual).eq('User Login');
  });

  it('should fill all requires fields', function () {
    LoginPage.emailField.setValue(data.email);
    LoginPage.passwordField.setValue(data.password);
    LoginPage.submitBtn.click();
    expect(LoginPage.submitBtn.isEnabled());
  });

  it('should ', function () {

  });

  it('should ', function () {

  });


});