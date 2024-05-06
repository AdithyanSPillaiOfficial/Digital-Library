"use client"
import React, { useEffect, useState } from 'react'
import './page.css'
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { handleResUpload } from './upload';

function AddResource() {

    const [adminVerify, setAdminVerify] = useState(false);
    const [user, setUser] = useState({});
    const [sessionid, setSessionId] = useState('')

    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [edition, setEdition] = useState('');
    const [year, setYear] = useState('');
    const [department, setDepartment] = useState('');
    const [subject, setSubject] = useState('');
    const [type, setType] = useState('');
    const [subTopics, setSubTopics] = useState([]);
    const [subTopicInput, setSubTopicInput] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [semester, setSemester] = useState('');
    




    useEffect(() => {
        var newuser;
        if (newuser = Cookies.get('user')) {
            const userObj = JSON.parse(newuser)
            console.log(userObj);
            if (userObj && userObj.role == 'librarian') {
                setAdminVerify(true);
                setSessionId(userObj.sessionid);
            }
            else {
                window.location = '/'
            }
        }
        else {
            window.location = '/login'
        }


    }, [])

    if (!adminVerify) {
        return (
            <div></div>
        )
    }

    function addSubTopic(userinput) {
        if (userinput.charAt(userinput.length - 1) == ',') {
            userinput = userinput.split(',');
            userinput.pop();
            setSubTopics([...subTopics, ...userinput]);
            setSubTopicInput('');
        }
        else {
            setSubTopicInput(userinput);
        }
    }

    function editSubTopic(userinput, index) {
        const tempArray = [...subTopics];
        tempArray[index] = userinput;
        setSubTopics(tempArray);
    }

    function delSubTopic(index) {
        var tempArray = [...subTopics];
        tempArray.splice(index,1);
        setSubTopics(tempArray);
    }

    function delTag(index) {
        var tempArray = [...tags];
        tempArray.splice(index,1);
        setTags(tempArray);
    }

    function addTag(userinput) {
        if (userinput.charAt(userinput.length - 1) == ',') {
            userinput = userinput.split(',');
            userinput.pop();
            setTags([...tags, ...userinput]);
            setTagInput('');
        }
        else {
            setTagInput(userinput);
        }
    }

    function editTag(userinput, index) {
        const tempArray = [...tags];
        tempArray[index] = userinput;
        setTags(tempArray);
    }

    const handleResSubmit = async (event) => {
        event.preventDefault();

        const resObj = {
            'file' : file,
                'name': name,
                'author' : author,
                'publisher' : publisher,
                'edition' : edition,
                'year' :  year,
                'department' : department,
                'semester' : semester,
                'subject' : subject,
                'type' : type,
                'subtopics' : subTopics,
                'tags' : tags
        };
        const uploadResult = await handleResUpload(resObj,sessionid);
        if(uploadResult) {
            alert("File Uploaded")
            //window.location.reload();
        }
        else {
            alert("Upload Failed")
        }
    }




    return (
        <div className='main-extra'>
            <h1>Add Resource</h1>
            <div className='horizontal-line' />
            <div className='formdiv'>
                <div className='formbox'>
                    <p className='formhead'>Upload Resource</p>
                    <form onSubmit={handleResSubmit} className='form' >

                        <div className='formbody'>
                            <div className='inputdiv choosefile'>
                                <p>Choose File</p>
                                <input type="file" className='uploadfile' accept='application/pdf'  onChange={(e) => setFile(e.target.files)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Resource Name</p>
                                <input type="text" placeholder='Name' className='inputdiv' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Author</p>
                                <input type="text" placeholder='Author' className='inputdiv' value={author} onChange={(e) => setAuthor(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Publisher</p>
                                <input type="text" placeholder='Publisher' className='inputdiv' value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Edition</p>
                                <input type="text" placeholder='Edition' className='inputdiv' value={edition} onChange={(e) => setEdition(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Year</p>
                                <input type="text" placeholder='Year' className='inputdiv' value={year} onChange={(e) => setYear(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Department</p>
                                <input type="text" placeholder='Department' className='inputdiv' value={department} onChange={(e) => setDepartment(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Semester</p>
                                <input type="text" id='sem' placeholder='Semester' className='inputdiv' value={semester} onChange={(e) => setSemester(e.target.value)} hidden />
                                <label htmlFor="sem" ></label>
                                <select name="" className='inputdiv' id="sem" value={semester} onChange={(e) => setSemester(e.target.value)}>
                                    <option value="">--Select--</option>
                                    <option value="S1">S1</option>
                                    <option value="S2">S2</option>
                                    <option value="S3">S3</option>
                                    <option value="S4">S4</option>
                                    <option value="S5">S5</option>
                                    <option value="S6">S6</option>
                                    <option value="S7">S7</option>
                                    <option value="S8">S8</option>
                                </select>
                            </div>
                            <div>
                                <p className='inputlabel'>Subject</p>
                                <input type="text" placeholder='Subject' className='inputdiv' value={subject} onChange={(e) => setSubject(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Resource Type</p>
                                <input type="text" id='typeinp' placeholder='Textbook/QuestionPaper' className='inputdiv' value={type} onChange={(e) => setType(e.target.value)} hidden />
                                <label htmlFor="typeinp" ></label>
                                <select name="" className='inputdiv' id="typeinp" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="">--Select--</option>
                                    <option value="textbook">Text Book</option>
                                    <option value="questionpaper">Question Paper</option>
                                    <option value="notes">Notes</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <p className='inputlabel'>Sub Topics</p>
                            <div className='inputdiv tagmain'>
                                {
                                    subTopics.map((subTopic, index) => (
                                        <div className='tagdiv' key={index}>
                                            <FontAwesomeIcon icon={faMultiply} size='2x' className='cross' onClick={()=>delSubTopic(index)}/>
                                            <input type="text" className='addedtag' value={subTopic} onChange={(e) => editSubTopic(e.target.value, index)} />
                                            
                                        </div>
                                    ))
                                }
                                <input type="text" placeholder='Enter Subtopic' value={subTopicInput} onChange={(e) => addSubTopic(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <p className='inputlabel'>Tags</p>
                            <div className='inputdiv tagmain'>
                                {
                                    tags.map((tag, index) => (
                                        <div className='tagdiv' key={index}>
                                            <FontAwesomeIcon icon={faMultiply} size='2x' className='cross' onClick={()=>delTag(index)}/>
                                            <input type="text" className='addedtag' value={tag} onChange={(e) => editTag(e.target.value, index)} />

                                        </div>
                                    ))
                                }
                                <input type="text" placeholder='Enter Tags' value={tagInput} onChange={(e) => addTag(e.target.value)} />
                            </div>
                        </div>

                        <div className='btndiv'>
                            <button type='reset' className='cancelbtn' onClick={()=>window.location.reload()}>Cancel</button>
                            <button type='submit' className='uploadbtn'>Upload</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddResource