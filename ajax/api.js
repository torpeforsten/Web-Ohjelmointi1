document.addEventListener('DOMContentLoaded', async function () {
    const getUsersButton = document.getElementById('loadUsersButton');
    const dynamicButtonsContainer = document.getElementById('dynamic-buttons-container');
    const userTableBody = document.querySelector('tbody');

    // Function to create circular avatar image element
    function createAvatarElement(avatarUrl) {
        const avatar = document.createElement('img');
        avatar.src = avatarUrl;
        avatar.alt = 'User Avatar';
        avatar.classList.add('avatar-img');
        return avatar;
    }

    // Function to create "Edit" and "Delete" buttons for each user
    function createActionButton(userId, row) {
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-info', 'mr-2');
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Delete';

        // Add event listeners for edit and delete actions
        editButton.addEventListener('click', () => handleEditUser(userId));
        deleteButton.addEventListener('click', () => handleDeleteUser(userId, row));

        const actionContainer = document.createElement('div');
        actionContainer.appendChild(editButton);
        actionContainer.appendChild(deleteButton);

        return actionContainer;
    }

    // Function to handle "Edit" button click
    function handleEditUser(userId) {
        // Implement your logic for editing user
        console.log(`Edit user with ID ${userId}`);
    }

    // Function to handle "Delete" button click
    async function handleDeleteUser(userId, row) {
        try {
            // Send delete request to the server
            const response = await fetch(`https://reqres.in/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // If the delete request is successful, remove the user from the table
                row.remove();
            } else {
                console.error('Error deleting user:', response.status);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    // Function to update the user table with data
    function updateUserTable(users) {
        userTableBody.innerHTML = ''; // Clear existing data

        users.forEach(user => {
            const row = userTableBody.insertRow();
            row.insertCell().textContent = user.id;
            row.insertCell().appendChild(createAvatarElement(user.avatar));
            row.insertCell().textContent = user.email;
            row.insertCell().textContent = user.first_name;
            row.insertCell().textContent = user.last_name;

            const actionsCell = row.insertCell();
            actionsCell.appendChild(createActionButton(user.id, row));
        });
    }

    // Function to fetch total number of pages
    async function fetchTotalPages() {
        try {
            const response = await fetch('https://reqres.in/api/users?page=1');
            const data = await response.json();
            return data.total_pages;
        } catch (error) {
            console.error('Error fetching total pages:', error);
            return 1; // Default to 1 page if there's an error
        }
    }

    // Function to fetch user data for a specific page
    async function fetchUsers(page) {
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return [];
        }
    }

    // Function to handle page button click
    async function handlePageButtonClick(page) {
        const users = await fetchUsers(page);
        updateUserTable(users);
    }

    // Fetch total number of pages and create buttons when the page loads
    const totalPages = await fetchTotalPages();
    createPageButtons(totalPages);

    // Add event listener for the "Load Users" button
    getUsersButton.addEventListener('click', async function () {
        // Load users for the initial page (page 1)
        const users = await fetchUsers(1);
        updateUserTable(users);
    });

    // Dynamically create page buttons
    function createPageButtons(totalPages) {
        dynamicButtonsContainer.innerHTML = ''; // Clear existing buttons

        for (let page = 1; page <= totalPages; page++) {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-info', 'mr-2');
            button.textContent = `Sivu ${page}`;
            button.addEventListener('click', async function () {
                handlePageButtonClick(page);
            });
            dynamicButtonsContainer.appendChild(button);
        }
    }
});
