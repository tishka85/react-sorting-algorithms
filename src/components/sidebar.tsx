import { SortingType } from '@/utils/enums'
import { SortingData } from '@/utils/types'

export default function Sidebar({ sortingData, selectedSortTypes, setSelectedSortTypes }: { sortingData: SortingData, selectedSortTypes: Array<SortingType>, setSelectedSortTypes: Function }) {
	const setSortToggle = (sortingTypeToggle: SortingType): void => {
		if(selectedSortTypes.includes(sortingTypeToggle) && selectedSortTypes.length === 1) return

		const newSelectedSortTypes = selectedSortTypes.includes(sortingTypeToggle)
			? selectedSortTypes.filter((sortingType: SortingType) => sortingType !== sortingTypeToggle)
			: [...selectedSortTypes, sortingTypeToggle]

		setSelectedSortTypes(newSelectedSortTypes)
	}

	const isSortTypeActive = (sortType: SortingType): boolean => {
		return selectedSortTypes.includes(sortType)
	}

	const sortTypeButtons = Object.keys(sortingData).map(sortType => {
		return (
			<div
				key={sortType}
				className={`border border-solid border-gray-600 rounded-md cursor-pointer text-center mb-2 py-2${isSortTypeActive(sortType as SortingType) ? ' bg-gray-600 text-white' : ''}`}
				onClick={() => setSortToggle(sortType as SortingType)}
			>
				{sortingData[sortType as SortingType].title}
			</div>
		)
	})

	return (
		<div className="px-4">
			<div className="text-xl font-bold mb-2">Choose sort type</div>
			{sortTypeButtons}
		</div>
	)
}