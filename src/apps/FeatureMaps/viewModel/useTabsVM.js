import {useState} from "react";

export default function useTabsVM(){
    const [tab, setTab] = useState(1)


    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    }

    return {
        tab,
        handleChangeTab
    }
}