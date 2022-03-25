const axios = require('axios');

function deleteLink(id) {
    axios.delete('http://localhost/delete/' + id)
        .then(() => console.log('Delete is succeeded'));
}

function createLink(link) {
    console.log(link);
    const uuid = uuidv4();
    const reqBody = { link: link, trand: uuid };
    axios.post('http://localhost/create', reqBody)
        .then(response => element.innerHTML = response.data.id);
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

