import { React} from "react";

const Steps = (props) => {
  return (
    <div style={{flex:'1', margin:'1%', padding:'2%'}}>
        <img src={props.imagen} style={{width: "125px", height: "125px"}} alt="foto_"/>
        <h3>{props.titulo}</h3>
        <h4>{props.texto}</h4>
    </div>
  );
};

export default Steps;
