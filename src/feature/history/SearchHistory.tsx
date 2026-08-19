import { memo } from 'react';
import './SearchHistory.css';

export interface SearchHistoryProps {
	data: string[];
	onSelect: (query: string) => void;
}

const SearchHistoryComponent = ({ data, onSelect }: SearchHistoryProps) => {
	if (data.length === 0) {
		return null;
	}

	return (
		<div className="search-history" aria-label="Search history">
			<ul className="search-history__list">
				{data.map((query, index) => (
					<li className="search-history__item" key={`${query}-${index}`}>
						<button
							className="search-history__button"
							onMouseDown={(event) => event.preventDefault()}
							onClick={() => onSelect(query)}
							type="button"
						>
							{query}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export const SearchHistory = memo(SearchHistoryComponent);