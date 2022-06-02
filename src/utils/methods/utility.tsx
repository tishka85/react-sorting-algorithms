const swap = (arr: Array<number>, indexA: number, indexB: number): void => {
	const temp = arr[indexA]
	arr.splice(indexA, 1, arr[indexB])
	arr.splice(indexB, 1, temp)
}

const sleep = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 0))

export {
	swap,
	sleep,
}