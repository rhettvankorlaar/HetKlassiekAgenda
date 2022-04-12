export type Job = {
    uuid: string
    start_date: Date
    client: Client
    project: string
    start_time: string
    end_time: string
    full_address: string
    category: string
    status: Status[]
}