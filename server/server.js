// const port = 3000
var express = require('express');
var app = express();
var mysql = require('mysql');
var fs = require('fs');
var cors = require('cors');
const multer = require('multer');
//sql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'du_an_react_native'
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// đây là cors 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// express
app.use(express.static('public'));

// Trang chủ
app.get('/', function (req, res) {
    res.send('Giao Diện!');
});

//Fix lỗi console hình ảnh
app.get('/images', function (req, res) {
  res.send('hình ảnh!');
});

//Lưu hình ảnh vào file public/images và edit tên ảnh
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'public/images')  //Đường link uploads ảnh 
  },
  filename: (req, file, callBack) => {
  const myArray = file.originalname.split(".");
  let imgname = new Date().getTime().toString() + "."+myArray[myArray.length-1];  // Đặt lại tên image thành date + time + .(đuôi ảnh)
  callBack(null, `${imgname}`)
     // callBack(null, imgname+`${file.originalname}`)
  }
})
let upload = multer({ storage: storage})

// // Phân Trang Sản Phẩm
// app.get('/sanpham/:masanpham', function (req, res) {
//   var page = req.params.masanpham;
  
//   var limit = 1;
//   var offset = (page -1)*limit;
//   var sql = "SELECT * FROM sanpham order by masanpham desc  limit "+ offset + ", " + limit ;
//   con.query(sql , function (err, result, fields) {
//     if (err) throw err;
//     // console.log(result);
     
//     res.send(result);
//     });
// });

// // chi tiết sp
// app.get('/product/:id/:idsp', function (req, res) {
//   var page = req.params.idsp;
  
//   var sql = "SELECT * FROM product WHERE id = " + page;
//   con.query(sql , function (err, result, fields) {
//     if (err) throw err;
//     // console.log(result);

//     res.send(result);
//     });
// });


//hiển thị danh mục sản phẩm
app.get('/danhmucsanpham', function (req, res) {
  con.query("SELECT * FROM `danhmucsanpham` order by madanhmucsanpham desc", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});
//Thêm danh mục sản phẩm
app.post('/adddanhmucsanpham', function (req, res) {
  // console.log(req.body);
  //lệnh SQL
  var sql = "insert into danhmucsanpham (tendanhmucsanpham , idcha) values ('"+req.body.name_category+"' , '"+req.body.name_category_parent+"')";
  console.log(sql);
      con.query(sql , function(err, result, fields){
        if(err) throw err;
        // console.log(result);
        if(result.affectedRows == 1){
          res.send('ok');
        }
      });
})
//Xóa danh mục Sản Phẩm
app.post('/deletedanhmucsanpham', function(req, res){
  // console.log("abc")
  var sql = "delete from danhmucsanpham where madanhmucsanpham = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okdelete'){
      result.send('okdelete');
    }
  });
})
//Sửa danh mục Sản Phẩm
app.post('/editdanhmucsanpham/editid', function(req, res){
  console.log("Vào server thành công")
  var sql = "UPDATE danhmucsanpham SET tendanhmucsanpham = ('"+req.body.name_category+"'), idcha =('"+req.body.name_category_parent+"')  where madanhmucsanpham = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//Hiển thị chi tiết Danh Mục sản phẩm lấy theo ID 
app.get('/editdanhmucsanpham/:idsp', function (req, res) {
  var page = req.params.idsp;
  
  var sql = "SELECT * FROM danhmucsanpham WHERE madanhmucsanpham = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
    });
});


//hiển thị Thương Hiệu
app.get('/thuonghieu', function (req, res) {
  con.query("SELECT * FROM `thuonghieu` order by mathuonghieu desc", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});
//Thêm thương hiệu
app.post('/addthuonghieu', function (req, res) {
  // console.log(req.body);
  //lệnh SQL
  var sql = "insert into thuonghieu (tenthuonghieu , email , diachi)  values ('"+req.body.name_trademark+"' , '"+req.body.email_trademark+"' , '"+req.body.address_trademark+"')";
  console.log(sql);
      con.query(sql , function(err, result, fields){
        if(err) throw err;
        // console.log(result);
        if(result.affectedRows == 1){
          res.send('ok');
        }
      });
})
//Xóa thương hiệu
app.post('/deletethuonghieu', function(req, res){
  console.log("abc")
  var sql = "delete from thuonghieu where mathuonghieu = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okdelete'){
      result.send('okdelete');
    }
  });
})
//Sửa Thương Hiệu
app.post('/editthuonghieu/editid', function(req, res){
  console.log("Vào server thành công")
  var sql = "UPDATE thuonghieu SET tenthuonghieu = ('"+req.body.name_trademark+"'), email =('"+req.body.name_trademark_email+"'), diachi =('"+req.body.name_trademark_address+"')  where mathuonghieu = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//Hiển thị chi tiết thương hiệu lấy theo ID
app.get('/editthuonghieu/:idsp', function (req, res) {
  var page = req.params.idsp;
  
  var sql = "SELECT * FROM thuonghieu WHERE mathuonghieu = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
    });
});


//hiển thị Sản Phẩm
app.get('/sanpham', function (req, res) {
  con.query("SELECT * FROM `sanpham`order by masanpham desc", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});
//Thêm Sản Phẩm + image
app.post('/addsanphamimg', upload.single('file') , (req, res, next) => {
  console.log("Đã nhảy vào mục thêm sản phẩm");
  const file = req.file;
  if (!file) {
    const error = new Error('Chưa thêm hình ảnh !')
    error.httpStatusCode = 400
    return next(error)
  }else{
    console.log("đã vào")
     var imgsrc = 'http://localhost:3001/images/' + file.filename;
     var sql = "insert into sanpham (tensanpham , loaisanpham , giasanpham , chitietsanpham , hangsanxuat , mahinhanh , thuonghieu ,manhinh , cpu , ram , ocung , trongluong , ngaysanxuat , giacu)  values ('"+req.body.ten+"' , '"+req.body.danhmucsanpham+"' , '"+req.body.giasanpham+"', '"+req.body.chitietsanpham+"', '"+req.body.hangsanxuat+"','"+ file.filename +"' ,'"+req.body.thuonghieu+"', '"+req.body.manhinh+"', '"+req.body.cpu+"','"+req.body.ram+"', '"+req.body.ocung+"', '"+req.body.trongluong+"', '"+req.body.date+"', '"+req.body.giacu+"')";
    console.log(sql);
    con.query(sql, [imgsrc] , function(err, result, fields){
      if(err) throw err;
      if(result.affectedRows == 1){
        // res.send('ok');
        // console.log(file);
        // console.log(res);
        console.log("tên hình ảnh new : "+file.filename);
        res.send(file);
      }
    });
  }   
});
//Xóa Sản Phẩm
app.post('/deletesanpham', function(req, res){
  // console.log("abc")
  var sql = "delete from sanpham where masanpham = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okdelete'){
      result.send('okdelete');
    }
  });
})
//Search Sản Phẩm
app.get('/search/:nameproduct',function(req, res){
  var ten = req.params.nameproduct
  con.query("SELECT * FROM sanpham where tensanpham = '"+ ten +"' or giasanpham = '"+ ten +"' or loaisanpham = '"+ ten +"' or hangsanxuat = '"+ ten +"' or masanpham = '"+ ten +"' ", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
  
});
//Sửa Sản Phẩm
app.post('/editsanpham/editid', function(req, res){
  console.log("Vào server thành công")
  var sql = "UPDATE sanpham SET tensanpham = ('"+req.body.name_trademark+"'), loaisanpham =('"+req.body.name_trademark_email+"'), giasanpham =('"+req.body.name_trademark_address+"'), chitietsanpham =('"+req.body.details+"'), hangsanxuat =('"+req.body.manufacturer+"'), mahinhanh =('"+req.body.image+"'), thuonghieu =('"+req.body.trademark+"'), manhinh =('"+req.body.screen+"'), cpu =('"+req.body.cpu+"'), ram =('"+req.body.ram+"'), ocung =('"+req.body.hard_drive+"'), trongluong =('"+req.body.weight+"'), ngaysanxuat =('"+req.body.date+"')  where masanpham = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//Sửa Sản Phẩm + edit image
app.post('/editsanphamimg/editid', upload.single('file') , (req, res, next) =>{
  console.log("Vào server thành công");
  // console.log(file);
  //   console.log("tên : " + file.filename);
    // var imgsrc = 'http://localhost:3001/images/' + file.filename;
    var sql = "UPDATE sanpham SET tensanpham = ('"+req.body.name_trademark+"'), loaisanpham =('"+req.body.name_trademark_email+"'), giasanpham =('"+req.body.name_trademark_address+"'), chitietsanpham =('"+req.body.details+"'), hangsanxuat =('"+req.body.manufacturer+"'), mahinhanh =('"+req.body.image+"'), thuonghieu =('"+req.body.trademark+"'), manhinh =('"+req.body.screen+"'), cpu =('"+req.body.cpu+"'), ram =('"+req.body.ram+"'), ocung =('"+req.body.hard_drive+"'), trongluong =('"+req.body.weight+"'), ngaysanxuat =('"+req.body.date+"')  where masanpham = ("+req.body.myid+")";
    console.log(sql);
    // con.query(sql, [imgsrc] , function(err, result, fields){
      con.query(sql, function(err, result, fields){
      if(err) throw err;
      if(result =='okedit'){
        result.send('okedit');
      }
    });
  // }
})
//Sửa hình ảnh trong sản phẩm
app.post('/edituploadFileSanPham', upload.single('file'), (req, res, next) => {   //upload.single('file') , 'file' lấy từ bên react js qua 
  const file = req.file;
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }else{
  var imgsrc = 'http://localhost:3001/images/' + file.filename;
  var sql = "UPDATE sanpham SET mahinhanh = ('"+file.filename+"') where masanpham = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, [imgsrc] , function(err, result, fields){
    if(err) throw err;
    console.log(file);
    console.log(file.filename);
    res.send(file.filename);
  })
  }
 })
//Chỉnh sửa chi tiết Sản Phẩm lấy theo ID
app.get('/editsanpham/:idsp', function (req, res) {
  var page = req.params.idsp;
  
  var sql = "SELECT * FROM sanpham WHERE masanpham = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
    });
});
//Code thêm nhiều hình ảnh Sản Phẩm
app.post('/upload-multiple-images', upload.array('file', 5) , (req, res ) => {
      const file = req.files;
      var i;
      for(i=0;i<file.length;i++){
        console.log("tên new : " + file[i].filename)
        var imgsrc = 'http://localhost:3001/images/' + file.filename;
        var sql = "insert into hinhanh (url , idsanpham )  values ('"+file[i].filename+"' , '"+req.body.idsanpham+"')";
        console.log(sql);
        con.query(sql, [imgsrc] , function(err, result, fields){
          if(err) throw err;
          res.send(file[i])
        })
        // res.send(file[i])
        // console.log(file[i].filename)
        }
  });
//Hiển thị nhiều hình ảnh trong Sản Phẩm theo ID
app.get('/hienthi-image-id/:idsp', function (req, res) {
  var page = req.params.idsp;
  
  var sql = "SELECT * FROM hinhanh WHERE idsanpham = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
    });
});
//Xóa hình ảnh trong mục sản phẩm ID
app.post('/deleteimgsp', function(req, res){
  var sql = "delete from hinhanh where mahinhanh = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result == 1){
      result.send('okdelete');
    }
  });
})
// Phân Trang Sản Phẩm
app.get('/sanpham/:masanpham', function (req, res) {
  var page = req.params.masanpham;
  var limit = 3;
  var offset = (page -1)*limit;
  var sql = "SELECT * FROM sanpham order by masanpham desc  limit "+ offset + ", " + limit ;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
     
    res.send(result);
    });
});




//hiển thị hình ảnh
app.get('/listimg', function (req, res) {
  con.query("SELECT * FROM `hinhanh`order by mahinhanh desc", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});
//code thêm hình ảnh
app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {   //upload.single('file') , 'file' lấy từ bên react js qua 
   const file = req.file;
    if (!file) {
      const error = new Error('Chưa thêm hình ảnh !')
      error.httpStatusCode = 400
      return next(error)
    }
    else{
      // console.log("Chạy vào hàm lấy hình ảnh : "+ file.filename);
      var imgsrc = 'http://localhost:3001/images/' + file.filename;
      var sql = "insert into hinhanh (url, tenhinhanh)  values ('"+file.filename+"', '"+ req.body.name +"')";
      // console.log(sql);
      // console.log(imgsrc);
      con.query(sql, [imgsrc] , function(err, result, fields){
        if(err) throw err;
        // console.log(result);
        if(result.affectedRows == 1){
          // res.send('ok');
          // console.log(file);
          // console.log(res);
          console.log("tên hình ảnh new : "+file.filename);
          res.send(file);
        }
      });
    }
  })
//code xóa hình ảnh 
app.post('/deleteimg', function(req, res){
  var sql = "delete from hinhanh where mahinhanh = ("+req.body.myid+")";
  console.log(sql);
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result == 1){
      result.send('okdelete');
    }
  });
})

//Code thêm nhiều hình ảnh
// app.post('/uploadAnFileAPISanPham', upload.array('file', 12), (req, res, next) => {
//   const files = req.files
//   if (!files) {
//     const error = new Error('Please choose files')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//   console.log("tên hình ảnh new : "+files);
//   res.send(files)
// })

// Hiện thị hình ảnh mục image
app.set('view engine', 'ejs');   /// npm install ejs@3.1.6 lên gg tìm hiểu 
//Hiển thị hình ảnh html
app.get('/hienthihinhanh', function (req, res) {  // cái đầu là html :v viết dài dòng hơn , cái dưới là chạy bằng ejs , viết 1 dòng nhưng lại thêm nhiều file và folder
  // fs.readFile('src/demofile1.html', function(err, data) {
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(data);
  //   return res.end();
  // });
    res.render('pages/hienthihinhanh');
});

// app.post('/uploadphoto', upload.single('picture'), (req, res) => {
//   var img = fs.readFileSync(req.file.path);
//   var encode_image = img.toString('base64');
//   // Define a JSONobject for the image attributes for saving to database

//   var finalImg = {
//     contentType: req.file.mimetype,
//     image:  new Buffer(encode_image, 'base64')
//   };
//   db.collection('quotes').insertOne(finalImg, (err, result) => {
//     console.log(result)

//     if (err) return console.log(err)

//     console.log('saved to database')
//     res.redirect('/')
//   })
// })




//React Native
 // login
 app.post("/dangky", (req, res) => {
   var sql = "SELECT * FROM taikhoan WHERE taikhoan= '" + req.body.tentaikhoans + "' AND matkhau= '" + req.body.matkhaus +"'";
     console.log("đã vô phần đăng ký");
  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ success: false, message: "Database không có kết nối!" });
    }
    if (result.length > 0) {
      res.send({ success: false });
    } else {
      res.send({ success: true });
      var sql = "INSERT INTO taikhoan ( taikhoan, matkhau) values('" + req.body.tentaikhoans + "' ,  MD5('"+req.body.matkhaus +"') );"
      console.log(sql);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
      });
    }
  });


});

// signin
app.post("/dangnhap", (req, res) => {
  var sql ="SELECT * FROM taikhoan WHERE taikhoan= '" +req.body.username +"' AND matkhau= MD5('" +req.body.password +"')";
    console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err) {
      // console.log(err);
      res.send({ success: false, message: "Database không có kết nối!" });
    }

    if (result.length > 0) {
      res.send({ success: true });
      // console.log(res);
    } else {
      res.send({ success: false, message: "Sai tài khoản!" });
      // console.log(res);
    }
  });
});

//Edit Account
//Hiển thị thông tin tài khoản
app.get('/taikhoan', function (req, res) {
  con.query("SELECT * FROM `taikhoan`order by mataikhoan desc", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});

//Tìm kiếm chi tiết tài khoản lấy theo ID
app.get('/taikhoan/:idsp', function (req, res) {
  var page = req.params.idsp;
  
  var sql = "SELECT * FROM taikhoan WHERE taikhoan = '" + page +"' ";
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
    });
});

// ERR 404
app.use(function(req, res, next) {
    res.status(404);
    res.send('404: err');
});

//server
app.listen(3001, function () {
    console.log('Example app listening on port 3001! "http://localhost:3001"  ');
});





