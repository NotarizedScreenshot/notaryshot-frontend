import { useRef, useState } from 'react';
import cn from 'classnames';
import { ITwitterIdFormProps } from './TwitterIdFormProps';
import classes from './TwitterIdForm.module.scss';
export const TwitterIdForm: React.FC<ITwitterIdFormProps> = ({
  onSubmit,
  inline,
  initialInputData,
  validate,
}) => {
  const [urlInputValue, setUrlInputValue] = useState<string>(
    initialInputData ? initialInputData : '',
  );
  const [validating, setValidating] = useState<boolean>(false);
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const [dirtry, setDirty] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    setDirty(false);
    setUrlInputValue('');
    setInvalid(false);
    setValidating(false);
    setError(null);
    inputRef.current?.focus();
  };

  const changeInputHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUrlInputValue(event.currentTarget.value);
    if (dirtry) {
      validate(event.currentTarget.value)
        .then((data) => {
          setInvalid(false);
          setError(null);
          setValidating(false);
        })
        .catch((error: Error) => {
          setInvalid(true);
          setError(error.message);
        });
    }
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setDirty(true);
    setValidating(true);
    validate(urlInputValue)
      .then(() => {
        setValidating(false);
        setInvalid(false);
        setSubmitting(true);

        onSubmit(urlInputValue).then((bool) => {
          setSubmitting(!bool);
        });
      })
      .catch((error: Error) => {
        setInvalid(true);
        setError(error.message);
        inputRef.current?.focus();
      });
  };

  return (
    <div className={cn(classes.container, inline ? classes.inline : null)} role='form'>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.inputGroup}>
          <label className={classes.label} htmlFor='url' hidden={true}>
            URL
          </label>
          <input
            ref={inputRef}
            className={cn(classes.input, isInvalid ? classes.invalid : null)}
            name='url'
            autoComplete='off'
            placeholder='URL'
            value={urlInputValue}
            onChange={changeInputHandler}
          ></input>
          <button
            type='button'
            aria-label='clear-button'
            className={classes.clearButton}
            onClick={clearHandler}
            disabled={submitting}
          ></button>
        </div>
        <div className={classes.controls}>
          <button
            type='submit'
            aria-label='submit-button'
            className={classes.submitButton}
            disabled={validating || isInvalid || submitting}
          >
            Check
          </button>
        </div>
        <div className={cn(classes.error, isInvalid ? null : classes.hidden)}>{error}</div>
      </form>
    </div>
  );
};
