import { serverAddress } from "../api";

async function fetchSaved(userid){
    try {
        const responce = await fetch(serverAddress + '/getsaved', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'userid': userid
          }),
        });
  
        if (responce.ok) {
          const data = await responce.json();
          console.log('Data Fetched');
          if (data.status === 'sucess') {
            return (data.saved);
          }
          else {
            return (false)
          }
        }
      } catch (error) {
        return ('error : ' + error)
      }
}

export {fetchSaved}