import {React, useState} from 'react';
import { Button, Form, Dropdown, Accordion,ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import './form.css';

function FormDetails() {
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

  const [showHistory, setShowHistory] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [bgButton, setBgButton] = useState('light');
  const [history, setHistory] = useState([]);

  const setShow = () => {
    setShowForm(!showForm);
  }
  const bgButtonSet = () => {
    setBgButton('light');
  }

  const onSubmit = event => {
    // history.push(empHistory);
    setHistory(oldArray => [...oldArray, empHistory]);
    event.preventDefault();
    setShowHistory(true)
    setShowForm(!showForm);
  }

  let FormHistory = () => {
    console.log(history)
    if(history.length !== 0) {
      return history.map((dep, i) => {
        return (
          <>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{backgroundColor: "white"}}><strong>{dep.job}</strong>
                <br />
                {dep.start_date} - {dep.end_date}
              </Accordion.Header>
              <Accordion.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group role='form' className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label className="text-muted text-label font-weight-bold">Job Title </Form.Label>
                      <Form.Control type="text" value={dep.job} required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, job: event.target.value}))}/>
                    </Col>
                    <Col>
                      <Form.Label className="text-muted text-label font-weight-bold">Employer  </Form.Label>
                      <Form.Control type="text" value={dep.employer} required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, employer: event.target.value }))}/>
                    </Col>
                  </Row>  
                  <Row>
                    <Col>
                      <Row>
                        <Col className='col-lg-6'>
                          <Form.Label className="text-muted text-label font-weight-bold">Start Date </Form.Label>
                          <Form.Control type="date" value={dep.start_date} required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, start_date: event.target.value }))}/>
                        </Col>
                        <Col className='col-lg-6'>
                          <Form.Label className="text-muted text-label font-weight-bold"> End Date  </Form.Label>
                          <Form.Control type="date" value={dep.end_date} required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, end_date: event.target.value }))}/>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Form.Label className="text-muted text-label font-weight-bold">City  </Form.Label>
                      <Form.Control type="text" value={dep.city} required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, city: event.target.value }))}/>
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
                    value={dep.description}
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

  const HistoryDefault = event => {
    // event.preventDefault()
    // return (
    //   <Accordion defaultActiveKey="0">
    //     <Accordion.Item eventKey="0">
    //       <Accordion.Header style={{backgroundColor: "white"}}><strong>(Not Specified)</strong></Accordion.Header>
    //       <Accordion.Body>
    //       <Form onSubmit={onSubmit}>
    //         <Form.Group role='form' className="mb-3">
    //           <Row>
    //             <Col>
    //               <Form.Label className="text-muted text-label font-weight-bold">Job Title </Form.Label>
    //               <Form.Control type="text" required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, job: event.target.value}))}/>
    //             </Col>
    //             <Col>
    //               <Form.Label className="text-muted text-label font-weight-bold">Employer  </Form.Label>
    //               <Form.Control type="text" required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, employer: event.target.value }))}/>
    //             </Col>
    //           </Row>  
    //           <Row>
    //             <Col>
    //               <Row>
    //                 <Col className='col-lg-6'>
    //                   <Form.Label className="text-muted text-label font-weight-bold">Start Date </Form.Label>
    //                   <Form.Control type="date" required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, start_date: event.target.value }))}/>
    //                 </Col>
    //                 <Col className='col-lg-6'>
    //                   <Form.Label className="text-muted text-label font-weight-bold"> End Date  </Form.Label>
    //                   <Form.Control type="date" required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, end_date: event.target.value }))}/>
    //                 </Col>
    //               </Row>
    //             </Col>
    //             <Col>
    //               <Form.Label className="text-muted text-label font-weight-bold">City  </Form.Label>
    //               <Form.Control type="text" required onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, city: event.target.value }))}/>
    //             </Col>
    //           </Row>  
    //           <Form.Label className="text-muted text-label font-weight-bold">Description </Form.Label>
    //           <ReactQuill
    //             theme="snow"
    //             modules={modules}
    //             formats={formats}
    //             placeholder="e.g Passionate science teacher with 8+ years of experience and a track record of ..."
    //             onChange={event => setEmpHistory(previousInputs => ({ ...previousInputs, description: event }))}
    //             style={{ height: "220px" }}
    //             className='mb-5'
    //           >
    //           </ReactQuill>
    //           <Button variant="primary" type="submit">
    //             Save
    //           </Button>
    //         </Form.Group>
    //         </Form>
    //       </Accordion.Body>
    //     </Accordion.Item>
    //   </Accordion>
    // )
  }

  let listSkill = [
    'Java', 'Javascript', 'Python', 'Git', 'SQL', 'C++', 'TypeScript', 'C#', 'Docker', 'PHP', 'React', 'MongoDB', 'Toad', 'HTML CSS 3', 'MS SQL Server'
  ]

  const Skills = () => {
    return listSkill.map((dep, i) => {
      return (
        <Button onClick={bgButtonSet} variant={bgButton} className='m-1'>
          {dep} +
        </Button>
        )
    })
  }

  return (
    <>
    <Container className='mt-3'>
      <Row className="justify-content-md-center">
        <Col xs={6} md={7}>
          <Form>
          <Form.Label style={{fontSize: "18px"}}><b>Personal Details</b></Form.Label>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Wanted Job Title  </Form.Label>
                  <Form.Control type="text" />
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Upload Foto</Form.Label>
                  <Form.Control type="file" />
                </Col>
              </Row>  
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">First Name  </Form.Label>
                  <Form.Control type="text"/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Last Name  </Form.Label>
                  <Form.Control type="text"/>
                </Col>
              </Row>  
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Email </Form.Label>
                  <Form.Control type="email"/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Phone </Form.Label>
                  <Form.Control type="tel "/>
                </Col>
              </Row>  
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Country </Form.Label>
                  <Form.Control type="text"/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">City </Form.Label>
                  <Form.Control type="text"/>
                </Col>
              </Row>  
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Address </Form.Label>
                  <Form.Control type="text"/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Postal Code </Form.Label>
                  <Form.Control type="text"/>
                </Col>
              </Row>  
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Driving License </Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" style={{width:"100%", textAlign:"left", backgroundColor:"white", color:"black"}}>
                      {/* <Form.Label className="text-muted font-weight-bold">Select Driving License </Form.Label> */}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="A">A</Dropdown.Item>
                      <Dropdown.Item eventKey="B1">B1</Dropdown.Item>
                      <Dropdown.Item eventKey="B2">B2</Dropdown.Item>
                      <Dropdown.Item eventKey="C">C</Dropdown.Item>
                      <Dropdown.Item eventKey="D">D</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Nationality </Form.Label>
                  <Form.Control type="text"/>
                </Col>
              </Row>  
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Row>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Place Of Birth </Form.Label>
                  <Form.Control type="text"/>
                </Col>
                <Col>
                  <Form.Label className="text-muted text-label font-weight-bold">Date of Birth </Form.Label>
                  <Form.Control type="date"/>
                </Col>
              </Row>  
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
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
                      <Button variant="primary" type="submit">
                        Save
                      </Button>
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
          <Form>
            <Form.Label><b>Skills</b></Form.Label>
            <p>Choose 5 of the most important skills to show your talents! Make sure they match the keywords of the job listing if applying via an online system.</p>
            <Skills />
            {showForm && (
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header style={{backgroundColor: "white"}}><strong>(Click Skill)</strong></Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col>
                          <Form.Label className="text-muted text-label font-weight-bold">Skill </Form.Label>
                          <Form.Control type="text" />
                        </Col>
                        <Col>
                          <Form.Label className="text-muted text-label font-weight-bold">Level - Experienced </Form.Label>
                          <br/>
                          <ButtonGroup aria-label="Basic example">
                            <Button variant="primary" style={{width:"70px", height: "35px"}}></Button>
                            <Button variant="secondary" style={{width:"70px", height: "35px"}}></Button>
                            <Button variant="warning" style={{width:"70px", height: "35px"}}></Button>
                            <Button variant="danger" style={{width:"70px", height: "35px"}}></Button>
                            <Button variant="success" style={{width:"70px", height: "35px"}}></Button>
                          </ButtonGroup>
                        </Col>
                      </Row>  
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
            <Container>
              <p className='text-primary font-weight-bold mt-2' onClick={setShow}>+ Add one more skill</p>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default FormDetails;