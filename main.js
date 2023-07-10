import { getTodos, postTodo } from "./api.js";

const btn = document.querySelector(".add-form-button");
const nameUser = document.querySelector(".add-form-name");
const commentUser = document.querySelector(".add-form-text");
const form = document.querySelector(".add-form");

let isLoading;
let isLoadingAllComments;

const userComments = document.querySelector('.comments');
let userComment = [];

function formatCommentDate(date) {
  let dateCom = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear() - 2000;
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (month < 10) {
    month = "0" + month;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return dateCom = day + "." + month + "." + year + "  " + hour + ":" + minute;
}

const apiGet = () => {
  isLoadingAllComments = true;
  getTodos().then((responseData) => {
    isLoading = false;
    isLoadingAllComments = false;
    userComment = responseData.comments.map((comment) => {
      let date = new Date(comment.date);
      date = formatCommentDate(date);

      return {
        id: comment.id,
        name: comment.author.name,
        date: date,
        comment: comment.text,
        likes: comment.likes,
        isLike: true,
      };
    })
    renderUserComments();
  })
    .catch((error) => {
      alert('«Кажется что-то пошло не так, попробуйте позже»');
    });
};
apiGet();

const addComment = () => {
  isLoading = true;
  postTodo({
    text: commentUser.value,
          name: nameUser.value,
  }).then(() => {
      return apiGet();
    })
    .catch((error) => {
      alert('«Кажется что-то пошло не так, попробуйте позже»');
    });

  renderUserComments();
}

const initLikesBtn = () => {
  const likeBtns = document.querySelectorAll('.like-button');
  for (const likeBtn of likeBtns) {
    const index = likeBtn.dataset.index;
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (userComment[index].isLike === true) {
        userComment[index].likes = userComment[index].likes += 1;
        userComment[index].isLike = false;
      }

      else if (userComment[index].isLike === false) {
        userComment[index].likes = userComment[index].likes -= 1;
        userComment[index].isLike = true;
      }
      renderUserComments();
    });
  }
}

const findTextarea = () => {

  const textareas = document.querySelectorAll('.add-form-text');

  for (const textarea of textareas) {
    textarea.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

function commentComment() {

  const comments = document.querySelectorAll(".comment");

  for (const comment of comments) {
    comment.addEventListener('click', () => {
      const index = comment.dataset.index;
      commentUser.value = '>' + userComment[index].comment + '\n' + '\n' + userComment[index].name + ' ,';
    });
  }
}

btn.addEventListener("click", () => {
  addComment();
});

form.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    addComment();
  }
});

const renderLoadingAllComments = () => {
  if (isLoadingAllComments === true) {
    userComments.innerHTML = `<li class="comment">Идет загрузка комментариев...</li>`
  }
};

renderLoadingAllComments();

const renderLoadingLastComment = () => {
  const html = isLoading === true ? `<li class="comment">Идет загрузка комментария...</li>` : ``;
  userComments.insertAdjacentHTML("beforeend", html);
};

const renderUserComments = () => {
  userComments.innerHTML = userComment.map((comments, index) => {
    return `
    <li class="comment" data-index=${index}>
    <div class="comment-header">
      <div>${comments.name}</div>
      <div>${comments.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comments.comment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comments.likes}</span>
        <button class="like-button ${comments.isLike ? "" : "-active-like"}" data-index=${index} data-like=${comments.isLike}></button>
      </div>
    </div>
  </li>`
  }).join('');

  initLikesBtn();

  commentComment();

  findTextarea();

  renderLoadingLastComment();

};