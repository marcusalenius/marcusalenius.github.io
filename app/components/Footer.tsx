import styles from './Footer.module.css'

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerText}>
            Copyright &copy; 2024 Marcus Alenius. All rights reserved.
        </div>
      </footer>
    );
  }