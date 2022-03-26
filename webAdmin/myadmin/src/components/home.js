import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
// import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from 'react-router-dom';
import "../folder_css/home.css"

const api ='http://localhost:3001/';
 
function EmployeeDetail(){

  // tạo const để tương tác giữa input với button
  // const { register, handleSubmit,} = useForm();
  //Khởi tạo useState cho danh sách danh mục
  const[list_category, setlist_category] = useState([]);
  //Khởi tạo useState cho thương hiệu
  const[list_trademark, setlist_trademark] = useState([]);
  //useState Hình Ảnh
  const [selectedFile, setSelectedFile] = useState();
  //State Add
  const [tensanpham , settensanpham] = useState('');
  const [danhmucsanpham , setdanhmucsanpham] = useState('');
  const [giasanpham , setgiasanpham] = useState('');
  const [chitietsanpham , setchitietsanpham] = useState('');
  const [hangsanxuat ,sethangsanxuat] = useState('');
  const [thuonghieu , setthuonghieu] = useState('');
  const [manhinh , setmanhinh] = useState('');
  const [cpu, setcpu] = useState('');
  const [ram , setram] = useState('');
  const [ocung, setocung] = useState('');
  const [trongluong, settrongluong] = useState('');
  const [date, setdate] = useState('');

  const [search,setSearch] =useState('');
  const [record,setRecord] = useState([]);

  //reload dữ liệu :D
  const refreshPage = ()=>{
    window.location.reload();
 }
 
    // Code load dữ liệu Sản Phẩm
    const loadEmployeeDetail = async() => {
      const base_url = api + 'sanpham/';
      const response = await axios.get(base_url)  // lấy dữ liệu ở trên base_url bằng hàm await 
      // console.log(response.data); 
      setRecord(response.data);  // hiển thị
    }

    //code hiển thị danh sách danh mục 
    const getdanhmuc = async() => {
      const base_url_1 = api + 'danhmucsanpham/';
      const response_1 = await axios.get(base_url_1)  // lấy dữ liệu ở trên base_url bằng hàm await 
      // console.log(response.data); 
      setlist_category(response_1.data);  // hiển thị
    }

    //code hiển thị các thương hiệu
    const getthuonghieu = async() => {
      const base_url_2 = api + 'thuonghieu/';
      const response_2 = await axios.get(base_url_2)  // lấy dữ liệu ở trên base_url bằng hàm await 
      // console.log(response.data); 
      setlist_trademark(response_2.data);  // hiển thị
    }

    useEffect(() => {
      loadEmployeeDetail();
      getdanhmuc();
      getthuonghieu();
    }, []);

    //code thêm sản phẩm
    const submitEmployeeRecord = async (e) =>{ 
      const formData = new FormData(); 
      console.log(formData);
      // console.log(data);
      formData.append('ten', tensanpham);
      formData.append('danhmucsanpham', danhmucsanpham);
      formData.append('giasanpham', giasanpham);
      formData.append('chitietsanpham', chitietsanpham);
      formData.append('hangsanxuat', hangsanxuat);
      formData.append('file', selectedFile);
      formData.append('thuonghieu', thuonghieu);
      formData.append('manhinh', manhinh);
      formData.append('cpu', cpu);
      formData.append('ram', ram);
      formData.append('ocung', ocung);
      formData.append('trongluong', trongluong);
      formData.append('date', date);

      console.log( "Tên đã nhập" +tensanpham);
      // console.log(selectedFile);
      axios.post(api +'addsanphamimg/',  formData )
        .then(res =>{
            if(res.data ==='ok'){
              alert("thêm thành công")
          }
          console.log(res);
          // refreshPage();
        })
          // handleSubmission();
         refreshPage();
      }
      
    // Search name 
    const searchRecords = () =>
    {
        // alert(search)
        axios.get(api + `search/${search}`)
        .then(response => {
          setRecord(response.data);
        });
        if(search === ""){
          refreshPage();
        }
    }
     
    // Code Xóa
    const deleteRecord = data => {
      console.log(data);
      fetch(api + 'deletesanpham/', {   
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
      refreshPage();
    }
 
  return(
    <section>    
   
    <div className="container">  
    <h4 className="mb-3 text-center mt-4">THÊM XÓA SỬA SẢN PHẨM</h4>
      <div className="row mt-3">
       <div className="col-sm-4">
          <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>
            <form onSubmit={submitEmployeeRecord}>
              {/* <form onSubmit={handleSubmit(submitEmployeeRecord)}> */}
            <h5 className="mb-3 ">Thêm Sản Phẩm</h5>
                <div className="form-group">
                   <input type="text" name='tensanpham' className="form-control  mb-4" placeholder="Tên Sản Phẩm" onChange={(e) => settensanpham(e.target.value)}/>
                </div>
                  
                <div className="form-group">
                <select onChange={(e) => setdanhmucsanpham(e.target.value)} className="form-control  mb-4">
                  {list_category.map((item)=>
                    <option key={item.tendanhmucsanpham} value={item.tendanhmucsanpham}>{item.tendanhmucsanpham}</option>
                  )}
                </select>
                </div>
              
                <div className="form-group">
                   <input type="number" name='gia' className="form-control mb-4"  placeholder="Giá Sản Phẩm" onChange={(e) => setgiasanpham(e.target.value)}/>
                </div>
               
                <div className="form-group">
                   <input type="text" name='thongtin' className="form-control mb-4"  placeholder="Thông Tin Chi Tiết" onChange={(e) => setchitietsanpham(e.target.value)}/>
                </div>
 
                <div className="form-group">
                   <input type="text" name='hedieuhanh' className="form-control mb-4" placeholder="Hệ Điều Hành" onChange={(e) => sethangsanxuat(e.target.value)}/>
                </div>

                <div className="form-group">
                   <input type="file" name="file" className="form-control mb-4" onChange={(e) => setSelectedFile(e.target.files[0])}/>
                </div>

                <div className="form-group">
                <select onChange={(e) => setthuonghieu(e.target.value)} className="form-control  mb-4">
                  {list_trademark.map((item)=>
                    <option key={item.tenthuonghieu} value={item.tenthuonghieu}>{item.tenthuonghieu}</option>
                  )}
                </select>
                </div>

                <div className="form-group">
                   <input type="text" name='manhinh' className="form-control mb-4" placeholder="Màn Hình" onChange={(e) => setmanhinh(e.target.value)}/>
                </div>

                <div className="form-group">
                   <input type="text" name='cpu' className="form-control mb-4"  placeholder="CPU" onChange={(e) => setcpu(e.target.value)}/>
                </div>

                <div className="form-group">
                   <input type="text" name='ram' className="form-control mb-4" placeholder="RAM" onChange={(e) => setram(e.target.value)}/>
                </div>

                <div className="form-group">
                   <input type="text" name='ocung' className="form-control mb-4" placeholder="Ổ Cứng" onChange={(e) => setocung(e.target.value)}/>
                </div>

                <div className="form-group">
                   <input type="text" name='trongluong' className="form-control mb-4" placeholder="Trọng Lượng" onChange={(e) => settrongluong(e.target.value)}/>
                </div>

                <div className="form-group">
                   <input type="date" name='date' className="form-control mb-2" placeholder="Ngày Sản Xuất" onChange={(e) => setdate(e.target.value)}/>
                </div>

                <input type="submit">
                </input>
                </form> 
             {/* </form> */}
        </div>
      </div>
      <div className="col-sm-8">
        <h5 className="text-center  ml-4 mt-4  mb-5">Danh Sách Sản Phẩm</h5>
        <div className="input-group mb-4 mt-3">
          <div className="form-outline">
           <input type="text" id="form1" onChange={(e)=>setSearch(e.target.value)} className="form-control" placeholder="Tìm Kiếm Sản Phẩm" style={{backgroundColor:"#ececec"}}/>
          </div>
            <button type="button" onClick={searchRecords}  className="btn btn-success">
              <i className="fa fa-search" aria-hidden="true"></i>
              Tìm Kiếm
            </button>

            <div>
              <Link to={`/listsanpham`}>
                <button className="btn_show_data" >
                  Hiển thị Dữ Liệu
                </button>
              </Link>
            </div>
        </div>  


        <table className="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>ID Sản Phẩm</th>
                <th>Tên Sản Phẩm</th>
                <th>Loại Sản Phẩm</th>
                <th>Giá Sản Phẩm</th>
                <th>Hãng Sản Xuất</th>  
                <th>Hình ảnh</th>
            </tr>
            </thead>
            <tbody>
     
            {record.map((name)=>
                <tr key={name.masanpham}>
                <td>{name.masanpham}</td>
                <td>{name.tensanpham}</td>
                <td>{name.loaisanpham}</td>
                <td>{name.giasanpham.toLocaleString()}</td>
                <td>{name.hangsanxuat}</td>
                <td>
                <img className="card-img-top hover-shadow" src={api + 'images/' + name.mahinhanh} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{width:"120px", height:"100%"}}/>
                </td>
                <td>

                        <button className="magin_btn" 
                          onClick={() => { 
                          const confirmBox = window.confirm(
                            "Bạn chắc chắn muốn xóa Tên Danh Mục : "+ name.tensanpham +""
                          )
                          if (confirmBox === true) {     
                            deleteRecord(name.masanpham)                   
                          }
                          
                        }}>   Xóa    </button>

                        <Link to={`/editsanpham/${name.masanpham}`}>
                        <button className="magin_btn">
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
    </div>
   </section>
  )
}
 
export default EmployeeDetail;
