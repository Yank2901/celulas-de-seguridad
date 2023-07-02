import { React} from "react";

const Comment = (props) => {
  return (

    <div style={{flex:'1', margin:'1%', padding:'2%'}}>
        
        <h3>{props.titulo}</h3>
        <h4>{props.texto}</h4>
        <img src={props.imagen} style={{width: "60px", height: "60px"}} alt="foto_"/>
        <h5>{props.nombre}</h5>
        <h5>{props.cargo}</h5>

        
    </div>

    // <Fragment>
    //   <h2>Comment</h2>
    // </Fragment>
  );
};

export default Comment;
