import React from 'react';

export default function GifItem({ src, alt, className, onClick, id }) {
	// TODO: figure?
	return <img
			src={src}
			alt={alt}
			className={className}
			onClick={onClick}
			data-id={id}
		/>
}