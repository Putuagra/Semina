import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import SBreadcrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import Form from "./form";
import { useDispatch } from "react-redux";
import { getData, putData } from "../../utils/fetch";
import { setNotification } from "../../redux/notifikasi/actions";

export default function EditCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const [form, setForm] = useState({
    name: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchOneCategory = async () => {
    const res = await getData(`/cms/categories/${categoryId}`);
    setForm({ ...form, name: res.data.data.name });
  };

  useEffect(() => {
    fetchOneCategory();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await putData(`/cms/categories/${categoryId}`, form);
    if (res?.data?.data) {
      dispatch(
        setNotification(
          true,
          "success",
          `berhasil ubah kategori ${res.data.data.name}`
        )
      );
      navigate("/categories");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <>
      <Container>
        <SBreadcrumb
          textSecond={"Categories"}
          urlSecond={"/categories"}
          textThird={"Edit"}
        />
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
        <Form
          edit
          form={form}
          isLoading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </>
  );
}
