import { useMemo } from 'react'

export default function SortWrapper({ time }: { time: number }) {
	const preparedTime = useMemo(() => {
		return time ? `${(time / 1000).toFixed(3)} sec.` : '-'
	}, [time])

	return <div>{preparedTime}</div>
}