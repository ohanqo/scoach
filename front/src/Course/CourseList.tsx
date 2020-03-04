import React, { useContext, useEffect, useState } from "react";
import pubsub from "sweet-pubsub";
import { AUTH_HTTP, httpWrapper } from "../shared/http";
import { Assignment } from "../shared/models/Assignment";
import Course from "../shared/models/Course";
import { Role } from "../shared/models/User";
import { StoreContext } from "../shared/store/context";
import snackbar from "../shared/utils/snackbar";
import CourseListItemCoach from "./CourseListItemCoach";
import CourseListItemCustomer from "./CourseListItemCustomer";

const CourseList: React.FC<{ courseList: Course[] }> = ({ courseList }) => {
    const { state } = useContext(StoreContext);
    const [customerList, setCustomerList] = useState([]);

    const [selectedCustomerId, setSelectedCustomerId] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (state.user?.role === Role.COACH) {
            httpWrapper(async () => {
                const response = await AUTH_HTTP.get("/assignments/confirmed");
                setCustomerList(response.data);
            });
        }
    }, [state]);

    const addCourse = () => {
        httpWrapper(async () => {
            const data = {
                customerId: selectedCustomerId,
                title,
                content,
            };
            await AUTH_HTTP.post("/courses", data);
            snackbar.success("Course created");
        }).finally(() => {
            setIsOpen(false);
            setTitle("");
            setContent("");
            pubsub.emit("refresh-courses");
        });
    };

    const Empty = (
        <div className="h-screen flex justify-center items-center text-xl font-medium text-gray-200">
            You don't have courses at the moment.
        </div>
    );

    const List = (
        <section className="p-4">
            <div className="flex justify-between">
                <h2 className="text-2xl text-gray-200 mb-4">My courses</h2>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary-400 px-4 py-2 rounded self-center text-gray-200"
                >
                    Add a course
                </button>
            </div>
            <div className="flex flex-wrap items-start">
                {courseList.map((course: Course, index: number) => (
                    <div className="sm:w-1/3 pr-0 sm:pr-4 mb-4" key={index}>
                        {state.user?.role === Role.CUSTOMER ? (
                            <CourseListItemCustomer course={course} />
                        ) : (
                            <CourseListItemCoach course={course} />
                        )}
                    </div>
                ))}
            </div>

            {isOpen ? (
                <div className="absolute h-screen w-screen flex justify-center items-center top-0">
                    <div className="flex flex-col items-start bg-gray-200 rounded max-w-2xl p-8 z-10">
                        <h2 className="text-2xl font-medium">Add a course</h2>

                        <select
                            onChange={e =>
                                setSelectedCustomerId(
                                    parseInt(e.target.value, 10),
                                )
                            }
                            name="customer"
                            className="my-4"
                        >
                            {customerList.map(
                                (c: Assignment, index: number) => (
                                    <option value={c.customer.id} key={index}>
                                        {c.customer.name}
                                    </option>
                                ),
                            )}
                        </select>

                        <input
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Title…"
                            type="text"
                            className="mb-2 w-full px-4  py-2rounded"
                        />

                        <textarea
                            onChange={e => setContent(e.target.value)}
                            placeholder="Content…"
                            className="mb-4 w-full px-4 py-2 rounded"
                        />

                        <button
                            onClick={() => addCourse()}
                            className="self-end bg-primary-400 px-4 py-2 rounded text-gray-200"
                        >
                            Add
                        </button>
                    </div>
                    <div
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-800 opacity-50 h-full w-full absolute"
                    ></div>
                </div>
            ) : null}
        </section>
    );

    return courseList.length === 0 ? Empty : List;
};

export default CourseList;
