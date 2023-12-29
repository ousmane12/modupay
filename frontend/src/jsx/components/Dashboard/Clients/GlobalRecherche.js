import React from 'react';

export const GlobalRecherche = ( {filter, setFilter} ) =>{
	return(
		<div>
			Rechercher : {' '}
			<input className="ml-2 input-search form-control"
				value={filter || ''}  onChange={e => setFilter(e.target.value)} style={{width: "20%"}}
            />
		</div>
	)
} 