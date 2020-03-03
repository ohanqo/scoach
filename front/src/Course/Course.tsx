import React, { useEffect, useState } from "react";
import { AUTH_HTTP, httpWrapper } from "../shared/http";
import CourseList from "./CourseList";
import CourseLoading from "./CourseLoading";

const Course: React.FC = () => {
    const [courseList, setCourseList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        httpWrapper(async () => {
            const response = await AUTH_HTTP.get("/courses");
            setCourseList(response.data);
        }).finally(() => setIsLoading(false));
    }, []);

    return isLoading ? (
        <CourseLoading />
    ) : (
        <CourseList courseList={courseList} />
    );
};

export default Course;
