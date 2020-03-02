import React, { useEffect, useState } from "react";
import Course from "../Course/Course";
import Report from "../Report/Report";
import { AUTH_HTTP, httpWrapper } from "../shared/http";
import NextCourse from "./NextCourse/NextCourse";
import WeightChart from "./WeightChart";

const Overview: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [reports, setReports] = useState<Report[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        httpWrapper(async () => {
            const reportsResponse = await AUTH_HTTP.get("/reports");
            reportsResponse.data.forEach(
                (d: any) => (d.date = new Date(d.date * 1000)),
            );
            setReports(reportsResponse.data);

            const coursesResponse = await AUTH_HTTP.get("/courses/3");
            setCourses(coursesResponse.data);
        }).finally(() => setIsLoading(false));
    }, []);

    return (
        <main className="p-4">
            <div className="flex flex-wrap sm:flex-no-wrap">
                <WeightChart data={reports} />
                <NextCourse data={courses} isLoading={isLoading} />
            </div>
        </main>
    );
};

export default Overview;
