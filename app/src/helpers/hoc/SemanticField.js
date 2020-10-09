import React from 'react';
import { Field } from 'formik';

function SemanticField({ WrappedCmp, ...fieldProps }) {
	return (
		<Field
			{...fieldProps}
			render={({
				field: { value, onBlur, ...field },
				form: { setFieldValue, setFieldTouched },
				...props
			}) => (
				<WrappedCmp
					{...fieldProps}
					{...field}
					{...props}
					{...(typeof value === 'boolean'
						? { checked: value }
						: { value })}
					onChange={(e, { value: newValue, checked }) =>
						setFieldValue(fieldProps.name, newValue || checked)
					}
					onBlur={(e, blurProps) =>
						blurProps
							? setFieldTouched(fieldProps.name, blurProps.value)
							: onBlur(e)
					}
				/>
			)}
		/>
	);
}

export default SemanticField;
