"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { calculateTip, splitBill } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { User2 } from "lucide-react";

export default function Home() {
  const [billAmount, setBillAmount] = useState<number | null>(null);
  const [tipPercentage, setTipPercentage] = useState(15);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const tipAmount = billAmount !== null ? calculateTip(billAmount, tipPercentage) : 0;
  const totalAmount = billAmount !== null ? billAmount + tipAmount : 0;
  const amountPerPerson = splitBill(totalAmount, numberOfPeople);

  const handleBillAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setBillAmount(isNaN(value) ? null : value);
  };

  const handleTipPercentageChange = (value: number[]) => {
    setTipPercentage(value[0]);
  };

  const handleNumberOfPeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setNumberOfPeople(isNaN(value) || value < 1 ? 1 : value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-secondary">
      <Card className="w-full max-w-md space-y-4 p-4">
        <CardHeader>
          <CardTitle className="text-center">TipEase</CardTitle>
          <CardDescription className="text-center">Calculate tip and split the bill with ease!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bill-amount">Bill Amount</Label>
            <Input
              type="number"
              id="bill-amount"
              placeholder="Enter bill amount"
              onChange={handleBillAmountChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tip-percentage">Tip Percentage ({tipPercentage}%)</Label>
            <Slider
              defaultValue={[tipPercentage]}
              max={30}
              step={1}
              onValueChange={handleTipPercentageChange}
              aria-label="Tip Percentage"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number-of-people">Number of People</Label>
            <div className="relative">
              <Input
                type="number"
                id="number-of-people"
                placeholder="Enter number of people"
                min="1"
                value={numberOfPeople.toString()}
                onChange={handleNumberOfPeopleChange}
              />
              <User2 className="absolute top-1/2 right-3 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Bill Amount:</Label>
              <span>{billAmount !== null ? billAmount.toFixed(2) : "0.00"}</span>
            </div>
            <div className="flex justify-between">
              <Label>Tip Amount:</Label>
              <span>{tipAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <Label>Total Amount:</Label>
              <span>{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <Label>Amount Per Person:</Label>
              <span>{amountPerPerson.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

