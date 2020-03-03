import React, { useState } from "react";
import { AUTH_HTTP, httpWrapper } from "../../shared/http";

const AddReport: React.FC<{ onReportAdded: () => void }> = ({
    onReportAdded,
}) => {
    const [weight, setWeight] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const addReport = async () => {
        setIsLoading(true);

        httpWrapper(async () => {
            const intWeight = parseInt(weight, 10);
            await AUTH_HTTP.post("reports", { weight: intWeight, comment: "" });
            onReportAdded();
        }).finally(() => setIsLoading(false));
    };

    return (
        <div className="flex flex-col bg-secondary-400 px-6 py-4 overflow-hidden rounded w-full mb-4 sm:mb-0 sm:mr-4">
            <h3 className="font-medium text-xl text-gray-200 mb-4">
                Add a new report
            </h3>
            <div className="flex bg-white items-end rounded mb-4">
                <input
                    className="px-4 py-2 rounded focus:outline-none w-full"
                    placeholder="64"
                    type="number"
                    onChange={e => setWeight(e.target.value)}
                />

                <span className="text-sm text-gray-700 mx-2">kg</span>
            </div>
            <button
                disabled={isLoading}
                className="block duration-300 ease-in-out capitalize text-gray-200 text-xl px-4 py-2 rounded-lg bg-primary-400 disabled:opacity-25 w-full opacity-100 transition-all transform hover:-translate-y-1 focus:outline-none mb-2"
                type="button"
                onClick={() => addReport()}
            >
                {isLoading ? (
                    <i className="fas fa-circle-notch fa-spin" />
                ) : (
                    "Update your weight"
                )}
            </button>
        </div>
    );
};

export default AddReport;
