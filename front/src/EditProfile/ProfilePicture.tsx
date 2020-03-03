import React, { useEffect, useState } from "react";

const ProfilePicture: React.FC<{ picture?: string | Blob }> = ({ picture }) => {
    const [src, setSrc] = useState("");

    useEffect(() => {
        const fileReader = new FileReader();

        const onPreviewLoaded = () => {
            setSrc(fileReader.result as any);
        };

        if (picture === null || picture === undefined) {
            setSrc("");
            return;
        }

        if (typeof picture === "string") {
            setSrc(`${process.env.REACT_APP_BASE_URL}/${picture}`);
        } else {
            fileReader.readAsDataURL(picture!);
        }

        fileReader.addEventListener("load", onPreviewLoaded, false);

        return () => {
            fileReader.removeEventListener("load", onPreviewLoaded);
        };
    }, [picture]);

    return <img src={src} className="w-full h-full bg-gray-200 rounded-lg" />;
};

export default ProfilePicture;
