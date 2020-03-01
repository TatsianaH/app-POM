import Page from '../Page';

class RegisterPage extends Page {
open (){
    super.open('http://localhost:3006/user/register')
}

    get siteName(){
        return $('//[@id="site-name"]');
    }

    get h1(){
        return $('//h1');
    }

    get loginLink(){
        return $('//[@qa="login-link"]');
    }

    get registerLink(){
        return $('//[@id="register-link"]');
    }

    get firstNameField(){
    return $('//input[@name="firstName"]')
    }

    get lastNameField(){
        return $('//input[@name="lastName"]')
    }

    get phoneField() {
        return $('//input[@name="phone"]')
    }

    get emailField() {
        return $('//input[@name="email"]');
    }

    get passwordField() {
        return $('//input[@name="password"]');
    }

    get aboutTextArea() {
        return $('//textarea[@name="about"]')
    }

    get goalsTextArea() {
        return $('//textarea[@name="goals"]')
    }

    get englishLevel() {
        return $('//select[@name="englishLevel"]')
    }

    get submitBtn() {
        return $('//button[@type="submit"]');
    }
}

export default
