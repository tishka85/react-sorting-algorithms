import { CNT_ITEMS, DISPLAY_HEIGHT } from '../utils/constants'

export default function SortDisplay({ initialArr, valHeights }: { initialArr: Array<number>, valHeights: Record<number, string> }) {
	const valueWidth = `${100 / CNT_ITEMS}%`

	return (
		<div className="flex items-end" style={{ 'height': `${DISPLAY_HEIGHT}px` }}>
			{
				initialArr.map(val => (
					<div
						className="bg-gray-600 border border-solid border-white"
						key={val}
						style={{ 'height': valHeights[val], 'width': valueWidth }}
					/>
				))
			}
		</div>
	)
}