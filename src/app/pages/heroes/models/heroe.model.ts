export interface Heroe {
    id: string;
    name: string;
    biography: string;
    image: string;
    appearance: string;
    house: string;
  }
  
  export function makeHeroe(data: Partial<Heroe>): Heroe {
    const defaultValue: Heroe = {
      id: '',
      name: '',
      biography: '',
      image: '',
      appearance: '',
      house: '',
    };
  
    return { ...defaultValue, ...data };
  }
  
  export interface ImageError {
    key: string;
    message: string;
  }