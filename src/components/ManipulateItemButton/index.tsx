import React from 'react';
import { ButtonPropsTypes } from '../../interfaces';
import styles from './manipulateButton.module.scss'

const ManipulateItemButton: React.FC<ButtonPropsTypes> = ({icon, onClick}) => {
	return (
        <button className={styles.manipulateButton} type='button' onClick={onClick} data-testid='manipulate-button'>
            {icon}
		</button>
	)
}

export default ManipulateItemButton;