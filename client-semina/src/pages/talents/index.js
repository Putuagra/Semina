import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTalents, setKeyword } from "../../redux/talents/actions";
import { accessTalents } from "../../const/access";
import { deleteData } from "../../utils/fetch";
import { setNotification } from "../../redux/notifikasi/actions";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import SAlert from "../../components/Alert";
import Table from "../../components/TableWithAction";

export default function PageTalents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const talents = useSelector((state) => state.talents);
  const notification = useSelector((state) => state.notification);

  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessTalents).forEach(function (key, index) {
      if (accessTalents[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/talents/${id}`);

        dispatch(
          setNotification(
            true,
            "success",
            `berhasil hapus pembicara ${res.data.data.name}`
          )
        );

        dispatch(fetchTalents());
      }
    });
  };
  return (
    <Container className="mt-3">
      <SBreadcrumb textSecond={"Talents"} />
      {access.tambah && (
        <div className="mb-3">
          <SButton action={() => navigate("/talents/create")}>Tambah</SButton>
        </div>
      )}
      <SearchInput
        query={talents.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {notification.status && (
        <SAlert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}
      <Table
        status={talents.status}
        thead={["Nama", "Role", "Avatar", "Aksi"]}
        data={talents.data}
        tbody={["name", "role", "avatar"]}
        editUrl={access.edit ? `/talents/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}
