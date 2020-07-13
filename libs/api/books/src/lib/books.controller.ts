import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query
} from '@nestjs/common';
import { BooksService } from '@tmo/api/books';

@Controller()
export class BooksController {
  constructor(private readonly books: BooksService) {}

  @Get('/books/search')
  searchBooks(@Query('q') term) {
    try {
      return this.books.search(term);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
