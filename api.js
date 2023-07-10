export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/alexey-kurochkin/comments", {
        method: "GET"
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                console.log('«Сервер отдыхает»');
                throw new Error('«Сервер отдыхает»');
            }
        })
}

export function postTodo({text, name}) {
    return fetch("https://wedev-api.sky.pro/api/v1/alexey-kurochkin/comments", {
        method: "POST",
        body: JSON.stringify({
          text: text,
          name: name,
        }),
      })
        .then((response) => {
          if (response.status === 500) {
            console.log('«Сервер отдыхает»');
            throw new Error('«Сервер отдыхает»');
          }
          if (response.status === 400) {
            alert('«Имя и комментарий должны быть не короче 3 символов»');
            throw new Error('«Сервер отдыхает»');
          }
    
          nameUser.value = "";
          commentUser.value = "";
          return response.json();
        })
}