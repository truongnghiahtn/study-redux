/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { IUserAction, IUserPayload } from "../../interFace/global";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCreateUser,
  fetchDeleteUser,
  fetchUpdateUser,
  setIsDeleteUser,
  setIsUpdateUser,
  setIscreateUser,
} from "../../redux/user/user";
import { toast } from "react-toastify";

interface IForm {
  id?: number;
  name: string | undefined;
  email: string | undefined;
}
const ModalUser = ({
  show,
  setShow,
  userInfor,
  setUserAction,
}: {
  show: boolean;
  setShow: any;
  userInfor: IUserAction;
  setUserAction: any;
}) => {
  const [title, setTile] = useState("Add User");
  const [data, setData] = useState<IForm>({
    name: "",
    email: "",
  });
  const isCreate = useAppSelector((state) => state.user.statusCreate);
  const isUpdate = useAppSelector((state) => state.user.statusUpdate);
  const isDelete = useAppSelector((state) => state.user.statusDelete);

  const dispatch = useAppDispatch();

  useEffect(() => {

    if (show) {
      if (userInfor && userInfor?.type === "delete") {
        setTile("Delete User");
      } else if (userInfor && userInfor?.type === "edit") {
        setTile("Update User");
        setData({
          id: userInfor.id,
          name: userInfor.name,
          email: userInfor.email,
        });
      } else {
        setTile("Add User");
      }
    }
  }, [show]);

  useEffect(() => {
    if (isCreate) {
      handleClose();
      toast.success("thanh cong");
      dispatch(setIscreateUser());
    }
    if (isUpdate) {
      handleClose();
      toast.success("thanh cong");
      dispatch(setIsUpdateUser());
    }
    if (isDelete) {
      handleClose();
      toast.success("thanh cong");
      dispatch(setIsDeleteUser());
    }
  }, [isCreate, isUpdate, isDelete]);

  const handleClose = () => {
    setData({ name: "", email: "" });
    setShow(false);
    setTimeout(() => {
      setUserAction({ type: "" });
    }, 500);
  };
  const submit = (e: any) => {
    e.preventDefault();
    const userPayload: IUserPayload = { name: data.name, email: data.email };
    switch (userInfor?.type) {
      case "edit":
        userPayload.id = userInfor.id;
        dispatch(fetchUpdateUser(userPayload));
        break;
        case "delete":
          dispatch(fetchDeleteUser(userInfor.id));
          break;

      default:
        dispatch(fetchCreateUser(userPayload));
        break;
    }
  };
  return (
    <>
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userInfor && userInfor?.type !== "delete" ? (
            <Form onSubmit={(e) => submit(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  value={data.name}
                  type="text"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Enter userName"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              {/* <Button variant="primary" type="submit">
                Submit
              </Button> */}
            </Form>
          ) : (
            <div>Bạn muốn xóa người này không ??? {userInfor?.name}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {userInfor && userInfor?.type !== "delete" ? (
            <Button variant="primary" onClick={submit}>
              Save Changes
            </Button>
          ) : (
            <Button variant="danger" type="submit" onClick={submit}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUser;
