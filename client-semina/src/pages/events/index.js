import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEvents,
  setKeyword,
  setCategory,
  setTalent,
} from "../../redux/events/actions";
import SAlert from "../../components/Alert";
import SelectBox from "../../components/SelectBox";
import Swal from "sweetalert2";
import { deleteData, putData } from "../../utils/fetch";
import { setNotification } from "../../redux/notifikasi/actions";
import {
  fetchListCategories,
  fetchListTalents,
} from "../../redux/lists/actions";
import SBreadcrumb from "../../components/Breadcrumb";

export default function PageEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);
  const events = useSelector((state) => state.events);
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, events.keyword, events.category, events.talent]);

  useEffect(() => {
    dispatch(fetchListCategories());
    dispatch(fetchListTalents());
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
        const res = await deleteData(`/cms/events/${id}`);

        dispatch(
          setNotification(
            true,
            "success",
            `berhasil hapus event ${res.data.data.title}`
          )
        );

        dispatch(fetchEvents());
      }
    });
  };

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Ubah Status",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusEvent: status === "Published" ? "Draft" : "Published",
        };
        const res = await putData(`/cms/events/${id}/status`, payload);

        dispatch(
          setNotification(
            true,
            "success",
            `berhasil ubah status event ${res.data.data.title}`
          )
        );

        dispatch(fetchEvents());
      }
    });
  };

  return (
    <Container className="mt-3">
      <Button action={() => navigate("/events/create")}>Tambah</Button>
      <SBreadcrumb textSecond={"Events"} />
      <Row>
        <Col>
          <SearchInput
            name="keyword"
            query={events.keyword}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukkan pencarian kategori"}
            name="category"
            value={events.category}
            options={lists.categories}
            isClearable={true}
            handleChange={(e) => dispatch(setCategory(e))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukkan pencarian pembicara"}
            name="talent"
            value={events.talent}
            options={lists.talents}
            isClearable={true}
            handleChange={(e) => dispatch(setTalent(e))}
          />
        </Col>
      </Row>

      {notification.status && (
        <SAlert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}

      <Table
        status={events.status}
        thead={[
          "Judul",
          "Tanggal",
          "Tempat",
          "Status",
          "Kategori",
          "Pembicara",
          "Aksi",
        ]}
        data={events.data}
        tbody={[
          "title",
          "date",
          "venueName",
          "statusEvent",
          "categoryName",
          "talentName",
        ]}
        editUrl={"/events/edit"}
        deleteAction={(id) => handleDelete(id)}
        customAction={(id, status = "") => {
          return (
            <Button
              className={"mx-2"}
              variant="primary"
              size={"sm"}
              action={() => handleChangeStatus(id, status)}
            >
              Change Status
            </Button>
          );
        }}
        withoutPagination
      />
    </Container>
  );
}
