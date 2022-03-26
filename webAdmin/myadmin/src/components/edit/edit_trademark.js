import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
 
const EditEmployee = () => {
  const api ='http://localhost:3001/';
  let history = useHistory(); //hàm history.
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 
 
  //Tạo useState id cha và tên
  const [trademarkname ,settrademarkname] = useState({
    name_trademark:"",
    name_trademark_email:"",
    name_trademark_address:"",
  })
  const onInputChange = e => {
    settrademarkname({ ...trademarkname,[e.target.name]: e.target.value });
  };
  const { name_trademark, name_trademark_email, name_trademark_address } = trademarkname;


  useEffect(() => {
    getthuonghieu();
  }, []);

  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editthuonghieu/editid', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: id,
          name_trademark: name_trademark ,
          name_trademark_email:  name_trademark_email,
          name_trademark_address: name_trademark_address,
        })
        
    })
    .then((response) => {
      if(response === 'okedit'){
        alert("xóa thành công")
      }
    });
    console.log("tên đã nhập : " + name_trademark);
    console.log("ID cha đã nhập : " + name_trademark_email);
    console.log("Địa chỉ đã nhập : " + name_trademark_address);
    history.push("/trademark");
  };
 
  // code hiển thị id danh mục
  const getthuonghieu =  async() => {
    console.log(id);

            const base_url = api + `editthuonghieu/${id}`;
            const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
            console.log(response.data); 
            // setcategory(response.data);  // hiển thị
            console.log(response.data[0].tenthuonghieu);
            console.log(response.data[0].email);
            console.log(response.data[0].diachi);
            settrademarkname({
                    update: true,
                    name_trademark:response.data[0].tenthuonghieu,
                    name_trademark_email:response.data[0].email,
                    name_trademark_address:response.data[0].diachi,
                  })
  };

 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="text-center mb-4">Cập Nhật Thông Tin</h4>
       
          <h5 className="text-success">ID Danh Mục: {id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Tên Thương Hiệu"
              name="name_trademark"
              value={name_trademark}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
        
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Email Thương Hiệu"
              name="name_trademark_email"
              value={name_trademark_email}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Địa Chỉ Thương Hiệu"
              name="name_trademark_address"
              value={name_trademark_address}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Cật Nhật</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditEmployee;