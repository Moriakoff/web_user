const GET_USERS_URL = "http://localhost:8080/get_all";
const POST_USER = "http://localhost:8080/add_user";

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
    }).then(response => response.json())
        .then(function (data) {
           console.log(data); // how return data???
        });
}


    function addNewUser() {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;

        let user = saveUser(firstName, lastName, email);

        return user;

    }

    function printRow(user) {
        let table = document.getElementById("table");
        let row = table.insertRow();
        let idCell = row.insertCell(0);
        let firstNameCell = row.insertCell(1);
        let lastNameCell = row.insertCell(2);
        let emailCell = row.insertCell(3);
        let actionCell = row.insertCell(4);


        idCell.innerText = user.id;
        firstNameCell.innerText = user[1];
        lastNameCell.innerText = user[2];
        emailCell.innerText = user[3];

        actionCell.innerHTML = `<button class="btn btn-danger" onclick="deleteUser(id)">Delete</button>`

    }


    function printTableOnLoad() {
        fetch(GET_USERS_URL).then(function (response) {
            response.json().then(function (json) {
                printRow(json);
            })
        })
}


