import React, { useContext, useEffect, useState } from "react";
import { AUTH_HTTP, httpWrapper } from "../shared/http";
import User from "../shared/models/User";
import { StoreContext } from "../shared/store/context";
import snackbar from "../shared/utils/snackbar";

const Coach: React.FC = () => {
    const [userCoachList, setUserCoachList] = useState([]);
    const [pendingCoachList, setPendingCoachList] = useState([]);
    const [allCoachList, setAllCoachList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { state } = useContext(StoreContext);

    useEffect(() => {
        fetchCoachs();
    }, []);

    const fetchCoachs = () => {
        httpWrapper(async () => {
            const response = await AUTH_HTTP.get("assignments/confirmed");
            setUserCoachList(response.data);

            const response2 = await AUTH_HTTP.get("assignments/pending");
            setPendingCoachList(response2.data);

            const response3 = await AUTH_HTTP.get("users/coachs");
            setAllCoachList(response3.data);
        }).finally(() => setIsLoading(false));
    };

    const isCoachAlreadyInvited = (coachId: number): boolean => {
        let isAlreadyInvited = false;

        if (userCoachList.some((u: any) => u.coach.id === coachId)) {
            isAlreadyInvited = true;
        } else if (pendingCoachList.some((u: any) => u.coach.id === coachId)) {
            isAlreadyInvited = true;
        }

        return isAlreadyInvited;
    };

    const askToBecomeCoach = (coachId: number) => {
        httpWrapper(async () => {
            setIsLoading(true);

            const message = state.user
                ? `${state.user.name} asks you if you can become his coach.`
                : "A new coaching request has been made to you";

            const payload = {
                message,
                coachId,
            };

            const response = await AUTH_HTTP.post("/assignments", payload);
            snackbar.success("Success", response.data);
            fetchCoachs();
        });
    };

    return (
        <div className="p-4 text-gray-200">
            <h1 className="text-2xl text-gray-200 mb-4">Coach List</h1>
            <h2 className="text-xl text-gray-200">My coachs</h2>
            {userCoachList.map((coach: any, index: number) => (
                <div className="mb-2 last:mb-0" key={index}>
                    <div>
                        <span className="mr-2">{coach.coach.name}</span>
                        <a
                            className="text-primary-400"
                            href="`mailto:${coach.coach.email}`"
                        >
                            ({coach.coach.email})
                        </a>
                    </div>
                </div>
            ))}

            <h2 className="text-xl text-gray-200 mt-4">Pending invitations</h2>
            {pendingCoachList.map((coach: any, index: number) => (
                <div className="mb-2 last:mb-0" key={index}>
                    <div>
                        <span className="mr-2">{coach.coach.name}</span>
                    </div>
                </div>
            ))}

            <h2 className="text-xl text-gray-200 mt-4">All</h2>
            {allCoachList.map((coach: User, index: number) => (
                <div
                    className="flex justify-between mb-2 last:mb-0"
                    key={index}
                >
                    <div>{coach.name}</div>

                    {isCoachAlreadyInvited(coach.id) ? null : (
                        <button
                            disabled={isLoading}
                            onClick={() => askToBecomeCoach(coach.id)}
                            className="bg-primary-400 px-4 py-2 rounded disabled:opacity-25 transition-all duration-300 focus:outline-none"
                        >
                            {isLoading ? (
                                <i className="fas fa-circle-notch fa-spin" />
                            ) : (
                                "Ask him to become your coach"
                            )}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Coach;
