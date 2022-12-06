import { Link } from 'react-router-dom'
import Style from './card.module.scss'

interface Props {
  title: string
  detail: string
  link?: string
}

const Card = ({ title, detail, link }: Props) => (
  <div className={Style.card}>
    {link
      ? (
      <Link to={link}>
        <h3>{title}</h3>
        <p>{detail}</p>
      </Link>
        )
      : (
      <>
        <h3>{title}</h3>
        <p>{detail}</p>
      </>
        )}
  </div>
)

export default Card
