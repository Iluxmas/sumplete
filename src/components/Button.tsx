import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  clickHandler: () => void;
  type?: 'default' | 'action';
}

function Button({ text, clickHandler, type = 'default' }: ButtonProps) {
  const buttonClass = [styles.button];

  if (type === 'default') {
    buttonClass.push(styles.button_default);
  } else if (type === 'action') {
    buttonClass.push(styles.button_action);
  }

  return (
    <button className={buttonClass.join(' ')} onClick={clickHandler}>
      {text}
    </button>
  );
}

export default Button;
