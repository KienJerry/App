import React, { useState , useEffect } from "react";
import "../folder_css/category.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from 'react-router-dom';

function Category (){

    // const api ='http://192.168.1.104:3001/';
    const api ='http://localhost:3001/';
// tạo const để tương tác giữa input với button
    const { register, handleSubmit,} = useForm();
//Khởi tạo useState cho danh sách danh mục
    const[list_category, setlist_category] = useState([]);
//code button thêm
    const onSubmit = data =>{ 
        console.log(data);
        axios.post(api +'adddanhmucsanpham/', data)
          .then(response => {
            if(response.data ==='ok'){
                alert("thêm thành công")
            }
          });
    }

//code xóa 
    const delete_category = data => {
      console.log(data);
      fetch(api + 'deletedanhmucsanpham/', {   
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
        if(response === 'okdelete'){
          alert("xóa thành công")
        }
      });
    }

//Hiển thị danh mục (getdanhmuc) bằng useEffect
    useEffect(() => {
       getdanhmuc();
    });
//code hiển thị danh sách danh mục 
    const getdanhmuc = async() => {
      const base_url = api + 'danhmucsanpham/';
      const response = await axios.get(base_url)  // lấy dữ liệu ở trên base_url bằng hàm await 
      // console.log(response.data); 
      setlist_category(response.data);  // hiển thị
    }

    return (
      <div>
        <h2 className="mb-3 text-center mt-4">Chào mừng đến với danh mục sản phẩm</h2>

        {/* from thêm sản phẩm danh mục */}
          <div className="form_add_cate">
            <h4 className="Text_ThemDanhMuc">Thêm Danh Mục Sản Phẩm</h4>
            <div className="form_nhap_thon_tin_danh_muc">
              <form onSubmit={handleSubmit(onSubmit)} >
                <input placeholder="Tên Danh Mục" {...register("name_category")} />
                <select {...register("name_category_parent")}>
                <option value="0">Chọn Danh Mục</option>
                  {list_category.map((item)=>
                    <option key={item.madanhmucsanpham} value={item.madanhmucsanpham}>{item.tendanhmucsanpham}</option>
                  )}
                </select>
                <input type="submit" title="Thêm">
                  
                </input>
              </form>
            </div>
          </div>


{/* form sửa thông tin danh mục */}
        <div className="form_table">
        <table className="table table-hover  table-striped table-bordered ml-4 ">
            
              <thead>
                <tr>
                  <th>ID Danh mục</th>
                  <th>Tên Danh Mục</th>
                  <th>ID Danh Mục Cha</th>
                  <th>Chức năng</th>
                </tr>
              </thead>

              <tbody >
                {list_category.map((item)=>
                  <tr key={item.madanhmucsanpham}>
                  <td>{item.madanhmucsanpham}</td>
                  <td>{item.tendanhmucsanpham}</td>
                  <td>{item.idcha}</td>
                  <td>
                      <button className="magin_btn" 
                        onClick={() => { 
                          const confirmBox = window.confirm(
                            "Bạn chắc chắn muốn xóa Tên Danh Mục : "+ item.tendanhmucsanpham +" có ID là :" +item.madanhmucsanpham
                          )
                          if (confirmBox === true) {
                            delete_category(item.madanhmucsanpham)                        
                          }
                          
                        }}>   Xóa    </button>

                        <Link to={`/editdanhmucsanpham/${item.madanhmucsanpham}`}>
                        <button>Sửa
                        </button>
                        </Link>

                  </td>
                  </tr>
                )}
              </tbody>
 
            
        </table>
        </div>

      </div>  
    );
  
}

export default Category;