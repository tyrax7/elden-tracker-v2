export interface Boss {
  id: string;
  name: string;
  image: string;
  region: string;
  description: string;
  healthPoints: string;
  isKilled?: boolean; // Ajoute cette ligne !
}

export interface ApiResponse {
  success: boolean;
  count: number;
  total: number;
  data: Boss[];
}