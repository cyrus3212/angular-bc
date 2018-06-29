import { BeepcardPage } from './app.po';

describe('beepcard App', () => {
  let page: BeepcardPage;

  beforeEach(() => {
    page = new BeepcardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
