import * as api from './api.js';
import * as render from './render.js';
import * as time from './date.js';
import * as login from './renderLogin.js';
import * as startPage from './renderStart.js';

let isLoadingAllComments;
let isLoading;

let userComment = [];

function apiGetStartPage() {
  api.getTodos()
    .then((responseData) => {
      userComment = responseData.comments.map((comment) => {
        let date = new Date(comment.date);
        date = time.formatCommentDate(date);
        return {
          id: comment.id,
          name: comment.author.name,
          date: date,
          comment: comment.text,
          likes: comment.likes,
          isLike: true,
        };
      })
      startPage.renderStartPage({ userComment, addComment });
    }).catch((error) => {
      api.catchTodo(error);
    })
};
apiGetStartPage();

function apiGet({ responseData }) {
  let newData = responseData;
  isLoadingAllComments = true;
  render.renderUserComments({ userComment, isLoading, addComment, responseData });
  api.getTodos()
    .then((responseData) => {
      isLoading = false;
      isLoadingAllComments = false;
      userComment = responseData.comments.map((comment) => {
        let date = new Date(comment.date);
        date = time.formatCommentDate(date);
        return {
          id: comment.id,
          name: comment.author.name,
          date: date,
          comment: comment.text,
          likes: comment.likes,
          isLike: true,
        };
      })
      render.renderUserComments({ userComment, isLoading, addComment, responseData });
    }).catch((error) => {
      api.catchTodo(error);
    })
};

function addComment({ responseData }) {
  isLoading = true;
  api.postTodo()
    .then(() => {
      render.renderUserComments({ userComment, isLoading, addComment, responseData });
      return apiGet({ responseData });
    })
    .catch((error) => {
      api.catchTodo(error);
    });
}
