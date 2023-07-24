import * as api from './api.js';
import * as render from './render.js';
import * as time from './date.js';
import * as startPage from './renderStart.js';
import { format } from "date-fns";

let isLoadingAllComments;
let isLoading;

let userComment = [];

function apiGetStartPage() {
  api.getTodos()
    .then((responseData) => {
      userComment = responseData.comments.map((comment) => {
        const createDate = format(new Date(), 'yyyy-MM-dd hh.mm.ss');
        let date = createDate;
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

function apiGet() {
  isLoadingAllComments = true;
  render.renderUserComments({ userComment, isLoading, addComment });
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
      render.renderUserComments({ userComment, isLoading, addComment });
    }).catch((error) => {
      api.catchTodo(error);
    })
};

function addComment() {
  isLoading = true;
  api.postTodo()
    .then(() => {
      render.renderUserComments({ userComment, isLoading, addComment });
      return apiGet();
    })
    .catch((error) => {
      api.catchTodo(error);
    });
}
