import React, { Component } from "react";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";
import { Container, Form, Row, Col, Badge } from "react-bootstrap";

class BookList extends Component {
  state = {
    searchedBook: "",
    selectedBook: null,
  };

  handleChange = event => {
    this.setState({ searchedBook: event.target.value });
  };

  handleBookClick = book => {
    this.setState({ selectedBook: book });
  };

  render() {
    const { books } = this.props;
    const FilteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(this.state.searchedBook.toLowerCase())
    );

    return (
      <Container>
        <Row>
          <Col md={8}>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Cerca libri per titolo..."
              value={this.state.searchedBook}
              onChange={this.handleChange}
            />
            <Row>
              {FilteredBooks.map(book => (
                <SingleBook
                  key={book.asin}
                  d
                  book={book}
                  onBookClick={this.handleBookClick}
                  selected={book === this.state.selectedBook}
                />
              ))}
            </Row>
          </Col>
          <Col md={4}>
            {this.state.selectedBook ? (
              <CommentArea book={this.state.selectedBook} />
            ) : (
              <Badge bg="danger">Seleziona un libro per mostrare i commenti</Badge>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BookList;
