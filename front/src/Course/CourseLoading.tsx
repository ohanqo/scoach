import React from "react";

const CourseLoading: React.FC = () => {
    return (
        <section className="flex flex-col h-full p-4">
            <h2 className="text-2xl bg-gray-400 max-w-xs loading-line-animation rounded mb-4">
                &nbsp;
            </h2>

            <div className="flex flex-col bg-secondary-400 rounded p-4 w-full sm:w-1/3">
                <h3 className="text-lg bg-gray-400 mb-4 rounded w-full loading-line-animation loading-line-animation--delay-1">
                    &nbsp;
                </h3>

                <p className="h-24 bg-gray-400 rounded w-full loading-line-animation loading-line-animation--delay-2 w-full">
                    &nbsp;
                </p>

                <hr className="h-2 w-full my-2 border-0" />

                <div className="flex">
                    <div className="h-10 w-10 bg-gray-400 block rounded mr-2 loading-line-animation"></div>
                    <span className="h-10 w-full bg-gray-400 rounded loading-line-animation loading-line-animation--delay-2">
                        &nbsp;
                    </span>
                </div>
            </div>
        </section>
    );
};

export default CourseLoading;
