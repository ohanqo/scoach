import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../shared/store/context";

const EditProfile: React.FC = () => {
    const context = useContext(StoreContext);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (context.state.user?.name) {
            setName(context.state.user.name);
        }
    }, [context]);

    return (
        <section className="p-4">
            <div className="bg-secondary-400 rounded p-8 flex flex-col sm:flex-row items-center">
                <div className="h-64 w-64 flex flex-col order-2 sm:order-1 mr-8">
                    <img className="w-full h-full bg-gray-200 rounded-lg" />
                </div>

                <div className="flex-grow flex flex-col order-1 sm:order-2">
                    <input
                        className="h-12 rounded mb-4 focus:outline-none px-4"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        disabled={true}
                        value={context.state.user?.email}
                        className="h-12 rounded mb-4 disabled:opacity-50 px-4"
                    />
                    <input
                        disabled={true}
                        value={context.state.user?.role}
                        className="h-12 rounded mb-4 disabled:opacity-50 px-4 capitalize"
                    />

                    <button className="h-12 rounded self-end px-4 py-2 bg-primary-400 text-gray-200">
                        Update your profile
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EditProfile;
