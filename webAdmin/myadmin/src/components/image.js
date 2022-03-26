import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function ImageGallary() {
  // const [selectedFile, setSelectedFile] = useState();
  const [loadimage, setLoadImage] = useState([]);
  // const [name, setName] = useState("");
  // const [desc, setDesc] = useState("");
  const [record,setRecord] = useState([]);

  const api ='http://localhost:3001/';

    //reload dữ liệu :D
  //   const refreshPage = ()=>{
  //     window.location.reload();
  //  }
 
  useEffect(() => {
    loadList();
    loadEmployeeDetail();
  }, []);
 
  // danh sách hình ảnh 
  const loadList = async () => {
    const result = await axios.get(api + "listimg/");
    // setLoadImage(result.data.reverse());
    setLoadImage(result.data);
    console.log(result.data);
  };


    // Code load dữ liệu Sản Phẩm
    const loadEmployeeDetail = async() => {
      const base_url = api + 'sanpham/';
      const response = await axios.get(base_url)  // lấy dữ liệu ở trên base_url bằng hàm await 
      console.log(response.data); 
      setRecord(response.data);  // hiển thị
    }
 
 //code thêm hình ảnh
  // const handleSubmission = async (e) => {
  //   // const formData = new FormData();
  //   // formData.append("file", selectedFile);
  //   // formData.append("name", name);
  //   // formData.append("desc", desc);
  //   // await fetch("http://localhost:8000/api/upload", {
  //   //   method: "POST",
  //   //   body: formData,
  //   // })
  //   // .then((result)=>{
  //   //   loadList();
  //   // })
  //   // .catch(()=>{
  //   //   alert('Lỗi khi thêm');
  //   // });
  //   alert("Đang Update :D");
  // };

//code thêm hình ảnh
  // const handleSubmission = async (e) => {
  //   const data = new FormData();
  //   console.log(data);
  //   data.append('file', selectedFile);
  //   data.append("name", name);
  //   // formData.append("desc", desc);
  //   axios.post(api + 'uploadFileAPI/', data)
  //     .then(res =>{
  //       // console.log(res.statusText)
  //       console.log(res.data);
  //       refreshPage();
  //     })
  // }
 
//code xóa hình ảnh 
  // const deleteImage = (productId) => {
  //   console.log("abc" + productId);
  //   axios.get( api + 'deleteimg/'+productId)
  //   .then((result)=>{
  //     loadList();
  //   })
  //   .catch(()=>{
  //     alert('Không thể xóa');
  //   });
  // };

  //code xóa hình ảnh
  // const deleteImage = data => {
  //   console.log(data);
  //   fetch(api + 'deleteimg/', {   
  //     method: 'POST',
  //     headers: {
  //     Accept: 'application/json',
  //   'Content-Type': 'application/json'
  //     },
  //       body: JSON.stringify({
  //         myid: data,
  //       })
  //   })
  //   .then((response) => {
  //     if(response === 1){
  //       alert("xóa thành công")
  //     }
  //   });
  //   refreshPage();
  // }
 
  return (
    <div className="container">
      <h4 className="text-center text-success  ml-4 mb-4 mt-4">Mục Hình Ảnh</h4>
      <div className="row">
        {/* <div className="col-sm-3 p-2 bg-gray">
         <div className="box mr-4" style={{border:"1px solid #b7b7b7",backgroundColor:"#rgb(253 253 253)"}}>
         <h5 className="text-center  ml-4 mb-3 mt-3">Thêm Hình Ảnh</h5>
          <table className="">
            <tbody>
           <tr>
            <td>
              <div className="form-group ml-3">
                <input type="text" name="nameimg" className="mb-4"onChange={(e) => setName(e.target.value)} placeholder="Tên thư mục hình ảnh"/>
              </div>
            </td>
           </tr>
           <tr>
            <td>
             <div className="form-group">
              <input type="file" name="file" className="mb-4" onChange={(e) => setSelectedFile(e.target.files[0])} />
             </div>
            </td>
           </tr>
 
           <tr>
            <td>
             <div className="form-group">
               <button type="submit" onClick={handleSubmission}className="btn btn-success mb-3" name="submit">
                 Thêm 
              </button>
             </div>
            </td>
           </tr>
           </tbody>
          </table>
          </div>
        </div> */}
        <div className="">  {/* <div className="col-sm-9"> */}
          <div className="row">
            {record.map((name) => (
              <div className="col-sm-3" key={name.masanpham}>
                <div className="card mb-3" style={{width:"12rem"}}>

                    {/* <h5><a  href="#0" onClick={() => { 
                                          const confirmBox = window.confirm(
                                            "Bạn chắc chắn muốn xóa Tên Danh Mục : "+ name.tensanpham +""
                                          )
                                          if (confirmBox === true) {
                                              deleteImage(name.masanpham)                       
                                          }
                                      }}
                                      style={{textDecoration:"none",marginLeft:"162px"}}>

                      <span aria-hidden="true" className="text-danger">&times;</span>

                    </a></h5> */}
                    <Link to={`/editimage/${name.masanpham}`}>
                    <img className="card-img-top hover-shadow" src={api + 'images/' + name.mahinhanh} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{height:"110px"}}/>
                    </Link>
                    {/* giải thích đôi chút : Dòng 118 => src={api + 'images/' + name.url} src là mặc định r , api là localhost , images là thư mục trong folder public\images , vô file server xem là biết , name.url là tên của ảnh ảnh , mở console.log là thấy*/}
                   
                    <div className="card-body" >
                    <h6>{name.tensanpham}</h6>
                      <span className="card-text">ID SANPHAM : {name.masanpham}</span>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* <div>
          <img src="http://localhost:3001/images/1647878779241.png"></img>
        </div> */}
      </div>
    </div>
  );
}
export default ImageGallary;