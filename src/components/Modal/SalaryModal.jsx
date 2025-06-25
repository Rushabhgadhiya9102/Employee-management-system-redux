import { useSelector, useDispatch } from "react-redux";
import { closeSalaryModal } from "../../features/modal/salaryModalSlice";


const SalaryModal = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedEmployee } = useSelector((state) => state.salaryModal);
  const salarySlips = useSelector((state) => state.salarySlips.salaryArr);

  if (!isOpen || !selectedEmployee) return null;

  // Filter salary slips for this employee
  const employeeSlips = salarySlips.filter(
    (slip) => slip.employeesSalarySlip === selectedEmployee.employeeName
  );

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-3">
          Salary Details - {selectedEmployee.employeeName}
        </h2>

        {employeeSlips.length === 0 ? (
          <p className="text-gray-500">No salary slips found.</p>
        ) : (
          <ul className="space-y-2">
            {employeeSlips.map((slip) => (
              <li
                key={slip.id}
                className="border p-2 rounded shadow flex justify-between"
              >
                <div>
                  <p className="font-semibold capitalize">{slip.month} {slip.year}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => dispatch(closeSalaryModal())}
          className="mt-5 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
    </>
  );
};

export default SalaryModal;
