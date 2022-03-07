import React, {useState, useEffect} from 'react';
import {Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const StudentEdit = () => {
    const [details, setDetails] = useState({name:"", title: "", content: []});
    const [currentUser, setCurrentUser] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate();
    const isMounted = React.useRef(true);
    const params = useParams();
    useEffect(() => {

        if (isMounted.current) {
            fetch(`/api/student/${params.title}`)
            .then(results => results.json())
            .then(data => {
              setDetails({name:data[0].name, title: data[0].title, content: data[0].content});
            },
            (error) => {
                setError("Error in retrieving the student details");
            });
            const loggedUser = localStorage.getItem('loggedUser');
            if(loggedUser) {
                setCurrentUser(JSON.parse(loggedUser).username);
            }
        }
        return () => {
            isMounted.current = false;
        };

    },[ details, params.title ]);

    const submitHandler = event => {
        event.preventDefault();
        updateStudent(details);
    }
    const updateStudent = async (details) => {
        try {
            // console.log('here now', currentUser, details);
            const config = {
                headers: {
                  "Content-Type": "application/json"
                },
              };

            await axios.put(
                `/api/student/${params.title}`,
                { title: details.title, content: details.content, username: currentUser, name: details.name },
                config
            );

            // console.log(data);
        } catch (error) {
            setError("Not able to edit Student at the moment");
        }
        
        navigate("/studentlist");
    }
    return (
    <>
    <div>
    <Form onSubmit={submitHandler}>
        <h2>Edit Student </h2>
        {error ? <h1> {error} </h1> : null}
        <Form.Group controlId="formBasicText">
            <Form.Label>Student Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={event => setDetails({...details, name: event.target.value})} value={details.name}/>
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Label>Student Title </Form.Label>
            {/* <Form.Control type="text" placeholder="Enter title" onChange={event => setDetails({...details, title: event.target.value})} value={details.title}/> */}
        </Form.Group>
        <Form.Label><strong>{details.title}</strong></Form.Label>

        <Form.Group controlId="formBasicText">
            <Form.Label>Student Text</Form.Label>
            <Form.Control as="textarea" rows={15} placeholder="Enter student" onChange={event => setDetails({...details, content: event.target.value})} value={details.content}/>
        </Form.Group>
        
        <Button variant="primary" type="submit" >
            Update Student
        </Button>

    </Form>
    </div>
    </>
);
}

export default StudentEdit;