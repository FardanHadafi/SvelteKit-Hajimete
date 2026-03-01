export interface TopicListItem {
	id: string;
	slug: string;
	title: string;
	description: string;
	order_index: number;
	completed: number;
	total: number;
}

export interface TopicListResponse {
	data: TopicListItem[];
}
