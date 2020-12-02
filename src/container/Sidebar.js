import React from 'react';

function Sidebar(props) {
    return (
        <div>
            <aside class="main-sidebar sidebar-dark-primary elevation-4" style={{background: '#FFFF'}}>
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
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <img src="assets/dist/img/list1.svg" alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <p>
                      Fish and Meat
                      <i class="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="fish.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Fish</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="meat.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Meat</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <img src="assets/dist/img/list2.svg" alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <p>
                      Daily
                      <i class="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="milk.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Milk</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="rice.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Rice</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <img src="assets/dist/img/list3.svg" alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <p>
                      Fruits and Vegetables
                      <i class="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="mango.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Mango</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="cucomba.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Cucomba</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <img src="assets/dist/img/list1.svg" alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <p>
                      Fish and Meat
                      <i class="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="fish.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Fish</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="meat.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Meat</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <img src="assets/dist/img/list2.svg" alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <p>
                      Daily
                      <i class="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="milk.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Milk</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="rice.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Rice</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <img src="assets/dist/img/list3.svg" alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <p>
                      Fruits and Vegetables
                      <i class="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="mango.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Mango</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="cucomba.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Cucomba</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <img src="assets/dist/img/list1.svg" alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <p>
                      Fish and Meat
                      <i class="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="fish.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Fish</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="meat.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Meat</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <img src="assets/dist/img/list2.svg" alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <p>
                      Daily
                      <i class="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="milk.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Milk</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="rice.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Rice</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <img src="assets/dist/img/list3.svg" alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <p>
                      Fruits and Vegetables
                      <i class="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="mango.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Mango</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="cucomba.html" class="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Cucomba</p>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
        <div class="header_overlay" />
        </div>
    );
}

export default Sidebar;