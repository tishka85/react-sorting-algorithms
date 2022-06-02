import { useState, useEffect, useRef } from 'react'
import SortDisplay from './sort-display'
import Timer from './timer'
import cloneDeep from 'lodash-es/cloneDeep'

export default function SortWrapper({
	sortTitle,
	initialArr,
	valHeights,
	sortMethod,
}: {
	sortTitle: string,
	initialArr: Array<number>,
	valHeights: Record<number, string>,
	sortMethod: Function,
}) {
	const firstRenderRef = useRef(true)

	let [arrLocal, setArrLocal] = useState<Array<number>>([])
	let [isArrChangingInitial, setIsArrChangingInitial] = useState<boolean>(false)

	let [time, setTime] = useState<number>(0)

	let [timerId, setTimerId] = useState<number>(0)

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false
			return
		}

		setIsArrChangingInitial(true)
		setArrLocal(cloneDeep(initialArr))
	}, [initialArr])

	useEffect(() => {
		if (!arrLocal.length || !isArrChangingInitial) return

		if (isArrChangingInitial) {
			setIsArrChangingInitial(false)
		}

		const timer = setInterval(() => {
			setTime(time += 10)
		}, 10)

		setTimerId(+timer)
	}, [arrLocal])

	useEffect(() => {
		const sort = async () => {
			await sortMethod(arrLocal, (updatedArr: Array<number>) => {
				setArrLocal(updatedArr)
			})

			clearInterval(timerId)
		}

		sort()
	}, [timerId])

	useEffect(() => {
		return () => {
			clearInterval(timerId)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="border border-solid border-gray-600 rounded-lg p-3 mb-2">
			<div
				className="text-lg font-bold border rounded-lg bg-gray-600 text-white text-center mb-4"
			>{sortTitle}</div>

			<div className="mb-4">
				<SortDisplay
					initialArr={arrLocal}
					valHeights={valHeights}
				/>
			</div>

			<Timer time={time}/>
		</div>
	)
}