import React from 'react';

function Banner(props) {
    return (
        <section>
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-12">
              <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to={0} class="active" />
                  <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                  <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="assets/dist/img/banner.webp" class="d-block w-100" alt="..." />
                  </div>
                  <div class="carousel-item">
                    <img src="assets/dist/img/banner.webp" class="d-block w-100" alt="..." />
                  </div>
                  <div class="carousel-item">
                    <img src="assets/dist/img/banner.webp" class="d-block w-100" alt="..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Banner;