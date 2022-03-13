import React, {useState, useEffect} from 'react';
import {Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const StudentEdit = () => {
    const [details, setDetails] = useState({name:"", grade: 0});
    const [currentUser, setCurrentUser] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate();
    const isMounted = React.useRef(true);
    const params = useParams();
    useEffect(() => {

        if (isMounted.current) {
            fetch(`/api/student/${params.rollno}`)
            .then(results => results.json())
            .then(data => {
              setDetails({name:data[0].name, grade: data[0].grade});
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

    },[ details, params.rollno ]);

    const submitHandler = event => {
        event.preventDefault();
        if(currentUser) updateStudent(details);
    }
    const updateStudent = async (details) => {
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json"
                },
              };

            await axios.put(
                `/api/student/${params.rollno}`,
                { name: details.name, grade: details.grade },
                config
            );

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

        <Form.Label><strong>{details.grade}</strong></Form.Label>

        <Form.Group controlId="formBasicText">
            <Form.Label>Student grade</Form.Label>
            <Form.Control as="text" placeholder="Enter student grade" onChange={event => setDetails({...details, grade: event.target.value})} value={details.grade}/>
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