import { useState } from "react";

interface UseLoadingReturn {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
  }

const useLoading = (): UseLoadingReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return { isLoading, startLoading, stopLoading };
}

export default useLoading;