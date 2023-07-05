import { React, Fragment } from "react";
import Steps from "../Components/Steps";
import Comment from "../Components/Comment";
import Presentation from "../Components/Presentation";
const Home = () => {
  return (
    <Fragment>
      <Presentation></Presentation>
      <Steps></Steps>
      <Comment></Comment>
    </Fragment>
  );
};

export default Home;
