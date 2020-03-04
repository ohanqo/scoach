import React, { useContext } from "react";
import Course from "../shared/models/Course";
import { Role } from "../shared/models/User";
import { StoreContext } from "../shared/store/context";
import CourseListItem from "./CourseListItemCustomer";
import CourseListItemCustomer from "./CourseListItemCoach";

const CourseList: React.FC<{ courseList: Course[] }> = ({ courseList }) => {
    const { state } = useContext(StoreContext);

    const Empty = (
        <div className="h-screen flex justify-center items-center text-xl font-medium text-gray-200">
            You don't have courses at the moment.
        </div>
    );

    const List = (
        <section className="p-4">
            <h2 className="text-2xl text-gray-200 mb-4">My courses</h2>
            <div className="flex flex-wrap items-start">
                {courseList.map((course: Course, index: number) => (
                    <div className="sm:w-1/3 pr-0 sm:pr-4 mb-4" key={index}>
                        {state.user?.role === Role.CUSTOMER ? (
                            <CourseListItem course={course} />
                        ) : (
                            <CourseListItemCustomer course={course} />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );

    return courseList.length === 0 ? Empty : List;
};

export default CourseList;
