import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,
              private readonly snackBar: MatSnackBar,
  ) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));

    this.snackBar.open(`Removing ${item.title} from reading list.`, 'Undo', {
      duration: 50000,
    })
      .onAction()
      .subscribe(() => {
        const primitiveBook = {id: item.bookId, ...item};
        delete item.bookId;
        delete item.finished;
        delete item.finishedDate;

        this.store.dispatch(addToReadingList({ book: primitiveBook as Book }));
      })
  }
}
