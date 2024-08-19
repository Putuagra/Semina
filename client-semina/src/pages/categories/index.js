import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import SButton from "../../components/Button";
import SBreadcrumb from "../../components/Breadcrumb";
import SNavbar from "../../components/Navbar";
import axios from "axios";
import { config } from "../../configs";

export default function PageCategories() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setData(res.data.data);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (!token) return <Navigate to="/signin" replace={true} />;
  return (
    <>
      <SNavbar />

      <Container className="mt-3">
        <SBreadcrumb textSecond={"Categories"} />
        <SButton action={() => navigate('/categories/create')}>Tambah</SButton>
        <Table className="mt-3" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={data.length + 1} style={{ textAlign: "center" }}>
                  <div className="flex items-center justify-center">
                    <Spinner animation="grow" variant="light" />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{data.name}</td>
                  <td>1</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
