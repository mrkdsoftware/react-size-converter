import React from 'react';
import { Button } from "@/components/ui/button"

// eslint-disable-next-line react/prop-types
function ButtonConvert({ id, value, onClick }) {
    return (
        <Button
            id={id}
            onClick={onClick}
            variant="outline"
            className="w-[60vw] sm:w-[10vw] h-[6vh] text-2xl mb-8 text-white hover:text-stone-100 active:text-stone-200 bg-bluebt hover:bg-midbluebt active:bg-darkbluebt"
        >
            {value}
        </Button>
    );
}

export default ButtonConvert;