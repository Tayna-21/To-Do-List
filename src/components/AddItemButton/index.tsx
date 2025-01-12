import React from 'react';
import styles from './addButton.module.scss';
import PlusIcon from '../Icons/PlusIcon';

const AddItemButton: React.FC = () => {
	return (
        <button className={styles.addItemButton} type='submit' name='add'>
			<PlusIcon />
			Add
		</button>
	)
}

export default AddItemButton;