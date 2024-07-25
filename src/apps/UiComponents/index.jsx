import { useParams } from "react-router-dom";
import General from "./General";

const PATH_UI = {
    path: "uiComponents",
    element: <UiComponentsDoc />,
    children: [
        {
            path: ":section",
            children: [
                {
                    path: ":component",
                }
            ]
        }
    ],
};

function UiComponentsDoc() {
    const { section, component } = useParams();
    return (
        <div style={{ display: "flex" }} >
            <div style={{ width: "100%" }} >
                <General />
            </div>
        </div>
    )
}

export { PATH_UI };