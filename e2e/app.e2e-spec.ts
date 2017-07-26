import { Angular4TutorialPage } from './app.po';

describe('angular4-tutorial App', () => {
  let page: Angular4TutorialPage;

  beforeEach(() => {
    page = new Angular4TutorialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
