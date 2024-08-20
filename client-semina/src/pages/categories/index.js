import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SButton from "../../components/Button";
import SBreadcrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert"
import { useDispatch, useSelector } from "react-redux";
import { accessCategories } from "../../const/access";
import { fetchCategories } from "../../redux/categories/actions";
import Table from '../../components/TableWithAction'

export default function PageCategories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification)
  const categories = useSelector((state) => state.categories);
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
    Object.keys(accessCategories).forEach(function (key, index) {
      if (accessCategories[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    // Swal.fire({
    //   title: 'Apa kamu yakin?',
    //   text: 'Anda tidak akan dapat mengembalikan ini!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Iya, Hapus',
    //   cancelButtonText: 'Batal',
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     const res = await deleteData(`/cms/categories/${id}`);
    //     dispatch(
    //       setNotif(
    //         true,
    //         'success',
    //         `berhasil hapus kategori ${res.data.data.name}`
    //       )
    //     );
    //     dispatch(fetchCategories());
    //   }
    // });
  };

  return (
    <>
      <Container className="mt-3">
        <SBreadcrumb textSecond={"Categories"} />
        {access.tambah && (
          <SButton
            className={"mb-3"}
            action={() => navigate("/categories/create")}
          >
            Tambah
          </SButton>
        )}

        {notification.status && (
        <SAlert type={notification.typeNotification} message={notification.message} />
      )}

        <Table
          status={categories.status}
          thead={["Nama", "Aksi"]}
          data={categories.data}
          tbody={["name"]}
          editUrl={access.edit ? `/categories/edit` : null}
          deleteAction={access.hapus ? (id) => handleDelete(id) : null}
          withoutPagination
        />
      </Container>
    </>
  );
}
