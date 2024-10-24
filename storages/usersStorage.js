// storages/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
    constructor() {
        this.storage = {};
        this.id = 0;
    }

    getMockUsers() {
        const users = [
            {
                id: 0,
                firstName: "Ray",
                lastName: "Lewis",
                email: "rayLewis@outlook.com",
                age: 37,
                bio: "Lorem ipsum generator"
            },
            {
                id: 1,
                firstName: "Edward",
                lastName: "Reed",
                email: "edReed@outlook.com",
                age: 53,
                bio: "",
            },
            {
                id: 2,
                firstName: "Billy",
                lastName: "Cundiff",
                email: "billyCundiff@outlook.com",
                age: null,
                bio: "",
            }
        ];
        this.storage = users;
    }

    addUser({ firstName, lastName, email, age, bio }) {
        const id = this.id;
        this.storage[id] = { id, firstName, lastName, email, age, bio };
        this.id++;
        console.log(this);
    }

    getUsers() {
        return Object.values(this.storage);
    }

    getUser(id) {
        return this.storage[id];
    }

    updateUser(id, { firstName, lastName, email, age, bio }) {
        console.log(bio)
        console.log(this.storage)
        this.storage[id] = { id, firstName, lastName, email, age, bio };
    }

    deleteUser(id) {
        delete this.storage[id];
    }

    searchName(name) {
        const users = Object.values(this.storage);
        const searchTerm = name.trim().toLowerCase();
        const filteredResult = users.filter((user) => {
            console.log(user)
            const userName = (user.firstName + user.lastName).toLowerCase();
            console.log(userName);
            if (userName.includes(searchTerm)) {
                return userName
            } else
                return;
        })
        console.log(filteredResult);
        return filteredResult;
    }

    searchEmail(email) {
        console.log(email);
        const users = Object.values(this.storage);
        const searchTerm = email.trim().toLowerCase();
        const filteredResult = users.filter((user) => {
            const userEmail = user.email.toLowerCase();
            if (userEmail.includes(searchTerm)) {
                return userEmail;
            } else
                return;
        })
        return filteredResult;
    }
}
    // Rather than exporting the class, we can export an instance of the class by instantiating it.
    // This ensures only one instance of this class can exist, also known as the "singleton" pattern
    module.exports = new UsersStorage();

