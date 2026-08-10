import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import { Plans } from "@/types/plans";
import { Button } from "./button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
      className={cn(
        "flex h-full flex-col justify-between border-border/70 bg-card/90 transition-[border-color] duration-300",
        highlight && "border-brand ring-1 ring-brand/25"
      )}
    >
      <CardHeader className="space-y-3">
        {highlight && (
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.14em] text-brand">
            Most popular
          </p>
        )}
        <CardTitle className="font-display text-center text-xl font-semibold">
          {name}
        </CardTitle>
        <p className="text-center font-display text-3xl font-semibold tracking-tight">
          {price}
          <span className="font-sans text-base font-normal text-muted-foreground">
            {period}
          </span>
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-center pt-2">
        <Link href="/price" className="w-full cursor-pointer sm:w-auto">
          <Button variant={buttonVariant} className="w-full">
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
