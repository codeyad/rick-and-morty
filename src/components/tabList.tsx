import Tab from './tab'

interface Tab {
  title: string
  description: string
  date?: string
  link?: string
  id: any
}

interface Props {
  list: Tab[]
}

const TabList = ({ list }: Props) => (
  <>
    {list.map(t => (
      <Tab
        key={t.id}
        link={t.link}
        title={t.title}
        description={t.description}
        date={t.date}
      />
    ))}
  </>
)

export default TabList
