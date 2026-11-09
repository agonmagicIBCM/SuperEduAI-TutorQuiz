import type { InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  hint?: string
}

function TextField({ id, label, hint, ...inputProps }: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="field__input"
        id={id}
        aria-describedby={hintId}
        {...inputProps}
      />
      {hint && (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      )}
    </div>
  )
}

export default TextField
