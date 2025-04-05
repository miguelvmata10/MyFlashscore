import { useState } from "react";

const useButtonGroup = (initialSelected) => {

    const [selected, setSelected] = useState(initialSelected);

    const handleButtonState = (button) => {
        setSelected(button);
    };

    const isActiveButton = (button) => {
        return button === selected ? "active" : "";
    }

    return { selected, handleButtonState, isActiveButton }
}
export default useButtonGroup