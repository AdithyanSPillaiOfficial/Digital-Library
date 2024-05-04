import { serverAddress } from "@/app/api";

async function handleAddUser(userObj,sessionid){
    try {
        userObj.sessionid = sessionid;
        const responce = await fetch(serverAddress + '/adduser', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(userObj)
        });

        if (responce.ok) {
            const data = await responce.json();
            console.log(data);
            console.log('Data Fetched');
            if (data.status === 'sucess') {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        return 'error : ' + error;
    }
}

export {handleAddUser}