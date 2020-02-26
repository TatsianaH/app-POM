import {expect} from 'chai';
import LoginPage from './LoginPage';

describe('', () => {
    it('should ', function () {
        LoginPage.open();
        browser.pause(1000);
    });
    it('should ', function () {
        const actual = LoginPage.h1.getText();
        const expected = 'User Login';
        expect(actual).eq(expected);
    });
    it('should ', function () {
        LoginPage.emailField.setValue('admin@admin.admin');
        LoginPage.passwordField.setValue('123123');
        LoginPage.submitBtn.click();
    });

    it('should ', function () {

    });

    it('should ', function () {

    });


});