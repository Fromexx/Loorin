import styles from "./dialog.module.scss";
import { Signin } from "@/services/UserAuthActions";
import { useActionState } from "react";
import { signIn, signOut } from "next-auth/react";

type Props = {
    onClose: () => void,
}

export function LoginModal({ onClose }: Props) {
    const [state, action] = useActionState(Signin, undefined);
    
    return (
        <div className={styles.modal} >
            <h1 className={styles.loginTitle} >Вход</h1>

            <div className={styles.closeButton} onClick={onClose} >
                <span className={styles.line} />
                <span className={styles.line} />
            </div>
            
            <div className={styles.mainContainer} >
                <form className={styles.loginForm} action={action}>
                    <input className={styles.inputField} type="text" name="email" placeholder="Введите почту"/>
                    {state?.errors?.email && <p className={styles.errorText} >{state.errors.email}</p>}
                    <input className={styles.inputField} type="password" name="password" placeholder="Введите пароль" />
                    {state?.errors?.password && <p className={styles.errorText} >{state.errors.password}</p>}
                    {state?.incorrectDataError && <p className={styles.errorText} >{state.incorrectDataError}</p>}

                    <div className={styles.rememberMe} >
                        <input className={styles.rememberMeCheckbox} id="rememberMe" type="checkbox" />
                        <label className={styles.rememberMeText} htmlFor="rememberMe" >Запомнить меня</label>
                    </div>

                    <button type="submit" className={styles.loginSubmitButton}>Войти</button>
                </form>

                <div className={styles.continueWithContainer} >
                    <p className={styles.continueWith} >Или продолжить через</p>

                    <div className={styles.societyContainer} >
                        <button onClick={async () => {
                            try {
                                await signIn("github", { callbackUrl: "/gateway" });
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }}>
                            <img src="/images/SocietyIcons/Google.png" className={styles.googleIcon}/>
                        </button>
                        <img src="/images/SocietyIcons/Yandex.png" className={styles.yandexIcon} />
                        <img src="/images/SocietyIcons/Vk.png" className={styles.vkIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}