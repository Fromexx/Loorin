import { Search } from "@/services/ProductSearch";
import styles from "./searchField.module.scss";
import { useRef } from "react";
import { useEffect, useState, ChangeEvent } from "react";
import { eventEmitter } from "@/services/EventEmitter";

const SEARCH_ICON_ID = "searchIcon";

export function SearchField({ params }: {
    params: { defaultValue: string | null }
}) {
    const ref = useRef(null);
    const [inputValue, setValue] = useState("");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target)) {
                const element1 = document.getElementById(SEARCH_ICON_ID);
                element1?.setAttribute('style', 'display: none');
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => { document.removeEventListener('mousedown', handleClickOutside) };
    }, [ref]);

    const searchIconClicked = () => {
        const element = document.getElementById(SEARCH_ICON_ID);
        element?.setAttribute('style', 'display: flex');
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
    }

    const handleKeyPress = (event: { key: any; }) => {
        if (event.key === "Enter") {
            let searchResult = Search(inputValue);
            eventEmitter.dispatch("ProductSearching", searchResult);
        }
    }

    return (
        <>
            <div className={styles.hiddenSearchField} id={SEARCH_ICON_ID} ref={ref}>
                <p className={styles.searchText}>{params.defaultValue}</p>
            </div>

            <div className={styles.search}>
                <button className={styles.searchIcon} onClick={searchIconClicked}>
                    <img className={styles.searchImage} src="/images/Search.png" />
                </button>

                <div className={styles.searchField}>
                    <input type="text" placeholder={params.defaultValue} value={inputValue} onChange={handleChange} onKeyDown={handleKeyPress} className={styles.searchText}/>
                </div>
            </div>
        </>
    )
}