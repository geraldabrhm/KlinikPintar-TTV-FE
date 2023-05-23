const UserAPI = {
    getAllUsers: async () => {
        const url = import.meta.env.VITE_BASE_URL + "user";
        const options = {
            method: 'GET',
        };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    },
    getUserById: async (id: string) => {
        const url = import.meta.env.VITE_BASE_URL + "user/" + id;
        const options = {
            method: 'GET',
        };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    },
    deleteUser: async (id: string) => {
        const url = import.meta.env.VITE_BASE_URL + "user/" + id;
        const options = {
            method: 'DELETE',
        };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    },
    addUser: async (user: any) => {
        const url = import.meta.env.VITE_BASE_URL + "user";
        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    }
}

export default UserAPI;