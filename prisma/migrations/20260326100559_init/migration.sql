-- CreateTable
CREATE TABLE "MigrationBaseline" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL,

    CONSTRAINT "MigrationBaseline_pkey" PRIMARY KEY ("id")
);
