import React, { useContext } from "react";
import { Role } from "../shared/models/User";
import { StoreContext } from "../shared/store/context";
import OverviewCoach from "./OverviewCoach";
import OverviewCustomer from "./OverviewCustomer";

const Overview: React.FC = () => {
    const { state } = useContext(StoreContext);

    return state.user?.role === Role.COACH ? (
        <OverviewCoach />
    ) : (
        <OverviewCustomer />
    );
};

export default Overview;
