import { useRef, useState } from 'react';
import cn from 'classnames';
import * as yup from 'yup';
import { IUrlFormProps } from './UrlFormProps';
import classes from './UrlForm.module.scss';

export const UrlForm: React.FC<IUrlFormProps> = ({ onSubmit, inline }) => {
  const [urlInputValue, setUrlInputValue] = useState<string>('');
  const [isValidating, setValidating] = useState<boolean>(false);
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const [dirtry, setDirty] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const urlValidationSchema = { url: yup.string().required().url() };
  const validate = (
    url: string,
  ) => yup.object().shape(urlValidationSchema).validate({ url });

  const clearHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    setDirty(false);
    setUrlInputValue('');
    setInvalid(false);
    setValidating(false);
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
        .catch((error: yup.ValidationError) => {
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
        onSubmit(urlInputValue);
      })
      .catch((error: yup.ValidationError) => {
        setInvalid(true);
        setError(error.message);
      });
  };

  return (
    <div className={cn(classes.container, inline ? classes.inline : null)}>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.inputGroup}>
          <label className={classes.label} htmlFor='url'>
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
            className={classes.clearButton}
            onClick={clearHandler}
          ></button>
        </div>
        <div className={classes.controls}>
          <button
            type='submit'
            className={classes.submitButton}
            disabled={isValidating || isInvalid}
          >
            Submit
          </button>
        </div>
        {
          <div className={cn(classes.error, isInvalid ? null : classes.hidden)}>
            <div className={classes.arrow}></div>
            {error}
          </div>
        }
      </form>
    </div>
  );
};
