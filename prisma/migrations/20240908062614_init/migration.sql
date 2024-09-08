-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "worldCoin" BOOLEAN NOT NULL,
    "soulBound" BOOLEAN NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
