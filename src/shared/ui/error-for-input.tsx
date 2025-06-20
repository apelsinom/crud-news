type Props = {
  errorMessage?: string
  inputName: string
  maxLengthStr: string
}

export const ErrorForInput = ({ inputName, errorMessage, maxLengthStr }: Props) => {
  return (
    <p className="flex justify-between text-sm mt-[-16px]">
      <span className="text-red-700">{errorMessage}</span>
      <span>
        {inputName.length}/{maxLengthStr}
      </span>
    </p>
  )
}
