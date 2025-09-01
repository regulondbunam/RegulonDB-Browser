import {useStore} from "../store"

export default function useLoadDataVM() {
    const {drawState, setTitle, setRawData} = useStore()
    const { title, rawData } = drawState

    const handleTitleChange = (event) => {
        const value = event.target.value
        setTitle(value)
    }

    const handleRawDataChange = (event) => {
        const value = event.target.value
        setRawData(value)
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setRawData(e.target.result)
            };
            reader.readAsText(file);
        }
    };

    return {title, handleTitleChange, rawData, handleRawDataChange, setRawData, handleFileUpload}
}