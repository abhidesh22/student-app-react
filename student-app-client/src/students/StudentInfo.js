import React, { useState, useEffect } from 'react';
import NotFoundPage from '../homePage/NotFoundPage';
import { useParams, useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import axios from 'axios';

const StudentInfo = () => {
    const [currentUser, setCurrentUser] = useState("");
    const [currentStudent, setCurrentStudent] = useState({title:"", username:"", content:[], name:""});
    const [isAdmin, setIsAdmin] = useState("");
    const [error, setError] = useState("");
    const isMounted = React.useRef(true);
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {

        if (isMounted.current) {
            fetch(`/api/student/${params.title}`)
            .then(results => results.json())
            .then(data => {
              setCurrentStudent(data[0]);
            },
            (error) => {
                setError(error.response.data.message);
            });
            const loggedUser = localStorage.getItem('loggedUser');
            if(loggedUser) {
                setCurrentUser(JSON.parse(loggedUser).username);
                setIsAdmin(JSON.parse(loggedUser).isAdmin);
            }
        }
        return () => {
            isMounted.current = false;
        };

    },[ currentStudent, params.title ]);

    if (!currentStudent) return <NotFoundPage />
    const handleDelete = async(name) => {
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json"
                },
              };
            await axios.delete(
                `/api/student/${name}`,
                config
            );
        } catch (error) {
            setError("Not able to delete Student at the moment");
        }
        navigate("/studentlist");        
    }

    return (
        <>
        {error ? <h1>{error} </h1> : null}
        <h1>{currentStudent.title}</h1>
        <h2>{`Written By ${currentStudent.username}`}</h2>
        {currentStudent.content.map((paragraph, key) => (
            <ul key={key}>{paragraph}</ul>
        ))}
        {currentStudent.username === currentUser || isAdmin ?
        <p><Button variant="primary" href={`/editstudent/${currentStudent.title}` }> Edit </Button>
            {"                     "}
            <Button variant="primary" onClick={() => handleDelete(currentStudent.title)}> Delete </Button>
        </p> : null
        }
        </>
    );
}

export default StudentInfo;