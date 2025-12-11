"use client";

import Text from "@/ui/Text";
import useCart from "@/hooks/useCart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/Card";
import Image from "next/image";
import { Button } from "@/ui/Button";
import { MinusIcon, PlusIcon, ShieldCheck, Trash2, Undo2 } from "lucide-react";
import { Separator } from "@/ui/separator";
import useRedirect from "@/hooks/useRedirect";

export default function CartScreen() {
  const { items, removeItem, addItem, deleteItem, getTotalPrice } = useCart();
  const { navigate } = useRedirect();
  const handleContinueToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="w-full">
      <Text type="h1" size="5xl" weight="bold">Your Cart</Text>
      <div className="flex gap-4 relative">
        <div className="flex flex-col gap-4 w-3/4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex gap-7">
                <div className="relative size-40">
                  <Image src={item.image} alt={item.name} width={160} height={160} className="z-10 relative" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary blur-xl h-32 w-32"/>
                </div>
                <div className="flex flex-col gap-2 flex-1 justify-between">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between w-full">
                      <Text type="h2" size="2xl" weight="bold">{item.name}</Text>
                      <Button variant="ghost" onClick={() => deleteItem(item.id)}><Trash2 /></Button>
                    </div>
                    <Text type="p" size="sm" weight="bold" color="tint1">{item.description}</Text>
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                    <div className="rounded-md border bg-card text-card-foreground shadow flex items-center gap-2 w-fit">
                      <Button variant="ghost" onClick={() => removeItem(item.id)}><MinusIcon /></Button>
                      <Text type="p" size="sm" weight="bold">{item.quantity}</Text>
                      <Button variant="ghost" onClick={() => addItem(item)}><PlusIcon /></Button>
                    </div>
                    <Text type="p" size="sm" weight="bold">{item.price}</Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Text type="h2" size="2xl" weight="bold">Order Summary</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Text type="p" size="sm" weight="bold">Subtotal</Text>
                  <Text type="p" size="sm" weight="bold" color="tint1">{getTotalPrice()}</Text>
                </div>
                <div className="flex items-center justify-between">
                  <Text type="p" size="sm" weight="bold">Shipping</Text>
                  <Text type="p" size="sm" weight="bold" color="primary">Free</Text>
                </div>
              </div>
              <Separator className="mt-6"/>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2 flex-col w-full">
                <Button className="w-full" onClick={handleContinueToCheckout}>Continue to Checkout</Button>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Undo2 className="size-4" />
                    <Text type="p" size="xxs" weight="bold" color="tint1">Free returns</Text>
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="size-4" />
                    <Text type="p" size="xxs" weight="bold" color="tint1">Secure payment</Text>
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}