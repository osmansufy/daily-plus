import React, { useEffect ,useState} from 'react';
import axios from 'axios'
import classes from './Sidebar.Module.css'
import logo from '../assets/img/logo.png'
import { Link,withRouter} from 'react-router-dom';
import Spinner from '../container/Spinner/Spinner'
const Sidebar=props=>{
 
 

  let attachClasses=[classes.mainsidebar,classes.close]
  if(props.show){
    attachClasses=[classes.mainsidebar,classes.show]
  }
  let overlayClasses=[classes.header_overlay,classes.close]
  if(props.show){
    overlayClasses=[classes.header_overlay,classes.active]
  }
    return (
       <>
            <aside className={attachClasses.join(' ')} style={{background: '#FFFF', width:'380px' }}>
          {/* Brand Logo */}
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 justify-content-between d-flex">
              <div className="image">
                <Link onClick={props.closed} to="/"> <img src={logo}style={{width: '150px'}} alt="User Image" /></Link>
              </div>

              <div className="info">
                <a onClick={props.closed} className="pr-4 text-denger">X</a>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
               {props.isLoading ? <Spinner /> : props.categories && props.categories.map((cat,index)=>( <li key={index} className="nav-item has-treeview">
              
                  <Link onClick={props.closed} to={"/category/"+cat.id+"/"+cat.name} className="nav-link align-items-center p-0 justify-content-between d-flex" >
                   <div className="d-flex align-items-center">
                   <img src={cat.thumbnail_image_url} alt="User Avatar" className="img-size-50 mr-3 rounded-circle" />
                    <p className="m-0">
                      {cat.name}
                      
                    </p>
                   </div>
                   
                    <bold>
                      <i className="fas fa-angle-right ms-auto p-2 w-100" />
                      </bold>
                  
                  </Link>
                 
                </li>))}
               
         
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
        <div className={overlayClasses.join(' ')} onClick={props.closed}>
        </div>
        </>
    );
}

export default withRouter(Sidebar);