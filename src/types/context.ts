export interface IContext {
  id: string;
  name: string;
  description: string;
  readable_id: number;
  project_id: string;
  owner_id: string;
  search_mode: string;
  retrieval_length: number;
  docs_to_retrieve: number;
  max_doc_length: number;
  doc_overlap_length: number;
  embedding_model: string;
  embedding_dimension: number;
  distance_metric: string;
  semantic_search: boolean;
  extra_metadata: object;
  created_at: string;
  last_refreshed_at: string;
}
