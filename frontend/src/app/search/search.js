import { serverAddress } from "../api";
async function searchHandler(prompt) {
    try {
        console.log("prompt : "+prompt)
        const responce = await fetch(serverAddress+'/getbooks',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                'prompt': prompt
            }),
        });

        if(responce.ok){
            const data = await responce.json();
            console.log('Data Fetched');
            if(data.status==='sucess'){
                return(data)
            }
            else {
                return('error')
            }
        }
    } catch (error) {
        return('error : '+error)
    }
}

export {searchHandler};