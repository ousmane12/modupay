import React from "react";
import PageTitle from "../../../layouts/PageTitle";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductOrder = () => {
  const motherChackBox = document.querySelector(".product_order_single");
  const chackbox = document.querySelectorAll(".product_order");
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  return (
    <div className="h-80">
      <PageTitle activeMenu="Transactions" motherMenu="Valider" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body " style={{ padding: "1.25rem" }}>
              <div className="table-responsive">
                <table className="table table-sm mb-0 table-responsive-lg ">
                  <thead>
                    <tr>
                      <th className="align-middle">ID</th>
                      <th className="align-middle pr-7">Recepteur</th>
                      <th className="align-middle minw200">Telephone</th>
                      <th className="align-middle text-right">Statut</th>
                      <th className="align-middle text-right">Montant</th>
                      <th className="no-sort" />
                    </tr>
                  </thead>
                  <tbody id="orders">
                    <tr className="btn-reveal-trigger">
                      <td className="py-2">
                        <Link to="/valider-transaction">
                          <strong>#181</strong>
                        </Link>{" "}
                        by <strong>Ricky Antony</strong>
                        <br />
                        <a href="mailto:ricky@example.com">ricky@example.com</a>
                      </td>
                      <td className="py-2">20/04/2020</td>
                      <td className="py-2">
                        Ricky Antony, 2392 Main Avenue, Penasauka, New Jersey
                        02149
                        <p className="mb-0 text-500">Via Flat Rate</p>
                      </td>
                      <td className="py-2 text-right">
                        <span className="badge badge-success">
                          Completed
                          <span className="ms-1 fa fa-check" />
                        </span>
                      </td>
                      <td className="py-2 text-right">$99</td>
                      <td className="py-2 text-right">
                        <Dropdown className="dropdown text-sans-serif">
                          <Dropdown.Toggle
                            variant=""
                            className="btn btn-primary i-false tp-btn-light sharp"
                            type="button"
                            id="order-dropdown-0"
                            data-toggle="dropdown"
                            data-boundary="viewport"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                                version="1.1"
                              >
                                <g
                                  stroke="none"
                                  strokeWidth={1}
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <rect x={0} y={0} width={24} height={24} />
                                  <circle fill="#000000" cx={5} cy={12} r={2} />
                                  <circle
                                    fill="#000000"
                                    cx={12}
                                    cy={12}
                                    r={2}
                                  />
                                  <circle
                                    fill="#000000"
                                    cx={19}
                                    cy={12}
                                    r={2}
                                  />
                                </g>
                              </svg>
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className="dropdown-menu dropdown-menu-right border py-0"
                            aria-labelledby="order-dropdown-0"
                          >
                            <div className="py-2">
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Completed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Processing
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                On Hold
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Pending
                              </Link>
                              <div className="dropdown-divider" />
                              <Link
                                className="dropdown-item text-danger"
                                to="/valider-transaction"
                              >
                                Delete
                              </Link>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr className="btn-reveal-trigger">
                      <td className="py-2">
                        <Link to="/valider-transaction">
                          <strong>#182</strong>
                        </Link>{" "}
                        by <strong>Kin Rossow</strong>
                        <br />
                        <a href="mailto:kin@example.com">kin@example.com</a>
                      </td>
                      <td className="py-2">20/04/2020</td>
                      <td className="py-2">
                        Kin Rossow, 1 Hollywood Blvd,Beverly Hills, California
                        90210
                        <p className="mb-0 text-500">Via Free Shipping</p>
                      </td>
                      <td className="py-2 text-right">
                        <span className="badge badge-primary">
                          Processing
                          <span className="ms-1 fa fa-redo" />
                        </span>
                      </td>
                      <td className="py-2 text-right">$120</td>
                      <td className="py-2 text-right">
                        <Dropdown className="dropdown text-sans-serif">
                          <Dropdown.Toggle
                            variant=""
                            className="btn btn-primary i-false tp-btn-light sharp"
                            type="button"
                            id="order-dropdown-0"
                            data-toggle="dropdown"
                            data-boundary="viewport"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                                version="1.1"
                              >
                                <g
                                  stroke="none"
                                  strokeWidth={1}
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <rect x={0} y={0} width={24} height={24} />
                                  <circle fill="#000000" cx={5} cy={12} r={2} />
                                  <circle
                                    fill="#000000"
                                    cx={12}
                                    cy={12}
                                    r={2}
                                  />
                                  <circle
                                    fill="#000000"
                                    cx={19}
                                    cy={12}
                                    r={2}
                                  />
                                </g>
                              </svg>
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className="dropdown-menu dropdown-menu-right border py-0"
                            aria-labelledby="order-dropdown-0"
                          >
                            <div className="py-2">
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Completed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Processing
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                On Hold
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Pending
                              </Link>
                              <div className="dropdown-divider" />
                              <Link
                                className="dropdown-item text-danger"
                                to="/valider-transaction"
                              >
                                Delete
                              </Link>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr className="btn-reveal-trigger">
                      
                      <td className="py-2">
                        <Link to="/valider-transaction">
                          <strong>#183</strong>
                        </Link>{" "}
                        by <strong>Merry Diana</strong>
                        <br />
                        <a href="mailto:merry@example.com">merry@example.com</a>
                      </td>
                      <td className="py-2">30/04/2020</td>
                      <td className="py-2">
                        Merry Diana, 1 Infinite Loop, Cupertino, California
                        90210
                        <p className="mb-0 text-500">Via Link Road</p>
                      </td>
                      <td className="py-2 text-right">
                        <span className="badge badge-secondary">
                          On Hold
                          <span className="ms-1 fa fa-ban" />
                        </span>
                      </td>
                      <td className="py-2 text-right">$70</td>
                      <td className="py-2 text-right">
                        <Dropdown className="dropdown text-sans-serif">
                          <Dropdown.Toggle
                            variant=""
                            className="btn btn-primary i-false tp-btn-light sharp"
                            type="button"
                            id="order-dropdown-0"
                            data-toggle="dropdown"
                            data-boundary="viewport"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                                version="1.1"
                              >
                                <g
                                  stroke="none"
                                  strokeWidth={1}
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <rect x={0} y={0} width={24} height={24} />
                                  <circle fill="#000000" cx={5} cy={12} r={2} />
                                  <circle
                                    fill="#000000"
                                    cx={12}
                                    cy={12}
                                    r={2}
                                  />
                                  <circle
                                    fill="#000000"
                                    cx={19}
                                    cy={12}
                                    r={2}
                                  />
                                </g>
                              </svg>
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className="dropdown-menu dropdown-menu-right border py-0"
                            aria-labelledby="order-dropdown-0"
                          >
                            <div className="py-2">
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Completed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Processing
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                On Hold
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Pending
                              </Link>
                              <div className="dropdown-divider" />
                              <Link
                                className="dropdown-item text-danger"
                                to="/valider-transaction"
                              >
                                Delete
                              </Link>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr className="btn-reveal-trigger">
                      <td className="py-2">
                        <Link to="/valider-transaction">
                          <strong>#184</strong>
                        </Link>{" "}
                        by <strong>Bucky Robert</strong>
                        <br />
                        <a href="mailto:bucky@example.com">bucky@example.com</a>
                      </td>
                      <td className="py-2">30/04/2020</td>
                      <td className="py-2">
                        Bucky Robert, 1 Infinite Loop, Cupertino, California
                        90210
                        <p className="mb-0 text-500">Via Free Shipping</p>
                      </td>
                      <td className="py-2 text-right">
                        <span className="badge badge-warning">
                          Pending
                          <span className="ms-1 fas fa-stream" />
                        </span>
                      </td>
                      <td className="py-2 text-right">$92</td>
                      <td className="py-2 text-right">
                        <Dropdown className="dropdown text-sans-serif">
                          <Dropdown.Toggle
                            variant=""
                            className="btn btn-primary i-false tp-btn-light sharp"
                            type="button"
                            id="order-dropdown-0"
                            data-toggle="dropdown"
                            data-boundary="viewport"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                                version="1.1"
                              >
                                <g
                                  stroke="none"
                                  strokeWidth={1}
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <rect x={0} y={0} width={24} height={24} />
                                  <circle fill="#000000" cx={5} cy={12} r={2} />
                                  <circle
                                    fill="#000000"
                                    cx={12}
                                    cy={12}
                                    r={2}
                                  />
                                  <circle
                                    fill="#000000"
                                    cx={19}
                                    cy={12}
                                    r={2}
                                  />
                                </g>
                              </svg>
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className="dropdown-menu dropdown-menu-right border py-0"
                            aria-labelledby="order-dropdown-0"
                          >
                            <div className="py-2">
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Completed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Processing
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                On Hold
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/valider-transaction"
                              >
                                Pending
                              </Link>
                              <div className="dropdown-divider" />
                              <Link
                                className="dropdown-item text-danger"
                                to="/valider-transaction"
                              >
                                Delete
                              </Link>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrder;
