const GET_USERS_URL = "http://localhost:8080/get_all";
const POST_USER = "http://localhost:8080/add_user";
const DELETE_USER = "http://localhost:8080/delete?id=";

function User(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
}

function saveUser(firstName, lastName, email) {
    let user = new User(0, firstName, lastName, email);

    let data = JSON.stringify(user);

    fetch(POST_USER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        printUser(json);
    });
}


function addNewUser() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;

    saveUser(firstName, lastName, email);
}

function printUser(user) {
    let table = document.getElementById("table");
    let row = table.insertRow();
    let idCell = row.insertCell(0);
    let firstNameCell = row.insertCell(1);
    let lastNameCell = row.insertCell(2);
    let emailCell = row.insertCell(3);
    let actionCell = row.insertCell(4);

    idCell.innerText = user.id;
    firstNameCell.innerText = user.firstName;
    lastNameCell.innerText = user.lastName;
    emailCell.innerText = user.email;

    actionCell.innerHTML = `<button class="btn btn-danger" onclick="deleteUser(this)">Delete</button>`
}

function printUsers(user) {
    if (user === undefined) return;
    if (user.length !== 0) {
        for (let i = 0; i < user.length; i++) {
            printUser(user[i]);
        }
    }
}

function deleteUser(id) {
    let row = id.parentNode.parentNode;
    let index = row.rowIndex;
    let table = document.getElementById("table");

    table.deleteRow(index);

    let idUser = row.cells[0].innerText;

    fetch(DELETE_USER + idUser, {
        method: 'DELETE'
    })

}

window.onload = function () {
    let users = fetch(GET_USERS_URL, {
        method: 'GET'
    }).then(function (response) {
        response.json().then(function (data) {
            printUsers(data);

        });
    }).catch(function (error) {
        console.log('Fetch Error:', error);
    });
};


