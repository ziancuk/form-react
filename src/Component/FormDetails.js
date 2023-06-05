import {React, useState, ChangeEvent} from 'react';
import { Button, Form, Dropdown, Accordion,ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import './form.css';
import GetApi from "../GetApi"; 
import Swal from "sweetalert2";

function FormDetails() {
  const {http} = GetApi();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  let modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  let formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  const handleProcedureContentChange = (content) => {
    console.log("content---->", content);
  };

  const [empHistory, setEmpHistory] = useState({
    job: "",
    employer: "",
    start_date: "",
    end_date: "",
    city: "",
    description: "",
  })

  const [employee, setEmployee] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    pos: "",
    driving: "",
    nationality: "",
    place: "",
    birthdate: "",
  })

  const [buttonLevel, setButtonLevel] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
  })

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(e.target.files[0]);
    }
  };

  const [showHistory, setShowHistory] = useState(false);
  const [picture, setPicture] = useState('');
  const [showListSkill, setShowListSkill] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFormSkill, setShowFormSkill] = useState(false);
  const [initLevel, setInitLevel] = useState('');
  const [initButton, setInitButton] = useState('light');
  const [history, setHistory] = useState([]);
  const [skill, setSkill] = useState([]);

  const setShow = () => {
    setShowForm(!showForm);
  }
  const setShowSkill = () => {
    setShowFormSkill(!showFormSkill);
  }

  const onSubmit = event => {
    setHistory(oldArray => [...oldArray, empHistory]);
    event.preventDefault();
    setShowHistory(true)
    setShowForm(!showForm);
  }

  const [addSkill, setAddSkill] = useState({
    skill: "",
    bg: "",
    bgChild: "",
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    level: "",
  })

  const onSave = event => {
    setSkill(oldArray => [...oldArray, addSkill]);
    event.preventDefault();
    setShowListSkill(true)
    setShowFormSkill(!showFormSkill);

  }

  let FormHistory = () => {
    if(history.length !== 0) {
      return history.map((dep, i) => {
        return (
          <>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{backgroundColor: "white"}}><strong>{dep.job}</strong>
                <br />
                <span className='text-muted'>{dep.start_date} - {dep.end_date}</span>
              </Accordion.Header>
              <Accordion.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group role='form' className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label className="text-muted text-label font-weight-bold">Job Title </Form.Label>
                      <Form.Control type="text" defaultValue={dep.job} required/>
                    </Col>
                    <Col>
                      <Form.Label className="text-muted text-label font-weight-bold">Employer  </Form.Label>
                      <Form.Control type="text" defaultValue={dep.employer} required/>
                    </Col>
                  </Row>  
                  <Row>
                    <Col>
                      <Row>
                        <Col className='col-lg-6'>
                          <Form.Label className="text-muted text-label font-weight-bold">Start Date </Form.Label>
                          <Form.Control type="date" defaultValue={dep.start_date} required/>
                        </Col>
                        <Col className='col-lg-6'>
                          <Form.Label className="text-muted text-label font-weight-bold"> End Date  </Form.Label>
                          <Form.Control type="date" defaultValue={dep.end_date} required/>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Form.Label className="text-muted text-label font-weight-bold">City  </Form.Label>
                      <Form.Control type="text" defaultValue={dep.city} required/>
                    </Col>
                  </Row>  
                  <Form.Label className="text-muted text-label font-weight-bold">Description </Form.Label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="e.g Passionate science teacher with 8+ years of experience and a track record of ..."
                    style={{ height: "220px" }}
                    className='mb-5'
                    defaultValue={dep.description}
                  >
                  </ReactQuill>
                </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br/>
          </>
          )
      })
    }
  }

  let FormSkill = () => {
    if(skill.length !== 0) {
      console.log(skill)
      return skill.map((dep, i) => {
        return (
        <Accordion defaultActiveKey="1" className='my-2'>
          <Accordion.Item eventKey="0">
            <Accordion.Header style={{backgroundColor: "white"}}><strong>{dep.skill}</strong>
              <br />
              <span className='text-muted'>{dep.level}</span>
              </Accordion.Header>
              <Accordion.Body>
              <Form onSubmit={onSave}>
                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label className="text-muted text-label font-weight-bold">Skill </Form.Label>
                      <Form.Control type="text" defaultValue={dep.skill}/>
                    </Col>
                    <Col>
                      <Form.Label className="text-muted text-label font-weight-bold">Level - {initLevel} </Form.Label>
                      <br/>
                      <ButtonGroup aria-label="Basic example">
                        <Button key='1' className={dep.a ? dep.bg : dep.bgChild} variant="light" style={{width:"70px", height: "35px"}} onClick={() => handleBgForm(i,'bg-parent-green', 'bg-child-green', 'Novice','a')}></Button>
                        <Button key='2' className={dep.b ? dep.bg : dep.bgChild} variant="light" style={{width:"70px", height: "35px", borderLeft: '1px black solid'}} onClick={() => handleBgForm(i,'bg-parent-red', 'bg-child-red', 'Advance Programmer','b')}></Button>
                        <Button key='3' className={dep.c ? dep.bg : dep.bgChild} variant="light" style={{width:"70px", height: "35px", borderLeft: '1px black solid'}} onClick={() => handleBgForm(i,'bg-parent-blue', 'bg-child-blue', 'Competent','c')}></Button>
                        <Button key='4' className={dep.d ? dep.bg : dep.bgChild} variant="light" style={{width:"70px", height: "35px", borderLeft: '1px black solid'}} onClick={() => handleBgForm(i,'bg-parent-yellow', 'bg-child-yellow', 'Proficient','d')}></Button>
                        <Button key='5' className={dep.e ? dep.bg : dep.bgChild} variant="light" style={{width:"70px", height: "35px", borderLeft: '1px black solid'}} onClick={() => handleBgForm(i,'bg-parent-purple', 'bg-child-purple', 'Expert','e')}></Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        )
      })
    }
  }

  let [listSkill, setListSkill] = useState([
    { name: 'Java', bg: 'light', X: '+'},
    { name: 'Python', bg: 'light', X: '+'},
    { name: 'Javascript', bg: 'light', X: '+'},
    { name: 'Git', bg: 'light', X: '+'},
    { name: 'SQL', bg: 'light', X: '+'},
    { name: 'C++', bg: 'light', X: '+'},
    { name: 'TypeScript', bg: 'light', X: '+'},
    { name: 'Docker', bg: 'light', X: '+'},
    { name: 'PHP', bg: 'light', X: '+'},
    { name: 'React', bg: 'light', X: '+'},
    { name: 'MongoDB', bg: 'light', X: '+'},
    { name: 'HTML CSS 3', bg: 'light', X: '+'},
    { name: 'MS SQL Server', bg: 'light', X: '+'},
  ])

  const handleBgSkill = (e) => {
    let newState = [...listSkill];
    newState[e].bg = 'primary';
    newState[e].X = '';
    setListSkill(newState)
  }
  const handleBgForm = (e, parent, child, lev, data) => {
    let newState = [...skill];
    console.log(e)
    newState[e].bg = parent;
    newState[e].bgChild = child;
    newState[e].level = lev;
    setSkill(newState)

      if(data == 'a') {
            newState[e].a= true
            newState[e].b= false
            newState[e].c= false
            newState[e].d= false
            newState[e].e= false
      }
      if(data == 'b') {
            newState[e].a= false
            newState[e].b= true
            newState[e].c= false
            newState[e].d= false
            newState[e].e= false
      }
      if(data == 'c') {
            newState[e].a= false
            newState[e].b= false
            newState[e].c= true
            newState[e].d= false
            newState[e].e= false
      }
      if(data == 'd') {
            newState[e].a= false
            newState[e].b= false
            newState[e].c= false
            newState[e].d= true
            newState[e].e= false
      }
      if(data == 'e') {
            newState[e].a= false
            newState[e].b= false
            newState[e].c= false
            newState[e].d= false
            newState[e].e= true
    }

  }
  const Skills = () => {
    return listSkill.map((dep, i) => {
      return (
        <Button onClick={() => handleBgSkill(i)} variant={dep.bg} className='m-1'>
          {dep.name} {dep.X}
        </Button>
        )
    })
  }

  const handleButton = (data) => {
    if(data == 'a') {
      setButtonLevel(
        {
          a: true,
          b: false,
          c: false,
          d: false,
          e: false,
        }
      )
      setInitButton('bg-child-green')
      setAddSkill(previousInputs => ({ ...previousInputs, bg: 'bg-parent-green'}))
      setAddSkill(previousInputs => ({ ...previousInputs, bgChild: 'bg-child-green'}))
      setAddSkill(previousInputs => ({ ...previousInputs, a: true}))
      setInitLevel('Novice')
      setAddSkill(previousInputs => ({ ...previousInputs, level: 'Novice'}))
    }
    if(data == 'b') {
      setButtonLevel(
        {
          a: false,
          b: true,
          c: false,
          d: false,
          e: false,
        }
      )
      setInitButton('bg-child-red')
      setAddSkill(previousInputs => ({ ...previousInputs, bg: 'bg-parent-red'}))
      setAddSkill(previousInputs => ({ ...previousInputs, bgChild: 'bg-child-red'}))
      setAddSkill(previousInputs => ({ ...previousInputs, b: true}))
      setAddSkill(previousInputs => ({ ...previousInputs, level: 'Advance Beginner'}))
      setInitLevel('Advance Beginner')
    }
    if(data == 'c') {
      setButtonLevel(
        {
          a: false,
          b: false,
          c: true,
          d: false,
          e: false,
        }
      )
      setInitButton('bg-child-blue')
      setAddSkill(previousInputs => ({ ...previousInputs, bg: 'bg-parent-red'}))
      setAddSkill(previousInputs => ({ ...previousInputs, bgChild: 'bg-child-red'}))
      setAddSkill(previousInputs => ({ ...previousInputs, c: true}))
      setAddSkill(previousInputs => ({ ...previousInputs, level: 'Competent'}))
      setInitLevel('Competent')
    }
    if(data == 'd') {
      setButtonLevel(
        {
          a: false,
          b: false,
          c: false,
          d: true,
          e: false,
        }
      )
      setInitButton('bg-child-yellow')
      setAddSkill(previousInputs => ({ ...previousInputs, bg: 'bg-parent-red'}))
      setAddSkill(previousInputs => ({ ...previousInputs, bgChild: 'bg-child-red'}))
      setAddSkill(previousInputs => ({ ...previousInputs, d: true}))
      setAddSkill(previousInputs => ({ ...previousInputs, level: 'Proficient'}))
      setInitLevel('Proficient')
    }
    if(data == 'e') {
      setButtonLevel(
        {
          a: false,
          b: false,
          c: false,
          d: false,
          e: true,
        }
      )
      setInitButton('bg-child-purple')
      setAddSkill(previousInputs => ({ ...previousInputs, bg: 'bg-parent-red'}))
      setAddSkill(previousInputs => ({ ...previousInputs, bgChild: 'bg-child-red'}))
      setAddSkill(previousInputs => ({ ...previousInputs, e: true}))
      setAddSkill(previousInputs => ({ ...previousInputs, level: 'Expert'}))
      setInitLevel('Expert')
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    employee.picture = picture
    http.post('employee/create', employee)
    .then((res) => {
      Toast.fire({
        icon: "success",
        title: `Success`,
        text: 'Proses Successfully',
      })
      setTimeout(function() {window.location.reload(false)}, 3000)
    })

    .catch((error) => {
      Toast.fire({
        icon: "error",
        title: `Error`,
        text: error.response.data.error_message,
      });
    })
  }

  return (
    <>
    <Container className='mt-3'>
      <Row className="justify-content-md-center">
        <Col xs={6} md={7}>
          <Form onSubmit={handleSubmitForm}>
          <Form.Label style={{fontSize: "18px"}}><b>Personal Details</b></Form.Label>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Wanted Job Title  </Form.Label>
                  <Form.Control type="text" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, title: event.target.value}))} required/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Upload Foto</Form.Label>
                  <Form.Control onChange={handleFileChange} type='file' accept=".png,.jpg,.jpeg,.webp" required/>
                </Col>
              </Row>  

              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">First Name  </Form.Label>
                  <Form.Control type="text" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, firstname: event.target.value}))} required/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Last Name  </Form.Label>
                  <Form.Control type="text" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, lastname: event.target.value}))}/>
                </Col>
              </Row>  
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Email </Form.Label>
                  <Form.Control type="email" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, email: event.target.value}))} required/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Phone </Form.Label>
                  <Form.Control type="number" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, phone: event.target.value}))} required/>
                </Col>
              </Row>  
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Country </Form.Label>
                  <Form.Control type="text" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, country: event.target.value}))} required/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">City </Form.Label>
                  <Form.Control type="text" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, city: event.target.value}))} required/>
                </Col>
              </Row>  
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Address </Form.Label>
                  <Form.Control type="text" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, address: event.target.value}))} required/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Postal Code </Form.Label>
                  <Form.Control type="number" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, pos: event.target.value}))} required/>
                </Col>
              </Row>  
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Driving License </Form.Label>
                  {/* <Form.Control type="text"/> */}
                  <Form.Control
                    as="select"
                    // value={type}
                    onChange={event => setEmployee(previousInputs => ({ ...previousInputs, driving: event.target.value}))}
                  >
                    <option value="Select License">Select License</option>
                    <option value="A">A</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C">X</option>
                    <option value="d">D</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Nationality </Form.Label>
                  <Form.Control type="text" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, nationality: event.target.value}))}/>
                </Col>
              </Row>  
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Place Of Birth </Form.Label>
                  <Form.Control type="text" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, place: event.target.value}))}/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Date of Birth </Form.Label>
                  <Form.Control type="date" onChange={event => setEmployee(previousInputs => ({ ...previousInputs, birthdate: event.target.value}))}/>
                </Col>
              </Row>
              <Row className='my-4'>
                <Col>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col xs={6} md={7}>
          <Form>
            <Form.Label className="text-muted text-label font-weight-bold"><b>Professional Summary</b></Form.Label>
            <p>Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest achievements, best qualities and skills.</p>
          </Form>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="e.g Passionate science teacher with 8+ years of experience and a track record of ..."
            onChange={handleProcedureContentChange}
            style={{ height: "220px" }}
            className='mb-5'
          >
          </ReactQuill>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col xs={6} md={7}>
            <Form.Label><b>Employeement History</b></Form.Label>
            <p className='text-muted'>Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X. Measured by Y, by doing Z).</p>
            {showHistory && (
              <FormHistory />
            )}
            {showForm && (
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header style={{backgroundColor: "white"}}><strong>(Not Specified)</strong></Accordion.Header>
                  <Accordion.Body>
                  <Form onSubmit={onSubmit}>
                    <Form.Group role='form' className="mb-3">
                      <Row>
                        <Col>
                          <Form.Label className="text-muted text-label font-weight-bold">Job Title </Form.Label>
                          <Form.Control type="text" required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, job: event.target.value}))}/>
                        </Col>
                        <Col>
                          <Form.Label className="text-muted text-label font-weight-bold">Employer  </Form.Label>
                          <Form.Control type="text" required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, employer: event.target.value }))}/>
                        </Col>
                      </Row>  
                      <Row>
                        <Col>
                          <Row>
                            <Col className='col-lg-6'>
                              <Form.Label className="text-muted text-label font-weight-bold">Start Date </Form.Label>
                              <Form.Control type="date" required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, start_date: event.target.value }))}/>
                            </Col>
                            <Col className='col-lg-6'>
                              <Form.Label className="text-muted text-label font-weight-bold"> End Date  </Form.Label>
                              <Form.Control type="date" required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, end_date: event.target.value }))}/>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Form.Label className="text-muted text-label font-weight-bold">City  </Form.Label>
                          <Form.Control type="text" required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, city: event.target.value }))}/>
                        </Col>
                      </Row>  
                      <Form.Label className="text-muted text-label font-weight-bold">Description </Form.Label>
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="e.g Passionate science teacher with 8+ years of experience and a track record of ..."
                        onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, description: event }))}
                        style={{ height: "220px" }}
                        className='mb-5'
                      >
                      </ReactQuill>
                      <Row>
                      <Col className='my-2'>
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
            <Container>
              <p className='text-primary font-weight-bold mt-2' onClick={setShow} style={{cursor: 'pointer'}}>+ Add employment</p>
            </Container>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5 mb-5">
        <Col xs={6} md={7}>
            <Form.Label><b>Skills</b></Form.Label>
            <p>Choose 5 of the most important skills to show your talents! Make sure they match the keywords of the job listing if applying via an online system.</p>
            <Skills />
            {showListSkill && (
              <FormSkill />
            )}
            {showFormSkill && (
              <Accordion defaultActiveKey="0" className='my-2'>
                <Accordion.Item eventKey="0">
                  <Accordion.Header style={{backgroundColor: "white"}}><strong>(Not Specified)</strong></Accordion.Header>
                  <Accordion.Body>
                  <Form onSubmit={onSave}>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col>
                          <Form.Label className="text-muted text-label font-weight-bold">Skill </Form.Label>
                          <Form.Control type="text" onChange={event => setAddSkill(previousInputs => ({ ...previousInputs, skill: event.target.value}))}/>
                        </Col>
                        <Col>
                          <Form.Label className="text-muted text-label font-weight-bold">Level - {initLevel} </Form.Label>
                          <br/>
                          <ButtonGroup aria-label="Basic example">
                            <Button key='1' className={buttonLevel.a ? 'bg-parent-green' : initButton} variant="light" style={{width:"70px", height: "35px"}} onClick={() => handleButton('a')}></Button>
                            <Button key='2' className={buttonLevel.b ? 'bg-parent-red' : initButton} variant="light" style={{width:"70px", height: "35px", borderLeft: '1px black solid'}} onClick={() => handleButton('b')}></Button>
                            <Button key='3' className={buttonLevel.c ? 'bg-parent-blue' : initButton} variant="light" style={{width:"70px", height: "35px", borderLeft: '1px black solid'}} onClick={() => handleButton('c')}></Button>
                            <Button key='4' className={buttonLevel.d ? 'bg-parent-yellow' : initButton} variant="light" style={{width:"70px", height: "35px", borderLeft: '1px black solid'}} onClick={() => handleButton('d')}></Button>
                            <Button key='5' className={buttonLevel.e ? 'bg-parent-purple' : initButton} variant="light" style={{width:"70px", height: "35px", borderLeft: '1px black solid'}} onClick={() => handleButton('e')}></Button>
                          </ButtonGroup>
                        </Col>
                      </Row>
                      <Row>
                      <Col className='my-3'>
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
          <Container>
            <p className='text-primary font-weight-bold mt-2' onClick={setShowSkill} style={{cursor: 'pointer'}}>+ Add one more skill</p>
          </Container>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default FormDetails;