import React, { useEffect ,useState} from 'react';
import axios from 'axios'
import classes from './Sidebar.Module.css'
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
            <aside class={attachClasses.join(' ')} style={{background: '#FFFF', width:'380px' }}>
          {/* Brand Logo */}
          {/* Sidebar */}
          <div class="sidebar">
            {/* Sidebar user panel (optional) */}
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
              <div class="image">
                <a href> <img src="assets/dist/img/logo.png" style={{width: '150px'}} alt="User Image" /></a>
              </div>
              <div class="info">
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
               {categories.map(cat=>( <li class="nav-item has-treeview">
              
                  <Link onClick={props.closed} to={"/category/"+cat.id+"/"+cat.name} className="nav-link" >
                    <img src={cat.image} alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <p>
                      {cat.name}
                      <i class="fas fa-angle-right right" />
                    </p>
                  </Link>
                 
                </li>))}
               
         
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
        <div class={overlayClasses.join(' ')} onClick={props.closed}>
        </div>
        </>
    );
}

export default withRouter(Sidebar);