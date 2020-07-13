# Challenge Commentary
Here I leave my commentary as I am about to solve this challenge over this weekend.

## Summary
Summary: not too hard, not too easy.

It was an interesting challenge for me to use TypeScript and Angular having come from JSX and React background. The overall management is the same, except the usage of effects (React developers normally use sagas).  

### Task 1
> Difficulty: easy

Easily understood the code architecture.

### Task 2
> Difficulty: scary hard

Understanding the architecture was tough. Took 5+ hours to add a single feature.
  
### Task 3
> Difficulty: unmarked

### Task 4
> Difficulty: easy

Minor difficulty with git, but resolved with a victory claim.

#### UI Specifications:
Since no design or requirements were given, I am presenting my own solution.

I am going to treat "Want to read" and "Read the book" exclusive features, as some users might want to read the books that they have already read (unlike the Goodreads suggestion).

#### Necessary UI/UX changes:
These will be the visible UI/UX changes.
* In Book Search, the book will be highlighted to show the users that they have read the book. Label in "Want to Read" reads "Read Again".
* In My ReadingList, the book that are read will be differentiated using text color. If the user has finished reading a book in their list, they will see an option to mark 'Finish Reading' for each item on the Reading List.  

#### Tasks
1. Endpoint `PUT /reading-list/:id/finished` created, and implemented in service.
    * Tested using Postman (shared along with this code).
2. Reducers created and tested
