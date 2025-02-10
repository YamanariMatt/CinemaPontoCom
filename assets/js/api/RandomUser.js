async function fetchUsers() {
    const response = await fetch('https://randomuser.me/api/?results=1');
    const data = await response.json();
    return data.results;
}


async function displayUsers() {
    const users = await fetchUsers();
    const userContainer = document.getElementById('user-container');

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        const userImage = document.createElement('img');
        userImage.src = user.picture.thumbnail;
        userImage.alt = `${user.name.first} ${user.name.last}`;

        const userName = document.createElement('p');
        userName.textContent = `${user.name.first} ${user.name.last}`;

        userDiv.appendChild(userImage);
        userDiv.appendChild(userName);
        userContainer.appendChild(userDiv);
    });
}


window.onload = displayUsers;