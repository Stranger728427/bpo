import styles from './Banner.module.scss';

type BannerProps = {
  title?: string
  children?: React.ReactNode
}

const Banner: React.FC<BannerProps> = ({ title, children }) => {
  return (
    <div className={styles.banner}>
      {title && (
        <h1 className={styles.title}>
          {title}
        </h1>
      )}

      {children}
    </div>
  )
}

export default Banner
