import { formatWithOptions } from "date-fns/fp"
import { ptBR } from "date-fns/locale"

interface Props {
  dateString: string
}

const FormatedDate: React.FC<Props> = ({ dateString }) => {
  if (dateString) {
    const [day, month, year] = dateString.split("-").map((e) => Number(e))

    const dateToString = formatWithOptions({ locale: ptBR }, "dd MMMM")

    const date = [new Date(year, month, day)]

    const formatedDate = dateToString(new Date(year, month, day))

    // console.log(formated)

    return <time dateTime={dateString}>{formatedDate}</time>
  }

  return null
}

export default FormatedDate
