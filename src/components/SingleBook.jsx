import { Component } from "react";
import { Card, Col } from "react-bootstrap";

class SingleBook extends Component {
  handleBookClick = () => {
    const { book, onBookClick } = this.props;
    onBookClick(book);
  };

  render() {
    const { book, selected } = this.props;
    const bookColor = selected ? "selected-book" : "";

    return (
      <Col md={4} lg={3} className="mb-3">
        <Card className={bookColor}>
          <Card.Img className="object-fit-contain" src={book.img} height={400} onClick={this.handleBookClick} />
          <Card.Body>
            <Card.Title className="text-truncate">{book.title}</Card.Title>
            <Card.Text>{`Price: ${book.price}€`}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default SingleBook;
