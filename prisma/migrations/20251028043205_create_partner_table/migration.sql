-- CreateTable
CREATE TABLE "partners" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "notes" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partners_email_key" ON "partners"("email");

-- CreateIndex
CREATE INDEX "partners_email_idx" ON "partners"("email");
