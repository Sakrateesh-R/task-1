import axios from "axios";
import { Table,Navbar,Container, Row, Col, Button, Card, ListGroup,NavbarBrand, FormGroup,NavBrand } from "react-bootstrap";
import{useState,useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";



export default function UserDetail(){
    const api= "http://localhost:5000/Users";
    let {Username} = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [accessData, setAccessData] = useState([]);
    const [adminUser, setAdminUser] = useState([{
        FirstName:"",
        LastName : "",
        Username:"",
        Password:"",
        Age:"",
        Role : "",
        Address : "",
        Phone : ""
    }]);
    const [users,setUser] = useState([{
        FirstName:"",
        LastName : "",
        Username:"",
        Password:"",
        Age:"",
        Role : "",
        Address : "",
        Phone : ""
    }]);
    const navigate = useNavigate();
    /*const loadData = async () => {
        const response = await axios.get(api);
        setAccessData(response.accessData);
    };*/
    
    console.log(users);
    useEffect(() => {
        //loadData();
        const datas = JSON.parse(localStorage.getItem('Users'));
       // console.log(datas)
        setAccessData(datas);
        datas.map( (item) => {
            if(item.Role == "Admin"){

                setIsAdmin(true);   
                setAdminUser([{
                    FirstName: item.FirstName,
                    LastName : item.LastName,
                    Username:item.Username,
                    Password:item.Password,
                    Age:item.Age,
                    Role : item.Role,
                    Address : item.Address,
                    Phone : item.Phone
                }]);
                console.log("adminUser");
                
            }
            if(item.Username == Username){
                setUser([{
                    FirstName: item.FirstName,
                    LastName : item.LastName,
                    Username:item.Username,
                    Password:item.Password,
                    Age:item.Age,
                    Role : item.Role,
                    Address : item.Address,
                    Phone : item.Phone
                }]); 
                //console.log("From user")
                console.log(users)
            };
            
        })
    },[])
    //console.log(loadData());
    const logout = () => {
        toast.success(`Successfully logged out ${Username}`)
        const home = async () =>{
            await navigate(`/`);
         }
         setTimeout(home,5000);

    }
    console.log(users);
    return(
       
        <div>
            <ToastContainer/>
             <Navbar bg="primary" variant="dark" className="justify-content-center">
                <Navbar.Brand >
                    <div>
                        Welcome {Username} 
                    </div>
                </Navbar.Brand>
            </Navbar>
            <Button style={{marginTop:"15px"}} onClick={logout}>Logout</Button>
            <Container style={{paddingTop:"25px"}}>
                 <Card>
                 <h3>Admin user</h3>
                 { Username == "Admin_User"  ? 
                    accessData.map( (items,index) => (  
                   <Card.Body key={index}>
                        <Card.Title>User Profile Details : {index+1}</Card.Title><hr/>
                        <Card.Subtitle className="mb-2 text-muted">Hello... {items.FirstName}</Card.Subtitle>
                        <Card.Text> 
                            <ListGroup >
                                <ListGroup.Item action variant="success" text>
                                    <span>Name : {items.FirstName} {items.LastName}</span> <br/>
                                </ListGroup.Item>
                                <ListGroup.Item action variant="success">
                                    <span>Age : {items.Age} </span> <br/>
                                </ListGroup.Item>
                                <ListGroup.Item action variant="success">
                                    <span>UserName : {items.Username} </span> <br/>
                                </ListGroup.Item>
                                <ListGroup.Item action variant="success">
                                    <span>Role : {items.Role} </span> <br/>
                                </ListGroup.Item>
                                <ListGroup.Item action variant="success">
                                    <span>  Address : {items.Address} </span> <br/>
                                </ListGroup.Item>
                                <ListGroup.Item action variant="success">
                                    <span>Phone no : {items.Phone} </span> <br/>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                    )) : 
                    users.map( (item,index) => (  
                        <Card.Body key={index}>
                             <Card.Title>Your Profile Details</Card.Title><hr/>
                             <Card.Subtitle className="mb-2 text-muted">Hello... {item.FirstName}</Card.Subtitle>
                             <Card.Text> 
                                 <ListGroup >
                                     <ListGroup.Item action variant="success" text>
                                         <span>Name : {item.FirstName} {item.LastName}</span> <br/>
                                     </ListGroup.Item>
                                     <ListGroup.Item action variant="success">
                                         <span>Age : {item.Age} </span> <br/>
                                     </ListGroup.Item>
                                     <ListGroup.Item action variant="success">
                                         <span>UserName : {item.Username} </span> <br/>
                                     </ListGroup.Item>
                                     <ListGroup.Item action variant="success">
                                         <span>Role : {item.Role} </span> <br/>
                                     </ListGroup.Item>
                                     <ListGroup.Item action variant="success">
                                         <span>  Address : {item.Address} </span> <br/>
                                     </ListGroup.Item>
                                     <ListGroup.Item action variant="success">
                                         <span>Phone no : {item.Phone} </span> <br/>
                                     </ListGroup.Item>
                                 </ListGroup>
                             </Card.Text>
                         </Card.Body>
                        ))};
                </Card>
               
            </Container>  
        </div>
       )
}