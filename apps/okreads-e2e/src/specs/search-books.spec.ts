import { $, $$, browser, ExpectedConditions } from 'protractor';
import { expect } from 'chai';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).to.be.greaterThan(1, 'At least one book');
  });

  it('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // TODO: Implement this test!
  });

  it('Then: I should be able to add see book after adding on my reading list', async () => {
    const getReadingListCount = async () => {
      const countHolders = await $$('tmo-total-count [data-count]');
      if (!countHolders.length) return 0;

      return parseInt(await countHolders[0].getAttribute('data-count'));
    }

    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    await browser.wait(
      ExpectedConditions.presenceOf($('.book-grid'))
    );

    const prevCount = await getReadingListCount()

    const availableBooks = await $$('button[data-testing="add-to-reading-list"]:not([disabled])');
    await availableBooks[0].click();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    const newCount = await getReadingListCount()
    expect(newCount).to.equal(prevCount + 1, 'book count must increase by 1')

    // undo for cleanup
    await $('simple-snack-bar button').click()

    const newerCount = await getReadingListCount()
    expect(newerCount).to.equal(newCount - 1, 'book add undo must decrease reading list count by 1')
  });

});
