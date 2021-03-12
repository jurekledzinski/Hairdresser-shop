import React from "react";

import "./Team.scss";

const Team = () => {
  return (
    <section className="team">
      <div className="team__wrapper">
        <h2 className="team__title">Our Team</h2>
        <p className="team__subtitle">
          "One should, nevertheless, consider that there is a direct relation
          between the entity integrity and the capacity of the primary element.
        </p>
        <div className="team__group">
          <span className="team__below-cover-1"></span>
          <span className="team__below-cover-2"></span>
          <span className="team__below-cover-3"></span>
          <span className="team__below-cover-4"></span>
          <div className="team__col1">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/person-1.jpg?alt=media&token=2494de55-efd0-4879-8888-2108fd480e56"
              alt="Hairdresser"
              className="team__image1"
            />
          </div>
          <div className="team__col2">
            <p className="team__text1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
              aspernatur nesciunt eos, delectus eaque similique beatae facilis
              hic totam sit? Quos quibusdam explicabo atque ipsum, obcaecati
              necessitatibus amet officiis facilis!
            </p>
          </div>
          <div className="team__col3">text 2</div>
          <div className="team__col4">Image 2</div>
          <div className="team__col5">text 3</div>
          <div className="team__col6">Image 3</div>
          <div className="team__col7">Image 4</div>
          <div className="team__col8">text 4</div>
        </div>
      </div>
    </section>
  );
};

export default Team;
