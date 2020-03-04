import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AUTH_HTTP, httpWrapper } from "../../shared/http";
import { Assignment, AssignmentStatus } from "../../shared/models/Assignment";
import { StoreContext } from "../../shared/store/context";

const CustomerList: React.FC = () => {
    const [confirmedCustomerList, setConfirmedCustomerList] = useState([]);
    const [pendingCustomerList, setPendingCustomerList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { state } = useContext(StoreContext);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        httpWrapper(async () => {
            const response = await AUTH_HTTP.get("assignments/confirmed");
            setConfirmedCustomerList(response.data);

            const response2 = await AUTH_HTTP.get("assignments/pending");
            setPendingCustomerList(response2.data);
        }).finally(() => setIsLoading(false));
    };

    const updateAssignment = (id: number, answer: AssignmentStatus) => {
        httpWrapper(async () => {
            await AUTH_HTTP.patch(`/assignments/${id}`, { answer });
            fetchCustomers();
        });
    };

    return (
        <section className="p-8">
            <div className="p-4 bg-secondary-400 text-gray-200 sm:max-w-3xl sm:mx-auto rounded">
                <h1 className="text-2xl text-gray-200 mb-4 font-medium">
                    Customer List
                </h1>

                <h2 className="text-xl text-gray-200 font-medium mb-2">
                    My customer list
                </h2>
                {confirmedCustomerList.map(
                    (assignment: Assignment, index: number) => (
                        <Link
                            to={`/customers/${assignment.customer.id}`}
                            className="mb-2 last:mb-0"
                            key={index}
                        >
                            <div>
                                <span className="mr-2">
                                    {assignment.customer.name}
                                </span>
                                <button
                                    onClick={() =>
                                        updateAssignment(
                                            assignment.id,
                                            AssignmentStatus.DECLINED,
                                        )
                                    }
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </Link>
                    ),
                )}

                <h2 className="text-xl text-gray-200 mt-4 font-medium mb-2">
                    Pending invitations
                </h2>
                {pendingCustomerList.map(
                    (assignment: Assignment, index: number) => (
                        <div className="mb-2 last:mb-0" key={index}>
                            <div className="flex items-center">
                                <span className="mr-2">
                                    {assignment.customer.name}
                                </span>

                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            updateAssignment(
                                                assignment.id,
                                                AssignmentStatus.CONFIRMED,
                                            )
                                        }
                                        className="mr-2 bg-green-500 px-2 rounded"
                                    >
                                        <i className="fas fa-check"></i>
                                    </button>
                                    <button
                                        onClick={() => {
                                            updateAssignment(
                                                assignment.id,
                                                AssignmentStatus.DECLINED,
                                            );
                                        }}
                                        className="bg-red-600 px-2 rounded"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ),
                )}
            </div>
        </section>
    );
};

export default CustomerList;
