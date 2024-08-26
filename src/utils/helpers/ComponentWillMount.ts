import { useRef } from "react";

export const useComponentWillMount = (handler: Function) => {
    const willMount = useRef(true)

    if (willMount.current) handler();

    willMount.current = false
}