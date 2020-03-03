import React from "react";
import { Link } from "react-router-dom";
import Course from "../../shared/models/Course";
import NextCourseItem from "./NextCourseListItem";

const NextCourseList: React.FC<{ courseList: Course[] }> = ({
    courseList = [],
}) => {
    const NoCourse = <div>You have no courses scheduled</div>;

    const CourseList = (
        <div className="flex flex-col h-full">
            <h3 className="font-medium text-gray-200 capitalize my-2 text-xl">
                Next {courseList.length} courses
            </h3>

            <div>
                {courseList.map((course: Course, index: number) => (
                    <NextCourseItem course={course} key={index} />
                ))}
            </div>

            <Link
                to="/courses"
                type="button"
                className="block text-center duration-300 ease-in-out capitalize text-primary-400 text-xl px-4 py-2 rounded-lg bg-gray-200 shadow-xl w-full transition-all transform hover:-translate-y-1 focus:outline-none mt-auto mb-2"
            >
                See all
            </Link>
        </div>
    );

    return courseList.length > 0 ? CourseList : NoCourse;
};

export default NextCourseList;
