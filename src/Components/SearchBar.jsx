import React from 'react';

export default function SearchBar({ onChange }) {
	return <input
		type="text"
		placeholder="Enter keyword to search..."
		onChange={onChange}
	/>
}
