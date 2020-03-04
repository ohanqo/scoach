import React from "react";
import pubsub from "sweet-pubsub";
import { AUTH_HTTP, httpWrapper } from "../shared/http";
import Course from "../shared/models/Course";

const CourseListItemCoach: React.FC<{ course: Course }> = ({ course }) => {
    const deleteCourse = () => {
        httpWrapper(async () => {
            await AUTH_HTTP.delete(`/courses/${course.id}`);
            pubsub.emit("delete-course");
        });
    };

    return (
        <div className="flex flex-col bg-secondary-400 rounded p-4 w-full text-gray-200">
            <h3 className="text-lg mb-4 rounded w-full font-medium">
                {course.title}
            </h3>

            <p className=" rounded w-full w-full">{course.content}</p>

            <hr className="h-2 w-full my-2 border-0" />

            <div className="flex items-center">
                <img
                    src={
                        course.assignment.customer.picture
                            ? `${process.env.REACT_APP_BASE_URL}/${course.assignment.customer.picture}`
                            : "#"
                    }
                    alt=""
                    className="h-10 w-10 bg-gray-400 block rounded mr-2"
                />
                <span className="flex flex-col flex-grow rounded">
                    {course.assignment.customer.name}
                    <a
                        className="text-primary-400"
                        href={`mailto:${course.assignment.customer.email}`}
                    >
                        {course.assignment.customer.email}
                    </a>
                </span>
                <div
                    onClick={() => deleteCourse()}
                    className="text-red-600 cursor-pointer"
                >
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    );
};

export default CourseListItemCoach;
const deleteCourse = (id: number) => {};
