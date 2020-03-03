import React from "react";
import Course from "../shared/models/Course";

const CourseListItem: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className="flex flex-col bg-secondary-400 rounded p-4 w-full sm:w-1/3 mr-0 sm:mr-4 mb-4 last:mr-0 text-gray-200">
            <h3 className="text-lg mb-4 rounded w-full font-medium">
                {course.title}
            </h3>

            <p className="h-24 rounded w-full w-full">{course.content}</p>

            <hr className="h-2 w-full my-2 border-0" />

            <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-400 block rounded mr-2 loading-line-animation"></div>
                <span className="flex flex-col w-full rounded">
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

export default CourseListItem;
