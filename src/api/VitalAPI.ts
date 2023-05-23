const VitalAPI = {
    getAllVitals: async () => {
        const url = import.meta.env.VITE_BASE_URL + "vital";
        const options = {
            method: 'GET',
        };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    },
    deleteVital: async (id: string) => {
        const url = import.meta.env.VITE_BASE_URL + "vital/" + id;
        const options = {
            method: 'DELETE',
        };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    },
    addVital: async (vital: any) => {
        const url = import.meta.env.VITE_BASE_URL + "vital";
        const options = {
            method: 'POST',
            body: JSON.stringify(vital),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    }
}

export default VitalAPI;