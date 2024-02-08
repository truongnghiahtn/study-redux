/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchListUser } from "../redux/user/user";
import { toast } from "react-toastify";

interface IUser{
  id:number,
  name:string,
  email:string
}

const Content = ({handleEdit,handleDelete}:{handleEdit:any;handleDelete:any}) => {
 
  const dispatch=useAppDispatch();
  const listUser=useAppSelector(state=>state.user.listUser);
  useEffect(()=>{
    dispatch(fetchListUser());
  },[]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser?.map((item:IUser)=>{
            return (
              <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={()=>handleEdit(item)} className="btn btn-warning m-2">
                  Edit
                </button>
                <button onClick={()=>handleDelete(item)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
            )
          })}

        </tbody>
      </Table>
    </>
  );
};
export default Content;
