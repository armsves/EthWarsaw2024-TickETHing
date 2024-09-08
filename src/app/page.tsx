"use client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import PaymentWidget from "@requestnetwork/payment-widget/react";

interface Ticket {
  id: number;
  name: string;
  price: number;
  quantity: number;
  worldCoin: boolean;
  soulBound: boolean;
}

export default function Home() {
  const [regularTickets, setRegularTickets] = useState(0);
  const [studentTickets, setStudentTickets] = useState(0);
  const [total, setTotal] = useState(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const regularPrice = 99.99;
  const studentPrice = 49.99;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/tickets');
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    setTotal(regularTickets * regularPrice + studentTickets * studentPrice);
  }, [regularTickets, studentTickets]);

  const productDescription = useMemo(() => {
    if (regularTickets === 0 && studentTickets === 0) {
      return "";
    }

    let description = "";
    if (regularTickets > 0) {
      description += `\n${regularTickets} Regular ticket${regularTickets > 1 ? "s" : ""}`;
    }
    if (studentTickets > 0) {
      description += `\n${studentTickets} Student ticket${studentTickets > 1 ? "s" : ""}`;
    }
    return description;
  }, [regularTickets, studentTickets]);

  return (
    <main className="flex flex-col gap-4 max-w-[1200px] w-full h-screen mx-auto px-5 py-8">
      <div className="flex items-center gap-4">
        <Image
          alt="ETHWARSAW"
          src="data:image/jpeg;base64,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"
          width={100}
          className="object-cover rounded-lg"
          height={100}
        />
        <h1 className="font-bold text-2xl">ETHWARSAW</h1>
      </div>

      <div>
        <h2>Fetched Tickets</h2>
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id}>
              {ticket.name} - {ticket.price} - {ticket.quantity}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-2xl my-6">Tickets for sale</h2>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-4">
          {/* Regular Ticket */}
          <Card className="w-full max-w-md mx-auto mb-6 overflow-hidden">
            <div className="flex">
              <div className="flex-grow p-6 bg-white">
                <h2 className="text-3xl font-serif mb-4">Regular</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">
                      FULL ACCESS TO THE CONFERENCE TALKS AND WORKSHOPS
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">
                      FOOD & DRINKS DURING THE EVENT
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">NETWORKING AREAS</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">UNIQUE CONFERENCE SWAG</span>
                  </li>
                </ul>
              </div>
              <div className="w-1/3 bg-secondary p-4 flex flex-col justify-between items-center">
                <div className="text-center">
                  <div className="font-bold mb-1">FIAT</div>
                  <div className="text-2xl font-bold">
                    {regularPrice}
                    <span className="text-sm">USD</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() =>
                      setRegularTickets((prev) => Math.max(0, prev - 1))
                    }
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-bold">{regularTickets}</span>
                  <Button onClick={() => setRegularTickets((prev) => prev + 1)}>
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          {/* Student Ticket */}
          <Card className="w-full max-w-md mx-auto mb-6 overflow-hidden">
            <div className="flex">
              <div className="flex-grow p-6 bg-white">
                <h2 className="text-3xl font-serif mb-4">Student</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">
                      FULL ACCESS TO THE CONFERENCE TALKS AND WORKSHOPS
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">
                      FOOD & DRINKS DURING THE EVENT
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">NETWORKING AREAS</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">STUDENT-EXCLUSIVE SESSIONS</span>
                  </li>
                </ul>
              </div>
              <div className="w-1/3 bg-secondary p-4 flex flex-col justify-between items-center">
                <div className="text-center">
                  <div className="font-bold mb-1">FIAT</div>
                  <div className="text-2xl font-bold">
                    {studentPrice}
                    <span className="text-sm">USD</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() =>
                      setStudentTickets((prev) => Math.max(0, prev - 1))
                    }
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-bold">{studentTickets}</span>
                  <Button onClick={() => setStudentTickets((prev) => prev + 1)}>
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-[50%]">
          <PaymentWidget
            sellerAddress="0xdCCA05bbE0A8D2AA3aDe094c7A3A970ABdAC26ad"
            supportedCurrencies={[
              "REQ-mainnet",
              "USDC-matic",
              "ETH-sepolia-sepolia",
            ]}
            amountInUSD={total}
            sellerInfo={{
              name: "ETHWarsaw",
              logo: "data:image/jpeg;base64,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",
            }}
            productInfo={{
              name: "Event tickets",
              description: productDescription,
            }}
            enableBuyerInfo={true}
            buyerInfo={{
              firstName: "hacker",
              lastName: "Doe",
            }}
            onPaymentSuccess={(request) => { }}
          />
        </div>
      </div>
    </main>
  );
}
