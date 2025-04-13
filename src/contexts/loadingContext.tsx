import React, { createContext, useContext, useState, useMemo } from 'react';

interface LoadingContextType {
    loading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoadingContext must be used within a LoadingProvider");
    }
    return context;
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    const contextValue = useMemo(() => ({
        loading,
        startLoading,
        stopLoading,
    }), [loading]);

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
        </LoadingContext.Provider>
    );
};
