import { $, $$, browser, ExpectedConditions } from 'protractor';
import { expect } from "chai";

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able to add book to reading list', async () => {
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


    const availableBooks = await $$('button[data-testing="add-to-reading-list"]:not([disabled])');
    await availableBooks[0].click();

    await browser.sleep(500);

    const prevCount = await getReadingListCount()

    const item = await $("[data-testing=remove-reading-list-item]");
    await item.click()

    const newCount = await getReadingListCount()
    expect(newCount).to.equal(prevCount + 1, 'book count must increase by 1')

    // undo addition for cleanup
    await $('simple-snack-bar button').click()

    const newerCount = await getReadingListCount()
    expect(newerCount).to.equal(newCount - 1, 'book add undo must decrease reading list count by 1')
  });
});
