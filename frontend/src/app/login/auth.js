import { serverAddress } from "../api";
async function handleSubmit(username, password) {
    try {
        const responce = await fetch(serverAddress+'/auth',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                'uname' : username,
                'password': password
            }),
        });

        if(responce.ok){
            const data = await responce.json();
            console.log('Data Fetched');
            if(data.status==='sucess'){
                return(true);
            }
            else {
                return(false)
            }
        }
    } catch (error) {
        return('error : '+error)
    }
}

export {handleSubmit};