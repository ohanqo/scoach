import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Course from "../Course/Course";
import Report from "../Report/Report";
import { AUTH_HTTP, httpWrapper } from "../shared/http";
import AddReport from "./AddReport/AddReport";
import NextCourse from "./NextCourse/NextCourse";
import WeightChart from "./WeightChart";

const Overview: React.FC = () => {
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

            const coursesResponse = await AUTH_HTTP.get("/courses/3");
            setCourses(coursesResponse.data);
        }).finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <main className="p-4">
            <div className="flex flex-wrap sm:flex-no-wrap mb-4">
                <WeightChart data={reports} />
                <NextCourse data={courses} isLoading={isLoading} />
            </div>
            <div className="flex flex-wrap sm:flex-no-wrap">
                <AddReport onReportAdded={fetchUserData} />
                <Link
                    to="/coachs"
                    className="flex items-center text-4xl text-gray-200 justify-center bg-secondary-400 px-6 py-4 overflow-hidden rounded w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4 transform hover:-translate-y-1 duration-300"
                >
                    Find a coach
                </Link>
                <div className="flex flex-col bg-secondary-400 px-6 py-4 overflow-hidden rounded w-full sm:w-1/3"></div>
            </div>
        </main>
    );
};

export default Overview;
