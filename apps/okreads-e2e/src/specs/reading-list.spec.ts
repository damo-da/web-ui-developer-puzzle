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

  it('Then: I should be able to mark book as finished', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const availableBooks = await $$('button[data-testing="add-to-reading-list"][data-finished="unfinished"]');
    await availableBooks[0].click();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    const finishedButton = await $$('.reading-list-item button[data-role="mark_finish"][data-finished="finished"]');
    await finishedButton[0].click();

    const deleteButton = await $$('.reading-list-item button[data-role="delete"][data-finished="finished"]');
    expect(deleteButton.length).to.be.greaterThan(0, 'at least one book must be finished reading')

    await deleteButton[0].click()
  })
});
