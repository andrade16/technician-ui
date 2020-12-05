const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export async function getTechnicians(index) {
    try {
        const response = await fetch('./api_technician_response_data.json', {headers})
        const technicians = await response.json()
        //console.log('TECHS: ', technicians);
        const techObj = technicians[index];
        return techObj;
    } catch (error) {
        throw new Error(error.message);
    }
}