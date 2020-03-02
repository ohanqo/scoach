import React from "react";

const NextCourseLoading: React.FC = () => {
    return (
        <div className="flex flex-col h-full">
            <h3 className="font-medium bg-gray-400 rounded capitalize my-2 text-xl loading-line-animation">
                &nbsp;
            </h3>

            <div className="flex items-center mb-4 w-full rounded loading-line-animation loading-line-animation--delay-1">
                <div className="h-12 w-12 bg-gray-400 block rounded mr-2"></div>

                <div className="flex flex-col overflow-hidden w-full rounded">
                    <p className="text-lg bg-gray-400 font-medium truncate">
                        &nbsp;
                    </p>
                    <p className="truncate bg-gray-400">&nbsp;</p>
                </div>
            </div>

            <div className="block text-xl px-4 py-2 rounded-lg bg-gray-400 w-full mt-auto mb-2 loading-line-animation loading-line-animation--delay-2">
                &nbsp;
            </div>
        </div>
    );
};

export default NextCourseLoading;
