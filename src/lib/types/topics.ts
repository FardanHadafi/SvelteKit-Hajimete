export interface TopicListItem {
	id: string;
	title: string;
	description: string;
	orderIndex: number;
	completed: number;
	total: number;
}

export interface TopicListResponse {
	data: TopicListItem[];
}
