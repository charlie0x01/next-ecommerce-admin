"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useState, useEffect } from "react";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

        // check whether the component is mounted
    // if mounted, that means it's client side
    // otherwise it's server side
    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) {
        return null;
    }

    return (
        <>
        <StoreModal />
        </>
    )
}