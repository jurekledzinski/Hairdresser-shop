import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { addSingleSection } from "../../../reduxStore/actions/actionScroll";

import "./Team.scss";

const Team = () => {
  const teamRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (teamRef.current) {
      dispatch(addSingleSection(teamRef.current));
    }
  }, []);

  return (
    <section className="team" ref={teamRef}>
      <div className="team__wrapper">
        <h2 className="team__title">Our Team</h2>
        <p className="team__subtitle">
          One should, nevertheless, consider that there is a direct relation
          between the entity integrity and the capacity of the primary element.
        </p>
        <div className="team__group">
          <div className="team__below-cover-1"></div>
          <div className="team__below-cover-2"></div>
          <div className="team__below-cover-3"></div>
          <div className="team__below-cover-4"></div>
          <div className="team__col1">
            <span className="team__name-1">Joe Doe</span>
          </div>
          <div className="team__col2 team__col2--margin">
            <p className="team__name">Joe Doe</p>
            <p className="team__text">
              Don't talk to me about hours, what about sudo, man? How are we
              gonna get that?
            </p>
            <Link className="team__read-more-1" to="/team-details">
              Read more...
            </Link>
          </div>
          <div className="team__col3 team__col3--margin">
            <p className="team__name">Jim Carry</p>
            <p className="team__text">
              Don't talk to me about hours, what about sudo, man? How are we
              gonna get that?
            </p>
            <Link className="team__read-more-2" to="/team-details">
              Read more...
            </Link>
          </div>
          <div className="team__col4">
            <span className="team__name-2">Jim Carry</span>
          </div>
          <div className="team__col5">
            <p className="team__name">John Johnson</p>
            <p className="team__text">
              Don't talk to me about hours, what about sudo, man? How are we
              gonna get that? Yo... it's appointment only! Jeez, you look
              like... Lex Luthor. I got two dudes turned into raspberry slushy
              and flushed down my toilet.
            </p>
            <Link className="team__read-more-3" to="/team-details">
              Read more...
            </Link>
          </div>
          <div className="team__col6">
            <span className="team__name-1">John Johson</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
