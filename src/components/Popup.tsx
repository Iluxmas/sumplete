import React from 'react';
import styles from './Popup.module.css';

interface PopupProps {
  onCancel: () => void;
  onConfirm: () => void;
}

function Popup({ onCancel, onConfirm }: PopupProps) {
  return (
    <div className={styles.popup}>
      <div className={styles.popup_wrapper}>
        <p className={styles.popup_text}>Are you sure you want to reveal the solution to this puzzle?</p>
        <div className={styles.buttons_container}>
          <button className={styles.popup_button} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.popup_button} onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
