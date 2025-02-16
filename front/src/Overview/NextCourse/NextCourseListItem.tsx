import React from "react";
import Course from "../../shared/models/Course";

const NextCourseItem: React.FC<{ course: Course }> = ({ course }) => {
    const { id, title, content, assignment } = course;

    return (
        <div className="flex items-center mb-2 last:mb-4 text-gray-200 rounded">
            <img
                className="h-12 w-12 block rounded bg-gray-600 mr-2"
                src={
                    assignment.coach.picture
                        ? `${process.env.REACT_APP_BASE_URL}/${assignment.coach.picture}`
                        : "#"
                }
                alt=""
            />

            <div className="flex flex-col overflow-hidden">
                <p className="text-lg font-medium truncate">{title}</p>
                <p className="truncate">{content}</p>
            </div>
        </div>
    );
};

export default NextCourseItem;
