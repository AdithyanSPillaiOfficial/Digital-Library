import { serverAddress } from "@/app/api";

async function fetchRecent(userid){
    try {
        const responce = await fetch(serverAddress + '/getrecent', {
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
            return (data.recent);
          }
          else {
            return (false)
          }
        }
      } catch (error) {
        return ('error : ' + error)
      }
}

export {fetchRecent}