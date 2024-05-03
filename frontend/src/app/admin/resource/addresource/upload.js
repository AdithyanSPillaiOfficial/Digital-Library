const { serverAddress } = require("@/app/api");

async function handleResUpload(fileobj, sessionid) {
    try {
        const formData = new FormData();
        for (const file of fileobj.file) {
            //naming like this is the only way to acess these parametersin multer
            const filename = `${fileobj.department}-${fileobj.semester}-${fileobj.subject.replace(/\s/g, '_')}-${fileobj.name.replace(/\s/g, '_')}.pdf`;
            formData.append('pdfs', file,filename);
        }
        formData.append('sessionid', sessionid);
        formData.append('name', fileobj.name);
        formData.append('author', fileobj.author);
        formData.append('publisher', fileobj.publisher);
        formData.append('edition', fileobj.edition);
        formData.append('year', fileobj.year);
        formData.append('department', fileobj.department);
        formData.append('semester', fileobj.semester);
        formData.append('subject', fileobj.subject);
        formData.append('type', fileobj.type);
        formData.append('subtopics', fileobj.subtopics);
        formData.append('tags', fileobj.tags);

        const responce = await fetch(serverAddress + '/uploadresource', {
            method: 'POST',
            body: formData,
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

export { handleResUpload };
