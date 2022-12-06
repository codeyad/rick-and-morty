import Style from './tab.module.scss'

import { Link } from 'react-router-dom'

interface Props {
  title: string
  description: string
  date?: string
  link?: string
}

const Tab = ({ link, title, description, date }: Props) => {
  const content = (
    <>
      <h4>{title}</h4>
      <p>{description}</p>
      {date && <p>{date}</p>}
    </>
  )

  return (
    <div className={Style.tab}>
      {link ? <Link to={link}>{content}</Link> : content}
    </div>
  )
}

export default Tab
