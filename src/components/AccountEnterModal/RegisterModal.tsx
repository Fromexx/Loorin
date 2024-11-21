import styles from "./dialog.module.scss";
import { Signup } from "@/services/UserAuthActions";
import { useActionState } from "react";
import React from "react";

type Props = {
    onClose: () => void,
}

export function RegisterModal({ onClose }: Props) {
    const [state, action] = useActionState(Signup, undefined);

    return (
        <div className={styles.registerModal} >
            <h1 className={styles.loginTitle} >Регистрация</h1>

            <div className={styles.closeButton} onClick={onClose} >
                <span className={styles.line} />
                <span className={styles.line} />
            </div>

            <div className={styles.mainContainer} >
                <form className={styles.loginForm} action={action} >
                    <input className={styles.inputField} type="text" name="email" placeholder="Введите почту" />
                    {state?.errors?.email && <p className={styles.errorText} >{state.errors.email}</p>}
                    {state?.emailUserAlreadyExist && <p className={styles.errorText} >{state.emailUserAlreadyExist}</p>}
                    <input className={styles.inputField} type="text" name="name" placeholder="Введите имя" />
                    {state?.errors?.name && <p className={styles.errorText} >{state.errors.name}</p>}
                    <input className={styles.inputField} type="password" name="password" placeholder="Введите пароль" />
                    {
                        state?.errors?.password && React.Children.toArray(state.errors.password.map(error =>
                        <p className={styles.errorText} >{error}</p>))
                    }
                    <div className={styles.rememberMe} >
                    <input className={styles.rememberMeCheckbox} id="rememberMe" type="checkbox" />
                    <label className={styles.rememberMeText} htmlFor="rememberMe" >Запомнить меня</label>
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
    )
}