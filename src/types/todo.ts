export interface ITodo {
    id: string
    text: string
    completed: boolean
    days: {
        day: string;
        completed: boolean;
        idDay:string;
    }[];
  }

  export type FiltersType = 'all' | 'active' | 'completed'
  