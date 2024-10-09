import React from 'react';
import { Button } from "@/components/ui/button"

// eslint-disable-next-line react/prop-types
function ButtonReturn({ id, value, onClick }) {
    return (
        <Button
            id={id}
            onClick={onClick}
            variant="outline"
            className="w-[80vw] sm:w-[20vw] h-[6vh] text-2xl m-4"
        >
            {value}
        </Button>
    );
}

export default ButtonReturn;