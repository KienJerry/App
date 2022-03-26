import React, { useState , useEffect } from "react";
import "../folder_css/trademark.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link} from 'react-router-dom';

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
        axios.post(api +'addthuonghieu/', data)
          .then(response => {
            if(response.data ==='ok'){
                alert("thêm thành công")
            }
          });
    }

//code xóa 
    const delete_category = data => {
      console.log(data);
      fetch(api + 'deletethuonghieu/', {   
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
//code hiển thị danh sách thương hiệu 
    const getdanhmuc = async() => {
      const base_url = api + 'thuonghieu/';
      const response = await axios.get(base_url)  // lấy dữ liệu ở trên base_url bằng hàm await 
      // console.log(response.data); 
      setlist_category(response.data);  // hiển thị
    }

    return (
      <div>
        <h2 className="mb-3 text-center mt-4">Thương Hiệu</h2>

        {/* from thêm sản phẩm danh mục */}
          <div className="form_add_thuong_hieu">
            <h4 className="Text_ThemDanhMuc">Thêm Thương Hiệu</h4>
            <div >
              <form onSubmit={handleSubmit(onSubmit)} >
                <input className="input_submit_a" placeholder="Tên Thương Hiệu" {...register("name_trademark")} />
                <input type="email" className="input_submit_a" placeholder="Email" {...register("email_trademark")} />
                <input className="input_submit_b" placeholder="Địa Chỉ" {...register("address_trademark")} />
                <input className="input_submi_b" type="submit" title="Thêm">
                  
                </input>
              </form>
            </div>
          </div>


{/* form sửa thông tin danh mục */}
        <div className="form_table">
        <table className="table table-hover  table-striped table-bordered ml-4 ">
            
              <thead>
                <tr>
                  <th>ID Thương Hiệu</th>
                  <th>Tên Tên Thương Hiệu</th>
                  <th>Email</th>
                  <th>Địa Chỉ</th>
                  <th>Chức năng</th>
                </tr>
              </thead>

              <tbody >
                {list_category.map((item)=>
                  <tr key={item.mathuonghieu}>
                  <td>{item.mathuonghieu}</td>
                  <td>{item.tenthuonghieu}</td>
                  <td>{item.email}</td>
                  <td>{item.diachi}</td>
                  <td>
                      <button className="magin_btn" 
                        onClick={() => { 
                          const confirmBox = window.confirm(
                            "Bạn chắc chắn muốn xóa Tên Danh Mục : "+ item.tenthuonghieu
                          )
                          if (confirmBox === true) {
                            delete_category(item.mathuonghieu)                        
                          }
                          
                        }}>   Xóa    </button>
                   
                    <Link className=" mr-2" to={`/editthuonghieu/${item.mathuonghieu}`}>
                       <i className="fa fa-edit" aria-hidden="true"></i> 
                       <button>
                          Sửa
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