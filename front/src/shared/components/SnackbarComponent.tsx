import gsap from "gsap";
import React, { useEffect, useState } from "react";
import pubsub from "sweet-pubsub";

enum Status {
    SUCCESS = "success",
    ERROR = "error",
}

export interface Snackbar {
    title: string;
    status: Status;
    duration: number;
    message?: string;
}

const SnackbarComponent: React.FC = () => {
    const [snackbar, setSnackbar] = useState<Snackbar | undefined>(undefined);

    useEffect(() => {
        const assignSnackbar = (snack: Snackbar) => setSnackbar(snack);

        pubsub.on("snackbar", assignSnackbar);

        return () => {
            pubsub.off("snackbar", assignSnackbar);
        };
    }, []);

    useEffect(() => {
        if (snackbar) {
            gsap.timeline({
                yoyo: true,
                repeat: 1,
                repeatDelay: snackbar.duration,
            })
                .fromTo("#snackbar", { y: 200 }, { duration: 0.5, y: 0 })
                .play()
                .then(() => setSnackbar(undefined));
        }
    }, [snackbar]);

    return (
        <div className="bottom-0 fixed pb-8 px-8 w-full flex justify-center z-50">
            {snackbar && (
                <div
                    id="snackbar"
                    className={`p-4 text-white rounded shadow ${
                        snackbar.status === Status.ERROR
                            ? "bg-red-500"
                            : "bg-green-500"
                    }`}
                >
                    <div className="font-medium">{snackbar.title}</div>
                    {snackbar.message && (
                        <div className="mt-1 text-sm">{snackbar.message}</div>
                    )}
                </div>
            )}
        </div>
    );
};

export { SnackbarComponent, Status };
