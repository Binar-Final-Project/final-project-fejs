import React, { useState } from "react";

export default function OrderSummary() {
    const [showModal, setShowModal] = useState(true);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="bg-white shadow-md rounded p-6">
                <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                    <h2 className="text-xl font-bold mb-0 mr-4">Jakarta - Bali</h2>
                    <a href="" className="text-blue-500 font-semibold hover:text-blue-700 " onClick={toggleModal}>Detail</a>
                </div>
                <div className="flex items-center justify-between">
                    <h4>Total Pembayaran</h4>
                    <p>314,0000</p>
                </div>
            </div>
        </div>
        {/* Modal */}
        {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                    <div
                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    {/* Heroicon name: exclamation */}
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.262-1.878 1.175-2.96l-6.928-9.24a1.5 1.5 0 00-2.351 0L4.762 14.04c-1.087 1.082-.364 2.96 1.175 2.96z"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Detail Pembayaran
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Tambahkan konten detail pembayaran di sini.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                onClick={closeModal}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    );
}
