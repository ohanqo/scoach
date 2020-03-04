import React from "react";
import Course from "../shared/models/Course";

const CourseListItemCustomer: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className="flex flex-col bg-secondary-400 rounded p-4 w-full text-gray-200">
            <h3 className="text-lg mb-4 rounded w-full font-medium">
                {course.title}
            </h3>

            <p className=" rounded w-full w-full">{course.content}</p>

            <hr className="h-2 w-full my-2 border-0" />

            <div className="flex items-center">
                <img
                    src={course.assignment.coach.picture}
                    alt=""
                    className="h-10 w-10 bg-gray-400 block rounded mr-2 loading-line-animation"
                />
                <span className="flex flex-col flex-grow rounded">
                    {course.assignment.coach.name}
                    <a
                        className="text-primary-400"
                        href={`mailto:${course.assignment.coach.email}`}
                    >
                        {course.assignment.coach.email}
                    </a>
                </span>
            </div>
        </div>
    );
};

export default CourseListItemCustomer;
