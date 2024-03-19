"use client";

import {PlantListContextProvider} from "./contexts/PlantContext";
import Plant from "./Plant";

export default function Page() {
    return (
        <PlantListContextProvider>
                <Plant />
        </PlantListContextProvider>
    )
}