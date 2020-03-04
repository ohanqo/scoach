import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WeightChart from "../../shared/components/WeightChart";
import { AUTH_HTTP, httpWrapper } from "../../shared/http";
import User from "../../shared/models/User";

const CustomerDetail: React.FC = () => {
    const [customer, setCustomer] = useState(new User());
    const [customerReports, setCustomerReports] = useState([]);
    const location = useLocation();

    useEffect(() => {
        let parts = location.pathname.split("/");
        let id = parts[parts.length - 1];
        httpWrapper(async () => {
            const response = await AUTH_HTTP.get(`/users/${id}`);
            const user = response.data;

            const response2 = await AUTH_HTTP.get(`/reports/user/${user.id}`);
            const reports = response2.data;

            setCustomer(user);
            setCustomerReports(reports);
        });
    }, []);

    return (
        <section className="p-4 flex flex-col items-center">
            <div className="flex flex-col sm:max-w-3xl text-center mb-4">
                <h1 className="text-2xl font-medium text-gray-200">
                    {customer.name}'s profile
                </h1>

                <a className="text-primary-400" href="mailto:">
                    {customer.email}
                </a>
            </div>

            <WeightChart data={customerReports} />
        </section>
    );
};

export default CustomerDetail;
