import React from 'react';
import {useState, useEffect, useRef } from 'react';
import { Button} from 'react-bootstrap';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import {Bar} from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import { FaFileCsv, FaFilePdf } from "react-icons/fa";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as Tools,
    Legend,
    registerables
  } from 'chart.js'
  

function StudentList () {
    const [students, setStudents] = useState([
        {
            name: "",
            _id: "",
            course: {
                name: "",
                type: ""
            },
            grade: 0,
            rollno: 0,
            url: "",
            degreeEnrolled: "",
            address: {
                city: "",
                zipcode: ""
            }
        }
    ]);
    
    const [tableLoaded, setTableLoaded] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [chartData, setChartData] = useState(false);
    const [selectedUni, setSelectedUni] = useState({});
    const [universities, setUniversities] = useState([{name: "", _id: ""}]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);

    ChartJS.register(...registerables);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tools,
        Legend
    )
    const dt = useRef(null);

    useEffect(() => {
        isMounted.current = true;

        fetch('/api/uni')
        .then(results => results.json())
        .then(data => {
            setUniversities(data);
        },
        (error) => {
            setError(error.response.data.message);
        });

        return () => {
            isMounted.current = false;
        };

    },[ students ]);



    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV();
    }

    const exportPdf= (selectionOnly) => {
        const doc = new jsPDF('l', 'mm',[210, 297]);
        const headers = [["Student ID", "Name", "Grade", "Subject"]];
        let content = {
            startY: 50,
            head: headers,
            body: students.map(elt=> [elt.rollno, elt.name, elt.grade, elt.course.name])
          };
        doc.autoTable(content);
        doc.save('studentList.pdf');

    }

    const header = (
        <div className="flex align-items-center export-buttons">
            <Button type="button" onClick={() => exportCSV(true)} className="mr-2" data-pr-tooltip="CSV" >
                <FaFileCsv />
            </Button>
            <Button type="button" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" >
                <FaFilePdf />
            </Button>
        </div>
    );

    const selectedUniversityTemplate = (option, props) => {
        if (option) {
            return (
                <div className="uni-item uni-item-value">
                    <div>{option.name}</div>
                </div>
            );
        }
    
        return (
            <span>
                {props.placeholder}
            </span>
        );
    }
    
    const universityOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.name}</div>
            </div>
        );
    }
    const downloadPdf = () => {
        var doc = new jsPDF('l', 'mm',[210, 297]);
        const element = document.getElementById("newChart");
        html2canvas(element).then(canvas => {
            var imgData = canvas.toDataURL('image/png',1.0);                  
            doc.text(130,15,` Student Report for ${selectedUni.name}`);
            doc.addImage(imgData, 'PNG',20,30,0,130); 
            const headers = [["Student ID", "Name", "Grade", "Subject"]];
            let content = {
                startY: 450,
                head: headers,
                body: students.map(elt=> [elt.rollno, elt.name, elt.grade, elt.course.name])
              };
            doc.autoTable(content);
            doc.save('gt_log.pdf');             
        })
    }

    const handleDelete = async (student) => {
        console.log(student);
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json"
                },
              };
            await axios.delete(
                `/api/student/${student.rollno}`,
                config
            );
        } catch (error) {
            setError("Not able to delete Student at the moment");
        }
        loadStudentData(selectedUni);
    }

    const loadStudentData = (university) => {
        
        if(university) {
            setTableLoaded(true);
            setLoading(true);
            fetch(`/api/student/byuni/${university._id}`)
            .then(results => results.json())
            .then(data => {
              setStudents(data);
              setLoading(false);
            },
            (error) => {
                setError(error.response.data.message);
            });

            fetch(`/api/student/bysubject/${university._id}`)
            .then(results => results.json())
            .then(data => {
                console.log(data);
              setChartData({
                labels: data.map((student) => student.course_name[0]),
                datasets: [
                  {
                    label: "Average Grades",
                    data: data.map((student) => student.averageGrade),
                    backgroundColor: [
                      "#2a71d0"
                    ]
                  }
                ]
              });
            },
            (error) => {
                setError(error.response.data.message);
            });     
        } else {
            setTableLoaded(false);
        }
    } 
    const handleUniSelect = (event) => {
        setSelectedUni(event.value);
        loadStudentData(event.value);
    }
    const deleteBodyTemplate = (rowData) => {
        return <Button variant="primary" onClick={() => handleDelete(rowData)} > Delete </Button>;
    }
    return (
    <>
    {error ? <h2 color='red'> Error fetching the records currently, please try again later </h2> : null}
    <h2>Select University</h2>
    <Dropdown
        value={selectedUni} 
        options={universities} 
        onChange={(e) => handleUniSelect(e)} 
        optionLabel="name" 
        filter
        showClear
        filterBy="name"
        placeholder="Select a University"
        itemTemplate={universityOptionTemplate}
        valueTemplate={selectedUniversityTemplate}
    />
    
    {!tableLoaded || loading ? 
        loading ? 
        <div>
            <h1> Loading Data, Please wait.. </h1> 
        </div>
        :
        <div>
            <h1> Select University to Get Student List</h1> 
        </div>        
        : 
        showChart ? 
        <div>
            <h1> Average Grades by Courses </h1> 
            <Button variant="primary" onClick={() => setShowChart(false)} > Back to Table Mode </Button>
            <Button variant="primary" onClick={() => downloadPdf()} > Download Pdf Report </Button>
            <div>
                <Bar id="newChart"
                    data={chartData}
                    options={{
                    plugins: {
                        title: {
                        display: true,
                        text: `Average Grades per course for university ${selectedUni.name}`
                        },
                        legend: {
                        display: true,
                        position: "bottom"
                    }
                    }
                    }}
                />
            </div>
        </div>
        :
        <div className="card">
            <Tooltip target=".export-buttons>button" position="bottom" />
            <div>
                <Button variant="primary" onClick={() => setShowChart(true)} > Switch to Graph Mode </Button>
                <div className="card" >
                    <DataTable 
                        ref={dt} 
                        value={students} 
                        responsiveLayout="scroll" 
                        header={header} 
                        dataKey="id" 
                        progressPending={loading} 
                        pagination
                        >
                        <Column field="rollno" header="Student ID"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="grade" header="Grade"></Column>
                        <Column field="course.name" header="Subject"></Column>
                        <Column header="Delete?" body={deleteBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    }
    </>
)};

export default StudentList;