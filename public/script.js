const del = document.querySelector('a.btn.btn-danger.mx-2');
console.log(del);
del.addEventListener('click', (e) => {
    const endpoint = `/books/delete/${del.dataset.doc}`;
    fetch(endpoint, {
        method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => window.location.href = data.redirect)
    .catch((err) => console.log(err))
});

const put = document.querySelector('a.btn.btn-warning');
console.log(put);
put.addEventListener('click', (e) => {
    const endpoint = `/books/edit/${put.dataset.doc}`;
    fetch(endpoint, {
        method: 'PUT'
    })
    .then((response) => response.json())
    .then((data) => window.location.href = data.redirect)
    .catch((err) => console.log(err))
});