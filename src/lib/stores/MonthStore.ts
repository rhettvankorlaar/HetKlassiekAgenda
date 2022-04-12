import type { Job } from 'src/types/Job';
import { writable, type Writable } from 'svelte/store';
import type { Month } from 'src/types/Month';
import type { Status } from 'src/types/Status';
import type { Client } from 'src/types/Client';
import { goto } from '$app/navigation';
import { browser } from '$app/env';

export const months: Writable<Month[]> = writable([]);

export const getMonths = async () => {
	if (browser && localStorage !== null) {
		const req = await fetch(
			`https://backend.fleks.works/api/jobs/my-jobs/23ba0bc4-5c2e-4b3b-b90d-ad043ad656e9/${localStorage.getItem(
				'uuid'
			)}/`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			}
		)
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				}
				localStorage.removeItem('token');
				localStorage.removeItem('uuid');
				throw new Error('Fetching months failed!');
			})
			.then((data) => {
				const allMonths: Month[] = data.results.map((m: Month) => {
					return {
						month: m.month,
						japs: m.japs.map((job: Job) => {
							return {
								uuid: job.uuid,
								start_date: job.start_date,
								project: job.project,
								start_time: job.start_time,
								end_time: job.end_time,
								full_address: job.full_address,
								category: job.category,
								status: job.status.map((status: Status) => {
									return {
										status_type: status.status_type,
										order: status.order,
										is_completed: status.is_completed
									};
								}),
								client: job.client.map((client: Client) => {
									return {
										name: client.name,
										uuid: client.uuid
									};
								})
							};
						})
					};
				});
				months.set(allMonths);
			})
			.catch((error) => {
				console.log(error);
				goto('/login');
			});
	}
};
