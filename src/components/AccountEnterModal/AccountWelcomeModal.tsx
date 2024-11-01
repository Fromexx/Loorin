'use client'

import { useRef, useState, useEffect } from "react";
import styles from "./dialog.module.scss";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {
    onClose: () => void,
    isActive: boolean,
}

export function Dialog({ onClose, isActive }: Props) {
    const modalRef = useRef<null | HTMLDialogElement>(null);
    let welcomeModal: JSX.Element;
    const [modal, setModal] = useState(null);
    const [error, setError] = useState("");
    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const _target = e.target as any;
        const email = _target.email.value;
        const password = _target.password.value;
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
            if (result?.error) {
                setError(result.error);
            } 
            else {
                push("/profile");
            }
    };

    welcomeModal = (
        <dialog ref={modalRef} className={styles.dialog}>
            <div>
                <div>
                    <div className={styles.closeButton} onClick={onClose} >
                        <span className={styles.line} />
                        <span className={styles.line} />
                    </div>

                    <h1 className={styles.title} >Добро пожаловать в <br/>LOORIN</h1>
                </div>
                <div>
                    <button className={styles.logInButton} onClick={() => setModal(loginModal)} >Войти</button>
                    <p className={styles.orText} >ИЛИ</p>
                    <button className={styles.registerButton} onClick={() => setModal(registerModal)} >Зарегистрироваться</button>
                </div>
            </div>
        </dialog>
    );

    useEffect(() => {
        setModal(welcomeModal);
    }, [isActive])

    let loginModal: JSX.Element = (
        <dialog ref={modalRef} className={styles.dialog} >
            <div>
                <div className={styles.upperContainer} >
                    <h1 className={styles.loginTitle} >Вход</h1>

                    <div className={styles.closeButtonLogin} onClick={onClose} >
                        <span className={styles.line} />
                        <span className={styles.line} />
                    </div>
                </div>
                <div className={styles.mainContainer} >
                    <form className={styles.loginForm} onSubmit={handleSubmit} >
                        <input className={styles.inputField} type="text" name="email" placeholder="Введите почту" required />
                        <input className={styles.inputField} type="password" name="password" placeholder="Введите пароль" required />

                        <div className={styles.rememberMe} >
                            <input className={styles.rememberMeCheckbox} type="checkbox" />
                            <p className={styles.rememberMeText} >Запомнить меня</p>
                        </div>

                        <button type="submit" className={styles.loginSubmitButton} >Войти</button>
                    </form>

                    <div className={styles.continueWithContainer} >
                        <p className={styles.continueWith} >Или продолжить через</p>

                        <div className={styles.societyContainer} >
                            <img src="/images/SocietyIcons/Google.png" className={styles.googleIcon} />
                            <img src="/images/SocietyIcons/Yandex.png" className={styles.yandexIcon} />
                            <img src="/images/SocietyIcons/Vk.png" className={styles.vkIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );

    let registerModal: JSX.Element = (
        <dialog ref={modalRef} className={styles.dialog} >
            <div>
                <div className={styles.upperContainer} >
                    <h1 className={styles.enterTitle} >Регистрация</h1>

                    <div className={styles.closeButtonEnter} onClick={onClose} >
                        <span className={styles.line} />
                        <span className={styles.line} />
                    </div>
                </div>
                <div className={styles.mainContainer} >
                    <form className={styles.enterForm} >
                        <input className={styles.inputField} type="text" name="email" placeholder="Введите почту" required />
                        <input className={styles.inputField} type="text" name="login" placeholder="Введите логин" required />
                        <input className={styles.inputField} type="password" name="password" placeholder="Введите пароль" required />
                        <input className={styles.inputField} type="password" name="password" placeholder="Повторите пароль" required />

                        <div className={styles.rememberMe} >
                            <input className={styles.rememberMeCheckbox} type="checkbox" />
                            <p className={styles.rememberMeText} >Запомнить меня</p>
                        </div>

                        <button type="submit" className={styles.registerSubmitButton} >Зарегестрироваться</button>
                    </form>

                    <div className={styles.continueWithContainer} >
                        <p className={styles.continueWith} >Или продолжить через</p>

                        <div className={styles.societyContainer} >
                            <img src="/images/SocietyIcons/Google.png" className={styles.googleIcon} />
                            <img src="/images/SocietyIcons/Yandex.png" className={styles.yandexIcon} />
                            <img src="/images/SocietyIcons/Vk.png" className={styles.vkIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )

    if(isActive) {
        modalRef.current?.showModal();
        return modal;
    }

    modalRef.current?.close();
    return null;
}