const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS || 'https://digital-library-production-7886.up.railway.app';
const hello = process.env.HELLO;
console.log("Requests are sending to the server at "+serverAddress);

export { hello };

export { serverAddress };