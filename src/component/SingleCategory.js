import React from 'react';

function SingleCategory(props) {
    return (
        
             <div class="col-md-3 col-sm-2 col-12 mt-2">
                  <a href="category.html">
                    <div class="card category-card">
                      <img src={props.src} alt="" />
                      <h6>{props.title}</h6>
                    </div>
                  </a>
                </div>
        
    );
}

export default SingleCategory;