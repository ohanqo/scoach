import React from "react";
import { Link } from "react-router-dom";
import Course from "../../Course/Course";

const NextCourseItem: React.FC<{ course: Course }> = ({ course }) => {
    const { id, title, content, assignment } = course;

    return (
        <Link
            to={`/courses/${id}`}
            className="flex items-center mb-2 last:mb-4 text-gray-200 hover:bg-gray-200 hover:text-primary-400 transition-all duration-300 rounded transform hover:-translate-y-1"
        >
            <img
                className="h-12 w-12 block rounded bg-gray-600 mr-2"
                src="https://source.unsplash.com/random/400x400"
                alt="Coach profile picture"
            />

            <div className="flex flex-col overflow-hidden">
                <p className="text-lg font-medium truncate">{title}</p>
                <p className="truncate">{content}</p>
            </div>
        </Link>
    );
};

export default NextCourseItem;
