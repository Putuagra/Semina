import React from "react";
import { Table } from "react-bootstrap";
import Tbody from "../TbodyWithAction";
import Thead from "../Thead";
import Pagination from "../Pagination";

export default function TableWithAction({
  withoutPagination,
  handlePageClick,
  actionNotDisplay,
  data,
  thead,
  tbody,
  editUrl,
  deleteAction,
  customAction,
  status,
  pages,
}) {
  return (
    <>
      <Table striped bordered hover>
        <Thead text={thead} />
        <Tbody
          status={status}
          data={data}
          display={tbody}
          editUrl={editUrl}
          deleteAction={deleteAction}
          actionNotDisplay={actionNotDisplay}
          customAction={customAction}
        />
      </Table>
      {!withoutPagination && data.length ? (
          <Pagination pages={pages} handlePageClick={handlePageClick} />
        ) : (
          ''
        )}
    </>
  );
}
