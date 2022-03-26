// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useState, useEffect} from "react";
// import axios from "axios";
// import { Link} from 'react-router-dom';
 
// function EmployeeDetail()
// {
//   const [search,setSearch] =useState('');
//   const [record,setRecord] = useState([]);
 
//   const [user, setUser] = useState({
//     fname: "",
//     lname: "",
//     email: "",
//     phone: "",
//     salary: ""
//   });
  
//     //  Object Destructuring 
//     const { fname, lname, email,phone,salary} = user;
//     const onInputChange = e => {
//       setUser({ ...user, [e.target.name]: e.target.value });
//     };
     
//     // On Page load display all records 
//     const loadEmployeeDetail = async () =>  
//     {
//       var response = fetch('http://localhost:5000/api/v1/employee')
//          .then(function(response){
//             return response.json();
//           })
//          .then(function(myJson) {
//             setRecord(myJson);
//           });
//     }
//     useEffect(() => {
//       loadEmployeeDetail();
//     }, []);
 
//     // Insert Employee Records 
//     const submitEmployeeRecord = async (e) => {
//         e.preventDefault();
//         e.target.reset();
//         await axios.post("http://localhost:5000/api/v1/employee",user);
//         alert('Data Inserted');
         
//         loadEmployeeDetail();
//     };
     
//     // Search Records here 
//     const searchRecords = () =>
//     {
//         alert(search)
//         axios.get(`http://localhost:5000/api/v1/employee/searchRecord/${search}`)
//         .then(response => {
//           setRecord(response.data);
//         });
//     }
     
//     // Delete Employee Record
//     const deleteRecord = (productId) =>
//     {
//       axios.delete(`http://localhost:5000/api/v1/employee/${productId}`)
//       .then((result)=>{
//         loadEmployeeDetail();
//       })
//       .catch(()=>{
//         alert('Error in the Code');
//       });
//     };
 
//   return(
//     <section>    
   
//     <div class="container">  
//     <h4 className="mb-3 text-center mt-4">CRUD Operation in MERN</h4>
//       <div class="row mt-3">
//        <div class="col-sm-4">
//           <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>
//             <form onSubmit={submitEmployeeRecord}> 
//             <h5 className="mb-3 ">Insert Employee Records</h5>
//                 <div class="form-group">
//                    <input type="text" class="form-control  mb-4" name="fname"   value={fname} onChange={e => onInputChange(e)} placeholder="Enter name" required=""/>
//                 </div>
                  
//                 <div class="form-group">
//                    <input type="text" class="form-control  mb-4" name="lname" value={lname} onChange={e => onInputChange(e)}  placeholder="Enter Sirname" required=""/>
//                 </div>
     
//                 <div class="form-group">
//                    <input type="text" class="form-control mb-4" name="email" value={email} onChange={e => onInputChange(e)}  placeholder="Enter Email" required=""/>
//                 </div>
               
//                 <div class="form-group">
//                    <input type="text" class="form-control mb-4" name="phone" value={phone} onChange={e => onInputChange(e)}  placeholder="Enter Phone" required=""/>
//                 </div>
 
//                 <div class="form-group">
//                    <input type="text" class="form-control mb-2" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="Enter Salary" required=""/>
//                 </div>
//                 <button type="submit" class="btn btn-primary btn-block mt-4">Insert Record</button>
//              </form>
//         </div>
//       </div>
//       <div class="col-sm-8">
//         <h5 class="text-center  ml-4 mt-4  mb-5">View Records</h5>
//         <div class="input-group mb-4 mt-3">
//           <div class="form-outline">
//            <input type="text" id="form1" onChange={(e)=>setSearch(e.target.value)} class="form-control" placeholder="Search Employee Here" style={{backgroundColor:"#ececec"}}/>
//         </div>
//         <button type="button" onClick={searchRecords}  class="btn btn-success">
//             <i class="fa fa-search" aria-hidden="true"></i>
//         </button>
//         </div>  
//         <table class="table table-hover  table-striped table-bordered ml-4 ">
//             <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Surname</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Salary</th>
//                 <th>Action</th>
//             </tr>
//             </thead>
//             <tbody>
     
//             {record.map((name)=>
//                 <tr>
//                 <td>{name.first_name}</td>
//                 <td>{name.last_name}</td>
//                 <td>{name.email}</td>
//                 <td>{name.phone}</td>
//                 <td>{name.salary}</td>
//                 <td>
//                       <a  className="text-danger mr-2"
//                         onClick={() => {
//                           const confirmBox = window.confirm(
//                             "Do you really want to delete "+ name.first_name
//                           )
//                           if (confirmBox === true) {
//                             deleteRecord(name.id)
//                           }
//                         }}> <i class="far fa-trash-alt" style={{fontSize:"18px",marginRight:"5px"}}></i> </a>
                   
//                     <Link class=" mr-2" to={`/EditEmployee/editID/${name.id}`}>
//                        <i class="fa fa-edit" aria-hidden="true"></i> 
//                     </Link>
//                 </td>
//                 </tr>
//                 )} 
//             </tbody>
//         </table>
//       </div>
//       </div>
//     </div>
//    </section>
//   )
// }
 
// export default EmployeeDetail;


// import React from "react";


function Home (){

  

    

    return (
      <div>
        <h1> Thêm Tài Khoản --- Thông tin tài khoản --- admin-User </h1>
      </div>
    );
  
}
export default Home;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useHistory, useParams } from "react-router-dom";
 
// const EditEmployee = () => {
   
//   let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
//   const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
  
 
//   const [user ,setUser] = useState({
//       fname:"",
//       lname:"",
//       email:"",
//       phone:"",
//       salary:""
//   })
 
 
//   const { fname, lname, email, phone, salary } = user;
 
//   const onInputChange = e => {
//     setUser({ ...user,[e.target.name]: e.target.value });
//   };
 
//   useEffect(() => {
//     loadUser();
//   }, []);
 
   
//   const updateEmployee = async e => {
//     e.preventDefault();
//     await axios.put(`http://localhost:5000/api/v1/employee/${id}`, user);
//     history.push("/");
//   };
 
//   const loadUser =  () => {
//     fetch(`http://localhost:5000/api/v1/employee/${id}`,{
//             method: "GET",
//           })
//             .then((response) => response.json())
//             .then((result) => {
//                 console.log(result);
//         setUser({
//                     id: id,
//                     update: true,
//                     fname: result.response[0].first_name,
//           lname: result.response[0].last_name,
//           email: result.response[0].email,
//           phone: result.response[0].phone,
//           salary: result.response[0].salary,
 
//                 });
//             })
//             .catch((error) => console.log("error", error));
//   };
 
//   return (
//     <div className="container">
//      <div className="row mt-4"> 
//       <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
//         <h4 className="text-center mb-4">Edit Danh Mục</h4>
       
//           <h5 className="text-success">Employee ID : {user.id} </h5>
//           <div className="form-group mb-3">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Tên Danh Mục"
//               name="fname"
//               value={fname}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <div className="form-group mb-3">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="ID Danh Mục Cha"
//               name="lname"
//               value={lname}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           {/* <div className="form-group mb-3">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Product Description"
//               name="email"
//               value={email}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <div className="form-group mb-3">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Product Description"
//               name="phone"
//               value={phone}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <div className="form-group mb-3">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Product Description"
//               name="salary"
//               value={salary}
//               onChange={e => onInputChange(e)}
//             />
//           </div> */}
//           <button onClick={updateEmployee} className="btn btn-secondary btn-block">Update Danh Mục</button>
       
//        </div>
//       </div> 
//     </div>
//   );
// };
 
// export default EditEmployee;