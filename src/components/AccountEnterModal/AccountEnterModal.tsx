'use client'

import styles from "./dialog.module.scss";
import { useState, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

type Props = {
    onClose: () => void,
    isActive: boolean,
}

export function Modal({ onClose, isActive }: Props) {
    let welcomeModal: JSX.Element;
    const [modal, setModal] = useState(null);

    welcomeModal = (
        <div className={styles.modal}>
            <div className={styles.closeButton} onClick={onClose} >
                <span className={styles.line} />
                <span className={styles.line} />
            </div>

            <h1 className={styles.title} >Добро пожаловать в <br/>LOORIN</h1>

            <button className={styles.logInButton} onClick={() => setModal(loginModal)} >Войти</button>
            <p className={styles.orText} >ИЛИ</p>
            <button className={styles.registerButton} onClick={() => setModal(registerModal)} >Зарегистрироваться</button>
        </div>
    );

    let loginModal: JSX.Element = (<LoginModal onClose={onClose} />);
    let registerModal: JSX.Element = (<RegisterModal onClose={onClose} />)

    useEffect(() => {
        setModal(welcomeModal);
    }, [isActive])

    if(isActive) {
        return modal;
    }

    return null;
}