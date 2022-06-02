import { useMemo, useEffect, useState } from 'react'
import './App.scss';
import { SortingType } from './utils/enums'
import {
	bubble, insertion, selection, quick,
} from './utils/methods/sort'
import { SortingData } from './utils/types'
import Sidebar from './components/sidebar'
import { CNT_ITEMS, DISPLAY_HEIGHT } from './utils/constants'
import SortWrapper from './components/sort-wrapper'

function App() {
	const sortingData: SortingData = {
		[SortingType.bubble]: {
			title: 'Bubble sort',
			method: bubble,
		},
		[SortingType.insertion]: {
			title: 'Insertion sort',
			method: insertion,
		},
		[SortingType.selection]: {
			title: 'Selection sort',
			method: selection,
		},
		[SortingType.quick]: {
			title: 'Quick sort',
			method: quick,
		},
	}

	let [initialArr, setInitialArr] = useState<Array<number>>([])

	let [selectedSortTypes, setSelectedSortTypes] = useState<Array<SortingType>>([])

	const valHeights: Record<number, string> = useMemo(() => {
		const divider = +(DISPLAY_HEIGHT / Math.max(...initialArr)).toFixed(1)

		return initialArr.reduce((result, val) => {
			const resultLocal = result
			resultLocal[val] = `${((val * divider) / DISPLAY_HEIGHT) * 100}%`
			return resultLocal
		}, {} as Record<number, string>)
	}, [initialArr])

	const setNewInitialArr = (): void => {
		const initialArrLocal = []

		for(let i = 0; i < CNT_ITEMS; i++) {
			initialArrLocal.push(1 + Math.random() * (CNT_ITEMS * 2 - 1))
		}

		setInitialArr(initialArrLocal)
	}

	const sortViews = initialArr.length ?
		<div
			className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 px-4"
			key={selectedSortTypes.length}
		>
			{
				selectedSortTypes.map((selectedSortType: SortingType) => (
					<SortWrapper
						key={selectedSortType}
						sortTitle={sortingData[selectedSortType].title}
						initialArr={initialArr}
						valHeights={valHeights}
						sortMethod={sortingData[selectedSortType].method}
					/>
				))
			}
		</div>
		: ''

	useEffect(() => {
		setSelectedSortTypes(Object.keys(sortingData) as Array<SortingType>)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (selectedSortTypes.length) setNewInitialArr()
	}, [selectedSortTypes])

	return (
		<div className="flex flex-wrap xl:container xl:mx-auto mt-15">
			<div className="flex-shrink-0 w-full sm:w-2/12 mb-4 sm:mb-0">
				<Sidebar
					sortingData={sortingData}
					selectedSortTypes={selectedSortTypes}
					setSelectedSortTypes={setSelectedSortTypes}
				/>
			</div>
			{sortViews}
		</div>
	)
}

export default App;
