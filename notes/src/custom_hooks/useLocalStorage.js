function useLocalStorage(storageKey, storageValue) {

    const addToStorage = (storageKey, storageValue) => {
        localStorage.setItem(storageKey, storageValue);
    }

    return { addToStorage }
}

export default useLocalStorage;