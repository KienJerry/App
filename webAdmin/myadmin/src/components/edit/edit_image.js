import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
 
const EditEmployee = () => {
  let history = useHistory(); //hàm history.
  const api ='http://localhost:3001/';
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 
 
    //reload dữ liệu :D
    const refreshPage = ()=>{
      window.location.reload();
   }

  const[list_trademark, setlist_trademark] = useState([]);
  //Tạo useState id cha và tên
  const [trademarkname ,settrademarkname] = useState({
    image:"",
    name_trademark:"",
    name_trademark_email:"",
    name_trademark_address:"",
  })
  const { image, name_trademark } = trademarkname;

      //code xóa hình ảnh
  const deleteImage = data => {
    console.log(data);
    fetch(api + 'deleteimgsp/', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: data,
        })
    })
    .then((response) => {
      if(response === 1){
        alert("xóa thành công")
      }
    });
    refreshPage();
  }

    //code update hình ảnh 
    const getimgedit = (e) =>{
     const data = new FormData();
     console.log(data)
     data.append('idsanpham', id);
     for(var i = 0 ; i < e.target.files.length; i++){
        data.append('file', e.target.files[i]);
     }
     axios.post(api + "upload-multiple-images", data) 
     .then(response => {
       console.log("Tên hình ảnh new : " + response)
    })
    // refreshPage(); 
    }

  useEffect(() => {
    getsanpham();
    getimageidsanpham();
  }, []);

  //code update
  const updateEmployee = async e => {
    history.push("/image");
  };

  // code hiển thị id sản phẩm
  const getsanpham =  async() => {
    console.log(id);

            const base_url = api + `editsanpham/${id}`;
            const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
            console.log(response.data); 
            // setcategory(response.data);  // hiển thị
            console.log(response.data[0].tensanpham);
            settrademarkname({
                    update: true,
                    name_trademark:response.data[0].tensanpham,
                    name_trademark_email:response.data[0].loaisanpham,
                    name_trademark_address:response.data[0].giasanpham,
                    details:response.data[0].chitietsanpham,
                    manufacturer:response.data[0].hangsanxuat,
                    image:response.data[0].mahinhanh,
                    trademark:response.data[0].thuonghieu,
                    screen:response.data[0].manhinh,
                    cpu:response.data[0].cpu,
                    ram:response.data[0].ram,
                    hard_drive:response.data[0].ocung,
                    weight:response.data[0].trongluong,
                    date:response.data[0].ngaysanxuat,
                  })
  };

      //code hiển thị các thương hiệu
      const getimageidsanpham = async() => {
        const base_url_2 = api + `hienthi-image-id/${id}` ;
        const response_2 = await axios.get(base_url_2)  // lấy dữ liệu ở trên base_url bằng hàm await 
        console.log(response_2.data); 
        setlist_trademark(response_2.data);  // hiển thị
      }

 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="text-center mb-4">Cập Nhật Thông Tin</h4>
       
          <h5 className="text-success">Tên Sản Phẩm: {name_trademark} </h5>
          <h6 className="text">ID Hình Ảnh: {id} </h6>
           <div className="form-group mb-3">
              <img className="card-img-top hover-shadow" src={api + 'images/' + image} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{width:"210px", height:"100%"}}/>
          </div>
           
              <div className="form-group">
                   <input type="file" name="file" className="form-control mb-4" onChange={getimgedit}  multiple />
              </div>

              <button onClick={updateEmployee} style={{background: "rgb(216, 21, 21)"}} className="btn btn-secondary btn-block">Xong</button>
       </div>
      </div> 
      

  
      <div className="container" style={{marginTop: "50px"}}>
      <div className="row">
            {list_trademark.map((name) => (
              <div className="col-sm-3" key={name.mahinhanh}>
                <div className="card mb-3" style={{width:"12rem"}}>

                    <h5><a  href="#0" onClick={() => { 
                                          const confirmBox = window.confirm(
                                            "Bạn chắc chắn muốn xóa Hình Ảnh có ID : "+ name.mahinhanh +""
                                          )
                                          if (confirmBox === true) {
                                              deleteImage(name.mahinhanh)                       
                                          }
                                      }}
                                      style={{textDecoration:"none",marginLeft:"162px"}}>

                      <span aria-hidden="true" className="text-danger">&times;</span>

                    </a></h5>
                   
                    <img className="card-img-top hover-shadow" src={api + 'images/' + name.url} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{height:"110px"}}/>
                    <div className="card-body" >
                      <span className="card-text">ID SANPHAM : {name.mahinhanh}</span>
                    </div>
                  </div>
                </div>
              ))}
           </div>
           </div>



    </div>
    
    
  );
};
 
export default EditEmployee;