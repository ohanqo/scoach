import React, { useEffect, useState } from "react";
import WeightChart from "../shared/components/WeightChart";
import { AUTH_HTTP, httpWrapper } from "../shared/http";
import Course from "../shared/models/Course";
import Report from "../shared/models/Report";
import AddReport from "./AddReport/AddReport";

const OverviewCoach: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [reports, setReports] = useState<Report[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    const fetchUserData = () => {
        httpWrapper(async () => {
            const reportsResponse = await AUTH_HTTP.get("/reports");
            reportsResponse.data.forEach(
                (d: any) => (d.date = new Date(d.date * 1000)),
            );
            setReports(reportsResponse.data);

            const coursesResponse = await AUTH_HTTP.get("/courses/limits/3");
            setCourses(coursesResponse.data);
        }).finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <main className="p-4">
            <div className="flex flex-wrap sm:flex-no-wrap mb-4 justify-center">
                <WeightChart data={reports} />
            </div>
            <div className="flex flex-wrap sm:flex-no-wrap">
                <div className="flex flex-wrap sm:flex-no-wrap w-full sm:w-2/3 mx-auto">
                    <AddReport onReportAdded={fetchUserData} />
                </div>
            </div>
        </main>
    );
};

export default OverviewCoach;
