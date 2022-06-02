import { SortingMethod } from '@/utils/types'
import cloneDeep from 'lodash-es/cloneDeep'
import { sleep, swap } from './utility'

const bubble: SortingMethod = async (arr: Array<number>, cb: Function) => {
	const clonedArr = cloneDeep(arr)
	const { length } = clonedArr

	for (let j = length - 1; j > 0; j--) {
		for (let i = 0; i < j; i++) {
			if (clonedArr[i] > clonedArr[i + 1]) {
				swap(clonedArr, i, i + 1)

				if (cb) {
					cb(clonedArr)
				}

				await sleep()
			}
		}
	}
}

const insertion: SortingMethod = async (arr: Array<number>, cb: Function) => {
	const clonedArr = cloneDeep(arr)
	const { length } = clonedArr

	for (let i = 1; i < length; i++) {
		let current = i

		while (clonedArr[current - 1] !== undefined && clonedArr[current] < clonedArr[current - 1]) {
			swap(clonedArr, current - 1, current)
			current -= 1

			if (cb) {
				cb(clonedArr)
			}

			await sleep()
		}
	}
}

const selection: SortingMethod = async (arr: Array<number>, cb: Function) => {
	const clonedArr = cloneDeep(arr)
	const { length } = arr

	let minIndex
	for (let i = 0; i < length - 1; i++) {
		minIndex = i

		for (let j = i; j < length; j++) {
			if (clonedArr[minIndex] > clonedArr[j]) {
				minIndex = j
			}
		}

		if (i !== minIndex) {
			swap(clonedArr, i, minIndex)

			if (cb) {
				cb(clonedArr)
			}

			await sleep()
		}
	}
}

const quickPartition = async (arr: Array<number>, left: number, right: number, cb: Function): Promise<number> => {
	const pivot = arr[Math.floor((right + left) / 2)]
	let i = left
	let j = right

	while (i <= j) {
		while (arr[i] < pivot) {
			i += 1
		}

		while (arr[j] > pivot) {
			j -= 1
		}
		if (i <= j) {
			swap(arr, i, j)

			if (cb) {
				cb(arr)
			}

			await sleep()
			i += 1
			j -= 1
		}
	}

	return i
}

const quickUtility = async (arr: Array<number>, cb: Function, left = 0, right: number = arr.length - 1): Promise<void> => {
	const clonedArr = cloneDeep(arr)

	let index

	if (clonedArr.length > 1) {
		index = await quickPartition(clonedArr, left, right, cb)
		if (left < index - 1) {
			quickUtility(clonedArr, cb, left, index - 1)
		}
		if (index < right) {
			quickUtility(clonedArr, cb, index, right)
		}
	}
}

const quick: SortingMethod = async (arr: Array<number>, cb: Function) => {
	await quickUtility(arr, cb)
}

export {
	bubble,
	insertion,
	selection,
	quick,
}