# Code Review

# Problems or code smells
1. Removed unnecessary implementation of `ngOnInit` in `total-count.component.ts`.
2. Updated `searchBooks` of `books.controller.ts` to match return value with method signature.
3. Unit tests failed failing.
    - Implemented `failedAddToReadingList` and `failedRemoveFromReadingList` and fixed the test cases.
4. Not using `aria-` attributes.
    - Added `aria-` attributes (see comments).

## Accessibility
1. Added image alt in book search results
2. Prevent screen reader from reading cover images in "My Reading List"
3. Make search icon in search pane and `"JavaScript"` text link more accessible (by fixing Lighthouse issue)
4. Added label for search bar in book-search.component.html. (See [reason](https://www.w3.org/TR/WCAG20-TECHS/H44.html))

Lighthouse accessibility score: 97

## Further problems
1. No localization
2. *Issued by Lighthouse*: Contrast issue in `<p>` label in reading-list.component.html for `"Try searching for a topic, for example "JavaScript"`.
    - Background and foreground colors do not have a sufficient contrast ratio.
    - Low-contrast text is difficult or impossible for many users to read. Learn more. 

