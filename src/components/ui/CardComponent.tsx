
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import { Plans } from "@/lib/types";
import { Button } from "./button";

const CardComponent = ({
  highlight,
  name,
  period,
  price,
  features,
  buttonText,
  buttonVariant,
}: Plans) => {
  return (
    <Card
      className={`flex flex-col justify-between ${
        highlight ? "border-primary shadow-lg" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-center">{name}</CardTitle>
        <p className="text-center text-3xl font-bold">
          {price}
          <span className="text-lg font-normal">{period}</span>
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start space-x-2">
              <span className="text-green-500">✔</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/price" className="cursor-pointer">
          <Button
            variant={buttonVariant}
            className={
              highlight
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : ""
            }
          >
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
