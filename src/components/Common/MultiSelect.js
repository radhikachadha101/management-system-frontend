import React from 'react'
import { MultiSelect } from "react-multi-select-component";

const CustomMultiSelect = ({options,onChange,selected,label}) => {

	return (
		<div>
		<MultiSelect
        options={options}
        value={selected}
		onChange={onChange}
		overrideStrings={{
  "selectSomeItems": label,
  "allItemsAreSelected": `All ${label} are selected.`,
  "selectAll": `Select All ${label}`,
  "search": `Search ${label}`,
  "clearSearch": "Clear Search"
}}
      />
		</div>
	)
}

export default CustomMultiSelect


