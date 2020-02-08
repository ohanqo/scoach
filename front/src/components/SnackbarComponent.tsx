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
    // const [isShown, setIsShown] = useState(false)

    useEffect(() => {
        const assignSnackbar = (snack: Snackbar) => {
            gsap.killTweensOf("#snackbar");
            setSnackbar(snack);
        };

        pubsub.on("snackbar", assignSnackbar);

        return () => {
            pubsub.off("snackbar", assignSnackbar);
        };
    }, []);

    useEffect(() => {
        if (snackbar) {
            const tl = gsap.timeline({
                yoyo: true,
                repeat: 1,
                repeatDelay: snackbar.duration,
            });
            tl.fromTo("#snackbar", { y: 200 }, { duration: 0.5, y: 0 });
            tl.play().then(() => setSnackbar(undefined));
        }
    }, [snackbar]);

    return (
        <div className="bottom-0 fixed pb-8 px-8 w-full flex justify-center z-50">
            {snackbar && (
                <div id="snackbar" className="bg-red-600 p-4 rounded shadow">
                    <div className="mb-1 font-medium">Je suis le titre</div>
                    <div className="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aut, quaerat?
                    </div>
                </div>
            )}
        </div>
    );
};

export { SnackbarComponent, Status };
