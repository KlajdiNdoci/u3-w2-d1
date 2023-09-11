import React, { Component } from "react";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

class CommentArea extends Component {
  state = {
    commentsWithRate: [],
    asin: this.props.book?.asin || "",
    filteredComments: [],
  };

  fetchComments = async () => {
    const elementId = this.state.asin;

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTNlZGMwMzRmZjAwMTQwM2Y0ZDYiLCJpYXQiOjE2OTQxNTQ2NDgsImV4cCI6MTY5NTM2NDI0OH0.5gepNiVnuLWo2L0s87jHnQ7cjSPAOd5NlVPXM9Qge5I",
        },
      });

      if (!response.ok) {
        throw new Error("Non è stato possibile recuperare i commenti");
      }

      const commentData = await response.json();

      if (Array.isArray(commentData)) {
        const filteredComments = commentData.filter(comment => comment.elementId === elementId);

        this.setState({
          commentsWithRate: commentData,
          filteredComments,
        });
      } else {
        throw new Error("La risposta non contiene commenti validi");
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.book !== this.props.book) {
      this.setState(
        {
          asin: this.props.book.asin || "",
        },
        () => {
          this.fetchComments();
        }
      );
    }
  }

  render() {
    return (
      <div className="p-2" style={{ border: "1px solid black" }}>
        <CommentList comments={this.state.filteredComments} />
        <AddComment asin={this.state.asin} />
      </div>
    );
  }
}

export default CommentArea;
