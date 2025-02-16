import { useEffect, useState } from "react";
import { debounce } from "lodash";

const useDebouncedSate = (initialValue, debounceBy = 250) => {
    const [value, setValue] = useState(initialValue)
    let debaouncedValue
    useEffect(() => {

    }, [value])
}