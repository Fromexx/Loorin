import styles from "./page.module.scss";

export default function Home() {
    return (
        <body className={styles.body} >
            <div className={styles.header}>
                <h1 className={styles.title}>Loorin</h1>
            </div>
            
            <div className={styles.mainPanel} >
                <div className={styles.cartDiv} >
                    <img className={styles.cart} src="/images/Cart.png" />
                </div>

                <div className={styles.userAvatarDiv} >
                    <img className={styles.userAvatar} src="/images/UserAvatar.png" />
                </div>

                <div className={styles.search} >
                    <img className={styles.searchIcon} src="/images/Search.png" />

                    <div className={styles.searchField} >
                        <p>...</p>
                    </div>
                </div>
            </div>
        </body>
    )
}