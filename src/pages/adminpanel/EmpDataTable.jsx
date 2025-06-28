import React, { useMemo, useRef, useState } from "react";
import AdminAside from "../../components/Aside/AdminAside";
import Header from "../../components/Header/Header";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser } from "../../features/employees/employeeSlice";
import { FaDownload, FaTrash } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { toast } from "react-toastify";

// --------------- export cvs files start ----------------

const convertArrayOfObjectsToCSV = (array) => {
  const header = Object.keys(array[0]).join(",") + "\n";
  const rows = array.map((obj) => Object.values(obj).join(",")).join("\n");
  return header + rows;
};

const downloadCSV = (array) => {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};

const Export = ({ onExport }) => (
  <button
    onClick={onExport}
    className="text-2xl p-1.5 text-blue-500 hover:bg-blue-100 cursor-pointer rounded-xl"
  >
    <FaDownload />
  </button>
);

// ------------------ export cvs files end ----------------

const EmpDataTable = () => {
  // ------------- use state and selector ------------------

  const [selectedRow, setSelectedRow] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef();

  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(employees)} />,
    [employees]
  );

  // ------------ handle delete ---------------

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    toast.error("Delete Successfull");
  };

  // ----------- handle edit ---------------

  const handleEdit = (id) => {
    dispatch(editUser(id));
    console.log(id);
    navigate("/Form");
  };

  // ------------- table columns --------------

  const columns = [
    {
      name: "Sr.no",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: false,
    },
    {
      name: "Employee Name",
      selector: (row) => row.employeeName,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: "Basic Salary",
      selector: (row) => `₹ ${row.employeeSalary}`,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="p-1.5 text-indigo-500 hover:bg-indigo-100 rounded-lg cursor-pointer"
            onClick={() => handleEdit(row.id)}
          >
            <HiMiniPencilSquare size={20} />
          </button>
        </>
      ),
      sortable: true,
    },
  ];

  // --------------- table custom style ---------------

  const customStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
        color: "black",
      },
    },
    cells: {
      style: {
        color: "black",
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        "&:nth-of-type(odd)": {
          backgroundColor: "#f2f2f2",
        },
        "&:nth-of-type(even)": {
          backgroundColor: "white",
        },
        "&:hover": {
          backgroundColor: "#ddd",
        },
      },
    },
  };

  // -------------- search -------------------

  const employeeSearch = employees.filter(
    (item) =>
      item.employeeName?.toLowerCase()?.includes(textFilter.toLowerCase()) ||
      item.department?.toLowerCase()?.includes(textFilter.toLowerCase())
  );

  return (
    <>
      <section className="flex gap-x-6 w-full h-full">
        <AdminAside />

        <div className="Table-content bg-[#f5f5fa] rounded-2xl w-full h-full p-5 overflow-y-scroll">
          <Header />

          <div className="grid grid-cols-1 shadow-lg bg-white p-3 rounded-3xl">
            <div className="datatable-section relative">
              <DataTable
                columns={columns}
                data={employeeSearch}
                customStyles={customStyle}
                pagination
                selectableRows
                highlightOnHover
                pointerOnHover
                responsive
                scrollable={true}
                actions={actionsMemo}
                onSelectedRowsChange={(e) => {
                  setSelectedRow(e.selectedRows);
                }}
              />

              <input
                type="search"
                className="absolute top-0 start-0 m-4 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Search"
                onChange={(e) => setTextFilter(e.target.value)}
                value={textFilter}
                ref={searchRef}
              />

              <button
                className="p-1.5 text-xl text-red-500 hover:bg-red-100 rounded-lg cursor-pointer"
                onClick={() => {
                  selectedRow.map((row) => handleDelete(row.id));
                  selectedRow("");
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmpDataTable;
