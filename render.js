let isLoading;
let isLoadingAllComments;

const renderUserComments = ({ userComment, isLoading, addComment, responseData }) => {
    const app = document.querySelector('.app');
    const commentsHtml = userComment.map((comments, index) => {

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
    app.innerHTML = `
    <ul class="comments">
        ${commentsHtml}
    </ul>
    <div class="add-form">
        <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
        <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
        <div class="add-form-row">
       		<button class="add-form-button btn-gray" disabled>Написать</button>
        </div>
    </div>
    `
    const btn = document.querySelector(".add-form-button");
    let nameUser = document.querySelector(".add-form-name");
    let commentUser = document.querySelector(".add-form-text");
    const form = document.querySelector(".add-form");
    const ul = document.querySelector(".comments");

    nameUser.value = responseData.user.name;

    btn.addEventListener("click", () => {
        addComment({ responseData });
    });

    form.addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
            addComment({ responseData });
        }
    });

    function checkFields() {
        if (nameUser.value && commentUser.value) {
            btn.disabled = false;
            btn.classList.remove('btn-gray');
        } else {
            btn.disabled = true;
            btn.classList.add('btn-gray');
        }
    }

    nameUser.addEventListener('input', checkFields);
    commentUser.addEventListener('input', checkFields)

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
                renderUserComments({ userComment, addComment, responseData });
                nameUser.value = responseData.user.name;
            });
        }
    }
    initLikesBtn();

    const renderLoadingLastComment = () => {
        const html = isLoading === true ? `<li class="comment">Идет загрузка комментария...</li>` : ``;
        ul.insertAdjacentHTML("beforeend", html);
    };
    renderLoadingLastComment();
};

export { renderUserComments }