import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
 
const EditEmployee = () => {
  const api ='http://localhost:3001/';
  let history = useHistory(); //hàm history.
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 

      //Khởi tạo useState cho danh sách danh mục
  const[list_category, setlist_category] = useState([]);

      //Khởi tạo useState cho danh sách danh mục
  const[list_trademark, setlist_trademark] = useState([]);

      //reload dữ liệu :D
  const refreshPage = ()=>{
    window.location.reload();
 }
 //time 
//  function timeout(delay: number) {
//   return new Promise( res => setTimeout(res, delay) );
// }
 
  //Tạo useState id cha và tên
  const [trademarkname ,settrademarkname] = useState({
    name_trademark:"",
    name_trademark_email:"",
    name_trademark_address:"",
    details:"",
    manufacturer:"",
    image:"",
    trademark:"",
    screen:"",
    cpu:"",
    ram:"",
    hard_drive:"",
    weight:"",
    date:"",
  })
  const onInputChange = e => {
    settrademarkname({ ...trademarkname,[e.target.name]: e.target.value });
  };
  const { name_trademark, name_trademark_email ,name_trademark_address, details, manufacturer, image, trademark,screen, cpu, ram, hard_drive, weight, date } = trademarkname;


  useEffect(() => {
    getlistsanpham();
    getdanhmucfull();
    getthuonghieufull();
  }, []);

  //code update
  const updateEmployee = async e => {
    if(name_trademark === ""){
      alert("Nhập tên sản phẩm");
      refreshPage();
    }if(name_trademark_address === ""){
      alert("Nhập giá sản phẩm");
      refreshPage();
    }if(details === ""){
      alert("Chi tiết sản phẩm");
      refreshPage();
    }else{
    e.preventDefault();
    fetch(api + 'editsanphamimg/editid', {   
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
          details:details,
          manufacturer:manufacturer,
          image:image,
          trademark:trademark,
          screen:screen,
          cpu:cpu,
          ram:ram,
          hard_drive:hard_drive,
          weight:weight,
          date:date,
        })    
    })
    .then((response) => {
      if(response === 'okedit'){
        alert("thành công")
      }
    });
    console.log("tên đã nhập : " + name_trademark);
    history.push("/home");
  }
  };

 


  //code update hình ảnh 
  const getimgedit = async(e) =>{
    // await timeout(5000);
   const data = new FormData();
   console.log(data)
   data.append('file', e.target.files[0]);
   data.append('myid', id);
   axios.post(api + "edituploadFileSanPham", data)
        .then(response => {
          console.log("Tên hình ảnh new : " + response.data)
          refreshPage();
          // data.readAsDataURL(e.files[0]);
          // this.setState({ e }, () => this.onInputChange(e));
        })
  }
 
  // code hiển thị id sanpham
  const getlistsanpham =  async() => {
    console.log(id);

            const base_url = api + `editsanpham/${id}`;
            const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
            console.log( response.data); 
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


    //code hiển thị danh sách danh mục 
    const getdanhmucfull = async() => {
      const base_url = api + 'danhmucsanpham/';
      const response = await axios.get(base_url)  // lấy dữ liệu ở trên base_url bằng hàm await 
      // console.log( response.data); 
      setlist_category(response.data);  // hiển thị
    }

    //code hiển thị danh sách thương hiệu 
    const getthuonghieufull = async() => {
      const base_url_th = api + 'thuonghieu/';
      const response_th = await axios.get(base_url_th)  // lấy dữ liệu ở trên base_url bằng hàm await 
      // console.log(response_th.data); 
      setlist_trademark(response_th.data);  // hiển thị
    }    

 
  return (
    // <div className="container">
    //  <div className="row mt-4"> 
    //   <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
    <div className="container">
      <div className="row mt-4">
       <div>
        <h4 className="text-center mb-4">Cập Nhật Thông Tin</h4>
       
          <h5 className="text-success">ID Danh Mục: {id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Tên Sản Phẩm"
              name="name_trademark"
              value={name_trademark}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <div className="form-group mb-3">
              <select className="form-control form-control-lg" value={name_trademark_email} name="name_trademark_email" onChange= {e => onInputChange(e)}>
                    {list_category.map((itemfull)=>
                    <option key={itemfull.madanhmucsanpham} value={itemfull.tendanhmucsanpham}>{itemfull.tendanhmucsanpham}</option>
                    )}
              </select>
          </div>

          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập Giá Sản Phẩm"
              name="name_trademark_address"
              value={name_trademark_address}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Thông Tin Chi Tiết"
              name="details"
              value={details}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Hệ Điều Hành"
              name="manufacturer"
              value={manufacturer}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            
            <input
              type="file"
              className="form-control form-control-lg"
              placeholder="Mã hình ảnh (sau này update thêm)"
              name="file"
              onChange={getimgedit}> 
            </input>
          </div>
          <div className="form-group mb-3">
            
            <h5 value = {image} onChange={e => onInputChange(e)} name = "image" className="form-control form-control-lg">tên ID Hình Ảnh: {image} </h5>
            <img className="" src={api + 'images/' + image} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{height:"230px" , weight:"100%"}}/>
            
          </div>
          <div className="form-group mb-3">
            <select className="form-control form-control-lg" value={trademark} name="trademark" onChange= {e => onInputChange(e)}>
                    {list_trademark.map((itemfull)=>
                    <option key={itemfull.mathuonghieu} value={itemfull.tenthuonghieu}>{itemfull.tenthuonghieu}</option>
                    )}
              </select>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Màn Hình"
              name="screen"
              value={screen}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập CPU"
              name="cpu"
              value={cpu}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập RAM"
              name="ram"
              value={ram}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Ổ Cứng"
              name="hard_drive"
              value={hard_drive}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Trọng Lượng Của Máy"
              name="weight"
              value={weight}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Ngày Sản Xuất"
              name="date"
              value={date}
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