import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "../src/App.css"
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from "../src/components/home"
import Account from "../src/components/account"
import Category from "./components/category";
import Trademark from "../src/components/trademark"
import EditCategory from "../src/components/edit/edit_category"
import EditTrademark from "../src/components/edit/edit_trademark"
import Editsanpham from "../src/components/edit/edit_home"
import Image from "../src/components/image"
import ListProduct from "../src/components/List/list_product"
import EditImage from "../src/components/edit/edit_image"

export default function BasicExample() {
 //let location = useLocation();
  return (
    <Router>
      <div>
        <ul>
          <nav className="navbar navbar-expand-lg navbar-light bg-dark">
     <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
       <li className="nav-item active ">
          sssssssss
        </li>
        <li className="nav-item active">
          <a className="nav-link text-white" href="/home" >Home</a>
        </li>
       <li className="nav-item">
          <a className="nav-link text-white" href="/account">Account</a>
      </li>
       <li className="nav-item">
          <a className="nav-link text-white" href="/category">Category</a>
       </li>
       <li className="nav-item">
          <a className="nav-link text-white" href="/trademark">Trademark</a>
       </li>
       <li className="nav-item">
          <a className="nav-link text-white" href="/image">Image</a>
       </li>
       
      </ul>
     </div>
    </nav> 
        </ul>

        <hr />

        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>

          <Route path="/account">
            <Account />
          </Route>

          <Route path="/category">
            <Category />
          </Route>

          <Route path="/trademark">
            <Trademark />
          </Route>

          <Route path="/image">
            <Image />
          </Route>

          <Route path={"/editdanhmucsanpham/:id"} children={<EditCategory />}>
          </Route>

          <Route path={"/editthuonghieu/:id"} children={<EditTrademark/>}>
          </Route>

          <Route path={"/editsanpham/:id"} children={<Editsanpham/>}>
          </Route>

          <Route path={"/editimage/:id"} children={<EditImage/>}>
          </Route>

          <Route path={"/listsanpham"}>
            <ListProduct />
          </Route>

          <Route path="/">
            <KHONGCOGI />
          </Route>      

        </Switch>
      </div>
    </Router>
  );
}

function KHONGCOGI (){

  return (
    <div className="full_screen">
      <h1 > CHÀO MỪNG ĐẾN VỚI THẾ GIỚI PC , ADMIN </h1>
      <img className="full_img" src="https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_960_720.jpg" alt="img_home">
      </img>
    </div>
  );

}
