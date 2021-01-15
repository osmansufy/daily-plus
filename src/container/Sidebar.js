import React, { useEffect ,useState} from 'react';
import axios from 'axios'
import classes from './Sidebar.Module.css'
import logo from '../assets/img/logo.png'
import { Link,withRouter} from 'react-router-dom';
const Sidebar=props=>{
 const [categories,setCategories]=useState([])
 console.log(categories)
  useEffect(()=>{

    axios.get('https://api.dailyplus.store/v0/catalogue/category/').then(response=>{
           
      setCategories(response.data)
      
      
  }).
  catch(error=>{
    console.log(error)
  })
  },[])

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
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <a> <img src={logo}style={{width: '150px'}} alt="User Image" /></a>
              </div>
              <div className="info">
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
               {categories.map((cat,index)=>( <li key={index} className="nav-item has-treeview">
              
                  <Link onClick={props.closed} to={"/category/"+cat.id+"/"+cat.name} className="nav-link" >
                    <img src={cat.image} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                    <p>
                      {cat.name}
                      <i className="fas fa-angle-right right" />
                    </p>
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