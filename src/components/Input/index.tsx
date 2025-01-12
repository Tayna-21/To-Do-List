import React from 'react';
import styles from './input.module.scss'
import { InputPropsTypes } from '../../interfaces';


const Input: React.FC<InputPropsTypes> = ({value, onChange}) => {
	return(
	    <input
		    className={styles.inputMain}
			type='text' 
			placeholder='Type here to add a task...' 
			autoComplete="off" 
			value={value}
			onChange={onChange}
		/>
	)
}

export default Input;