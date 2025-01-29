// function saveUsers(users) {
//     localStorage.setItem("users", JSON.stringify(users));
// }

// function getUsers() {
//     return JSON.parse(localStorage.getItem("users")) || [];
// }

// let people = getUsers();
// let parent = document.querySelector(".tbody");
// let addModal = document.querySelector(".AddModal");
// let addButton = document.querySelector(".adduser");
// let searchInput = document.querySelector(".search");
// let filterActive = document.querySelector(".filter-active");
// let filterInactive = document.querySelector(".filter-inactive");

// function get(arr) {
//     parent.innerHTML = "";
//     arr.forEach((person) => {
//         let tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td class="name">${person.name}</td>
//             <td class="email">${person.email}</td>
//             <td class="phone">${person.phone}</td>
//             <td class="city">${person.city ? "Dushanbe" : "Kulob"}</td>
//             <td class="${person.city ? "Inactive" : "Active"}">${person.city ? "Inactive" : "Active"}</td>
//             <td>
//                 <button class="delete">🗑️</button>
//                 <button class="edit">✏️</button>
//             </td>
//         `;
//         tr.querySelector(".delete").onclick = () => userDelete(person.id);
//         tr.querySelector(".edit").onclick = () => showEditModal(person);
//         parent.append(tr);
//     });
// }

// get(people);

// function userDelete(id) {
//     people = people.filter((person) => person.id !== id);
//     saveUsers(people);
//     get(people);
// }

// if (addButton && addModal) {
//     addButton.onclick = () => {
//         addModal.innerHTML = `
//             <h2>Add New User</h2>
//             <input type="text" id="newName" placeholder="Enter your name">
//             <input type="email" id="newEmail" placeholder="Enter your email">
//             <input type="text" id="newPhone" placeholder="Enter your phone">
//             <select id="newCity">
//                 <option value="true">Yes</option>
//                 <option value="false" selected>No</option>
//             </select>
//             <button id="saveNewUser">Add</button>
//             <button id="closeModal">Cancel</button>
//         `;
//         addModal.showModal();

//         document.getElementById("saveNewUser").onclick = () => {
//             let name = document.getElementById("newName").value;
//             let email = document.getElementById("newEmail").value;
//             let phone = document.getElementById("newPhone").value;
//             let city = document.getElementById("newCity").value === "true";

//             let newUser = {
//                 name,
//                 email,
//                 phone,
//                 city,
//                 status: city ? "Inactive" : "Active",
//                 id: Date.now().toString(),
//             };

//             people.push(newUser);
//             saveUsers(people);
//             get(people);
//             addModal.close();
//         };

//         document.getElementById("closeModal").onclick = () => {
//             addModal.close();
//         };
//     };
// }

// function showEditModal(person) {
//     if (!addModal) return;
//     addModal.innerHTML = `
//         <h2>Edit User</h2>
//         <input type="text" id="editName" value="${person.name}">
//         <input type="email" id="editEmail" value="${person.email}">
//         <input type="text" id="editPhone" value="${person.phone}">
//         <select id="editCity">
//             <option value="true" ${person.city ? "selected" : ""}>Yes</option>
//             <option value="false" ${!person.city ? "selected" : ""}>No</option>
//         </select>
//         <button id="saveEditUser">Save</button>
//         <button id="closeEditModal">Cancel</button>
//     `;
//     addModal.showModal();

//     document.getElementById("saveEditUser").onclick = () => {
//         person.name = document.getElementById("editName").value;
//         person.email = document.getElementById("editEmail").value;
//         person.phone = document.getElementById("editPhone").value;
//         person.city = document.getElementById("editCity").value === "true";
//         person.status = person.city ? "Inactive" : "Active";

//         saveUsers(people);
//         get(people);
//         addModal.close();
//     };

//     document.getElementById("closeEditModal").onclick = () => {
//         addModal.close();
//     };
// }

// if (searchInput) {
//     searchInput.oninput = (e) => {
//         const query = e.target.value.toLowerCase();
//         const results = people.filter((person) => person.name.toLowerCase().includes(query) || person.email.toLowerCase().includes(query) || person.phone.includes(query));
//         get(results);
//     };
// } else {
//     console.log(error);
// }

// if (filterActive) {
//     filterActive.onclick = () => filterByStatus("Active");
// }
// if (filterInactive) {
//     filterInactive.onclick = () => filterByStatus("Inactive");
// }

// function filterByStatus(status) {
//     const filtered = people.filter((person) => person.status.toLowerCase() === status.toLowerCase());
//     get(filtered);
// }

function saveUsers(users) {
    sessionStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
    return JSON.parse(sessionStorage.getItem("users")) || [];
}

let people = getUsers();
let parent = document.querySelector(".tbody");
let addModal = document.querySelector(".AddModal");
let addButton = document.querySelector(".adduser");
let searchInput = document.querySelector(".search");
let filterActive = document.querySelector(".filter-active");
let filterInactive = document.querySelector(".filter-inactive");

function get(arr) {
    parent.innerHTML = "";
    arr.forEach((person) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="name">${person.name}</td>
            <td class="email">${person.email}</td>
            <td class="phone">${person.phone}</td>
            <td class="city">${person.city ? "Dushanbe" : "Kulob"}</td>
            <td class="${person.city ? "Inactive" : "Active"}">${person.city ? "Inactive" : "Active"}</td>
            <td>
                <button class="delete">🗑️</button>
                <button class="edit">✏️</button>
            </td>
        `;
        tr.querySelector(".delete").onclick = () => userDelete(person.id);
        tr.querySelector(".edit").onclick = () => showEditModal(person);
        parent.append(tr);
    });
}

get(people);

function userDelete(id) {
    people = people.filter((person) => person.id !== id);
    saveUsers(people);
    get(people);
}

if (addButton && addModal) {
    addButton.onclick = () => {
        addModal.innerHTML = `
            <h2>Add New User</h2>
            <input type="text" id="newName" placeholder="Enter your name">
            <input type="email" id="newEmail" placeholder="Enter your email">
            <input type="text" id="newPhone" placeholder="Enter your phone">
            <select id="newCity">
                <option value="true">Yes</option>
                <option value="false" selected>No</option>
            </select>
            <button id="saveNewUser">Add</button>
            <button id="closeModal">Cancel</button>
        `;
        addModal.showModal();

        document.getElementById("saveNewUser").onclick = () => {
            let name = document.getElementById("newName").value;
            let email = document.getElementById("newEmail").value;
            let phone = document.getElementById("newPhone").value;
            let city = document.getElementById("newCity").value === "true";

            let newUser = {
                name,
                email,
                phone,
                city,
                status: city ? "Inactive" : "Active",
                id: Date.now().toString(),
            };

            people.push(newUser);
            saveUsers(people);
            get(people);
            addModal.close();
        };

        document.getElementById("closeModal").onclick = () => {
            addModal.close();
        };
    };
}

function showEditModal(person) {
    if (!addModal) return;
    addModal.innerHTML = `
        <h2>Edit User</h2>
        <input type="text" id="editName" value="${person.name}">
        <input type="email" id="editEmail" value="${person.email}">
        <input type="text" id="editPhone" value="${person.phone}">
        <select id="editCity">
            <option value="true" ${person.city ? "selected" : ""}>Yes</option>
            <option value="false" ${!person.city ? "selected" : ""}>No</option>
        </select>
        <button id="saveEditUser">Save</button>
        <button id="closeEditModal">Cancel</button>
    `;
    addModal.showModal();

    document.getElementById("saveEditUser").onclick = () => {
        person.name = document.getElementById("editName").value;
        person.email = document.getElementById("editEmail").value;
        person.phone = document.getElementById("editPhone").value;
        person.city = document.getElementById("editCity").value === "true";
        person.status = person.city ? "Inactive" : "Active";

        saveUsers(people);
        get(people);
        addModal.close();
    };

    document.getElementById("closeEditModal").onclick = () => {
        addModal.close();
    };
}

if (searchInput) {
    searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase();
        const results = people.filter((person) => person.name.toLowerCase().includes(query) || person.email.toLowerCase().includes(query) || person.phone.includes(query));
        get(results);
    };
} else {
    console.log(error);
}

if (filterActive) {
    filterActive.onclick = () => filterByStatus("Active");
}
if (filterInactive) {
    filterInactive.onclick = () => filterByStatus("Inactive");
}

function filterByStatus(status) {
    const filtered = people.filter((person) => person.status.toLowerCase() === status.toLowerCase());
    get(filtered);
}
