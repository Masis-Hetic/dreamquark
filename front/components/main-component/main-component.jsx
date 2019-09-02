import React, { Fragment } from "react";
import Nav                 from "../nav/nav";

const MainComponent = props => {
  return (
    <Fragment>
      <Nav path={props.asPath}/>
      {props.children}
    </Fragment>
  )
};

export default MainComponent;
