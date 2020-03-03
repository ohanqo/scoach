import React, { useContext, useEffect, useState } from "react";
import { AUTH_HTTP, httpWrapper } from "../shared/http";
import { StoreContext } from "../shared/store/context";
import TYPES from "../shared/store/types";
import snackbar from "../shared/utils/snackbar";
import ProfilePicture from "./ProfilePicture";

const EditProfile: React.FC = () => {
    const context = useContext(StoreContext);
    const [name, setName] = useState("");
    const [picture, setPicture] = useState<string | Blob | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (context.state.user?.name) {
            setName(context.state.user.name);
        }

        if (context.state.user?.picture) {
            setPicture(context.state.user.picture);
        }
    }, [context]);

    const onPictureChange = (event: any) => {
        const file = event.target.files[0];
        const newPicture = file ?? context.state.user?.picture;
        setPicture(newPicture);
    };

    const updateProfile = () => {
        httpWrapper(async () => {
            setIsLoading(true);

            const formData = new FormData();
            formData.set("name", name);
            if (picture != null) {
                formData.set("picture", picture!);
            }
            formData.append("_method", "PUT");

            const response = await AUTH_HTTP.put("/users", formData);

            const updatedUser = response.data;
            context.dispatch({ type: TYPES.SET_USER, payload: updatedUser });
            snackbar.success("Profile updated");
        }).finally(() => setIsLoading(false));
    };

    return (
        <section className="p-4 sm:max-w-3xl sm:mx-auto">
            <div className="bg-secondary-400 rounded p-8 flex flex-col sm:flex-row items-center">
                <div className="h-64 w-64 flex flex-col order-2 sm:order-1 mr-8 relative">
                    <ProfilePicture picture={picture} />
                    <input
                        className="w-full h-full cursor-pointer transition-all duration-300 opacity-0 absolute top-0 left-0 bottom-0 right-0"
                        onChange={onPictureChange}
                        type="file"
                    />
                </div>

                <div className="flex-grow flex flex-col order-1 sm:order-2">
                    <input
                        disabled={isLoading}
                        className="h-12 rounded mb-4 focus:outline-none px-4 disabled:opacity-50"
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

                    <button
                        onClick={() => updateProfile()}
                        className="h-12 rounded self-end px-4 py-2 bg-primary-400 text-gray-200 focus:outline-none"
                    >
                        {isLoading ? (
                            <i className="fas fa-circle-notch fa-spin" />
                        ) : (
                            "Update your profile"
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EditProfile;
