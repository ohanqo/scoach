import React from "react";

const EditProfileLoading: React.FC = () => {
    return (
        <section className="p-4">
            <div className="bg-secondary-400 rounded p-8 flex flex-col sm:flex-row items-center">
                <div className="flex flex-col order-2 sm:order-1 mr-8">
                    <div className="rounded-lg h-64 w-64 bg-gray-400 loading-line-animation loading-line-animation--delay-1"></div>
                </div>

                <div className="w-full flex flex-col order-1 sm:order-2">
                    <div className="h-12 bg-gray-400 rounded loading-line-animation mb-4">
                        &nbsp;
                    </div>
                    <div className="h-12 bg-gray-400 rounded loading-line-animation loading-line-animation--delay-1 mb-4">
                        &nbsp;
                    </div>
                    <div className="h-12 bg-gray-400 rounded loading-line-animation loading-line-animation--delay-2 mb-4">
                        &nbsp;
                    </div>
                    <div className="h-12 bg-gray-400 rounded loading-line-animation self-end w-32">
                        &nbsp;
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditProfileLoading;
