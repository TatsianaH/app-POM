import Page from '../Page';

class LoginPage extends Page {
    open() {
        super.open('http://localhost:3006/user/login');
    }

    get emailField() {
        return $('//input[@name="email"]');
    }

    get passwordField() {
        return $('//input[@name="password"]');
    }

    get submitBtn() {
        return $('//button[@type="submit"]');
    }

    get h1(){
        return $('//h1');
    }
}

export default new LoginPage();
