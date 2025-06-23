import React, { useMemo, useState } from 'react'
import AdminAside from '../../components/Aside/AdminAside'
import Header from '../../components/Header/Header'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, editUser } from '../../features/employees/employeeSlice'
import { FaDownload, FaTrash } from 'react-icons/fa'
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { toast } from 'react-toastify'


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
    className="text-lg bg-blue-500 hover:bg-blue-400 duration-300 cursor-pointer text-white p-3 rounded-md"
  >
    <FaDownload />
  </button>
  
);

// ------------------ export cvs files end ----------------

const EmpDataTable = () => {

  // ------------- use state and selector ------------------

  const [selectedRow, setSelectedRow] = useState('');
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(employees)} />,
    [employees]
  );

  // ------------ handle delete ---------------

  const handleDelete = (id) =>{
    dispatch(deleteUser(id))
    toast.error("Delete Successfull")
  }

  // ----------- handle edit ---------------

  const handleEdit = (id) => {
    dispatch(editUser(id))
    console.log(id);
    navigate('/Form')
  }
  
  // ------------- table columns --------------

const columns = [
    {
      name: "Sr.no",
      selector: (row,index) => index + 1,
      sortable: false,
    },
    {
      name: "Employee id",
      selector: (row) => row.id,
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
            className="bg-yellow-500 hover:bg-yellow-400 p-2 rounded cursor-pointer text-white"
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
        fontSize:"14px"
      },
    },
  };

  return (
    <>
      <section className="flex gap-x-3 w-full h-full">
        <AdminAside />

        <div className="Dashboard-content bg-white rounded-2xl w-full h-full p-5 overflow-y-scroll">
          <Header />

          <h1 className="text-5xl font-bold text-center mt-10">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1">
            <div className="datatable-section relative">
                <DataTable
                columns={columns}
                data={employees}
                customStyles={customStyle}
                title="Employee Data"
                pagination
                selectableRows
                highlightOnHover
                pointerOnHover
                responsive
                scrollable={true}
                actions={actionsMemo}
                onSelectedRowsChange={(e)=>{
                  setSelectedRow(e.selectedRows)
                }}
              />

              <button className='bg-red-500 hover:bg-red-400 text-white p-3 rounded cursor-pointer'
              onClick={()=>{
                selectedRow.map((row) => handleDelete(row.id))
                selectedRow('')
              }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EmpDataTable
