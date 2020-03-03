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

    const [searchText, setSearchText] = useState("");
    const [filteredAllCoachList, setFilteredAllCoachList] = useState([]);

    const { state } = useContext(StoreContext);

    useEffect(() => {
        fetchCoachs();
    }, []);

    useEffect(() => {
        const coachList = allCoachList.filter((c: User) =>
            c.name.toLowerCase().includes(searchText.toLowerCase()),
        );

        setFilteredAllCoachList(coachList);
    }, [searchText]);

    useEffect(() => {
        setFilteredAllCoachList(allCoachList);
    }, [allCoachList]);

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
        <section className="p-8">
            <div className="p-4 bg-secondary-400 text-gray-200 sm:max-w-3xl sm:mx-auto rounded">
                <h1 className="text-2xl text-gray-200 mb-4 font-medium">
                    Coach List
                </h1>
                <h2 className="text-xl text-gray-200 font-medium mb-2">
                    My coach list
                </h2>
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

                <h2 className="text-xl text-gray-200 mt-4 font-medium mb-2">
                    Pending invitations
                </h2>
                {pendingCoachList.map((coach: any, index: number) => (
                    <div className="mb-2 last:mb-0" key={index}>
                        <div>
                            <span className="mr-2">{coach.coach.name}</span>
                        </div>
                    </div>
                ))}

                <div className="flex items-center mt-4 justify-between mb-2">
                    <h2 className="text-xl text-gray-200 font-medium mr-2">
                        All
                    </h2>
                    <input
                        onChange={e => setSearchText(e.target.value)}
                        className="bg-gray-200 px-4 py-1 leading-normal rounded text-gray-900"
                        placeholder="Search a name…"
                        type="text"
                    />
                </div>
                {filteredAllCoachList.map((coach: User, index: number) => (
                    <div
                        className="flex justify-between items-center mb-2 last:mb-0"
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
        </section>
    );
};

export default Coach;
