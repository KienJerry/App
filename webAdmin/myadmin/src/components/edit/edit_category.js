import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
 
const EditEmployee = () => {
  const api ='http://localhost:3001/';
  let history = useHistory(); //hàm history.
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 
 
  //Khởi tạo useState cho danh sách danh mục
  const[list_category, setlist_category] = useState([]);

  //Tạo useState id cha và tên
  const [categoryname ,setcategotypush] = useState({
    name_category:"",
    name_category_parent:"",
  })
  const onInputChange = e => {
    setcategotypush({ ...categoryname,[e.target.name]: e.target.value });
  };
  const { name_category, name_category_parent } = categoryname;


  useEffect(() => {
    getdanhmuc();
    getdanhmucfull();
  }, []);

  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editdanhmucsanpham/editid', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: id,
          name_category: name_category ,
          name_category_parent:  name_category_parent,
        })
        
    })
    .then((response) => {
      if(response === 'okedit'){
        alert("xóa thành công")
      }
    });
    console.log("tên đã nhập : " + name_category);
    console.log("ID cha đã nhập : " + name_category_parent);
    history.push("/category");
  };
 
  // code hiển thị id danh mục
  const getdanhmuc =  async() => {
    console.log(id);
            const base_url = api + `editdanhmucsanpham/${id}`;
            const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
            console.log(response.data); 
            // setcategory(response.data);  // hiển thị
            console.log(response.data[0].tendanhmucsanpham);
            console.log(response.data[0].idcha);
            setcategotypush({
                    update: true,
                    name_category:response.data[0].tendanhmucsanpham,
                    name_category_parent:response.data[0].idcha,
                  })
  };


  //code hiển thị danh sách danh mục 
  const getdanhmucfull = async() => {
    const base_url = api + 'danhmucsanpham/';
    const response = await axios.get(base_url)  // lấy dữ liệu ở trên base_url bằng hàm await 
    // console.log(response.data); 
    setlist_category(response.data);  // hiển thị
  }

 
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
              placeholder="Nhập Tên Danh Mục"
              name="name_category"
              value={name_category}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <div >
                  <select value={name_category_parent} name="name_category_parent" onChange= {e => onInputChange(e)}>
                    {/* {category.map((item)=>
                    <option key={item.madanhmucsanpham} value={item.madanhmucsanpham}>{item.idcha}</option>
                    )} */}
                    <option value="0">Chọn Danh Mục</option>
                    {list_category.map((itemfull)=>
                    <option key={itemfull.madanhmucsanpham} value={itemfull.madanhmucsanpham}>{itemfull.tendanhmucsanpham}</option>
                    )}
                  </select>
          </div>
          
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Cật Nhật</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditEmployee;
