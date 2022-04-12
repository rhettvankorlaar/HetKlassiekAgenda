<script lang="ts">
	import { getMonths, months } from '$lib/stores/MonthStore';
	import type { Job } from 'src/types/Job';
	import ical, { ICalEvent, type ICalEventData } from 'ical-generator';
	import moment from 'moment';
	import { saveFile } from '$lib/file-download';
	import type { Month } from 'src/types/Month';

	let selectedJobs: Job[] = [];

	const fetchMonths = async () => {
		getMonths();
	};

	const createCalendar = () => {
		const calendar = ical({ name: `Het Klassiek Events` });
		calendar.timezone('Europe/Amsterdam');

		selectedJobs.forEach((job: Job) => {
			calendar.createEvent({
				start: moment(job.start_date + ' ' + job.start_time, 'DD/MM/YYYY HH:mm'),
				end:
					job.end_time > job.start_time
						? moment(job.start_date + ' ' + job.end_time, 'DD/MM/YYYY HH:mm')
						: moment(job.start_date + ' ' + job.end_time, 'DD/MM/YYYY HH:mm').add(24, 'hours'),
				summary: job.category + ' | ' + job.project,
				description:
					`Functie: ${job.category}\n` +
					`Project: ${job.project}\n` +
					`Datum: ${job.start_date}\n` +
					`Start: ${job.start_time}\n` +
					`Eind: ${job.end_time}\n` +
					`Locatie: ${job.full_address}\n` +
					`Opdrachtgever: ${job.client.name}\n`,
				location: job.full_address
			});
		});

		//calendar.save('./calendar.ical');
		const blob = calendar.toBlob();
		saveFile(blob);
	};

	const createCalendarAll = () => {
		$months.forEach((month: Month) => {
			month.japs.forEach((job: Job) => {
				selectedJobs.push(job);
			});
		});
		console.log(selectedJobs);
		createCalendar();
	};
</script>

{#await fetchMonths()}
	<p>...waiting</p>
{:then}
	<div>
		{#each $months as m}
			<details>
				<summary>
					{m.month}
				</summary>
				<div>
					{#each m.japs as job}
						<label class="m-2">
							<input type="checkbox" bind:group={selectedJobs} value={job} />
							{'Project:' + job.project + '  Datum:' + job.start_date}
						</label>
						<br />
					{/each}
				</div>
			</details>
		{/each}
		<button
			on:click|preventDefault={createCalendar}
			class="text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
			>Genereer Agenda voor geselecteerde</button
		>
		<button
			on:click|preventDefault={createCalendarAll}
			class="text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
			>Genereer voor alles</button
		>
	</div>
{:catch}
	alert('Error');
{/await}
