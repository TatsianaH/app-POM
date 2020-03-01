class Page {
    constructor() {
        this.title = 'Progress Monitor';
    }

    open(path) {
        browser.url(path);
    }
}

export default Page;