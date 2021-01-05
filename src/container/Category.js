
import React, { Component } from 'react';
import axios from 'axios'
import SingleCategory from '../component/SingleCategory';
class Category extends Component {
    state={
        categories:[]
    }
    componentDidMount(){
        axios.get('https://api.dailyplus.store/v0/catalogue/category/').then(response=>{
           
            this.setState({categories:response.data})
            console.log("Osman goni")
            
        })
    };

    
    render() {
        const cats =this.state.categories.map((item,index)=>{
return <SingleCategory data={item} key={index} />

        });
        return (<section class="category-section">
            <div class="container">
              <div class="row mb-4">
                <div class="col-md-6 col-sm-6 col-6">
                  <h2>Shop by Categories</h2>
                </div>
                <div class="col-md-6 col-sm-6 col-6">
                  <button class="btn btn-primary float-right">View All Category</button>
                </div>
              </div>
              <div class="row category-items">
                {cats}
              </div>
            </div>
          </section>
            
        );
    }
}

export default Category;

