import { useSelector, useDispatch } from "react-redux";
import { closeSalaryModal } from "../../features/modal/salaryModalSlice";
import { AnimatePresence, motion } from "framer-motion";
import { FaCircleXmark, FaCoins, FaFileCsv, FaFilePdf } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import jsPDF from "jspdf";
import { useRef } from "react";
import autoTable from "jspdf-autotable";

const SalaryModal = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedEmployee } = useSelector((state) => state.salaryModal);
  const salarySlips = useSelector((state) => state.salarySlips.salaryArr);
  const slipRefrence = useRef()

   if (!isOpen || !selectedEmployee) return null;
  
  const employeeSlips = salarySlips.filter(
    (slip) => slip.employeesSalarySlip === selectedEmployee.employeeName
  );

  // ------------ total earnings ---------------

  const totalEarnings =
    (parseFloat(selectedEmployee.employeeSalary) || 0) +
    (parseFloat(selectedEmployee.hra) || 0) +
    (parseFloat(selectedEmployee.da) || 0) +
    (parseFloat(selectedEmployee.ta) || 0) +
    (parseFloat(selectedEmployee.bonus) || 0);

  // ------------ total deductions ---------------
  const totalDeductions =
    (parseFloat(selectedEmployee.tax) || 0) +
    (parseFloat(selectedEmployee.pf) || 0) +
    (parseFloat(selectedEmployee.pt) || 0);

  // ------------ net salary ---------------
  const netSalary = totalEarnings - totalDeductions;

  // -------------- handle download pdf -----------------

  const handleDownloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("SALARY SLIP", 105, 15, null, null, "center");

  doc.setFontSize(12);
  const slip = employeeSlips[0]; 

  doc.text(`Employee Name: ${selectedEmployee.employeeName}`, 14, 30);
  doc.text(`Department: ${selectedEmployee.department}`, 14, 38);
  doc.text(`Month/Year: ${slip.month} ${slip.year}`, 14, 46);

  autoTable(doc, {
    startY: 60,
    head: [["Earnings", "Amount ($)"]],
    body: [
      ["Basic Salary", selectedEmployee.employeeSalary],
      ["HRA", selectedEmployee.hra],
      ["DA", selectedEmployee.da],
      ["TA", selectedEmployee.ta],
      ["Bonus", selectedEmployee.bonus],
      ["Total Earnings", totalEarnings.toFixed(2)],
    ],
    styles: { halign: 'right' },
    headStyles: { fillColor: [40, 167, 69] }, 
    columnStyles: {
      0: { halign: 'left' },
    },
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Deductions", "Amount ($)"]],
    body: [
      ["PF", selectedEmployee.pf],
      ["PT", selectedEmployee.pt],
      ["Tax", selectedEmployee.tax],
      ["Total Deductions", totalDeductions.toFixed(2)],
    ],
    styles: { halign: 'right' },
    headStyles: { fillColor: [220, 53, 69] },
    columnStyles: {
      0: { halign: 'left' },
    },
  });

  doc.setFontSize(14);
  doc.text(`Net Payable Amount: $${netSalary.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 20);

  doc.save(`${selectedEmployee.employeeName}_Salary_${slip.month}_${slip.year}.pdf`);
};
  
    // -------------- handle download csv -----------------

    const handleDownloadCSV = () => {
      
      const headers = [
        "Employee Name",
        "Department",
        "Month", 
        "Year",
        "Basic Salary",
        "HRA",
        "DA",
        "TA",
        "Bonus",
        "Total Earnings",
        "PF",
        "PT",
        "Tax",
        "Total Deductions",
        "Net Pay"
      ];
  
      const data = [
        selectedEmployee.employeeName,
        selectedEmployee.department,
        employeeSlips[0].month,
        employeeSlips[0].year,
        selectedEmployee.employeeSalary,
        selectedEmployee.hra,
        selectedEmployee.da,
        selectedEmployee.ta,
        selectedEmployee.bonus,
        totalEarnings,
        selectedEmployee.pf,
        selectedEmployee.pt,
        selectedEmployee.tax,
        totalDeductions,
        netSalary
      ];
  
      const csvContent = [
        headers.join(','),
        data.join(',')
      ].join('\n');
  
     
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${selectedEmployee.employeeName}_Salary_${employeeSlips[0].month}_${employeeSlips[0].year}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  // -------------- motion variant ---------------
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#8080808c] bg-opacity-50 flex justify-center items-center z-50">
        <AnimatePresence>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            ref={slipRefrence}
            className="bg-white rounded-lg max-w-7xl max-h-170 overflow-y-auto scrollbar-none relative"
          >
            {employeeSlips.length === 0 ? (
              <p className="text-gray-500">No salary slips found for {selectedEmployee.employeeName}.</p>
            ) : (
              employeeSlips.map((slip) => {
                const { month, year } = slip;
                return (
                  <div className="container mx-auto px-4 py-12" key={slip.id}>

                    {/* --------------- Salary Slip Card --------------- */}

                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden animate-slide-in">

                      {/* ---------------- Header ---------------- */}

                      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <h1 className="text-2xl font-bold">SALARY SLIP</h1>
                            <p className="text-blue-100">
                              For the month of {month} {year}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm opacity-90">Pay Date: 05-Jun-2024</p>
                            <p className="text-sm opacity-90">Payroll #: PR-2024-006</p>
                          </div>
                        </div>
                      </div>

                      {/* --------------- Employee Info Section --------------- */}

                      <div className="p-6 border-b">
                        <div className="">

                          {/* ------------- Left Column ------------- */}

                          <div className="">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                                <i className="fas fa-user text-blue-600 text-2xl" />
                              </div>
                              <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                  {selectedEmployee.employeeName}
                                </h2>
                                <p className="text-gray-600 capitalize">{selectedEmployee.department}</p>
                              </div>
                            </div>
                          </div>

                          {/* -------------- Right Column -------------- */}

                          <div className="">
                            <div className="bg-blue-50 rounded-lg p-4">
                              <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <i className="fas fa-file-invoice-dollar text-blue-600" />
                                Bank Details
                              </h3>
                              <div className="space-y-1">
                                <p className="flex justify-between">
                                  <span className="text-gray-600">Bank Name:</span>
                                  <span className="font-medium">National Commercial Bank</span>
                                </p>
                                <p className="flex justify-between">
                                  <span className="text-gray-600">Account No:</span>
                                  <span className="font-medium">••••5678</span>
                                </p>
                                <p className="flex justify-between">
                                  <span className="text-gray-600">IFSC Code:</span>
                                  <span className="font-medium">NCBJ0004567</span>
                                </p>
                                <p className="flex justify-between">
                                  <span className="text-gray-600">PAN Number:</span>
                                  <span className="font-medium">AZHPD2046J</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* -------------- Earnings/Deductions Section -------------- */}

                      <div className="grid grid-cols-1 gap-6 p-6">

                        {/* ------------- Earnings Section ------------- */}

                        <div>
                          <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-4">
                            <FaCoins />
                            Earnings
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Basic Salary</span>
                              <span className="font-medium">${selectedEmployee.employeeSalary}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">House Rent Allowance</span>
                              <span className="font-medium">${selectedEmployee.hra}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Dearness Allowance</span>
                              <span className="font-medium">${selectedEmployee.da}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Transport Allowance</span>
                              <span className="font-medium">${selectedEmployee.ta}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Performance Bonus</span>
                              <span className="font-medium">${selectedEmployee.bonus}</span>
                            </div>
                          </div>
                          <div className="border-t mt-4 pt-2">
                            <div className="flex justify-between font-bold text-gray-800">
                              <span>Total Earnings</span>
                              <span>${totalEarnings.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* -------------- Deductions Section -------------- */}

                        <div>
                          <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2 mb-4">
                            <FaHandHoldingUsd />
                            Deductions
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Provident Fund</span>
                              <span className="font-medium">${selectedEmployee.pf}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Professional Tax</span>
                              <span className="font-medium">${selectedEmployee.pt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Income Tax</span>
                              <span className="font-medium">${selectedEmployee.tax}</span>
                            </div>
                          </div>
                          <div className="border-t mt-4 pt-2">
                            <div className="flex justify-between font-bold text-gray-800">
                              <span>Total Deductions</span>
                              <span>${totalDeductions.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ------------ Net Pay Section ------------ */}

                      <div className="bg-gray-50 px-6 py-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-gray-600">Payment Mode</h3>
                            <p className="font-medium text-blue-600">Bank Transfer</p>
                          </div>
                          <div className="text-right">
                            <h3 className="text-gray-600">Net Payable Amount</h3>
                            <p className="text-2xl font-bold text-green-600">${netSalary.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      {/*  ----------------- Footer ----------------- */}

                      <div className="p-6 border-t">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                          <div>
                            <p>For any queries, contact HR Department</p>
                            <p>Email: hr@company.com | Phone: (123) 456-7890</p>
                          </div>
                          <div className="flex gap-3">
                            <button onClick={handleDownloadCSV} className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-blue-50 hover:text-blue-600 transition">
                              <FaFileCsv /> CsV
                            </button>
                            <button onClick={()=>handleDownloadPDF()} className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-blue-50 hover:text-blue-600 transition">
                              <FaFilePdf /> Pdf
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* -------------- Watermark Stamp -------------- */}
                    
                    <div className="fixed opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="text-8xl font-bold text-gray-400">PAID</div>
                    </div>
                  </div>
                );
              })
            )}

            <button
              onClick={() => dispatch(closeSalaryModal())}
              className="mt-3 mr-3 absolute top-0 right-0"
            >
              <FaCircleXmark size={30} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default SalaryModal;
