const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export async function getTechnicians(index) {
    try {
        const response = await fetch('./api_technician_response_data.json', {headers})
        const technicians = await response.json()
        return technicians[index];
    } catch (error) {
        throw new Error(error.message);
    }
}