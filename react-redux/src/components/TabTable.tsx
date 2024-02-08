import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Content from "./Content";
import ModalUser from "./modal/modalUser";
import { useState } from "react";

interface IUserAction{
  id?:number,
  name?:string,
  email?:string,
  type?:string
}
const TabTable = () => {
  const [show,setShow]= useState<boolean>(false);
  const [userAction,setUserAction]=useState<IUserAction>({});

  const handleEdit=(user:IUserAction)=>{
    setUserAction({...user,type:"edit"});
    setShow(true)
  }
  const handleDelete=(user:IUserAction)=>{
    setUserAction({...user,type:"delete"});
    setShow(true)
  }

  return (
    <>
      <div className="container mt-3" >
        <button className="btn btn-primary" onClick={()=>setShow(true)}>
              Create
        </button>
      </div>
      <div style={{ padding:"0 20px" }}>
        <Tabs
          defaultActiveKey="user"
          id="uncontrolled-tab-example"
          className="mb-3 mt-3 "
        >
          <Tab eventKey="user" title="User">
            <Content  handleEdit={handleEdit} handleDelete={handleDelete}/>
          </Tab>
          <Tab eventKey="blogs" title="Blogs">
            Tab content for Profile
          </Tab>
        </Tabs>
      </div>
      <ModalUser show={show} setShow={setShow} userInfor={userAction} setUserAction={setUserAction}/>
    </>
  );
};
export default TabTable;
