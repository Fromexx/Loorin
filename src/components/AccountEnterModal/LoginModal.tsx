/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import styles from "./dialog.module.scss";
import { Signin } from "@/services/UserAuthActions";
import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { CreateAuthParams } from "@/utils/helpers/CreateAuthParamsHelper";
import { deleteAuthParams } from "@/api/lib/authParams";

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
                        <img src="/images/SocietyIcons/Google.png" className={styles.googleIcon} onClick={async () => {
                            await CreateAuthParams();
                            const response = await signIn("github", { callbackUrl: "/gateway" });
                            
                            if (response?.error != null) {
                                await deleteAuthParams();
                            }
                        }}/>
                        <img src="/images/SocietyIcons/Yandex.png" className={styles.yandexIcon} onClick={async () => {
                            await CreateAuthParams();
                            const response = await signIn("yandex", { callbackUrl: "/gateway" });
                            
                            if (response?.error != null) {
                                await deleteAuthParams();
                            }
                        }}/>
                        <img src="/images/SocietyIcons/Vk.png" className={styles.vkIcon} onClick={async () => {
                            await CreateAuthParams();
                            const response = await signIn("vk", { callbackUrl: "/gateway" });
                            
                            if (response?.error != null) { 
                                await deleteAuthParams();
                            }
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}