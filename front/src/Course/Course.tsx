import React, { useEffect, useState } from "react";
import pubsub from "sweet-pubsub";
import { AUTH_HTTP, httpWrapper } from "../shared/http";
import CourseList from "./CourseList";
import CourseLoading from "./CourseLoading";

const Course: React.FC = () => {
    const [courseList, setCourseList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            httpWrapper(async () => {
                const response = await AUTH_HTTP.get("/courses");
                setCourseList(response.data);
            }).finally(() => setIsLoading(false));
        };

        pubsub.on("refresh-courses", fetchData);

        fetchData();

        return () => {
            pubsub.off("refresh-courses", fetchData);
        };
    }, []);

    return isLoading ? (
        <CourseLoading />
    ) : (
        <CourseList courseList={courseList} />
    );
};

export default Course;
