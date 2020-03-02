import React from "react";
import Course from "../../Course/Course";
import NextCourseList from "./NextCourseList";
import NextCourseLoading from "./NextCourseLoading";

const NextCourse: React.FC<{ data: Course[]; isLoading: boolean }> = ({
    data = [],
    isLoading = true,
}) => {
    return (
        <div className="rounded bg-primary-400 px-6 py-4 w-full sm:w-1/3 text-gray-400">
            {isLoading ? (
                <NextCourseLoading />
            ) : (
                <NextCourseList courseList={data} />
            )}
        </div>
    );
};

export default NextCourse;
