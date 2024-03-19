import {createContext, useContext, useMemo, useState} from "react";

const plantSearchContent = {
    pageNo : 1,     // 불러 올 페이지 시작
    numOfRows: 8,   // 한 페이지당 얼만큼 표시할지
    pageNumber: 1,  // 페이지 번호
    pageSize: 10,   // 페이지 사이즈
};

export const PlantSearchContext = createContext(plantSearchContent);

export const usePlantSearch = () => {
    return useContext(PlantSearchContext);
};

export const PlantListContext = createContext({ plantSearchContent });

export const usePlantList = () => {
    return useContext(PlantListContext);
};

export const PlantListContextProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useState({ ...plantSearchContent });
    const actions = useMemo(
        () => ({
        async getPlantList(params) {
            setSearchParams({...params})
            console.log('API params:', params);
        },
        async pageChange(searchParams, pageNumber, pageSize) {
            console.log("call pageChange == %s, %s", searchParams, pageNumber, pageSize);
        }

    }),
        []
    );
    
    return (
        <PlantListContext.Provider value={{ actions, plantSearchContent }}>
            {children}
        </PlantListContext.Provider>
    )
}






