import { A2AopPage } from './app.po';

describe('a2-aop App', () => {
  let page: A2AopPage;

  beforeEach(() => {
    page = new A2AopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
