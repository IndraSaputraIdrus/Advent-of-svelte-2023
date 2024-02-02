export type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

export type Task = {
	elf: string;
	task: TaskType;
	minutesTaken: number;
	date: string;
};

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function filtered(tasks: Task[], field: TaskType): Task[] {
	return tasks.filter((task) => task.task === field);
}

export function filterDataByElf(tasks: Task[]) {
	const elfData: Record<string, { tasks: Task[] }> = {};
	tasks.forEach((task) => {
		if (!elfData[task.elf]) {
			elfData[task.elf] = { tasks: [] };
		}

		elfData[task.elf].tasks.push(task);
	});

	return Object.entries(elfData);
}

export function getAverageTimeTaken(array: Task[]) {
	const totalMinutes = array.reduce((acc, curr) => acc + curr.minutesTaken, 0);
	return (totalMinutes / array.length).toFixed(2);
}
