export interface Plans {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "secondary";
  highlight?: boolean;
  link?: string;
}
